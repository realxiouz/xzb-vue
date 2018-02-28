<template>
  <div class="tc-side-content">
    <template v-if="type == 1">
      <div class="head">
        <div>全部班级
        </div>
        <div>
          <el-button type="primary" size="small" @click="handleAddClass">+新建班级</el-button>
        </div>
      </div>
      <div class="body">
        <div class="text" v-for="item in classesBean" :key="item.id" @click="handleSelClass(item)" :class="{active: classId == item.id}">{{item.name}}</div>
      </div>
    </template>
    <template v-if="type == 2">
      <div class="head">
        <div>阶段
        </div>
        <div>
          <el-button type="primary" size="small" @click="handleSeeStudent">班级学员</el-button>
        </div>
      </div>
      <div class="body">
        <div class="text" v-for="item in periodsBean" :key="item.id" @click="handleSelPeriod(item)" :class="{active: periodId == item.id}">
          {{`${item.title}(${item.num})`}}
        </div>
      </div>
    </template>
    <!-- advise-side -->
    <template v-if="type == 3">
      <div class="head">
        <div>
          <el-select v-model="selClassId" placeholder="请选择" @change="handleAdviserSelClass">
            <el-option v-for="item in advClassesBean" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" size="small" @click="handleSeeDetail">详情</el-button>
        </div>
      </div>
      <div class="body">
        <div class="text" v-for="item in periodsBean" :key="item.id" @click="handleSelPeriod(item)" :class="{active: periodId == item.id}">
          {{`${item.title}(${item.num})`}}
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import {
  tutorclass,
  turornewclass,
  periods,
  clsadviser,
  advclasses
} from "@/api/service";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      classesBean: [],
      periodsBean: [],
      //adviser-side 选择班级id
      selClassId: 0,
      //班主任管辖班级列表
      advClassesBean: [],
    };
  },
  mounted() {
    let p = {
      id: this.$route.params.id
    };

    //获得全部班级信息
    if (this.type != 3) {
      tutorclass(p).then(res => {
        this.classesBean = res;
        //没有选中班级id,默然选中第一个班级.辅导详情班级列表跳转教学中心不需设置班级id
        if (this.classId == 0) {
          this.SET_CLASS_ID(this.classesBean[0].id);
        }
        this.SET_CLASSES(this.classesBean);
      });
    }

    //获得全部阶段信息
    periods(p).then(res => {
      this.periodsBean = res.periods;
      this.SET_PERIOD_ID(this.periodsBean[0].id);
    });

    //获得班主任管辖的班级信息
    if (this.type == 3) {
      advclasses(p).then(res => {
        this.advClassesBean = res;
        this.SET_CLASS_ID(this.advClassesBean[0].id);
      });
    }
  },
  methods: {
    ...mapMutations(["SET_CLASS_ID", "SET_PERIOD_ID", "SET_CLASSES", "SET_ADVISER_AUTHORITY"]),
    handleAddClass() {
      this.$message.error("new todo");
    },
    handleSelClass(item) {
      if (this.classId != item.id) {
        this.SET_CLASS_ID(item.id);
      }
    },
    handleSeeStudent() {
      this.$message.error("学员 todo");
    },
    handleSelPeriod(item) {
      if (this.periodId != item.id) {
        this.SET_PERIOD_ID(item.id);
      }
    },
    handleSeeDetail() {
      this.$message.error("todo");
    },

    handleAdviserSelClass(id) {
      if (this.classId != id) {
        this.SET_CLASS_ID(id);
      }
    }
  },
  computed: {
    ...mapState(["classId", "periodId", "adviserAuthority"])
  },
  props: {
    type: Number,
    default: 1
  },
  watch: {
    classId: {
      handler: function() {
        this.selClassId = this.classId;
        //获取advise权限 会出现获取两次的情况(02-23)
        if (this.classId > 0) {
          clsadviser({ clsid: this.classId }).then(res => {
            this.SET_ADVISER_AUTHORITY(res.authority);
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tc-side-content {
  background-color: #fff;
  .head {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #e6e6e6;
    padding: 0 20px;
    font-weight: bold;
  }
  .text {
    // height: 60px;
    border-bottom: solid 1px #e6e6e6;
    padding: 0 20px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &.active {
      background-color: #f2f2f2;
      color: lightgreen;
    }
  }
}
</style>


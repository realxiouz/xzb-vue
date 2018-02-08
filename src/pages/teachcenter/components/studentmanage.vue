<template>
  <div>
    <div class="pre">
      <span class="num">预报名
        <span>85</span>人</span>
      <el-button @click="handleSeePre">查看</el-button>
    </div>
    <div class="sel">
      <el-select v-model="selPeriod" placeholder="请选择阶段">
        <el-option v-for="item in period" :key="item.id" :label="item.title" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="students">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select v-model="type" slot="prepend" placeholder="请选择">
            <el-option label="昵称" value="nickname"></el-option>
            <el-option label="电话" value="phone"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <div class="stus">
        <el-table ref="multipleTable" :data="students" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="头像" width="60">
            <template slot-scope="scope"><img :src="scope.row.avatar" alt="" class="avatar"></template>
          </el-table-column>
          <el-table-column label="昵称" width="150">
            <template slot-scope="scope">
              <span class="nickname">{{scope.row.nickname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="add_time" label="时间" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="change-class">
          <span>更换班级至</span>
          <el-select v-model="selClass" placeholder="请选择班级">
            <el-option v-for="item in classes" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleChangeClass" :disabled="selStus.length == 0 || selClass == ''">确定</el-button>
        </div>
        <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent">
        </el-pagination>
      </div>
    </div>
    <div class="trans">
      <div class="title">
        转班
        <span>{{tranStudents.length}}</span>人
      </div>
      <ul>
        <li v-for="item in tranStudents" :key='item.id'>
          <div class="imgwrapper">
            <img :src="item.avatar" alt="">
            <span>
              <icon-svg :iconClass="item.class_id == classId ? 'arrow-down-left' : 'arrow-up-right'"></icon-svg>
            </span>
          </div>
          <div class="name">{{item.nickname}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  classstudent,
  transedtudent,
  periods,
  transclasses,
  changeclass
} from "@/api/service";
export default {
  computed: {
    ...mapState(["classId"]),
    transedBean() {
      return { lenid: this.selPeriod, clsid: this.classId };
    },
    studentBean() {
      return {
        clsid: this.classId,
        lnid: this.selPeriod,
        page: this.page,
        keywords: this.keywords,
        ktype: this.ktype
      };
    },
    transClassBean() {
      return {
        clsid: this.classId,
        lnid: this.selPeriod,
        id: this.$route.params.id
      };
    }
  },
  watch: {
    transedBean: {
      handler: function(val) {
        if (val.lenid > 0) {
          transedtudent(val).then(res => {
            this.tranStudents = res.members;
          });
        }
      }
    },
    studentBean: {
      handler: function(val) {
        if (val.lnid > 0) {
          classstudent(val).then(res => {
            this.students = res.members;
            this.totalCount = +res.count;
          });
        }
      }
    },
    transClassBean(val) {
      if (val.lnid > 0) {
        transclasses(val).then(res => {
          this.classes = res.classes;
        });
      }
    },
    search(val) {
      if (val == "") {
        this.keywords = "";
      }
    }
  },
  data() {
    return {
      type: "",
      search: "",

      period: [],
      selPeriod: "",
      page: 1,
      keywords: "",
      ktype: "",

      students: [],
      selStus: [],
      classes: [],
      selClass: "",
      tranStudents: [],
      totalCount: 0
    };
  },
  methods: {
    handleSeePre() {
      this.$message.success("todo");
    },
    handleSearch() {
      (this.ktype = this.type), (this.keywords = this.search);
    },
    handleSelectionChange(val) {
      this.selStus = [];
      for (const item of val) {
        this.selStus.push(item.member_id);
      }
    },
    handleChangeCurrent(val) {
      this.page = val;
    },
    handleChangeClass() {
      let p = {
        learning_periods_id: this.selPeriod,
        service_id: this.$route.params.id,
        from_class_id: this.classId,
        to_class_id: this.selClass,
        members: this.selStus
      };
      changeclass(p).then(res => {
        this.$message.success("转班成功");
        // this.$root.reload();
        this.selClass = "";
        classstudent(this.studentBean).then(res => {
          this.students = res.members;
          this.totalCount = +res.count;
        });


        transedtudent(this.transedBean).then(res => {
          this.tranStudents = res.members;
        });
      });
    }
  },
  mounted() {
    let p = { id: this.$route.params.id };
    periods(p).then(res => {
      this.period = res.periods;
      this.selPeriod = this.period[0].id;
    });
  }
};
</script>

<style lang="scss" scoped>
.stus {
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .nickname {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.trans {
  .title {
    font-weight: bold;
    > span {
      color: yellow;
    }
  }
  ul {
    display: flex;
    li {
      width: 90px;
      margin: 0 10px;
      .imgwrapper {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        position: relative;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        > span {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .name {
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
        text-align: center;
      }
    }
  }
}
</style>



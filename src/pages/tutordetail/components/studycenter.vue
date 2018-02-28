<template>
  <div class="study-center">
    <div class="sel-pre" v-if="type == 5">
      <div style="background-color: #fff;padding: 10px 20px;">
        <el-select v-model="perId" placeholder="请选择阶段" @change="handleSelPre">
          <el-option v-for="item in periods" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
        <span>该阶段共有<span class="font-green">{{period.num}}</span>次课</span>
      </div>
      <div class="title">
        <span>阶段目标</span>
        <div class="no-data" v-html="period.target"></div>
      </div>
    </div>
    <div class="programs">
      <div>
        <span>教学方案</span>
        <div v-if="programs.length == 0" class="no-data">还没有发布教学方案</div>
      </div>
      <ul>
        <li v-for=" item in programs" :key="item.id">
          <div class="info">
            <div class="img-name">
              <img :src="item.avatar" alt="">
              <span>{{item.title}}</span>
            </div>
            <div class="time">
              {{item.add_time}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="plans">
      <div class="title">
        <span>上课计划</span>
        <div v-if="plans.length == 0" class="no-data">还没有发布上课计划</div>
      </div>
      <div class="choose-type" v-if="type == 5">
        <ul>
          <li>
            <span :class="{active : mtype == 0}" @click="mtype=0">全部</span>
          </li>
          <li>
            <span :class="{active : mtype == 1}" @click="mtype=1">发布者</span>
          </li>
          <li>
            <span :class="{active : mtype == 2}" @click="mtype=2">班主任</span>
          </li>
          <li>
            <span :class="{active : mtype == 3}" @click="mtype=3">公开课</span>
          </li>
        </ul>
      </div>
      <div class="choose-sort" v-if="plans.length > 0">
        <div class="time">
          <span :class="{active : true}" @click="handleTimeSort">日期
            <i :class="timeSort== 0 ? 'el-icon-arrow-down': 'el-icon-arrow-up'"></i>
          </span>
        </div>
      </div>
      <plan-item v-for="item in plans" :key="item.open_class_id" :bean="item" @doPre="handlePre" @doJob="handleJob"></plan-item>
      <div class="page" v-if="plans.length > 0">
        <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { studyperiods, studycentre } from "@/api/service";
import PlanItem from "./planitem";
export default {
  data() {
    return {
      programs: [], //教学方案
      plans: [], //教学计划
      periods: [], // 阶段
      period:{}, //选择的阶段
      perId:0,

      sort: "datedown", //排序规则
      timeSort: 0,
      mtype: 0, //高端班分类
      page: 1, //当前选择页数
      totalCount: 0, //全部方案数量
      target:'',
    };
  },
  props: {
    type: {
      //类型: 3:1对1 4:小班 5:高端班
      type: Number,
      default: 5
    }
  },
  computed: {
    studyParam() {
      return this.type == 5
        ? {
            id: this.$route.params.id,
            page: this.page,
            sort: this.sort,
            mtype: this.mtype,
            lenid: this.perId
          }
        : {
            id: this.$route.params.id,
            page: this.page,
            sort: this.sort
          };
    }
  },
  watch: {
    studyParam: {
      handler: function(val) {
        if (this.type == 5 && val.lenid > 0) {
          this.getStudyData();
        } else if (this.type == 3 || this.type == 4) {
          this.getStudyData();
        }
      },
      immediate: true
    }
  },
  methods: {
    //获取学习中心数据:programs plans
    getStudyData() {
      studycentre(this.studyParam).then(res => {
        this.plans = res.plans;
        this.programs = res.programs;
        this.totalCount = +res.count;
      });
    },
    //获取高端班学习阶段
    getPeriods() {
      studyperiods({ id: this.$route.params.id }).then(res => {
        this.periods = res;
        //初始化阶段信息
        this.period = this.periods[0];
        this.perId = this.periods[0].id;
      });
    },
    //按照时间排序
    handleTimeSort() {
      this.timeSort = !this.timeSort;
      if (this.timeSort) {
        this.sort = "dateup";
      } else {
        this.sort = "datedown";
      }
    },
    //预习
    handlePre(item) {
      this.$message.error("预习todo");
    },
    //预习
    handleJob(item) {
      this.$message.error("作业todo");
    },
    handleChangeCurrent(page) {
      this.page = page;
    },
    handleSelPre(val){
      this.period = this.periods.filter( function(item){
        return item.id == val;
      })[0];
    }
  },
  mounted() {
    if (this.type == 5) {
      this.getPeriods();
    }
  },
  components: {
    PlanItem
  }
};
</script>

<style lang="scss" scoped>
@import ".@/../style/element-variables";
.study-center {
  .programs {
    padding: 20px;
    background-color: #fff;
    ul {
      > li {
        border: 1px solid #ededed;
        background-color: #f8f8f8;
        margin-top: 10px;
        padding: 10px 20px;
        .info {
          display: flex;
          align-items: center;
          .img-name {
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .time {
            margin: 0 30px;
            flex: 1;
          }
        }
      }
    }
  }
  .choose-type{
    ul {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      li {
        padding: 20px;
        font-size: 0.8rem;
        > span {
          cursor: pointer;
          padding: 5px;
          &.active {
            background-color: $--color-primary;
            color: #fff;
          }
        }
      }
    }
  }
  .choose-sort {
    display: flex;
    background-color: #fff;
    font-size: 0.8rem;
    .time {
      padding: 20px;
      > span {
        cursor: pointer;
        padding: 5px;
        &.active {
          background-color: $--color-primary;
          color: #fff;
        }
      }
    }
  }

  .title {
    padding: 20px;
    background-color: #fff;
    margin: 10px 0;
  }

  .no-data {
    font-size: 0.8rem;
    margin: 8px 0;
    color: grey;
  }
}
</style>



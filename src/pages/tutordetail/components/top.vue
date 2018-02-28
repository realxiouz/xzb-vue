<template>
  <div class="wrapper">
    <div class="content">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="img">
            <img :src="bean.image" alt="直播封面" class="bg" :onerror="errorImg" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="info">
            <div class="title">
              {{bean.description}}
            </div>
            <el-row>
              <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <div class="types">
                  {{bean.types ? bean.types.join('-') : ''}}
                </div>
                <div class="time">
                  <icon-svg iconClass="time"></icon-svg>&nbsp;&nbsp;{{bean.add_time}}</div>
                <div class="teacher">
                  <icon-svg iconClass="login"></icon-svg>&nbsp;&nbsp;{{bean.teacher}}
                  <div class="price1">{{`￥:${bean.cost}`}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                <share :likeNum="bean.praise_num" :collectNum="bean.collect_num"></share>
              </el-col>
            </el-row>
            <div class="action">
              <div class="btns">
                <btns :bean="bean"></btns>
              </div>
              <div class="price">{{`￥:${bean.cost}`}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="promises">
        <ul>
          <li>
            <span>教学承诺:</span>
          </li>
          <li>
            <icon-svg iconClass="home" class="color-primary"></icon-svg>
            <span>高质量教学</span>
          </li>
          <li>
            <icon-svg iconClass="postcart" class="color-primary"></icon-svg>
            <span>拟定学习规划</span>
          </li>
          <li v-if="promises.indexOf('1') > 0">
            <icon-svg iconClass="push" class="color-primary"></icon-svg>
            <span>拟定授课计划和作业</span>
          </li>
          <li v-if="promises.indexOf('2') > 0">
            <icon-svg iconClass="answer" class="color-primary"></icon-svg>
            <span>提问必答</span>
          </li>
          <li v-if="promises.indexOf('3') > 0">
            <icon-svg iconClass="books" class="color-primary"></icon-svg>
            <span>指导论文</span>
          </li>
          <li v-if="promises.indexOf('4') > 0">
            <icon-svg iconClass="telephone" class="color-primary"></icon-svg>
            <span>联系导师</span>
          </li>
          <li v-if="promises.indexOf('5') > 0">
            <icon-svg iconClass="login" class="color-primary"></icon-svg>
            <span>{{bean.other_promise}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { tutortop } from "@/api/service";
import Btns from "./btns";
import Share from "@/pages/livevideodetail/components/share";

import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      bean: {},
      errorImg: 'this.src="' + require("../../../assets/default.png") + '"',
      promises:[]
    };
  },
  props: {
    lvId: {
      type: String,
      required: true
    }
  },
  mounted() {
    let p = { id: this.lvId };
    tutortop(p).then(res => {
      this.bean = res.service;
      this.promises = res.service.promises.split(',');
      this.SET_TUTOR_TYPE(res.service.type2);
    });
  },
  components: {
    Btns,
    Share
  },
  methods:{
    ...mapMutations(["SET_TUTOR_TYPE"]),
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/element-variables";
.wrapper {
  min-height: 400px;
  margin-top: 20px;
  padding-top: 40px;
  background-image: url(../../.././assets/bg_ds.jpg);
  .content {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px;
    .img {
      height: 230px;
      position: relative;
      border: 1px solid grey;
      // padding: 1px;
      overflow: hidden;
      &:hover .bg {
        transform: scale(1.05);
      }
      .bg {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }
      .play {
        position: absolute;
        left: 50%;
        margin-left: -30px;
        top: 50%;
        margin-top: -30px;
        cursor: pointer;
      }
    }
    .info {
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 1;
      }
      .types {
        height: 48px;
        font-size: 14px;
        color: #999;
      }
      .time,
      .teacher {
        color: #ff7101;
        font-size: 16px;
        margin-bottom: 10px;
        .price1 {
          display: none;
        }
      }

      .action {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .price {
          color: #ff7101;
          font-size: 30px;
          line-height: 1;
        }
      }
    }
  }
  .promises {
    margin-top:15px;
    ul {
      display: flex;
      color: #999;
      li{
        margin-right:15px;
        span{
          font-size: .9rem;
        }
        .color-primary{
          color:$--color-primary;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .wrapper {
    padding: 10px;
    .content {
      padding: 0px;
      overflow-x: hidden;
      background-color: transparent;
      .img {
        margin-bottom: 10px;
        background-color: #fff;
      }
      .info {
        background-color: #fff;
        padding: 10px;
        .teacher {
          .price1 {
            display: block;
            float: right;
          }
        }
        .action {
          .price {
            display: none;
          }
        }
      }
    }
  }
}
</style>



<template>
  <div class="sidepanel">
    <div class="head">
      {{title}}
    </div>
    <div class="body">
      <div class="publisher" v-if="panelType === 1">
        <div class="user">
          <div class="img" @click="$router.push({ name:'OtherCenter', params:{id : publishBean.id}})">
            <img :src="publishBean.avatar" alt="publisheravatar">
          </div>
          <div class="info">
            <div class="nickname">{{publishBean.nickname}}</div>
            <div class="count">
              <div class="follow">关注:&nbsp;{{publishBean.follow_num}}</div>
              <div class="divider">|</div>
              <div class="fun">粉丝:&nbsp;{{publishBean.fans_num}}</div>
            </div>
          </div>
        </div>
        <div class="action" v-if="!publishBean.is_me">
          <div class="tofollow" @click="handleFollow">{{publishBean.is_follow? "取消关注":"关注"}}</div>
          <a class="chat" target="_blank" :href="`/home_im_index_uid_${publishBean.id}.html`">私聊</a>
        </div>
      </div>
      <div class="teacher" v-if="panelType === 2" v-for="item in teachersBean" :key="item.id">
        <div class="user">
          <div class="img">
            <img :src="item.avatar" alt="">
          </div>
          <div class="info">
            <div class="nickname">{{item.nickname}}</div>
            <div class="sign">{{item.friend_description ? item.friend_description : "Ta还没有签名呢"}}</div>
          </div>
        </div>
        <div class="description">
          {{item.identify_description ? item.identify_description : "该讲师暂无简介"}}
        </div>
        <div class="action">
          <el-button @click="$router.push({ name:'OtherCenter', params:{id : item.id}})">老师主页>></el-button>
        </div>
      </div>
      <div class="students" v-if="panelType === 3">
        <div class="all">
          <div v-for="stu in studentsBean" :key="stu.id" class="stu" v-if="studentsBean.length > 0">
            <div class="img" @click="$router.push({ name:'OtherCenter', params:{id : stu.id}})">
              <img :src="stu.avatar" alt="avatar">
            </div>
            <div class="nickname">{{stu.nickname}}</div>
          </div>
          <div class="nostu" v-if="studentsBean.length == 0">
            暂无学生加入该课程
          </div>
        </div>
        <div class="action">
          <el-button>更多>></el-button>
        </div>
      </div>
      <div class="advs" v-if="panelType === 5">
        <div class="user" v-for="item in advsBean" :key="item.id">
          <div class="img">
            <img :src="item.avatar" alt="">
          </div>
          <div class="info">
            <div class="nickname">{{item.nickname}}</div>
            <div class="sign">{{item.friend_description ? item.friend_description : "Ta还没有签名呢"}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  tutorseller,
  tutorteachers,
  tutoradvs,
  tutorstus,
  tutorcols //班级群
} from "@/api/service";
export default {
  data() {
    return {
      publishBean: {},
      teachersBean: [],
      studentsBean: [],
      advsBean: [],
      colsBean: []
    };
  },
  props: {
    title: {
      type: String,
      default: "发布者"
    },
    panelType: {
      type: Number,
      default: 1 //1:发布者 2:主讲者 3:最新学员 4:班级群 5:班主任
    },
    beanId: {
      type: String,
      required: true
    }
  },
  mounted() {
    let p = {
      id: this.beanId
    };
    if (this.panelType == 1) {
      tutorseller(p).then(res => {
        this.publishBean = res;
      });
    }
    if (this.panelType == 2) {
      tutorteachers(p).then(res => {
        this.teachersBean = res;
      });
    }
    if (this.panelType == 3) {
      tutorstus(p).then(res => {
        this.studentsBean = res;
      });
    }
    if (this.panelType == 4) {
      // tutorcols(p).then(res => {
      //   this.colsBean = res;
      // });
    }
    if (this.panelType == 5) {
      tutoradvs(p).then(res => {
        this.advsBean = res;
      });
    }
  },
  methods: {
    handleFollow() {
      let p = {
        id: this.publishBean.id
      };
      actionfollow(p).then(res => {
        if (res.is_follow) {
          this.publishBean.is_follow = 1;
        } else {
          this.publishBean.is_follow = 0;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sidepanel {
  background-color: #fff;
  margin-bottom: 20px;
  .head {
    border-bottom: 1px solid #ededed;
    padding: 10px 20px;
    font-size: 18px;
  }
  .body {
    padding: 10px 20px 10px;
    .publisher {
      .user {
        display: flex;
        margin: 15px 0;
        .img {
          width: 60px;
          height: 60px;
          cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #ededed;
            padding: 2px;
          }
        }
        .info {
          margin-left: 10px;
          flex: 1;
          .nickname {
            font-weight: bold;
            margin-bottom: 10px;
          }
          .divider {
            margin: 0 20px;
            text-align: center;
            line-height: 1.2;
          }
          .count {
            display: flex;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .action {
        display: flex;
        padding: 10px 20px;
        justify-content: space-around;
        border-top: 1px solid #ededed;
        .tofollow {
          cursor: pointer;
        }
        .chat {
          color: #000;
          text-decoration: none;
        }
      }
    }
    .advs,
    .teacher {
      .user {
        display: flex;
        margin: 15px 0;
        .img {
          width: 60px;
          height: 60px;
          // cursor: pointer;
          > img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid #ededed;
            padding: 2px;
          }
        }
        .info {
          margin-left: 10px;
          flex: 1;
          .nickname {
            font-weight: bold;
            margin-bottom: 10px;
          }
          .sign {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .description {
        font-size: 12px;
        color: #999;
        border-top: 1px solid #ededed;
        padding: 15px 0;
        max-height: 82px;
        overflow: hidden;
      }
      .action {
        display: flex;
        padding: 10px 20px;
        justify-content: space-around;
        border-top: 1px solid #ededed;
      }
    }
    .students {
      .all {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .stu {
          margin-bottom: 15px;
          .img {
            width: 50px;
            height: 50px;
            cursor: pointer;
            > img {
              width: 100%;
              height: 100%;
              // border-radius: 50%;
              border: 1px solid #ededed;
              padding: 2px;
            }
          }
          .nickname {
            margin-top: 5px;
            width: 50px;
            overflow: hidden;
            font-size: 12px;
            color: #999;
            text-align: center;
            text-overflow: ellipsis;
          }
        }
        .nostu {
          padding: 15px 0;
          font-size: 12px;
          color: #999;
        }
      }
      .action {
        display: flex;
        padding: 10px 20px;
        justify-content: space-around;
        border-top: 1px solid #ededed;
      }
    }
  }
}
</style>

<template>
    <div class="sidePanel">
        <div class="head" v-if="title">
            <div class="title">{{title}}</div>
        </div>
        <div class="body">
            <div class="memberinfo" v-if="type === 1">
                <ul class="row-info">
                    <li>
                        <div class="number">{{beanInfo.follow_num}}</div>
                        <div class="text">关注</div>
                    </li>
                    <li>
                        <div class="number">{{beanInfo.fans_num}}</div>
                        <div class="text">粉丝</div>
                    </li>
                    <li>
                        <div class="number">{{beanInfo.group_num}}</div>
                        <div class="text">群聊</div>
                    </li>
                    <li>
                        <div class="number">{{beanInfo.friend_num}}</div>
                        <div class="text">好友</div>
                    </li>
                </ul>
                <div class="row-city">{{beanInfo.city ? beanInfo.city : '暂无归属地信息'}}</div>
                <div class="row-school">{{beanInfo.school ? beanInfo.school : '暂无学校信息'}}</div>
                <div class="row-des">{{beanInfo.description ? beanInfo.description : '暂无介绍'}}</div>
            </div>
        </div>
        <div class="foot">
            <el-button type="text">查看更多&gt;&gt;</el-button>
        </div>
    </div>
</template>

<script>
import { memberinfo } from "@/api/othercenter";
export default {
  props: {
    title: {
      type: String
    },
    type: {
      type: Number
    }
  },
  mounted() {
    if (this.type === 1) {
      let p = { id: this.$parent.$route.params.id };
      memberinfo(p).then(res => {
        console.log(res);
        this.beanInfo = res;
      });
    }
  },
  data() {
    return {
      beanInfo: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.sidePanel {
  background-color: #fff;
  margin-bottom: 20px;
  .head {
    padding: 20px;
    border-bottom: 1px solid #ccc;
  }
  .body {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .memberinfo {
      .row-info {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          .text {
            margin-top: 10px;
          }
        }
        li + li {
          border-left: 1px dashed #ccc;
        }
      }
      .row-city,
      .row-school,
      .row-des {
        margin-top: 10px;
        font-size: 0.8rem;
        color: #ccc;
      }
    }
  }
  .foot {
    text-align: center;
  }
}
</style>



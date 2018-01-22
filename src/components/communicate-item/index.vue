<template>
    <div class="wrapper">
        <div class="row1">
            <div class="head">
                <div class="img">
                    <img :src="bindItem.avatar" alt="avatar">
                </div>
                <div class="nameAndCircle">
                    <div class="name">{{bindItem.nickname}}</div>
                    <div class="circle">
                        <span>{{bindItem.circle_name}}</span>
                        <span>{{bindItem.add_time.substring(0,10)}}</span>
                    </div>
                </div>
                <div class="act">
                    <div class="money"></div>
                    <!-- <el-select placeholder="请选择" size="tiny" value="1">
                        <el-option label="删除" value="1">
                        </el-option>
                    </el-select> -->
                </div>
            </div>
            <div class="body">{{bindItem.content}}</div>
        </div>
        <div class="row2" v-if="bindItem.answer">
            <div class="head">
                <div class="img">
                    <img :src="bindItem.answer.avatar" alt="avatar">
                </div>
                <div class="nameAndAnswer">
                    <div class="name">{{bindItem.answer.nickname}}</div>
                    <div class="answer">已回答</div>
                </div>
            </div>
            <div class="body">已有
                <span>{{bindItem.answerCount}}</span>人回答
            </div>
            <div class="act">
                <el-button type="primary" size="small">看答案</el-button>
            </div>
        </div>
        <div class="row2" v-if="!bindItem.answer && bindItem.invite">
            <div class="head">
                <div class="img">
                    <img :src="bindItem.invite.avatar" alt="avatar">
                </div>
                <div class="nameAndAnswer">
                    <div class="name">{{bindItem.invite.nickname}}</div>
                    <div class="answer">待回答</div>
                </div>
            </div>
            <!-- <div class="body">已有
                <span>{{bindItem.answerCount}}</span>人回答
            </div> -->
            <div class="act">
                <el-button type="primary" size="small" plain>邀请回答</el-button><el-button type="primary" size="small">参与回答</el-button>
            </div>
        </div>
        <div class="row3" style="float:right">
            <el-button type="primary" size="small" plain>{{`评论: ${bindItem.answerCount}`}}</el-button>
            <el-button type="primary" size="small" plain>{{`转发: ${bindItem.answerCount}`}}</el-button>
            <el-button type="primary" size="small" plain>{{`赞: ${bindItem.answerCount}`}}</el-button>
        </div>
        <div style="clear:both"></div>
    </div>
</template>

<script>
export default {
  props: {
    bindItem: {
      type: Object
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/.././style/element-variables";
.wrapper {
  padding: 20px 30px;
  margin: 20px 0 0px 0;
  .row1 {
    margin-bottom: 30px;
    .head {
      display: flex;
      margin-bottom: 15px;

      .nameAndCircle {
        .circle {
          font-size: 0.8rem;
          color: #c1c1c1;
        }
      }
    }
    .body {
      padding: 0 0 0 48px;
      font-size: 0.9rem;
    }
  }

  .row2 {
    margin-bottom: 20px;
    .head {
      display: flex;
      margin-bottom: 20px;
      .nameAndAnswer {
        .answer {
          font-size: 0.8rem;
          color: $--color-primary;
        }
      }
    }
    .body {
      padding: 0 0 0 48px;
      font-size: 0.9rem;
      margin-bottom: 20px;
      > span {
        color: red;
      }
    }
    .act{
        padding: 0 0 0 48px;
    }
  }
}

.img {
  img {
    width: 40px;
    height: 40px;
    border: 1px solid grey;
    padding: 1px;
    margin-right: 8px;
  }
}

.name {
  font-weight: bold;
}
@media (max-width: 450px) {
  .wrapper {
    padding: 20px 6px;
  }
}
</style>


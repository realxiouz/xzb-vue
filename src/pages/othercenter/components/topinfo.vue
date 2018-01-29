<template>

    <div class="top-info">
        <div class="content">
            <div class="avatar">
                <img :src="bean.avatar" alt="">
            </div>
            <div class="name-follow">
                <div class="name">{{bean.nickname}}</div>
                <div class="follow">
                    <el-button type="text" @click="handleFollow">{{bean.is_follow ? '已关注': '+关注'}}</el-button>
                </div>
            </div>
            <div class="othername">备注名</div>
            <div class="circlehost">{{bean.sign ? bean.sign : 'Ta还没有签名呢'}}</div>
            <div class="action">
                <el-button type="primary" round @click="handleChat">微聊</el-button>
                <el-button type="primary" round @click="handleAsk">提问</el-button>
                <el-button type="primary" round @click="handleLesson">约课</el-button>
                <el-button type="primary" round @click="handleFindSth">委托找人</el-button>
                <el-dropdown trigger="click">
                    <el-button type="text" class="setting">
                        <i class="el-icon-setting"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><el-button type="text" @click="handleDel">在通讯录中删除</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="text" @click="handleSetTag">设置备注和标签</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="text" @click="handleRecommend">把Ta推荐给朋友</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="text" @click="handleNoSay">不再接受Ta的悄悄话</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="text" @click="handleNoSeeShuo">不看Ta的说说</el-button></el-dropdown-item>
                        <el-dropdown-item><el-button type="text" @click="handleNoSeeMyShuo">不让Ta看我的说说</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </div>
    </div>

</template>

<script>
import { userinfo } from '@/api/othercenter';
export default {
  methods: {
    handleFollow() {
      this.$message.error("follow to do");
    },
    handleChat() {
      this.$message.error("chat to do");
    },
    handleAsk() {
      this.$message.error("ask to do");
    },
    handleLesson() {
      this.$message.error("lesson to do");
    },
    handleFindSth() {
      this.$message.error("find someone  to do");
    },
    handleDel(){
      this.$message.error("del to do");        
    },
    handleSetTag(){
      this.$message.error("set tag to do");        
    },
    handleRecommend(){
      this.$message.error("recommend to do");        
    },
    handleNoSay(){
      this.$message.error("no say to do");        
    },
    handleNoSeeShuo(){
      this.$message.error("no see shuo to do");        
    },
    handleNoSeeMyShuo(){
      this.$message.error("no see my shuo to do");        
    },
  },
  mounted(){
      let p = { id : this.$parent.$route.params.id};
      userinfo(p).then( res => {
          this.bean = res;
      })
  },
  data(){
      return {
          bean: {}
      }
  }
};
</script>

<style lang="scss" scoped>
.top-info {
  background-image: url(../../../assets/ucinfo.png);
  height: 300px;
  .content {
    max-width: 1200px;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    padding: 20px 0 0 0;
    .avatar {
      width: 120px;
      height: 120px;
      margin: 0px auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name-follow {
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        margin-right: 20px;
      }
    }
    .othername,
    .circlehost{
        font-size: .8rem;
        margin-bottom: 10px;
    }
    .action {
      .setting {
        color: #fff;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

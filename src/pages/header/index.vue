<template>
    <div id="header">
        <div class="content">
            <div class="logo"><a href=""><img src="../../assets/logo.png" alt="logo"></a></div>
            <div class="nav">
                <el-menu mode="horizontal" active-text-color="#13BC98">
                    <el-menu-item index="1">校友圈</el-menu-item>
                    <el-menu-item index="5">专业圈</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">服务</template>
                        <el-menu-item index="2-1">资料</el-menu-item>
                        <el-menu-item index="2-2">辅导</el-menu-item>
                        <el-menu-item index="2-3">直播</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">需求</template>
                        <el-menu-item index="6-1">资料</el-menu-item>
                        <el-menu-item index="6-2">辅导</el-menu-item>
                        <el-menu-item index="6-3">找人</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3"><a href="" target="_blank">资讯</a></el-menu-item>
                    <el-menu-item index="7"><a href="" target="_blank">奖品</a></el-menu-item>
                </el-menu>
            </div>
            <div class="login">
                <div class="btns" v-if="token === ''">
                    <el-button type="text" @click="choose_login(1);">登录</el-button>
                    <el-button type="text" @click="choose_login(2)">注册</el-button>
                </div>
                <div class="userInfor" v-else>
                    <ul class="icons">
                        <li><icon-svg iconClass="lock"></icon-svg></li>
                        <li><el-badge :value="12" class="item"><icon-svg iconClass="msg"></icon-svg></el-badge></li>
                        <li><icon-svg iconClass="shopping"></icon-svg></li>
                    </ul>
                    <div>
                        <img :src="avatar" alt="avatar">
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["avatar", "nickname", "token", "isLogin"])
  },
  methods: {
    ...mapMutations(["choose_login"])
  }
};
</script>


<style lang="scss" scoped>
@import "../../../style/element-variables";
#header {
  .content {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    .nav {
      flex-grow: 1;
    }
    .login {
      //   margin-top: 10px;
      margin: 10px 10px 0 0;
      .userInfor {
        .icons {
          display: inline-block;

          text-align: center;
          list-style: none;
          margin: 0;
          padding: 0px;
          li {
            color: #fff;
            background-color: $--color-primary;
            display: inline-block;
            cursor: pointer;
            margin-right: 10px;
            padding: 5px;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 25px;
            text-align: center;
          }
        }
        >div{
            // display: inline-block;
            float: right;
            img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                padding: 2px;
                border: 1px solid #ccc;
            }
        }
      }
    }
  }
}
</style>


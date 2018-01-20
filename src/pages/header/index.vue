<template>
    <div id="header">
        <!-- <div class="content">
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
        </div> -->
        <b-navbar toggleable="md" type="light" variant="light" class="content">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#"><img src="../../assets/logo.png" alt="logo"></b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">校友圈</b-nav-item>
                    <b-nav-item href="#">专业圈</b-nav-item>
                    <b-nav-item-dropdown text="服务" right>
                        <b-dropdown-item href="#">资料</b-dropdown-item>
                        <b-dropdown-item href="#">辅导</b-dropdown-item>
                        <b-dropdown-item href="#">直播</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="需求" right>
                        <b-dropdown-item href="#">资料</b-dropdown-item>
                        <b-dropdown-item href="#">辅导</b-dropdown-item>
                        <b-dropdown-item href="#">找人</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <template v-if="!login">
                        <b-nav-item href="#" @click="handleLogin">登录</b-nav-item>
                        <b-nav-item href="#" @click="handleReg">注册</b-nav-item>
                    </template>
                    <template v-else>
                        <b-nav-item href="#" title="管理圈子">
                            <div class="navIcons">
                                <icon-svg iconClass="lock"></icon-svg>
                            </div>
                        </b-nav-item>
                        <b-nav-item href="#">
                            <div class="navIcons">
                                <el-badge :value="msgCount" class="item" :max="100" :hidden="msgCount == 0">
                                    <icon-svg iconClass="msg"></icon-svg>
                                </el-badge>
                            </div>

                        </b-nav-item>
                        <b-nav-item href="#">
                            <div class="navIcons">
                                <el-badge :value="cartCount" class="item" :max="100" :hidden="cartCount == 0">
                                    <icon-svg iconClass="shopping"></icon-svg>
                                </el-badge>
                            </div>
                        </b-nav-item>
                        <b-nav-item-dropdown right>
                            <template slot="button-content">
                                <img :src="userInfo.avatar" alt="avatar" class="avatar" />{{userInfo.nickname}}
                            </template>
                            <b-dropdown-item href="#" disabled>
                                <icon-svg iconClass="home"></icon-svg>&nbsp;&nbsp;个人中心</b-dropdown-item>
                            <b-dropdown-item href="#" disabled>
                                <icon-svg iconClass="setting"></icon-svg>&nbsp;&nbsp;基本设置</b-dropdown-item>
                            <b-dropdown-item href="#" disabled>
                                <icon-svg iconClass="dollar"></icon-svg>&nbsp;&nbsp;我的账户</b-dropdown-item>
                            <b-dropdown-item href="#" disabled>
                                <icon-svg iconClass="postcart"></icon-svg>&nbsp;&nbsp;发送名片</b-dropdown-item>
                            <b-dropdown-item href="#" @click="handleLogout">
                                <icon-svg iconClass="logout"></icon-svg>&nbsp;&nbsp;退出登录</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { logout } from "@/api/log";
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["login", "userInfo", "msgCount", "cartCount"])
  },
  methods: {
    ...mapMutations(["OUT_LOGIN", "GET_MSG_COUNT" , "SET_REG_DIALOG", "SET_LOG_DIALOG"]),
    handleLogout() {
      logout().then(res => {
        if (res.data.success) {
          this.OUT_LOGIN();
          this.$message.success("已登出");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleLogin() {
        this.SET_LOG_DIALOG(true);
    },
    handleReg(){
        this.SET_REG_DIALOG(true);
    }
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
        > div {
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

  .bg-info {
    // background-color: #13bc98 !important;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 2px;
    border: 1px solid #ccc;
  }

  .navIcons {
    color: #fff;
    background-color: $--color-primary;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    padding: 5px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    // font-size: 25px;
    text-align: center;
  }

  .dropdown-item:focus,
  .dropdown-item:hover {
    color: $--color-primary;
  }

  .navbar-light .navbar-nav .nav-link:focus,
  .navbar-light .navbar-nav .nav-link:hover {
    color: $--color-primary;
  }
}
</style>


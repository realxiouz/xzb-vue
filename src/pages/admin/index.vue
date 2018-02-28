<template>
    <div class="admin-wrapper">
        <aside>
            <div class="user-infor">
                <div class="img">
                    <img src="../../assets/admin.jpg" alt="">
                </div>
                <div class="name">nickname???</div>
                <div class="act">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link" style="color:#fff">
                            super-admin
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>修改头像</el-dropdown-item>
                            <el-dropdown-item>个人资料</el-dropdown-item>
                            <el-dropdown-item>联系我们</el-dropdown-item>
                            <el-dropdown-item>信箱</el-dropdown-item>
                            <el-dropdown-item divided>安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <sider-bar></sider-bar>
        </aside>
        <div class="content-wrapper">
            <div class="top">
                <ul>
                    <li :class="{active:topType=='service'}" @click="SET_TOP_TYPE('service')">学习服务管理</li>
                    <li :class="{active:topType=='message'}" @click="SET_TOP_TYPE('message')">系统消息管理</li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import SiderBar from "./components/siderbar";

import { adminRoutes } from "@/router/admin";
export default {
  components: { SiderBar },
  data() {
    return {};
  },
  computed: {
    ...mapState(["topType"])
  },
  methods: {
    ...mapMutations(["SET_TOP_TYPE", "SET_TYPE_ROUTES"])
  },
  watch: {
    topType: {
      handler: function(val) {
        if (val != "") {
          this.SET_TYPE_ROUTES(
            adminRoutes.filter(function(item) {
              return item.meta.type && item.meta.type == val;
            })
          );
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/element-variables";
html,
body {
  height: 100%;
}

.admin-wrapper {
  display: flex;
  height: 100%;
  > aside {
    width: 210px;
    height: 100%;
    background-color: #304156;
    .user-infor {
      padding: 30px 0 20px 0;
      width: 210px;
      .img {
        margin: 0 auto;
        width: 64px;
        height: 64px;
        > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name,
      .act {
        text-align: center;
        color: #fff;
        margin: 10px 0;
      }
    }
  }
  .content-wrapper {
    flex: 1;
    .top {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        li {
          padding: 12px 20px;
          font-size: 14px;
          cursor: pointer;
          &.active {
            background-color: $--color-primary;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>


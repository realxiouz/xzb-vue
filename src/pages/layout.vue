<template>
  <div id="app">
    <page-head></page-head>
    <!-- <banner class="hidden-sm-and-down"></banner> -->
    <router-view />
    <page-foot></page-foot>
    <dialogs></dialogs>
  </div>
</template>

<script>
import PageHead from "@/pages/header/index";
import PageFoot from "@/pages/footer";
import Banner from "@/pages/bannerbar";
import Dialogs from "@/pages/dialogs";

import { userinfo, unreadmsg, shoppingCart } from "@/api/log";
import { mapMutations, mapState } from "vuex";
//text api
import { getlivevideo } from "@/api/livevideo";
export default {
  name: "app",
  components: {
    PageHead,
    PageFoot,
    Banner,
    Dialogs
  },
  mounted() {
    if (sessionStorage.getItem("token") && !this.login) {
      let p = {
        token: sessionStorage.getItem("token")
      };
      userinfo(p).then(res => {
        if (res.data.success) {
          this.RECORD_USERINFO(res.data.data);
          unreadmsg().then(res => {
            if (res.data.success) {
              this.SET_MSG_COUNT(res.data.data.count);
            }
          });
          //读取购物车数量
          shoppingCart().then(res => {
            if (res.data.success) {
              this.SET_CART_COUNT(res.data.data.count);
            }
          });
          //刷新界面
          this.$root.reload();
        }
      });
    }

    let p = { id : 20};
    getlivevideo(p).then( res => {
      console.log(res)
    })
  },
  computed: {
    ...mapState(["login"])
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO", "SET_MSG_COUNT", "SET_CART_COUNT"])
  }
};
</script>

<style lang="scss">
@import "@/../style/element-variables";
@import "element-ui/lib/theme-chalk/display.css";
#app {
  background-color: #f6f6f6;
  label {
    margin-bottom: 0;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
}

a {
  color: #212529;
  text-decoration: none;
  &:hover {
    color: $--color-primary;
  }
}

ul{
  margin: 0;
  padding: 0;
  list-style: none;
}

//他人中心tab去掉margin-bottom 设置padding 0 20px background-color:#fff;
.el-tabs__header {
  margin: 0px;
  .el-tabs__nav-wrap {
    padding: 0 20px;
    background-color: #fff;
  }
}

@media (max-width: 400px) {
  .el-dialog {
    margin-top: 6vh !important;
  }
  .el-message {
    min-width: 280px !important;
  }
}
</style>


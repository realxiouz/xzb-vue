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

export default {
  name: "app",
  components: {
    PageHead,
    PageFoot,
    Banner,
    Dialogs
  },
};
</script>

<style lang="scss">
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

@media (max-width: 400px) {
  .el-dialog {
    margin-top: 6vh !important;
  }
  .el-message {
    min-width: 280px !important;
  }
}
</style>


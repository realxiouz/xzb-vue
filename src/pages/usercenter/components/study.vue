<template>
    <div class="nav-tabs">
        <el-tabs v-model="type">
            <el-tab-pane label="电子版" name="first">电子版todo........................</el-tab-pane>
            <el-tab-pane label="视屏" name="second">视屏todo........................</el-tab-pane>
            <el-tab-pane label="辅导" name="third">辅导todo........................</el-tab-pane>
            <el-tab-pane label="直播" name="livevideo">
                <live-video></live-video>
            </el-tab-pane>
        </el-tabs>
        <!-- <el-menu mode="horizontal" :router="true">
            <el-menu-item index="detail">电子版</el-menu-item>
            <el-menu-item index="books">视屏</el-menu-item>
            <el-menu-item index="post">辅导</el-menu-item>
            <el-menu-item index="livevideo">直播</el-menu-item>
        </el-menu>
        <router-view></router-view> -->
    </div>
</template>

<script>
import LiveVideo from "./studycomponents/livevideo";
export default {
  mounted() {
    this.type = "livevideo";
  },
  data() {
    return {
      type: ""
    };
  },
  components: {
    LiveVideo
  }
};
</script>

<style lang="scss">
.nav-tabs{
    .el-tabs__nav-wrap{
        background-color: #fff !important;
        padding: 10px 20px !important;
    }
}
</style>

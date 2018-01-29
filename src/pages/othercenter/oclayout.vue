<template>
    <div id="occenter">
        <top-info></top-info>
        <nav>
            <el-menu mode="horizontal" :router="true">
                <el-menu-item index="1">分享</el-menu-item>
                <el-menu-item index="2">辅导</el-menu-item>
                <el-menu-item index="livevideo">直播课</el-menu-item>
                <el-menu-item index="4">有偿问答</el-menu-item>
                <el-menu-item index="5">需求</el-menu-item>
                <el-menu-item index="6">找人</el-menu-item>
            </el-menu>
        </nav>
        <div class="content-wrapper">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <router-view></router-view>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="side">
                        <side-panel :type="1"></side-panel>
                        <side-panel title="Ta的关注"></side-panel>
                        <side-panel title="Ta的粉丝"></side-panel>                        
                        <side-panel title="加入的群聊"></side-panel>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import TopInfo from "./components/topinfo";
import SidePanel from "./components/sidepanel";

export default {
  components: {
    TopInfo,
    SidePanel
  }
};
</script>

<style lang="scss" scoped>
#occenter {
  nav {
    max-width: 1200px;
    margin: 0 auto;
  }
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>

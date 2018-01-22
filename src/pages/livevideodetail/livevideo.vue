<template>
    <div>
        <top :lvId="id"></top>
        <div class="content">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="tabs">
                        <el-menu mode="horizontal" :router="true" :default-active="$route.path">
                            <el-menu-item index="detail">详情</el-menu-item>
                            <el-menu-item index="chapter">系列</el-menu-item>
                            <el-menu-item index="books">图书</el-menu-item>
                            <el-menu-item index="post">讨论区</el-menu-item>
                        </el-menu>
                        <router-view></router-view>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="side">
                        <side-panel :lvId="id"></side-panel>
                        <side-panel :lvId="id" :panelType="2" title="主讲老师"></side-panel>
                        <side-panel :lvId="id" :panelType="3" title="最新学员"></side-panel>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import Top from "./components/top";
import SidePanel from "./components/sidepanel";
export default {
  components: {
    Top,
    SidePanel
  },
  data() {
    return {
      id: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.content {
  max-width: 1200px;
  margin: 20px auto;
  overflow-x: hidden; //移动端横向滚动条
  padding: 0;
  .tabs {
    // background-color: #fff;
    // min-height: 800px;
  }
  .side {
    //   background-color: #fff;
    min-height: 800px;
  }
}

@media (max-width: 400px) {
  .content {
    padding: 0 10px;
  }
}
</style>



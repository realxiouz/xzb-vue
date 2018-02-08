<template>
    <div>
        <top :lvId="id"></top>
        <div class="content">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="side">
                        <side-panel :type="sideType"></side-panel>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="tabs">
                        <el-menu mode="horizontal" :router="true" :default-active="currentRoute" style="margin-bottom:10px;">
                            <el-menu-item index="classmanage">班级管理</el-menu-item>
                            <el-menu-item index="studentmanage">学员管理</el-menu-item>
                            <el-menu-item index="plan">上课计划</el-menu-item>
                            <el-menu-item index="chapter">提问交流</el-menu-item>
                        </el-menu>
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import Top from "@/pages/tutordetail/components/top";
import SidePanel from "@/pages/teachcenter/components/sidepanel";
export default {
  components: {
    Top,
    SidePanel
  },
  data() {
    return {
      id: "",
      currentRoute:"",
      sideType:0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.currentRoute = this.$route.path.split("/")[
      this.$route.path.split("/").length - 1
    ];
  },
  watch:{
    "$route.path": function() {
      this.currentRoute = this.$route.path.split("/")[
        this.$route.path.split("/").length - 1
      ];
    },
    currentRoute(val){
        if(val === 'plan'){
            this.sideType = 2;
        } else {
            this.sideType = 1;
        }
    }
  }
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



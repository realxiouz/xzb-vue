<template>
    <div>
        <top :lvId="id"></top>
        <div class="content">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="tabs">
                        <el-menu mode="horizontal" :router="true" :default-active="currentRoute" style="margin-bottom:10px;">
                            <el-menu-item index="detail">详情</el-menu-item>
                            <el-menu-item index="class">班级</el-menu-item>
                            <el-menu-item index="course">课程</el-menu-item>
                            <el-menu-item index="chapter">系列</el-menu-item>
                            <el-menu-item index="books">图书</el-menu-item>
                            <el-menu-item index="question">提问</el-menu-item>
                            <el-menu-item index="evaluate">评价</el-menu-item>
                            <el-menu-item :index="`/teachcenter/${id}`" v-if="role.is_me||role.is_adviser">教学中心</el-menu-item>
                        </el-menu>
                        <router-view></router-view>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="side">
                        <side-panel :beanId="id"></side-panel>
                        <side-panel :beanId="id" :panelType="2" title="主讲老师"></side-panel>
                        <!-- <side-panel :beanId="id" :panelType="3" title="最新学员"></side-panel> -->
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
import Top from "@/pages/tutordetail/components/top";
import SidePanel from "@/pages/tutordetail/components/sidepanel";
import { getrole } from "@/api/service";
export default {
  components: {
    Top,
    SidePanel
  },
  data() {
    return {
      id: "",
      currentRoute:"",
      role:{}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.currentRoute = this.$route.path.split("/")[
      this.$route.path.split("/").length - 1
    ];
  },
  mounted() {
    let p ={id: this.id};
    getrole(p).then( res => {
      // console.log(res)
      this.role = res;
    })
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



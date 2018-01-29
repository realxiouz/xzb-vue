<template>
    <div id="usercenter">
        <top-info></top-info>
        <div class="content">
            <div class="left-nav">
                <el-menu active-text-color="#13BC98" router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>在学</span>
                        </template>
                        <el-menu-item index="/usercenter/studying">学习中心</el-menu-item>
                        <!-- <el-submenu index="1-1">
                            <template slot="title">学习中心</template>
                            <el-menu-item index="/usercenter/studying/first">电子版</el-menu-item>
                            <el-menu-item index="1-1-2">视频</el-menu-item>
                            <el-menu-item index="1-1-3">辅导</el-menu-item>
                            <el-menu-item index="/usercenter/studying/livevideo">直播</el-menu-item>
                        </el-submenu> -->
                        <el-submenu index="1-2">
                            <template slot="title">投标约课</template>
                            <el-menu-item index="1-2-1">我投的标</el-menu-item>
                            <el-menu-item index="1-2-2">我约的课</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                            <template slot="title">我的需求</template>
                            <el-menu-item index="1-3-1">找资料</el-menu-item>
                            <el-menu-item index="1-3-2">找辅导</el-menu-item>
                            <el-menu-item index="1-3-2">找人</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-4">
                            <template slot="title">需求订单</template>
                            <el-menu-item index="1-4-1">资料订单</el-menu-item>
                            <el-menu-item index="1-4-2">辅导订单</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="1-5">目标院校</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>在教</span>
                        </template>
                        <el-menu-item index="/usercenter/teaching">教学中心</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">投标约课</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right">
                <div class="btns">
                    <el-button-group>
                        <el-button type="primary">发需求</el-button>
                        <el-button type="primary">找&nbsp;&nbsp;人</el-button>
                        <el-button type="primary" @click="$router.push('/addservice/livevideo')">发服务</el-button>
                        <el-button type="primary">提&nbsp;&nbsp;问</el-button>
                        <el-button type="primary">头条文章</el-button>
                        <el-button type="primary">说说</el-button>
                    </el-button-group>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import TopInfo from "./components/topinfo";
export default {
  components: {
    TopInfo
  }
};
</script>

<style lang="scss" scoped>
#usercenter {
  .content {
    margin-top: 20px;
    max-width: 1200px;
    margin: 0 auto;
    // height: 800px;
    display: flex;
    .left-nav {
      width: 240px;
      margin-right: 30px;
    }

    .right {
      flex: 1;
      .btns{
          background-color: #fff;
          padding: 10px 0;
          display: flex;
          justify-content: space-around;
          margin-bottom: 0px;
      }
    }
  }
}
</style>



<template>
    <div>
        <top-sel></top-sel>
        <div class="listContent">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="content">
                        <div class="searchGroup">
                            <div class="search">
                                <el-input placeholder="请输入准确的大学名称或学科专业名称">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>
                            <div class="group">
                                <el-button type="primary">发需求</el-button>
                                <el-button type="warning">发服务</el-button>
                            </div>

                        </div>
                        <div class="nav">
                            <el-menu mode="horizontal" :router="true" default-active="livevideo" style="width:100%">
                                <el-menu-item index="detail">电子</el-menu-item>
                                <el-menu-item index="chapter">纸质</el-menu-item>
                                <el-menu-item index="books">视屏</el-menu-item>
                                <el-menu-item index="post">辅导</el-menu-item>
                                <el-menu-item index="livevideo">直播</el-menu-item>
                            </el-menu>
                        </div>
                        <div class="timeAndSearch">
                            <div class="time">
                                <!-- <span >分类:</span> -->
                                <ul>
                                    <li>
                                        <span :class="{active : type == 0}" @click="type=0">未开始</span>
                                    </li>
                                    <li>
                                        <span :class="{active : type == 1}" @click="type=1">已结束</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="searh1">
                                <el-input placeholder="请输入内容" v-model="search1" size="small">
                                    <el-select slot="prepend" placeholder="请选择" v-model="select" :value="1">
                                        <el-option label="搜内容" value="1"></el-option>
                                        <el-option label="搜昵称" value="2"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>

                        </div>
                        <div class="type">
                            <ul>
                                <li>
                                    <span :class="{active : mtype == 0}" @click="mtype=0">全部</span>
                                </li>
                                <li>
                                    <span :class="{active : mtype == 1}" @click="mtype=1">名师</span>
                                </li>
                                <li>
                                    <span :class="{active : mtype == 2}" @click="mtype=2">机构</span>
                                </li>
                                <li>
                                    <span :class="{active : mtype == 3}" @click="mtype=3">其他</span>
                                </li>
                                <li>
                                    <span :class="{active : mtype == 4}" @click="mtype=4">分销</span>
                                </li>
                            </ul>
                        </div>
                        <div class="sort">
                            <span>综合排序</span>
                            <div class="time">日期</div>
                            <div class="price">单价</div>
                        </div>
                        <router-view :lvParams="{type: 1, mtype:2}"></router-view>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <div class="side">
                        <side-panel title="圈主信息" btnText="申请为圈主"></side-panel>
                        <side-panel title="留言新助邦" :type="2"></side-panel>
                        <side-panel title="群" btnText="更多" :type="3"></side-panel>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import TopSel from "./components/top";
import SidePanel from "./components/sidepanel";
export default {
  components: {
    TopSel,
    SidePanel
  },
  data() {
    return {
      select: "",
      search1: "",

      type: 0, // 0:未开始 1:已结束
      mtype: 0 // 0:全部 1:名师 2:机构
    };
  }
};
</script>

<style lang="scss" scoped>
@import ".@/../style/element-variables";
.listContent {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0;
  overflow-x: hidden;
  .content {
    overflow-x: hidden;
    .searchGroup {
      display: flex;
      .search {
        flex: auto;
        margin-right: 20px;
      }
      .group {
        min-width: 280px;
        display: flex;
        > button {
          flex: 1;
        }
      }
    }
    .nav {
      margin-top: 20px;
    }
    .timeAndSearch {
      background-color: #fff;
      display: flex;
      padding: 0px 10px 0px 0;
      justify-content: space-between;
    }
    .time,
    .type {
      ul {
        padding: 0px;
        margin: 0px;
        display: flex;
        list-style: none;
        background-color: #fff;
        li {
          padding: 20px;
          font-size: 0.8rem;
          > span {
            cursor: pointer;
            padding: 5px;
            &.active {
              background-color: $--color-primary;
              color: #fff;
            }
          }
        }
      }
    }
    .sort {
      display: flex;
      background-color: #fff;
    }
  }
}

@media (max-width: 400px) {
  .listContent {
    padding: 0 10px;
  }
}
</style>



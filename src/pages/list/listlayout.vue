<template>
    <div>
        <top-sel></top-sel>
        <div class="listContent">
            <el-row :gutter="40">
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="content">
                        <div class="searchGroup">
                            <div class="search">
                                <el-input placeholder="请输入准确的大学名称或学科专业名称" v-model="search">
                                    <el-select slot="prepend" placeholder="请选择" v-model="sk1">
                                        <el-option label="搜内容" value="0"></el-option>
                                        <el-option label="搜昵称" value="1"></el-option>
                                        <el-option label="搜大学" value="2"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                                </el-input>
                            </div>
                            <div class="group">
                                <el-button type="primary">发需求</el-button>
                                <el-button type="warning" @click="$router.push('/addservice')">发服务</el-button>
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
                            <!-- <div class="searh1">
                                <el-input placeholder="请输入内容" v-model="search1" size="small">
                                    <el-select slot="prepend" placeholder="请选择" v-model="sk">
                                        <el-option label="搜内容" value="0"></el-option>
                                        <el-option label="搜昵称" value="1"></el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div> -->

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
                            <!-- <span style="padding:20px 0 20px 10px">综合排序</span> -->
                            <div class="time">
                                <span :class="{active : chooseTime}" @click="handleTimeSort">日期
                                    <i :class="timeSort== 0? 'el-icon-arrow-down': 'el-icon-arrow-up'"></i>
                                </span>
                            </div>
                            <div class="price">
                                <span :class="{active : !chooseTime}" @click="handlePriceSort">单价
                                    <i :class="priceSort== 0? 'el-icon-arrow-down': 'el-icon-arrow-up'"></i>
                                </span>
                            </div>
                        </div>
                        <router-view :lvParams="{type, mtype, keywords, sk, sort}"></router-view>
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
      search: "",
      search1: "",

      priceSort: 0,
      timeSort: 0,
      chooseTime: true,

      sk1: "",
      sk: "",
      keywords: "",
      type: 0, // 0:未开始 1:已结束
      mtype: 0, // 0:全部 1:名师 2:机构
      sort: ''
    };
  },
  methods: {
    handleSearch() {
      this.keywords = this.search;
      this.sk = this.sk1;
    },

    handleTimeSort() {
      this.timeSort = !this.timeSort;
      if (!this.chooseTime) {
        this.chooseTime = true;
      }

      if(this.chooseTime){
          if(this.timeSort){
              this.sort = 'dateup'
          }else{
              this.sort = 'datedown'
          }
      }
    },
    handlePriceSort() {
      this.priceSort = !this.priceSort;
      if (this.chooseTime) {
        this.chooseTime = false;
      }

      if(!this.chooseTime){
          if(this.priceSort){
              this.sort = 'costup'
          }else{
              this.sort = 'costdown'
          }
      }
    }
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
        .el-input {
          .el-input-group__prepend {
            width: 120px !important;
          }
        }
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
    //   .searh1 {
    //     margin-top: 12px;
    //     .el-input {
    //       .el-input-group__prepend {
    //         width: 100px !important;
    //       }
    //     }
    //   }
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
      font-size: 0.8rem;
      .price,
      .time {
        padding: 20px;
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
}

@media (max-width: 400px) {
  .listContent {
    padding: 0 10px;
  }
}
</style>

<style>
/* inputgroup 前缀不现实修复 */
.el-input.el-input--suffix{
    width: 100px !important;
}
</style>




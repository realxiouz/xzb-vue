<template>
    <div class="wrapper">
        <el-row :gutter="0">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" class="leftPart">
                <div class="content">
                    <div class="head">
                        <div>服务内容
                        </div>
                        <div>
                            <el-button type="primary" size="small">再发一条</el-button>
                        </div>
                    </div>
                    <div class="body">
                        <div class="text active">基本信息</div>
                        <div class="text">关联知识体系</div>
                        <div class="text">关联图书</div>
                    </div>

                </div>

            </el-col>
            <div>
                <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="rightPart">
                    <el-tabs v-model="currentTab">
                        <el-tab-pane label="考研" name="first">
                            <div class="type">
                                <div class="title">服务类别</div>
                                <el-row :gutter="10">
                                    <div v-on:click="currentIconBtn =1;$router.push({name:'AddReference'})">
                                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                            <icon-button :isActive="currentIconBtn == 1"></icon-button>
                                        </el-col>
                                    </div>
                                    <div v-on:click="currentIconBtn =2;$router.push({name:'AddTutor'})">
                                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                            <icon-button icon="answer" title="个性化辅导" subTitle="答疑或授课" :isActive="currentIconBtn == 2"></icon-button>
                                        </el-col>
                                    </div>
                                    <div v-on:click="currentIconBtn =3;$router.push({name:'AddLiveVideo'})">
                                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                            <icon-button icon="focus" title="直播课" subTitle="公益或收费" :isActive="currentIconBtn == 3"></icon-button>
                                        </el-col>
                                    </div>
                                    <div v-on:click="currentIconBtn =4;$router.push({name:'AddPackage'})">
                                        <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                            <icon-button icon="package" title="打包课" subTitle="已发布的服务" :isActive="currentIconBtn == 4"></icon-button>
                                        </el-col>
                                    </div>
                                </el-row>
                            </div>
                            <router-view></router-view>
                        </el-tab-pane>
                        <el-tab-pane label="公务员" name="second">
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>

        </el-row>
    </div>
</template>

<script>
import { getlivevideo } from "@/api/livevideo";
import IconButton from "./component/iconbutton";

export default {
  data() {
    return {
      currentTab: "first",
      currentIconBtn: 1,
      liveId: "",
    };
  },
  components: {
    IconButton,
  },
  methods: {
  },
  wacth: {
  },
  mounted() {
    let p ={id:16};
    getlivevideo(p).then(res=>{
      console.log(res)
    })
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 20px auto;
  //   overflow-x: hidden;
  .leftPart {
    // background-color: #fff;
    // border: 1px solid black;
    padding-right: 10px;
    .content {
      background-color: #fff;

      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px 15px;
        border-bottom: 2px solid #e4e7ed;
      }
      .body {
        .text {
          line-height: 70px;
          text-align: center;
          border-left: 10px solid transparent;
          &.active {
            border-color: #1ecca7;
            background-color: #f6fdfc;
          }
        }
      }
    }
  }
  .rightPart {
    background-color: #fff;
    // border: 1px solid black;
    padding: 20px 30px;
    .type {
      margin-bottom: 20px;
    }
    .chooseMajor {
      margin-bottom: 20px;
    }
    .description {
      margin-bottom: 20px;
    }
    .spread {
      margin-bottom: 20px;
    }
  }
}

.upload {
  line-height: 16px;
}

@media (max-width: 400px) {
  .wrapper {
    .rightPart {
      padding: 10px;
    }
  }
}

//标题样式
.title {
  display: inline-block;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #1ecca7;
  padding: 0 10px 10px;
}

.inlineinput {
  border: none;
  border-bottom: 1px solid black;
  line-height: 16px;
  width: 36px;
  text-align: center;
}
</style>

<style>
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 20rem;
  padding-bottom: 1rem;
}
</style>



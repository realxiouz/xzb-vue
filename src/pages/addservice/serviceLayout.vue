<template>
    <div class="wrapper">
        <el-row :gutter="0">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" class="leftPart">slider</el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="rightPart">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="考研" name="first">
                        <div class="type">
                            <div class="title">服务类别</div>
                            <el-row :gutter="10">
                                <div v-on:click="firstActive = true;secActive = false;thirdActive = false;forthActive = false;">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                        <icon-button :isActive="firstActive"></icon-button>
                                    </el-col>
                                </div>
                                <div v-on:click="firstActive = false;secActive = true;thirdActive = false;forthActive = false;">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                        <icon-button icon="answer" title="个性化辅导" subTitle="答疑或授课" :isActive="secActive"></icon-button>
                                    </el-col>
                                </div>
                                <div v-on:click="firstActive = false;secActive = false;thirdActive = true;forthActive = false;">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                        <icon-button icon="focus" title="直播课" subTitle="公益或收费" :isActive="thirdActive"></icon-button>
                                    </el-col>
                                </div>
                                <div v-on:click="firstActive = false;secActive = false;thirdActive = false;forthActive = true;">
                                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                        <icon-button icon="package" title="打包课" subTitle="已发布的服务" :isActive="forthActive"></icon-button>
                                    </el-col>
                                </div>
                            </el-row>
                        </div>
                        <div class="chooseMajor">
                            <div class="title">确认专业</div>
                            <choose-major></choose-major>
                        </div>
                        <div class="description">
                            <div class="title">详细描述</div>
                            <el-form label-width="80px" ref="form" :model="form" :label-position="labPosition" style="max-width:800px">
                                <el-form-item label="标题">
                                    <el-input v-model="form.title" placeholder="输入标题(醒目的标题有助于吸引眼球,不超过16个字)" :maxlength="16"></el-input>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <quill-editor v-model="form.content" ref="myQuillEditor"></quill-editor>
                                </el-form-item>
                                <el-form-item label="上课时间">
                                    <el-col :span="13">
                                        <el-date-picker type="datetime" placeholder="选择上课时间" v-model="form.time" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                    <el-col :span="1">&nbsp;</el-col>
                                    <el-col :span="10">
                                        <el-input v-model.number="form.length" placeholder="时长">
                                            <template slot="append">小时</template>
                                        </el-input>
                                        <!-- <el-input-number v-model="form.length" controls-position="right" :min="0.5" :max="10" :controls="false"></el-input-number> -->
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="主讲人">
                                    <el-input v-model="form.teacher" placeholder="用户名/手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="费用">
                                    <el-col :span="13">
                                        <el-radio-group v-model="form.fee">
                                            <el-radio :label="0">免费</el-radio>
                                            <el-radio :label="1">收费</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="1">&nbsp;</el-col>
                                    <el-col :span="10">
                                        <el-input v-model.number="form.feeCount" v-if="!form.fee==0">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="上传讲义">
                                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB。<br> 2.请不要上传包含其他教育机构链接、logo、水印等广告，或带有色情、危害社会、无分享价值等类型的资料。
                                            <br> 3.资料名称、资料简介必须与资料内容一致，否则将不能通过审核。
                                            <br> 4.技巧：选择分类，这样同类的资料就可以得到推荐，尽量填写详细的介绍。
                                        </div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="上传封面">
                                    <el-upload class="upload-demo" action="/api/uploadImage" :limit="1" :on-success="handleSuccess" :on-error="handleError" ref="imgUpload">
                                        <el-button type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB.</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="上课教室">
                                    <el-button type="primary" @click="handleCreateRoom">生成直播间</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="spread">
                            <div class="title">推广分成模式</div>
                            <el-form label-width="80px" ref="formSpread" :model="formSpread" :label-position="labPosition" style="max-width:500px">
                                <el-form-item>
                                    <div>
                                        <el-checkbox v-model="formSpread.checked1">设置推广比例为</el-checkbox>
                                        <input type="text" class="inlineinput" v-if="formSpread.checked1" :value="20" disabled>
                                        <a href="" v-if="formSpread.checked1">%&nbsp;&nbsp;什么叫推广比例？</a>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div>
                                        <el-checkbox v-model="formSpread.checked2">设置老师提成比例:</el-checkbox>
                                        <input type="text" class="inlineinput" v-if="formSpread.checked2" v-model.number="formSpread.rate2">
                                        <a href="" v-if="formSpread.checked2">%&nbsp;&nbsp;什么叫老师提成比例？</a>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                        <el-checkbox v-model="formSpread.checked3"> 委托新助邦免费招聘班主任</el-checkbox>
                                </el-form-item>
                                <el-form-item>
                                    <div>
                                        <el-checkbox v-model="formSpread.checked4">我已阅读</el-checkbox>
                                        <a href="" v-if="formSpread.checked4">&nbsp;&nbsp;新助邦直播课发布协议(试行)</a>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="alert('not ready')">确认提交</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="公务员" name="second" disabled>公务员</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { createroom } from "@/api/livevideo";
import IconButton from "./component/iconbutton";
import ChooseMajor from "./component/choosemajor";
export default {
  data() {
    return {
      currentTab: "first",
      form: { fee: 0 , title: '' , length: 0.5},
      labPosition: "right",
      currentIconBtn: 1,
      firstActive: true,
      secActive: false,
      thirdActive: false,
      forthActive: false,

      formSpread: {}
    };
  },
  components: {
    IconButton,ChooseMajor
  },
  methods: {
    handleIconBtn(n) {
      this.currentIconBtn = n;
    },
    handleCreateRoom(){
        let p ={
            open_class_time: this.form.time,
            class_hour: this.form.length,
            description: this.form.title,
        }
        createroom(p).then( res => console.log(res))
    },
    handleSuccess(res, file, fl){
        if(!res.success){
            this.$refs.imgUpload.clearFiles();
            this.$message.error(res.message.msg)
        }
        console.log("successs")
        console.log(res)
        console.log(file)
        console.log(fl)
    },
    handleError(err, file, fl){
         console.log("err")
         console.log(err)
        console.log(file)
        console.log(fl)
    }
  },
  wacth: {
    currentIconBtn(val) {
      if (val == 1) {
        this.firstActive = true;
        this.secActive = false;
        this.thirdActive = false;
        this.forthActive = false;
      } else if (val == 2) {
        this.firstActive = false;
        this.secActive = true;
        this.thirdActive = false;
        this.forthActive = false;
      } else if (val == 3) {
        console.log(val);
        console.log(this.currentIconBtn);
        this.firstActive = false;
        this.secActive = false;
        this.thirdActive = true;
        this.forthActive = false;
      } else if (val == 4) {
        console.log(val);
        console.log(this.currentIconBtn);
        this.firstActive = false;
        this.secActive = false;
        this.thirdActive = false;
        this.forthActive = true;
      }
      console.log(val);
      console.log(this.currentIconBtn);
    }
  },
  mounted() {
    let w = document.documentElement.offsetWidth || document.body.offsetWidth;
    if (w < 400) {
      this.labPosition = "top";
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
  .leftPart {
    background-color: #fff;
    border: 1px solid black;
  }
  .rightPart {
    background-color: #fff;
    // border: 1px solid black;
    padding: 30px;
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

@media (max-width: 400px) {
    .wrapper{
        .rightPart{
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



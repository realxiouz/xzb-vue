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
                            <!-- <live-video></live-video> -->
                            <!-- <div class="chooseMajor">
                                <div class="title">确认专业</div>
                                <choose-major v-on:listenFromChild="getSelMajor"></choose-major>
                            </div>
                            <div class="description">
                                <div class="title">详细描述</div>
                                <el-form label-width="80px" ref="form" :model="form" :label-position="labPosition" style="max-width:800px">
                                    <el-form-item label="标题">
                                        <el-input v-model="form.title" placeholder="输入标题(醒目的标题有助于吸引眼球,不超过16个字)" :maxlength="16"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述">
                                        <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
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
                                        <el-upload class="upload" action="/api/uploadAttach" :on-success="handleSuccessAttach">
                                            <el-button type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB。<br> 2.请不要上传包含其他教育机构链接、logo、水印等广告，或带有色情、危害社会、无分享价值等类型的资料。
                                                <br> 3.资料名称、资料简介必须与资料内容一致，否则将不能通过审核。
                                                <br> 4.技巧：选择分类，这样同类的资料就可以得到推荐，尽量填写详细的介绍。
                                            </div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="上传封面">
                                        <el-upload class="upload" action="/api/uploadImage" :limit="1" :on-success="handleSuccess" :on-error="handleError" ref="imgUpload">
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
                                        <el-button type="primary" @click="handleLiverelease">确认提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </div> -->
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
import { createroom, liverelease } from "@/api/livevideo";
import { quillRedefine } from "vue-quill-editor-upload";
import IconButton from "./component/iconbutton";
import ChooseMajor from "./component/choosemajor";


export default {
  data() {

    return {
      currentTab: "first",
      form: { fee: 0, title: "", length: 0.5 },
      labPosition: "right",
      currentIconBtn: 1,
      firstActive: true,
      secActive: false,
      thirdActive: false,
      forthActive: false,

      formSpread: {},

      majorObj: {},

      liveId: "",
      attach: "",
      imgUrl: "",
      editorOption: {}
    };
  },
  components: {
    IconButton,
    ChooseMajor,
  },
  methods: {
    handleIconBtn(n) {
      this.currentIconBtn = n;
    },
    handleCreateRoom() {
      let p = {
        open_class_time: this.form.time,
        class_hour: this.form.length,
        description: this.form.title
      };
      createroom(p).then(res => {
        this.liveId = res.liveid;
        this.$message.success(`直播间创建成功`);
      });
    },
    handleLiverelease() {
      let p = {
        description: this.form.title,
        price: this.form.fee == 0 ? 0 : this.form.feeCount,
        open_class_time: this.form.time,
        class_hour: this.form.length,
        image: this.imgUrl,
        teacher: this.form.teacher,
        is_extended: this.formSpread.checked1,
        teacher_percent: this.formSpread.rate2,
        attach: this.attach,
        live_id: this.liveId,
        content_course: this.form.content,
        is_adv: this.formSpread.checked3
      };
      liverelease(Object.assign({}, p, this.majorObj)).then(res => {
        console.log(res);
        this.$message.success("直播发布成功.${res.data}");
        //
        location.href = `/home_openClass_subject.html?id=${res.data}&atype=0`;
      });
    },
    handleSuccess(res, file, fl) {
      if (!res.success) {
        this.$refs.imgUpload.clearFiles();
        this.$message.error(res.message.msg);
        return;
      }
      this.imgUrl = res.data.file.url;
      console.log(this.imgUrl);
    },
    handleError(err, file, fl) {
      console.log("err");
      console.log(err);
      console.log(file);
      console.log(fl);
    },
    handleSuccessAttach(res, file, fl) {
      if (!res.success) {
        this.$message.error(res.message.msg);
        return;
      }
      this.attach = res.data.file;
      console.log(this.attach);
    },
    getSelMajor(id, type) {
      //   console.log(arguments);
      if (type == 3) {
        this.majorObj = { public_subject_id: id };
      } else if (type == 2) {
        this.majorObj = { unified_id: id };
      } else if (type == 1) {
        let ids = id.split("-");
        this.majorObj = {
          university_id: ids[0],
          school_id: ids[1],
          major_id: ids[2]
        };
      }
      console.log(this.majorObj);
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
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: "/api/uploadImage",
        res: respnse => {
          return respnse.data.file.url;
        }
      }
    });
  }
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



<template>
    <div>
        <div class="chooseMajor">
            <div class="title">确认专业</div>
            <choose-major v-on:listenFromChild="getSelMajor" :initBean="initMajor"></choose-major>
        </div>
        <div class="description">
            <div class="title">详细描述</div>
            <el-form label-width="80px" ref="form" :model="form" :label-position="labPosition" :rules='formRule' style="max-width:800px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" placeholder="输入标题(醒目的标题有助于吸引眼球,不超过16个字)" :maxlength="16" :disabled="liveId > 0"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="content">
                    <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption" :disabled="liveId > 0"></quill-editor>
                </el-form-item>
                <el-form-item label="上课时间">
                    <el-col :span="13">
                        <el-form-item prop="time">
                            <el-date-picker type="datetime" placeholder="选择上课时间" v-model="form.time" style="width: 100%; " :picker-options="pickerOption" :disabled="liveId > 0"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="10">
                        <el-form-item prop="length">
                            <el-input v-model.number="form.length" placeholder="时长" :disabled="liveId > 0">
                                <template slot="append">小时</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="主讲人" prop="teacher">
                    <el-input v-model="form.teacher" placeholder="用户名/手机号" :disabled="liveId > 0"></el-input>
                </el-form-item>
                <el-form-item label="费用">
                    <el-col :span="13">
                        <el-radio-group v-model="form.fee" :disabled="liveId > 0">
                            <el-radio :label="0">免费</el-radio>
                            <el-radio :label="1">收费</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="10">
                        <el-form-item prop="feeCount">
                            <el-input v-model.number="form.feeCount" v-if="!form.fee==0" :disabled="liveId > 0">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="上传讲义">
                    <el-upload class="upload" action="/api/uploadAttach" :on-success="handleSuccessAttach" :disabled="liveId > 0">
                        <el-button type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB。<br> 2.请不要上传包含其他教育机构链接、logo、水印等广告，或带有色情、危害社会、无分享价值等类型的资料。
                            <br> 3.资料名称、资料简介必须与资料内容一致，否则将不能通过审核。
                            <br> 4.技巧：选择分类，这样同类的资料就可以得到推荐，尽量填写详细的介绍。
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="上传封面" prop="img">
                    <el-upload class="upload" action="/api/uploadImage" :limit="1" :on-success="handleImgSuccess" :on-error="handleImgError" ref="imgUpload" :before-upload="beforeImgUpload" list-type="picture" :on-remove="handleImgRemove" :disabled="liveId > 0" :file-list="imgList">
                        <el-button type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                    </el-upload>
                </el-form-item>
                <!-- <el-form-item label="上课教室">
          <el-button type="primary" @click="handleCreateRoom">生成直播间</el-button>
        </el-form-item> -->
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
                        <el-checkbox v-model="formSpread.checked2">设置老师提成:</el-checkbox>
                        <input type="number" class="inlineinput" v-if="formSpread.checked2" v-model.number="formSpread.rate2" :min="0.5" :max="100">
                        <a href="" v-if="formSpread.checked2">%&nbsp;&nbsp;什么叫老师提成？</a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formSpread.checked3"> 委托新助邦免费招聘班主任</el-checkbox>
                </el-form-item>
                <el-form-item prop="checked4">
                    <div>
                        <el-checkbox v-model="formSpread.checked4">我已阅读</el-checkbox>
                        <a href="" v-if="formSpread.checked4">&nbsp;&nbsp;新助邦直播课发布协议(试行)</a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleEdit">确认提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getlivevideo, editlv } from "@/api/livevideo";
import ChooseMajor from "@/pages/addservice/component/choosemajor";
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  data() {
    return {
      majorObj: null,
      initMajor:{},
      form: {
        title: "",
        content: "",
        time: "",
        length: "",
        fee: 0,
        feeCount: "",
        teacher: "",
        img: ""
      },
      imgList: [],
      formRule: {
        title: { required: true, message: "请输入标题", trigger: "blur" },
        content: { required: true, message: "请输入内容", trigger: "blur" },
        time: { required: true, message: "请选择上课时间", trigger: "blur" },
        length: [
          { required: true, message: "请输入上课时长", trigger: "blur" },
          {
            type: "number",
            max: 12,
            min: 0.5,
            trigger: "change",
            message: "上课时长在0.5至12小时之间"
          }
        ],
        teacher: { required: true, message: "请输入上课讲师", trigger: "blur" },
        img: { required: true, message: "请上传封面", trigger: "blur" }
      },

      formSpread: {checked4: true, checked1: false},

      labPosition: "right",

      liveId: "",
      attach: "",
      editorOption: {},

      //time picker option
      pickerOption: {
        disabledDate(val) {
          if (+new Date() - val - 24 * 3600 * 1000 < 0) {
            return false;
          }
          return true;
        }
      }
    };
  },
  components: {
    ChooseMajor
  },
  methods: {
    handleEdit() {
      if (!this.formSpread.checked4) {
        this.$message.error("勾选协议");
        return;
      }

      let p = {
        description: this.form.title,
        price: this.form.fee == 0 ? 0 : this.form.feeCount,
        open_class_time: this.form.time,
        class_hour: this.form.length,
        image: this.form.img,
        teacher: this.form.teacher,
        attach: this.attach,
        live_id: this.liveId,
        content_course: this.form.content,

        is_extended: this.formSpread.checked1,
        teacher_percent: this.formSpread.checked2 ? 0 : this.formSpread.rate2,
        is_adv: this.formSpread.checked3
      };
      editlv(Object.assign({}, p, this.majorObj)).then(res => {
        // console.log(res);
        this.$message.success("直播发布成功.${res.data}");
        this.$root.reload();
        //
        // location.href = `/home_openClass_subject.html?id=${res.data}&atype=0`;
      });
    },

    handleSuccessAttach(res, file, fl) {
      if (!res.success) {
        this.$message.error(res.message.msg);
        return;
      }
      this.attach = res.data.file;
      console.log(this.attach);
    },

    //upload img
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleImgError(err, file, fl) {
      this.$message.error("图片上传失败");
    },
    handleImgSuccess(res, file, fl) {
      if (!res.success) {
        this.$refs.imgUpload.clearFiles();
        this.$message.error(res.message.msg);
        return;
      }
      this.form.img = res.data.file.url;
      console.log(this.form.img);
    },
    handleImgRemove() {
      this.form.img = "";
    },

    //选择专业
    getSelMajor(id, type) {
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
    }
  },
  mounted() {
    let w = document.documentElement.offsetWidth || document.body.offsetWidth;
    if (w < 400) {
      this.labPosition = "top";
    }
    let p = { id: this.$route.params.id };
    getlivevideo(p).then(res => {
      console.log(res);
      this.form.title = res.description;
      this.form.content = res.content_course;
      this.form.time = new Date(res.open_class_time);
      this.form.length = +res.class_hour;
      this.form.teacher = res.teacher;
      this.form.fee = res.price > 0 ? 1 : 0;
      this.form.feeCount = res.price;

      this.imgList.push({ url: res.image });

      this.formSpread.checked1 = res.is_extended == "0" ? false : true;
      this.formSpread.checked2 = res.teacher_percent > 0 ? true : false;
      this.formSpread.rate2 = res.teacher_percent;
      
      this.initMajor ={
          public_subject_id : res.public_subject_id, 
          unified_id: res.unified_id,
          school_id: res.school_id,
          major_id: res.major_id}
    });
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: "/api/uploadImage",
        res: respnse => {
          return respnse.data.img.url;
        }
      }
    });
  },
  watch: {
    "form.fee": function(val) {
      if (val) {
        this.formRule.feeCount = [
          { required: true, message: "请输入费用", trigger: "blur" },
          {
            type: "number",
            max: 1000,
            min: 0.01,
            trigger: "change",
            message: "费用在0.01至1000之间"
          }
        ];
      } else {
        delete this.formRule.feeCount;
      }
    }
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

.spread {
  .el-form-item__content {
    line-height: 16px;
  }
}
</style>



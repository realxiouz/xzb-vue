<template>
  <div>
    打包课todo..................................
  </div>
</template>

<script>
import ChooseMajor from "./choosemajor";
import { createroom, liverelease } from "@/api/livevideo";
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  data() {
    return {
      majorObj: null,

      form: {
        title: "",
        content: "",
        time: "",
        length: "",
        fee: 0,
        feeCount: "",
        img: ""
      },
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

      formSpread: {},

      labPosition: "right",
      firstActive: true,
      secActive: false,
      thirdActive: false,
      forthActive: false,

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
    handleCreateRoom() {
      if (this.liveId) {
        this.$message.error("直播间已经创建");
        return;
      }
      if (!this.majorObj) {
        this.$message.error("请首先选择专业");
        return;
      }
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message.error("信息不完整");
          return;
        } else {
          let p = {
            open_class_time: this.form.time,
            class_hour: this.form.length,
            description: this.form.title
          };
          createroom(p).then(res => {
            this.liveId = res.liveid;
            this.$message.success(`直播间创建成功`);
          });
        }
      });
    },
    handleLiverelease() {
      if (!this.liveId) {
        this.$message.error("直播间还未创建");
        return;
      }

      if(!this.formSpread.checked4){
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
        teacher_percent: this.formSpread.checked2 ? 0: this.formSpread.rate2,
        is_adv: this.formSpread.checked3
      };
      liverelease(Object.assign({}, p, this.majorObj)).then(res => {
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



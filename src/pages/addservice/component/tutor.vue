<template>
  <div>
    <div class="chooseMajor">
      <div class="title">确认专业</div>
      <choose-major v-on:listenFromChild="getSelMajor"></choose-major>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <div class="title">详情</div>
      <el-form label-width="80px" ref="form" :model="form" :label-position="labPosition" style="max-width:800px">
        <el-form-item label="标题" prop="description" :rules="{required: true, message: '请输入标题', trigger: 'blur'}">
          <el-input v-model="form.description" placeholder="输入标题(醒目的标题有助于吸引眼球,不超过16个字)" :maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="detail" :rules="{required: true, message: '请输入描述', trigger: 'blur'}">
          <editor :bindData="form.detail"></editor>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="form.qq" placeholder="QQ号"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="微信">
          <el-input v-model="form.wechat" placeholder="wechat"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobil">
          <el-input v-model="form.mobil" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="上传封面" prop="image" :rules="{required: true, message: '请上传封面', trigger: 'blur'}">
          <el-upload class="upload" action="/api/uploadImage" :limit="1" :on-success="handleImgSuccess" :on-error="handleImgError" ref="imgUpload" :before-upload="beforeImgUpload" list-type="picture" :on-remove="handleImgRemove" :disabled="liveId > 0">
            <el-button type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <!-- 收费 -->
    <div class="fee">
      <div class="title">收费模式</div>
      <el-form label-width="80px" ref="formFee" :model="formFee" :label-position="labPosition" :rules='formFeeRule' style="max-width:800px">
        <!-- 收费选项 -->
        <el-form-item>
          <el-radio v-model="formFee.type2" label="3">一对一辅导，学生可灵活约定辅导次数</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="formFee.type2" label="4">大班或小班课，学生交费后不能退费</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="formFee.type2" label="5">高端辅导(分阶段收款;拟定学习规划,小班或一对一专人管理)</el-radio>
        </el-form-item>
        <!-- 费用选项 -->
        <el-form-item>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item :rules="[{required: true, message: '输入正确的数字', trigger: 'blur',type: 'number'}]" prop="cost">
                <el-input v-model.number="formFee.cost" placeholder="辅导费用">
                  <template slot="append">元/次</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="formFee.type2 == 4 || formFee.type2 == 5">
              <el-form-item :rules="[{required: true, message: '输入正确的数字', trigger: 'blur',type: 'number'}]" prop="num">
                <el-input v-model.number="formFee.num" placeholder="辅导次数">
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="formFee.type2 == 5">
              <el-form-item :rules="[{required: true, message: '输入正确的数字', trigger: 'blur',type: 'number'}]" prop="discount">
                <el-input v-model.number="formFee.discount" placeholder="折扣">
                  <template slot="append">折</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 服务承诺 -->
        <el-form-item v-if="formFee.type2 == 5">
          <div class="promise">
            <el-form-item>
              <el-checkbox checked disabled>承诺保持高质量教学，并拟定教学阶段。</el-checkbox>
              <el-button @click="handleAddPer" type="primary" size="small">添加阶段</el-button>
            </el-form-item>
            <!-- 第一阶段 -->
            <el-row :gutter="10" style="margin-bottom:20px">
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item label="第1阶段" :rules="[{required: true, message: '输入正确的数字', trigger: 'blur',type: 'number'}]" :prop="'pers[0]'+'.num'">
                  <el-input v-model.number="formFee.pers[0].num" size="mini">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 循环其余阶段 -->
            <el-row :gutter="10" v-for="(per, index) in formFee.pers" :key="per.title" v-if="index > 0" style="margin-bottom:20px">
              <el-col :xs="20" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item :label="per.title" :rules="[{required: true, message: '输入正确的数字', trigger: 'blur',type: 'number'}]" :prop="`pers.`+ index + '.num'">
                  <el-input v-model.number="per.num" size="mini">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <el-form-item label=" ">
                  <el-button @click.prevent="removePer(per)" type="text">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-checkbox checked disabled>拟定阶段学习规划（默认选项，新助邦提供各学科学习规划范本根据学生的实际情况进行修改即可）</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox checked disabled>拟定授课计划和课后练习（默认选项，简单填写授课时间，地点，上课内容和需要讲义）</el-checkbox>
            </el-form-item>

            <el-checkbox-group v-model="formFee.promises">
              <el-form-item>
                <el-checkbox label="1">提问必答</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="2">测试
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="3">指导论文</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="4">协助联系导师</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox label="5">其他</el-checkbox>
              </el-form-item>
            </el-checkbox-group>
            <el-form-item>
              <el-input type="textarea" v-if="formFee.promises.indexOf('5') > -1" v-model="formFee.other_promise"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 推广 -->
    <div class="spread">
      <div class="title">推广分成模式</div>
      <el-form label-width="80px" ref="formSpread" :model="formSpread" :label-position="labPosition" style="max-width:500px">
        <el-form-item>
          <div>
            <el-checkbox v-model="formSpread.is_extended">设置推广比例为</el-checkbox>
            <input type="text" class="inlineinput" v-if="formSpread.is_extended" :value="20" disabled>
            <a href="" v-if="formSpread.is_extended">%&nbsp;&nbsp;什么叫推广比例？</a>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <el-checkbox v-model="formSpread.checked2">设置老师提成:</el-checkbox>
            <input type="number" class="inlineinput" v-if="formSpread.checked2" v-model.number="formSpread.teacher_percent" :min="0.5" :max="100">
            <a href="" v-if="formSpread.checked2">%&nbsp;&nbsp;什么叫老师提成？</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formSpread.is_adv"> 委托新助邦免费招聘班主任</el-checkbox>
        </el-form-item>
        <el-form-item prop="checked4">
          <div>
            <el-checkbox v-model="formSpread.checked4">我已阅读</el-checkbox>
            <a href="" v-if="formSpread.checked4">&nbsp;&nbsp;新助邦直播课发布协议(试行)</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmitForm">确认提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ChooseMajor from "./choosemajor";
import Editor from "@/components/quill-editor";
import { addService } from "@/api/service";
// import { quillRedefine } from "vue-quill-editor-upload";
export default {
  data() {
    return {
      majorObj: null,

      form: {
        description: "",
        detail: "helloworld",
        qq: "",
        wechat: "",
        mobil: "",
        image: ""
      },
      formRule: {
        description: { required: true, message: "请输入标题", trigger: "blur" },
        detail: { required: true, message: "请输入内容", trigger: "blur" },
        image: { required: true, message: "请上传封面", trigger: "blur" }
      },

      formFee: {
        //辅导类型
        service_type: "1",
        type2: "3",
        cost: "",
        num: "",
        discount: "",
        promises: [],
        pers: [{ num: "", title: "第1阶段" }],
        other_promise: ""
      },
      formFeeRule: {},

      formSpread: {
        is_extended: false,
        is_adv: false,
        checked4: true,
        teacher_percent: ""
      },

      labPosition: "right",

      liveId: "",
      attach: "",
      editorOption: {}
    };
  },
  components: {
    ChooseMajor,
    Editor
  },
  methods: {
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
      this.form.image = res.data.file.url;
      console.log(this.form.image);
    },
    handleImgRemove() {
      this.form.image = "";
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
    },
    //添加阶段
    handleAddPer() {
      this.formFee.pers.push({
        num: "",
        title: `第${this.formFee.pers.length + 1}阶段`
      });
    },
    //删除阶段
    removePer(item) {
      var index = this.formFee.pers.indexOf(item);
      if (index !== -1) {
        this.formFee.pers.splice(index, 1);
      }
    },
    //提交表单
    handleSubmitForm() {
      //专业未选择
      if (!this.majorObj) {
        this.$message.error("请首先选择专业");
        return;
      }
      //协议未勾选
      if (!this.formSpread.checked4) {
        this.$message.error("勾选协议");
        return;
      }
      //form验证
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message.error("信息不完整");
        } else {
          //formFee验证
          this.$refs.formFee.validate(valid => {
            if (!valid) {
              this.$message.error("信息不完整");
            } else {
              if (this.formFee.type2 == 5) {
                let times = 0;
                for (const item of this.formFee.pers) {
                  times += item.num;
                }
                if(this.formFee.num != times){
                  this.$message.error("阶段次数和不等于总次数");
                  return;
                }
              }
              //提交表单
              addService(
                Object.assign(
                  {},
                  this.form,
                  this.formFee,
                  this.formSpread,
                  this.majorObj
                )
              ).then(res => {
                if(res > 0){
                  this.$message.success('辅导发布成功');
                  this.$router.push('/list/tutor');
                }
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    let w = document.documentElement.offsetWidth || document.body.offsetWidth;
    if (w < 400) {
      this.labPosition = "top";
    }
  }
  // created() {
  //   this.editorOption = quillRedefine({
  //     uploadConfig: {
  //       action: "/api/uploadImage",
  //       res: respnse => {
  //         return respnse.data.img.url;
  //       }
  //     }
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.upload {
  line-height: 16px;
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





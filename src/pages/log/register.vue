<template>
  <div class="container">
    <div class="login" style="width:300px;margin:30px auto;background-color: #fff;padding: 10px 0 30px;border-radius: 5px;border:1px solid #d8dee2;">
      <div>
        <my-header></my-header>
        <ul class="tabNav">
          <li>
            <span :class="{active: !isEmailReg}" @click="isEmailReg=false">手机注册</span>
          </li>
          <li>
            <span :class="{active: isEmailReg}" @click="isEmailReg=true">邮箱注册</span>
          </li>
        </ul>
        <el-form class="tabContainer" :rules='registerRule' :model='registerForm' ref='regForm' status-icon>
          <div v-if="!isEmailReg">
            <el-form-item prop="tel">
              <el-input type='text' placeholder="请输入手机号" v-model="registerForm.tel" :maxlength="11">
                <icon-svg slot="prefix" iconClass="phone"></icon-svg>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row :gutter='10'>
                <el-col :span="12">
                  <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="registerForm.code">
                    <icon-svg slot="prefix" iconClass="checkcode"></icon-svg>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" style="width:100%;" @click="handleClickCode" :disabled="disabledBtn">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item prop="email">
              <el-input type='text' placeholder="请输入电子邮件" v-model="registerForm.email" :maxlength="30">
                <icon-svg slot="prefix" iconClass="email1"></icon-svg>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row :gutter='10'>
                <el-col :span="12">
                  <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="registerForm.code">
                    <icon-svg slot="prefix" iconClass="checkcode"></icon-svg>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <img-code style="width:100%;" ref="regCode"></img-code>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item prop="pass">
            <el-input type='password' placeholder="请输入密码（8-20位字符）" v-model="registerForm.pass">
              <icon-svg slot="prefix" iconClass="lock"></icon-svg>
            </el-input>
          </el-form-item>
          <el-form-item prop="repass">
            <el-input type='password' placeholder="确认密码" v-model="registerForm.repass">
              <icon-svg slot="prefix" iconClass="pw"></icon-svg>
            </el-input>
          </el-form-item>
          <div>
            <el-button type="primary" style="width:100%; margin-top:13px" @click="submitForm('regForm')">注册</el-button>
          </div>
          <el-form-item prop="readRule">
            <el-checkbox v-model="registerForm.readRule" style="padding-bottom:0px;">我已阅读《新助邦会员注册协议》</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height:1px;"></div>
  </div>
</template>

<script>
import {
  telVal,
  emailVal,
  nameVal,
  sendPhoneCode,
  register,
  login,
  logout
} from "@/api/log";
import ImgCode from "@/components/img-code";
import MyHeader from "./components/header";

export default {
  data() {
    let validateTel = (rule, value, callback) => {
      let regex = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号码"));
        return;
      } else if (!regex.test(value)) {
        callback(new Error("手机号码格式不正确"));
        return;
      }
      let p = { phone: this.registerForm.tel };
      telVal(p).then(res => {
        if (res.data.success) {
          callback();
        } else {
          callback(new Error("手机号码已经注册过了"));
          return;
        }
      });
    };

    let validateEmail = (rule, value, callback) => {
      let regext = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      if (value === "") {
        callback(new Error("请输入电子邮件"));
        return;
      } else if (!regext.test(value)) {
        callback(new Error("电子邮件格式不正确"));
        return;
      }
      let p = { email: this.registerForm.email };
      emailVal(p).then(res => {
        if (res.data.success) {
          callback();
        } else {
          callback(new Error("电子邮件已经注册过了"));
          return;
        }
      });
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.regForm.validateField("repass");
        }
        callback();
      }
    };

    let validateRepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    let validateReadRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请勾选会员注册协议"));
      }
      callback();
    };
    return {
      registerForm: {
        tel: "",
        email: "",
        pass: "",
        repass: "",
        code: "",
        readRule: false
      },
      registerRule: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        repass: [{ validator: validateRepass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        readRule: [{ validator: validateReadRule, trigger: "change" }]
      },
      disabledBtn: false,
      isEmailReg: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "regForm") {
            let p = null;
            if (this.isEmailReg) {
              p = {
                email: this.registerForm.email,
                code: this.registerForm.code,
                password: this.registerForm.pass
              };
            } else {
              p = {
                phone: this.registerForm.tel,
                code: this.registerForm.code,
                password: this.registerForm.pass
              };
            }
            register(p).then(res => {
              if (res.data.success) {
                //
                this.$message.success("注册成功");
                // this.dialogReg = false;
              } else {
                this.$message.error(res.data.message);
                if (this.$refs.regCode) {
                  this.$refs.regCode.changeImgCode();
                }
              }
              this.resetForm("regForm");
            });
          }
        } else {
          this.$message.error("信息不完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClickCode(e) {
      if (
        this.registerForm.tel === "" ||
        !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(
          this.registerForm.tel
        )
      ) {
        this.$message.error("电话号码格式不正确");
        return;
      }
      let p = { phone: this.registerForm.tel };
      sendPhoneCode(p).then(res => {
        if (!res.data.success) {
          this.$message.error("你的手机已被其他用户绑定!");
          return;
        }
      });
      this.disabledBtn = !this.disabledBtn;
      let span = null;
      if (e.target.nodeName === "SPAN") {
        span = e.target;
      } else {
        span = e.target.children[0];
      }
      let n = 9;
      let time = setInterval(() => {
        n--;
        span.innerText = `重新发送(${n}s)`;
        if (n <= 0) {
          clearInterval(time);
          span.innerText = `获取验证码`;
          this.disabledBtn = !this.disabledBtn;
        }
      }, 1000);
    },
    // page跳转
    successPage() {
      if (this.$route.fullPath.indexOf("?url") > 0) {
        console.log(this.$route.fullPath.split("?url")[1].substr(1));
        window.location.href = this.$route.fullPath.split("?url")[1].substr(1);
      } else {
        window.location.href = "/index.php";
      }
    }
  },
  components: {
    ImgCode,
    MyHeader
  },
  watch: {
    isEmailReg() {
      this.resetForm("regForm");
    },
  },
  computed: {
  }
};
</script>

<style>
.el-dialog__body {
  padding: 0px 0px 1px 0;
}
</style>


<style lang="scss" scoped>
@import "../../../style/element-variables";
// *{
//     margin:0px;
//     padding:0px;
// }
.container {
  max-width: 1200px;
  // background-color: #ccc;
  margin: 0 auto;
}


.tabNav {
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 0 10px;
  > li {
    display: inline-block;
    width: 49%;
    text-align: center;
    span {
      cursor: pointer;
      padding-bottom: 10px;
      &.active {
        border-bottom: 3px solid $--color-primary;
      }
    }
  }
}
.tabContainer {
  margin: 35px 0 25px 0;
  padding: 0 10px;
}

</style>



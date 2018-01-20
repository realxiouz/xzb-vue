<template>
    <div>
        <!--注册dialog -->
        <el-dialog :show-close="false" :visible="showRegDialog" width="300px">
            <div class="closeDialog" @click="handleCloseReg">&times;</div>
            <div>
                <div>
                    <dialog-head></dialog-head>
                </div>
                <ul class="tabNav">
                    <li>
                        <span :class="{active: !isEmailReg}" @click="isEmailReg=false">手机注册</span>
                    </li>
                    <li>
                        <span :class="{active: isEmailReg}" @click="isEmailReg=true">邮箱注册</span>
                    </li>
                </ul>
                <el-form class="tabContainer" :rules='regRule' :model='regForm' ref='regForm' status-icon>
                    <div v-if="!isEmailReg">
                        <el-form-item prop="tel">
                            <el-input type='text' placeholder="请输入手机号" v-model="regForm.tel" :maxlength="11">
                                <icon-svg slot="prefix" iconClass="phone"></icon-svg>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-row :gutter='10'>
                                <el-col :span="12">
                                    <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="regForm.code">
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
                            <el-input type='text' placeholder="请输入电子邮件" v-model="regForm.email" :maxlength="30">
                                <icon-svg slot="prefix" iconClass="email1"></icon-svg>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-row :gutter='10'>
                                <el-col :span="12">
                                    <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="regForm.code">
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
                        <el-input type='password' placeholder="请输入密码（8-20位字符）" v-model="regForm.pass">
                            <icon-svg slot="prefix" iconClass="lock"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repass">
                        <el-input type='password' placeholder="确认密码" v-model="regForm.repass">
                            <icon-svg slot="prefix" iconClass="pw"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <div>
                        <el-button type="primary" style="width:100%; margin-top:13px" @click="submitForm('regForm')">注册</el-button>
                    </div>
                    <el-form-item prop="readRule">
                        <el-checkbox v-model="regForm.readRule" style="padding-bottom:0px;">我已阅读《新助邦会员注册协议》</el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <!-- login -->
        <el-dialog :show-close="false" :visible="showLogDialog" width="300px">
            <div class="closeDialog" @click="handleCloseLog">&times;</div>
            <div>
                <div>
                    <dialog-head subTitle="注册" title="登陆新助邦"></dialog-head>
                </div>
                <el-form class="tabContainer" :rules='loginRule' :model='loginForm' ref='loginForm' status-icon>
                    <el-form-item prop="name">
                        <el-input type='text' placeholder="电话/邮箱/用户名" v-model="loginForm.name" :maxlength="30">
                            <icon-svg slot="prefix" iconClass="login"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type='password' placeholder="请输入密码" v-model="loginForm.password">
                            <icon-svg slot="prefix" iconClass="lock"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-row :gutter='10'>
                            <el-col :span="12">
                                <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="loginForm.code">
                                    <icon-svg slot="prefix" iconClass="checkcode"></icon-svg>
                                </el-input>
                            </el-col>
                            <el-col :span="12">
                                <img-code style="width:100%;" ref="loginCode"></img-code>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <div>
                        <el-button type="primary" style="width:100%; margin-top:13px" @click="submitForm('loginForm')">登录</el-button>
                    </div>
                    <el-form-item style="margin-top:10px">
                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="loginForm.readRule">记住密码</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="text" style="float:right">忘记密码</el-button>
                            </el-col>
                        </el-row>

                    </el-form-item>
                </el-form>
                <ul class='icon'>
                    <li>
                        <icon-svg iconClass="wechat"></icon-svg>
                        <p>微信</p>
                    </li>
                    <li>
                        <icon-svg iconClass="qq"></icon-svg>
                        <p>QQ</p>
                    </li>
                    <li>
                        <icon-svg iconClass="weibo"></icon-svg>
                        <p>微博</p>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { telVal, emailVal, sendPhoneCode, register, login } from "@/api/log";
import DialogHead from "@/pages/log/components/header";
import ImgCode from "@/components/img-code";

import { mapState, mapMutations } from "vuex";
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
      let p = { phone: this.regForm.tel };
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
      let p = { email: this.regForm.email };
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
        if (this.regForm.checkPass !== "") {
          this.$refs.regForm.validateField("repass");
        }
        callback();
      }
    };

    let validateRepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.pass) {
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
      regForm: {
        tel: "",
        email: "",
        pass: "",
        repass: "",
        code: "",
        readRule: ""
      },
      regRule: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        repass: [{ validator: validateRepass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        readRule: [{ validator: validateReadRule, trigger: "change" }]
      },
      isEmailReg: false,
      disabledBtn: false,

      loginForm: { name: "", password: "", code: "" },
      loginRule: {
        name: [{ required: true, message: "请输入电话/邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["showRegDialog", "showLogDialog"])
  },
  components: {
    DialogHead,
    ImgCode
  },
  methods: {
    ...mapMutations(["SET_REG_DIALOG", "SET_LOG_DIALOG"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "regForm") {
            let p = null;
            if (this.isEmailReg) {
              p = {
                email: this.regForm.email,
                code: this.regForm.code,
                password: this.regForm.pass
              };
            } else {
              p = {
                phone: this.regForm.tel,
                code: this.regForm.code,
                password: this.regForm.pass
              };
            }
            register(p).then(res => {
              if (res.data.success) {
                //
                this.$message.success("注册成功");
                this.dialogReg = false;
              } else {
                this.$message.error(res.data.message);
                if (this.$refs.regCode) {
                  this.$refs.regCode.changeImgCode();
                }
              }
              this.resetForm("regForm");
            });
          } else if (formName === "loginForm") {
            let p = {
              name: this.loginForm.name,
              password: this.loginForm.password,
              code: this.loginForm.code
            };

            login(p).then(res => {
              if (res.data.success) {
                //
                this.RECORD_USERINFO(res.data.data);
                unreadmsg().then(res => {
                  if (res.data.success) {
                    this.SET_MSG_COUNT(res.data.data.count);
                  }
                });
                shoppingCart().then(res => {
                  if (res.data.success) {
                    this.SET_CART_COUNT(res.data.data.count);
                  }
                });
                // this.successPage();
              } else {
                this.$message.error(res.data.message);
              }
              this.$refs.loginCode.changeImgCode();
              this.resetForm("loginForm");
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
        this.regForm.tel === "" ||
        !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(
          this.regForm.tel
        )
      ) {
        this.$message.error("电话号码格式不正确");
        return;
      }
      let p = { phone: this.regForm.tel };
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
    handleCloseReg() {
      this.SET_REG_DIALOG(false);
    },
    handleCloseLog() {
      this.SET_LOG_DIALOG(false);
      // console.log(this.$route.fullPath);
      // this.$router.push(`${this.$route.fullPath}?t=${+new Date()}`)
      // this.$router.go(0);\
      // this.$router.go({
      //   path: this.$router.path,
      //   query: {
      //     t: +new Date()
      //   }
      // });
      this.$root.reload();
    // console.log(this.$root.emit('reload'))
    // this.$parent.emit('reload');
    // console.log(this.$root.$children)
    
    }
  },
  watch: {
    isEmailReg() {
      this.resetForm("regForm");
    },
    showRegDialog() {
      if (this.showRegDialog && this.$refs.regForm) {
        this.resetForm("regForm");
      }
    },
    showLogDialog() {
      if (this.showLogDialog && this.$refs.loginForm) {
        this.resetForm("loginForm");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  text-align: center;
  list-style: none;
  margin: 0;
  padding: 0px;
  margin-bottom: 30px;
  li {
    text-align: center;
    font-size: 24px;
    padding: 5px;
    color: #fff;
    border: 1px solid #e1e1e1;
    transition: all 0.3s;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    p {
      font-size: 14px;
      color: #e1e1e1;
      margin-top: 8px;
    }
    &:nth-child(1) {
      background-color: #6bbd52;
    }
    &:nth-child(2) {
      background-color: #6bbbee;
      margin: 0 30px;
    }
    &:nth-child(3) {
      background-color: #f76b6d;
    }

    &:hover:nth-child(1) {
      color: #6bbd52;
      background-color: #fff;
    }
    &:hover:nth-child(2) {
      color: #6bbbee;
      background-color: #fff;
    }
    &:hover:nth-child(3) {
      color: #f76b6d;
      background-color: #fff;
    }
  }
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
        border-bottom: 3px solid #13bc98;
      }
    }
  }
}
.tabContainer {
  margin-top: 30px;
  padding: 0 10px;
}

.closeDialog {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  top: -12px;
  right: -12px;
  cursor: pointer;
  text-align: center;
}
</style>


<template>
  <div class="container">
      <el-row>
          <el-col :xl='12' :lg='12' :md='12' :sm='24' style="padding-right:10px">
              <el-form label-position="right" label-width="90px" :rules='registerRule' :model='registerForm' ref='regForm' status-icon>
                  <el-form-item label="电话号码" prop="tel" v-if ="!isEmailReg">
                      <el-input type="text" v-model="registerForm.tel" :maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮件" prop="email" v-else>
                      <el-input type="text" v-model="registerForm.email" :maxlength="30"></el-input>
                  </el-form-item>
                  <div style="float: right"><span style="font-size:14px" ref="preText">没有手机?</span><el-button ref="btnText" type="text" @click="handleTelOrEmail">邮箱注册</el-button></div> <div style="clear:both;"></div>  
                  <el-form-item label="用户名" prop="nickname">
                      <el-input type="text" v-model="registerForm.nickname"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="registerForm.pass"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="repass">
                      <el-input type="password" v-model="registerForm.repass"></el-input>
                  </el-form-item>
                  <el-row :gutter="10" >
                      <el-col :xl='12' :lg='12' :md='12' :sm='15' :xs='15'>
                          <el-form-item label="验证码：" prop="code">
                            <el-input type="text" :maxlength="4" v-model="registerForm.code"></el-input>
                          </el-form-item> 
                      </el-col>

                      <el-col :xl='12' :lg='12' :md='12' :sm='9' :xs='9' v-if="!isEmailReg"><el-button type="primary" @click="handleClickCode" :disabled="disabledBtn">获取验证码</el-button></el-col>
                      <el-col :xl='12' :lg='12' :md='12' :sm='9' :xs='9' v-else><img-code></img-code></el-col>
                      
                  </el-row>

                  <el-form-item prop="readRule">
                      <el-checkbox v-model="registerForm.readRule">我已阅读《新助邦会员注册协议》</el-checkbox>  
                  </el-form-item>  
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
                  </el-form-item>
                  
              </el-form>
          </el-col>
          <el-col :xl='12' :lg='12' :md='12' :sm='24'>
                <ul class='icon'>
                    <li ><icon-svg iconClass="qq"></icon-svg></li>
                    <li ><icon-svg iconClass="wechat"></icon-svg></li>
                    <li ><icon-svg iconClass="weibo"></icon-svg></li>
                </ul>
          </el-col>
            <button @click="dialogVisible=true">test</button>
      </el-row>
        <el-dialog
            :show-close="false"
            :visible.sync="dialogVisible"
            width="300px"
            >
            <div slot="title">
                <!-- <span>注册新助邦账号</span>
                <div>
                    <span>登录</span><span><icon-svg iconClass="arrowleft"></icon-svg></span>
                </div> -->
                
            </div>
            <div>
                <my-header></my-header>
                <ul class="tabNav">
                    <li><span class="active">手机注册</span></li>
                    <li><span>邮箱注册</span></li>
                </ul>
                <el-form class="tabContainer">
                    <el-form-item>
                        <el-input type='text' placeholder="请输入手机号">
                            <icon-svg slot="prefix" iconClass="arrowleft"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter='10'>
                            <el-col :span="12">
                                <el-input type='text' placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" style="width:100%;">获取验证码</el-button> 
                            </el-col>
                        </el-row>	  
                    </el-form-item>
                    <el-form-item>
                        <el-input type='password' placeholder="请输入密码（8-20位字符）">
                            <icon-svg slot="prefix" iconClass="qq"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type='password' placeholder="确认密码">
                            <icon-svg slot="prefix" iconClass="qq"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <div>
                        <el-button type="primary" @click="dialogVisible = false" style="width:100%; margin-top:13px">注册</el-button>
                    </div>
                    <el-form-item prop="readRule">
                      <el-checkbox v-model="registerForm.readRule" style="padding-bottom:30px;">我已阅读《新助邦会员注册协议》</el-checkbox>  
                  </el-form-item>       
                </el-form>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" width="100%">确 定</el-button>
            </span> -->
        </el-dialog>   
  </div>
</template>

<script>
import {telVal, emailVal, nameVal, sendPhoneCode, register} from '@/api/log';
import ImgCode from '@/components/img-code';
import MyHeader from './components/header'

export default {
  data(){
        let validateTel = (rule, value, callback) => {
            let regex = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
            if (value === '') {
                callback(new Error('请输入手机号码'));
                return;
            } else if(!regex.test(value)){
                callback(new Error('手机号码格式不正确'));
                return;
            }
            let p = { phone: this.registerForm.tel}
            telVal(p).then( res => {
                if(res.data.success){
                    callback();
                }else{
                    callback(new Error('手机号码已经注册过了'));
                    return;
                }
            })
        };

        let validateEmail = (rule, value, callback) => {
            let regext = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            if (value === '') {
                callback(new Error('请输入电子邮件'));
                return;
            } else if(!regext.test(value)){
                callback(new Error('电子邮件格式不正确'));
                return;
            }
            let p = { email: this.registerForm.email}
            emailVal(p).then( res => {
                if(res.data.success){
                    callback();
                }else{
                    callback(new Error('电子邮件已经注册过了'));
                    return;
                }
            })
        };

        let validateNickName = (rule, value, callback) => {
            if(value.trim() === ''){
                callback(new Error('请输入昵称'));
                return;
            }
            let p ={ nickname: this.registerForm.nickname}
            nameVal(p).then( res => {
                if(res.data.success){
                    callback();
                }else{
                    callback(new Error('有人注册过该昵称了'));
                    return;
                }
            })
        }

        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.checkPass !== '') {
                this.$refs.regForm.validateField('repass');
                }
                callback();
            }
        };

        let validateRepass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        let validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            }  else {
                callback();
            }
        };
        let validateReadRule = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请勾选会员注册协议'));
            } 
            callback();
        };
        return {
            registerForm:{ tel: '', email: '', nickname:'', pass:'', repass: '', code: '', readRule: false},
            registerRule:{
                tel: [ { validator: validateTel, trigger: 'blur' } ],
                nickname: [ { validator: validateNickName, trigger: 'blur' } ],
                email: [ { validator: validateEmail, trigger: 'blur' } ],
                pass: [ { validator: validatePass, trigger: 'blur'} ],
                repass: [ {validator: validateRepass, trigger: 'blur'} ],
                code:[ {validator: validateCode, trigger: 'blur'}],
                readRule: [ {validator: validateReadRule, trigger: 'blur'} ]
            },
            disabledBtn: false,
            isEmailReg: false,
            dialogVisible: false
        }
  },
  methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let p = null;
            if(this.isEmailReg) {
                p = {
                    email: this.registerForm.email,
                    code: this.registerForm.code,
                    nickname: this.registerForm.nickname,
                    password: this.registerForm.pass
                }
            } else {
                p = {
                    phone: this.registerForm.tel,
                    code: this.registerForm.code,
                    nickname: this.registerForm.nickname,
                    password: this.registerForm.pass
                }
            }
            register(p).then( res => console.log(res.data))
          } else {
            this.$message.error('信息不完整');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClickCode(e){
          if(this.registerForm.tel === '' || !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(this.registerForm.tel)){
              this.$message.error('电话号码格式不正确');
              return
          }
          let p = {phone: this.registerForm.tel};
          sendPhoneCode(p).then( res => {
              console.log(res.data)
          })
          this.disabledBtn = !this.disabledBtn;
          let span = null;
          if( e.target.nodeName === "SPAN"){
              span = e.target
          }else{
              span = e.target.children[0]
          }
          let n = 9;
          let time = setInterval(() => {
              n--;
              span.innerText = `重新发送(${n}s)`;
              if(n <= 0){
                  clearInterval(time);
                  span.innerText = `获取验证码`;
                  this.disabledBtn = !this.disabledBtn;
              }
          },1000)
      },
      handleTelOrEmail(e){
          this.isEmailReg = !this.isEmailReg;
          this.resetForm('regForm');
          this.$refs.preText.innerText = this.isEmailReg ? '没有邮箱?' : '没有手机?';
          e.target.innerText = this.isEmailReg ? '手机注册' : '邮箱注册';
      },
    },
    components: {
        ImgCode, MyHeader
    }
  
}
</script>

<style>
    .el-dialog__body{
        padding: 0px 0px;
    }
</style>


<style lang="scss" scoped>
    // *{
    //     margin:0px;
    //     padding:0px;
    // }
    .container{
        max-width: 1180px;
        background-color: #ccc;
        margin:0 auto;
    }

    .icon{
        font-size: 48px;
        list-style: none;
        margin: 0;
        padding: 0px;
        li{
            text-align:center;
            font-size: 60px;
            color: #fff;
            border: 1px solid #E1E1E1;
            padding: 10px;
            transition: all .3s;
            height: 70px;
            width: 70px;
            border-radius: 50%;
            display: inline-block;
            &:nth-child(1){
                background-color: #6BBBEE;
            }
            &:nth-child(2){
                background-color: #6BBD52;
            }
            &:nth-child(3){
                background-color: #F76B6D;
            }

            &:hover:nth-child(1){
                color: #6BBBEE;
                background-color: #fff;
            }
            &:hover:nth-child(2){
                color: #6BBD52;
                background-color: #fff;
            }
            &:hover:nth-child(3){
                color: #F76B6D;
                background-color: #fff;
            }

        }
    }

    .tabNav{
        list-style: none;
        margin: 0;
        padding: 0;
        >li{
            display:inline-block;
            width: 49%;
            text-align: center;
            span{
                padding-bottom: 10px;
                &.active{
                    border-bottom: 3px solid green;
                }
            }
        }
    }
    .tabContainer{
        margin-top: 45px;
        padding: 0 10px;
    }
</style>



<template>
  <div class="container">
        <el-row>
            <div class="userInfor" v-if="token !== ''">
                <img :src="avatar" alt="avatar">
                <span>{{nickname}}</span>
                <span>{{token}}</span>
                <button @click="handleLogout">logout</button>
            </div>
            <div class="login" v-if="token === ''">
                <button @click="dialogReg=true">reg</button>
                <button @click="dialogLogin=true">login</button>
            </div>
            <button @click="dialogCheckEmail=true">showcheckemail</button>
            
            
        </el-row>
        <!-- register -->
        <el-dialog
            :show-close="false"
            :visible.sync="dialogReg"
            width="300px"
            >
            <div>
                <div @click="dialogLogin=true;dialogReg=false">
                    <my-header></my-header>
                </div>              
                <ul class="tabNav">
                    <li><span :class="{active: !isEmailReg}" @click="isEmailReg=false">手机注册</span></li>
                    <li><span :class="{active: isEmailReg}" @click="isEmailReg=true">邮箱注册</span></li>
                </ul>
                <el-form class="tabContainer" :rules='registerRule' :model='registerForm' ref='regForm' status-icon>
                    <div v-if="!isEmailReg">
                        <el-form-item prop="tel">
                            <el-input type='text' placeholder="请输入手机号" v-model="registerForm.tel" :maxlength="11">
                                <icon-svg slot="prefix" iconClass="arrowleft"></icon-svg>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-row :gutter='10'>
                                <el-col :span="12">
                                    <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="registerForm.code"></el-input>
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
                                <icon-svg slot="prefix" iconClass="arrowleft"></icon-svg>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-row :gutter='10'>
                                <el-col :span="12" >
                                    <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="registerForm.code"></el-input>
                                </el-col>
                                <el-col :span="12">
                                    <img-code style="width:100%;" ref="regCode"></img-code> 
                                </el-col>
                            </el-row>	  
                        </el-form-item>
                    </div>
                    <el-form-item prop="pass">
                        <el-input type='password' placeholder="请输入密码（8-20位字符）" v-model="registerForm.pass">
                            <icon-svg slot="prefix" iconClass="qq"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repass" >
                        <el-input type='password' placeholder="确认密码" v-model="registerForm.repass">
                            <icon-svg slot="prefix" iconClass="qq"></icon-svg>
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
        </el-dialog>
        <!-- login -->
        <el-dialog
            :show-close="false"
            :visible.sync="dialogLogin"
            width="300px"
            >
            <div>
                <div @click="dialogReg=true;dialogLogin=false">
                    <my-header subTitle="注册" title="登陆新助邦"></my-header>
                </div>
                <el-form class="tabContainer" :rules='loginRule' :model='loginForm' ref='loginForm' status-icon>
                    <el-form-item prop="name">
                        <el-input type='text' placeholder="电话/邮箱/用户名" v-model="loginForm.name" :maxlength="30">
                            <icon-svg slot="prefix" iconClass="arrowleft"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type='password' placeholder="请输入密码" v-model="loginForm.password">
                            <icon-svg slot="prefix" iconClass="qq"></icon-svg>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-row :gutter='10'>
                            <el-col :span="12" >
                                <el-input type='text' placeholder="请输入验证码" :maxlength="4" v-model="loginForm.code"></el-input>
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
                            <el-col :span="12" >
                                <el-checkbox v-model="loginForm.readRule">记住密码</el-checkbox>
                            </el-col>
                            <el-col :span="12" >
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
        <!-- checkEmail -->

        <el-dialog
            :show-close="false"
            :visible.sync="dialogCheckEmail"
            width="300px"
            >
            <div class="checkEmail">
                <div class="top"><span><icon-svg iconClass="email"></icon-svg></span></div>
                <div class="welcome">{{nickname}}，欢迎来到新助邦！</div>
                <div class="msg">注册确认信已发到你的邮箱，请登陆邮箱激活账号已完成验证</div>
                <div class="btns"><el-button type="primary" round>查看邮件</el-button><el-button round>先去逛逛</el-button></div>
                <div class="infor">
                    <div class="title">
                        <span><icon-svg iconClass="infor"></icon-svg></span><span>没有收到确认信怎么办？</span>
                    </div>
                    <div class="content">检查Email地址是否正确，错了就重新<span>注册</span>一遍</div>
                    <div>看看是否在垃圾箱里</div>
                    <div class="content">稍等几分钟，若仍没有收到信，就<span>重发</span>一封吧！</div>
                </div>   
            </div>
        </el-dialog>
  </div>
</template>

<script>
import {telVal, emailVal, nameVal, sendPhoneCode, register, login, logout} from '@/api/log';
import ImgCode from '@/components/img-code';
import MyHeader from './components/header';
import { mapMutations, mapGetters } from 'vuex';

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
                registerForm:{ tel: '', email: '', pass:'', repass: '', code: '', readRule: false},
                loginForm:{ name: '', password: '', code:''},
                registerRule:{
                    tel: [ { validator: validateTel, trigger: 'blur' } ],
                    // nickname: [ { validator: validateNickName, trigger: 'blur' } ],
                    email: [ { validator: validateEmail, trigger: 'blur' } ],
                    pass: [ { validator: validatePass, trigger: 'blur'} ],
                    repass: [ {validator: validateRepass, trigger: 'blur'} ],
                    code:[ {validator: validateCode, trigger: 'blur'}],
                    readRule: [ {validator: validateReadRule, trigger: 'change'} ]
                },
                loginRule:{
                    name: [ { required: true, message: '请输入电话/邮箱', trigger: 'blur' } ],
                    password: [ { required: true, message: '请输入密码', trigger: 'blur' } ],
                    code:[ { required: true, message: '请输入验证码', trigger: 'blur' }],
                },
                disabledBtn: false,
                isEmailReg: false,
                dialogReg: false,
                dialogLogin: false,
                dialogCheckEmail: false
            }
    },
    methods:{
        ...mapMutations(['set_user_avatar', 'set_user_nickname', 'set_user_token']),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    if(formName === 'regForm'){
                        let p = null;
                        if(this.isEmailReg) {
                            p = {
                                email: this.registerForm.email,
                                code: this.registerForm.code,
                                password: this.registerForm.pass
                            }
                        } else {
                            p = {
                                phone: this.registerForm.tel,
                                code: this.registerForm.code,
                                password: this.registerForm.pass
                            }
                        }
                        register(p).then( res => {
                            if(res.data.success){
                                //
                                this.$message.success('注册成功');
                                this.dialogReg = false;
                            } else {
                                this.$message.error(res.data.message);
                                if(this.$refs.regCode){
                                    this.$refs.regCode.changeImgCode();
                                }
                            }
                            this.resetForm('regForm')
                            
                        })
                    } else if(formName === 'loginForm'){
                        let p = {
                            name: this.loginForm.name,
                            password: this.loginForm.password,
                            code: this.loginForm.code,
                        }

                        login(p).then( res =>{
                            if(res.data.success){
                                //
                                this.$message.success('登录成功');
                                this.dialogLogin = false;
                                this.set_user_avatar(res.data.data.avatar)
                                this.set_user_nickname(res.data.data.nickname)
                                this.set_user_token(res.data.data.token)
                            } else {
                                this.$message.error(res.data.message);
                                this.$refs.loginCode.changeImgCode();
                            }
                            this.resetForm('loginForm');
                            
                        })
                    }
                
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
                if(!res.data.success){
                    this.$message.error('你的手机已被其他用户绑定!');
                    return;
                }
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
        handleLogout(){
            logout().then( res => {
                if(res.data.success){
                    this.set_user_avatar('')
                    this.set_user_nickname('')
                    this.set_user_token('')
                    this.$message.success('已登出')
                } else {
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    components: {
        ImgCode, MyHeader
    },
    watch:{
        isEmailReg(){
            this.resetForm('regForm');
        },
        dialogReg(){
            if(this.$refs.regForm){
                this.resetForm('regForm');
            }
            this.isEmailReg = false;
        },
        dialogLogin(){
            if(this.$refs.loginForm){
                this.resetForm('loginForm');
                this.$refs.loginCode.changeImgCode();
            }
        }
    },
    computed: {
        ...mapGetters([
            'avatar','nickname','token'
        ]),
    },
  
}
</script>

<style>
    .el-dialog__body{
        padding: 0px 0px 1px 0;
    }
</style>


<style lang="scss" scoped>
@import "../../../style/element-variables";
    // *{
    //     margin:0px;
    //     padding:0px;
    // }
    .container{
        max-width: 1180px;
        // background-color: #f9f9f9;
        margin:0 auto;
    }

    .icon{
        text-align: center;
        list-style: none;
        margin: 0;
        padding: 0px;
        margin-bottom: 30px;
        li{
            text-align:center;
            font-size: 30px;
            color: #fff;
            border: 1px solid #E1E1E1;
            padding: 5px;
            transition: all .3s;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            p{
                font-size: 14px;
                color: #E1E1E1;
                margin-top:8px;
            }
            &:nth-child(1){
                background-color: #6BBD52;
            }
            &:nth-child(2){
                background-color: #6BBBEE;
                margin:0 30px;
            }
            &:nth-child(3){
                background-color: #F76B6D;
            }

            &:hover:nth-child(1){
                color: #6BBD52;
                background-color: #fff;
            }
            &:hover:nth-child(2){
                color: #6BBBEE;
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
        padding: 0 10px;
        >li{
            display:inline-block;
            width: 49%;
            text-align: center;
            span{
                cursor: pointer;
                padding-bottom: 10px;
                &.active{
                    border-bottom: 3px solid green;
                }
            }
        }
    }
    .tabContainer{
        margin: 35px 0 25px 0;
        padding: 0 10px;
    }

    .checkEmail{
        padding: 0 10px;
        text-align: center;
        .top{
            span{
                display: inline-block;
                // padding: 8px;
                font-size: 64px;
                color: $--color-primary;
            }
        }
        .welcome{
            color: $--color-primary;
            font-size: 20px;
            margin: -20px 0 20px;
        }
        .btns{
            margin: 35px 0;
        }
        .infor{
            background-color: #ccc;
            padding: 8px 8px 0;
            text-align: left;
            margin-bottom: 20px;
            .title{
                font-size: 20px;
                span{
                    margin: 0  8px 0 0;
                }
            }
            .content{
                span{
                    color: $--color-primary;
                    cursor: pointer;
                }
            }
        }
    }
</style>



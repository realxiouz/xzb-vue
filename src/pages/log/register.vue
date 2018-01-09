<template>
  <div class="container">
      <el-row>
          <el-col :xl='12' :lg='12' :md='12' :sm='24'>
              <el-form label-position="right" label-width="90px" :rules='registerRule' :model='registerForm' ref='regForm' status-icon>
                  <el-form-item label="电话号码：" prop="tel">
                      <el-input type="text" v-model="registerForm.tel" :maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名：" prop="nickname">
                      <el-input type="text" v-model="registerForm.nickname"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：">
                      <el-input type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码：">
                      <el-input type="password"></el-input>
                  </el-form-item>
                  <el-row>
                      <el-col :span='12'>
                          <el-form-item label="验证码：">
                            <el-input type="text" :maxlength="4"></el-input>
                          </el-form-item> 
                      </el-col>
                      <el-col :span='12'><el-button ref="btnGetCode" @click="handleClickCode" :disabled="disabledBtn">获取验证码</el-button></el-col>
                  </el-row>

                  <el-form-item>
                      <el-checkbox >我已阅读《新助邦会员注册协议》</el-checkbox>  
                  </el-form-item>  
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('regForm')">立即创建</el-button>
                    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                  </el-form-item>
                  
              </el-form>
          </el-col>
          <el-col :xl='12' :lg='12' :md='12' :sm='24'>
                <!-- <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="ruleForm2.age"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form> -->
          </el-col>
      </el-row>   
  </div>
</template>

<script>
import {telVal} from '@/api/log';
import axios from 'axios';
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
        // 
        axios.get(`/api/phoneValidate/?phone=${this.registerForm.tel}`).then( res => {
            if(res.data.success){
                callback();
            }else{
                callback(new Error('手机号码已经注册过了'));
                return;
            }
        })
      };

      let validateNickName = (rule, value, callback) => {
          if(value.trim() === ''){
                callback(new Error('请输入昵称'));
                return;
          }

          axios.get(`/api/nicknameValidate/?nickname=${this.registerForm.nickname}`).then( res => {
            if(res.data.success){
                callback();
            }else{
                callback(new Error('有人注册过该昵称了'));
                return;
            }
        })
      }
      
    //   var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入密码'));
    //     } else {
    //       if (this.ruleForm2.checkPass !== '') {
    //         this.$refs.ruleForm2.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
    //   var validatePass2 = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value !== this.ruleForm2.pass) {
    //       callback(new Error('两次输入密码不一致!'));
    //     } else {
    //       callback();
    //     }
    //   };
      return {
          registerForm:{ tel: '', nickname:''},
          registerRule:{
            tel: [ { validator: validateTel, trigger: 'blur' } ],
            nickname: [ { validator: validateNickName, trigger: 'blur' } ],
          },
          disabledBtn: false

    //     rules2: {
    //       pass: [
    //         { validator: validatePass, trigger: 'blur' }
    //       ],
    //       checkPass: [
    //         { validator: validatePass2, trigger: 'blur' }
    //       ],
    //       age: [
    //         { validator: checkAge, trigger: 'blur' }
    //       ]
    //     }
      }
  },
  methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClickCode(e){
          console.log(e.target.nodeName)
        //   if(el.nodeName === 'span'){
        //       el.innerText = `重新发送(${n}s)`;
        //   }else{

        //   }
          this.disabledBtn = !this.disabledBtn;
          let n = 9;
          let time = setInterval(() => {
              n--;
              if(e.target.nodeName === 'SPAN'){
                e.target.innerText = `重新发送(${n}s)`;
              }
            //   this.$refs['btnGetCode'].getElementsByTagName('span')[0].innerText = `重新发送(${n}s)`;
              if(n <= 0){
                  clearInterval(time);
                  e.target.innerText = `获取验证码`;
                  this.disabledBtn = !this.disabledBtn;
              }
          },1000)
      }
    }
  
}
</script>


<style lang="scss" scoped>
    .container{
        max-width: 1180px;
        background-color: #ccc;
        margin:0 auto;
    }
</style>



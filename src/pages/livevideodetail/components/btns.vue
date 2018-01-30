<template>
  <div class="group">
    <ul>
      <template v-if="bean.is_me">
        <li @click="handleTianjia">添加系列</li>
        <li @click="handleBianJi">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>编辑</p>
        </li>
        <li @click="handleXiaJia">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>下架</p>
        </li>
        <li @click="handleTuiGuan">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>推广</p>
        </li>
      </template>
      <template v-else>
        <li v-if="bean.is_teacher || (!bean.is_teacher && bean.is_pay)" @click="handleShangKe">上课</li>
        <li v-else @click="handleBaoMing">报名</li>
        <li @click="handleZhiXun">
          <icon-svg iconClass="telephone"></icon-svg>
          <p>咨询</p>
        </li>
        <li @click="handleTiWen">
          <icon-svg iconClass="question"></icon-svg>
          <p>提问</p>
        </li>
        <li @click="handleTuiGuan">
          <icon-svg iconClass="push"></icon-svg>
          <p>推广</p>
        </li>
      </template>
    </ul>
    <div ref="temp"></div>
    <el-dialog title="选择支付方式" :visible.sync="dialogPay" width="300px">
      <span>选择支付方式</span>
      <el-radio-group v-model="pay_type">
        <el-radio :label="1">支付宝</el-radio>
        <el-radio :label="0">微信</el-radio>
        <el-radio :label="2">余额</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPay = false">取 消</el-button>
        <el-button type="primary" @click="handleComitPay">确 定</el-button>
      </span>

      <!-- wechatpay dialog -->
      <el-dialog width="300px" title="微信支付二维码" :visible.sync="dialogWePay" append-to-body center :before-close="handleCloseWePay">
        <img :src="`http://paysdk.weixin.qq.com/example/qrcode.php?data=${wechatPayCode}`" alt="">
      </el-dialog>

      <!-- 余额支付dialog -->
      <el-dialog width="300px" title="余额支付" :visible.sync="dialogRestPay" append-to-body center>
        <el-form :model="form">
          <el-form-item label="支付密码" label-width="80px">
            <el-input v-model="form.pw" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleCheckPW">确定支付</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { liveapply, livepay, ispayed, checkpw } from "@/api/livevideo";
import md5 from "js-md5";
export default {
  props: {
    bean: {
      type: Object
    }
  },
  methods: {
    handleShangKe() {
      this.$message.error("shangke todo");
    },
    handleBaoMing() {
      if (this.bean.price > 0) {
        this.dialogPay = true;
      } else {
        let p = {
          open_class_id: this.bean.open_class_id
        };
        liveapply(p).then(res => {
          this.$message.success("报名成功");
          this.bean.is_pay = 1;
        });
      }
    },
    handleZhiXun() {
      this.$message.error("zhixun todo");
    },
    handleTiWen() {
      this.$message.error("tiwen todo");
    },
    handleTuiGuan() {
      this.$message.error("tuiguan todo");
    },
    handleTianjia() {
      this.$message.error("Tianjia todo");
    },
    handleBianJi() {
      this.$message.error("BianJi todo");
    },
    handleXiaJia() {
      this.$message.error("XiaJia todo");
    },
    handleTuiGuan() {
      this.$message.error("TuiGuang todo");
    },
    handleComitPay() {
      //首先输入支付密码
      if (this.pay_type == 2) {
        this.dialogRestPay = true;
        return;
      }
      let p = {
        open_class_id: this.bean.open_class_id,
        pay_type: this.pay_type
      };
      livepay(p).then(res => {
        if (this.pay_type == 1) {
          //alipay
          this.$refs.temp.innerHTML = "";
          this.$refs.temp.innerHTML = res;
          document.getElementById("alipaysubmit").submit();
        } else if (this.pay_type == 0) {
          //wechatpay
          this.wechatPayCode = res.code;
          this.dialogWePay = true;
        }
      });
    },

    handleCloseWePay(done) {
      this.wechatPayCode = "";
      done();
    },

    //验证余额支付密码
    handleCheckPW() {
      if (!this.form.pw) {
        this.$message.error("输入支付密码");
        return;
      }
      let p = { paypassword: md5(this.form.pw) };
      checkpw(p).then(res => {
        if (res.status == 1) {
          this.form.pw = '';
          let p = {
            open_class_id: this.bean.open_class_id,
            pay_type: 2
          };
          livepay(p).then( res => {
            if(res.status){
              this.$message.success("微信支付成功");
              this.dialogRestPay = false;
              this.dialogPay = false;
              this.$root.reload();
            }
          })
        } else if(res.status == 0){
          this.$message.error("密码输入错误 重新输入");
          this.form.pw = '';
        } else if(res.status == 2){
          this.$message.error("没有设置支付密码");
        }
      });
    }
  },
  data() {
    return {
      dialogPay: false,
      pay_type: 1,
      //wechatpay
      dialogWePay: false,
      wechatPayCode: "",
      timer: "",
      // 余额支付
      dialogRestPay: false,
      form: {}
    };
  },
  watch: {
    wechatPayCode(val) {
      if (val) {
        this.timer = setInterval(() => {
          let p = { id: this.bean.open_class_id };
          ispayed(p).then(res => {
            if (res.status) {
              this.$message.success("微信支付成功");
              this.dialogWePay = false;
              this.dialogPay = false;
              this.$root.reload();
            }
          });
        }, 5000);
      } else {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/element-variables";
.group {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    li {
      &:hover > p {
        color: $--color-primary;
      }
      height: 70px;
      text-align: center;
      cursor: pointer;
      padding: 0 25px;
      > p {
        color: #c1c1c1;
        font-size: 0.8rem;
        margin-top: -8px;
      }
    }
    li:nth-child(1) {
      width: 144px;
      line-height: 70px;
      color: #fff;
      background-color: $--color-primary;
    }
    li:nth-child(2) {
      background-color: #eee;
      font-size: 2rem;
      border-right: 1px solid #dedede;
      color: #c1c1c1;
    }
    li:nth-child(3) {
      background-color: #eee;
      font-size: 2rem;
      border-right: 1px solid #dedede;
      color: #c1c1c1;
    }
    li:nth-child(4) {
      background-color: #eee;
      font-size: 2rem;
      color: #c1c1c1;
    }
  }
}

@media (max-width: 400px) {
  .group {
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
    ul {
      li {
        padding: 0 12px;
      }
      li:nth-child(1) {
        // width: 144px;
        order: 4;
        flex: auto;
      }
      li:nth-child(2) {
        order: 3;
        border-left: 1px solid #dedede;
        border-right: none;
      }
      li:nth-child(3) {
        order: 2;
        border-left: 1px solid #dedede;
        border-right: none;
      }
      li:nth-child(4) {
        order: 1;
      }
    }
  }
}
</style>



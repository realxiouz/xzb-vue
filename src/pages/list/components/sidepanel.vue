<template>
    <div class="sidePanel">
        <div class="head">
            <div class="title" v-if="title">{{title}}</div>
            <el-button plain type="primary" v-if="btnText" @click="titleBtnHandler">{{btnText}}</el-button>
        </div>
        <div class="body">
            <div class="circle" v-if="type === 1">
                <ul v-if="circles.length > 0"></ul>
                <div class="des" v-else>暂无圈子信息</div>
            </div>
            <div class="leaveMesage" v-if="type === 2">
                <el-input type="textarea" :rows="3" placeholder="如果缺少专业，或者您有建议请在这里反馈给我们......." resize="none" v-model="msg">
                </el-input>
                <el-button style="margin-top:10px;" @click="hanleLeaveMsg">发送</el-button>   
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    btnText: {
      type: String
    },
    titleBtnHandler: {
      type: Function,
      default: function() {
        alert("todo");
      }
    },
    type: {
      type: Number,
      default: 1 //1:圈子 2: 留言xzb 3: 群
    }
  },
  methods:{
      hanleLeaveMsg(){
          this.$message.error(`${this.msg}`);
          this.msg = '';
      }
  },
  data(){
      return {
          msg:'',
          circles:[]
      }
  }
};
</script>

<style lang="scss" scoped>
.sidePanel {
  background-color: #fff;
  margin-bottom: 20px;
  .head {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .body {
    padding: 20px;
    .circle{
        .des{
            color: #ccc;
        }
    }
    .leaveMesage {
        text-align: center;
    }
  }
}
</style>



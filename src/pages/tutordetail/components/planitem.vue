<template>
    <div class="item" v-if="bean">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <div class="img">
                    <img :src="bean.image" alt="辅导封面" class="bg" :onerror="errorImg" />
                    <img src="../../.././assets/playbtn.png" alt="直播按钮" class="play" />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <div class="info">
                    <div class="row1">
                        <div class="title">
                            <!-- <router-link :to="{ name: 'Tutor', params: { id: bean.service_id }}">
                                {{bean.description}}
                            </router-link> -->
                            {{bean.description}}
                        </div>
                    </div>
                    <div class="action">
                        <div>
                            <div class="time">
                                <icon-svg iconClass="time"></icon-svg>&nbsp;&nbsp;{{bean.open_class_time}}
                            </div>
                            <div class="teacher">
                                <icon-svg iconClass="login"></icon-svg>&nbsp;&nbsp;{{bean.nickname}}
                            </div>
                        </div>
                        <div>
                            <el-button-group>
                                <el-button @click="handlePre(bean)">预习</el-button>
                                <el-button type="primary" @click="handleJob(bean)">作业</el-button>
                            </el-button-group>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: {
    bean: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      errorImg: 'this.src="' + require("../../../assets/default.png") + '"'
    };
  },
  methods: {
    handlePre(bean) {
      this.$emit('doPre', bean);
    },
    handleJob(bean){
        this.$emit('doJob', bean);
    },
  }
};
</script>


<style lang="scss" scoped>
.item {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 20px;
  .img {
    height: 100px;
    position: relative;
    .bg {
      border: 1px solid grey;
      padding: 1px;
      width: 100%;
      height: 100%;
    }
    .play {
      position: absolute;
      width: 36px;
      height: 36px;
      left: 50%;
      margin-left: -20px;
      top: 50%;
      margin-top: -20px;
    }
  }
  .info {
    .row1 {
      display: flex;
      justify-content: space-between;
    }
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 24px;
      margin-bottom: 10px;
    }
    .types {
      height: 48px;
      font-size: 14px;
      color: #999;
    }
    .time,
    .teacher,
    .fenban {
      color: #ff7101;
      font-size: 16px;
      .price1 {
        display: none;
      }
    }

    .action {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }
  }
  .send-class{
      border-top:1px solid #999;
      margin-top: 10px;
      padding-top: 10px;
      .sended{
          font-size: .9rem;
          font-weight: bold
          
      }
      >ul{
          display: flex;
          flex-wrap: wrap;
          li{
              margin-right: 10px;
              margin-top:4px;
              font-size: .8rem;
              color: #999;
              max-width: 70px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
          }
      }
  }
}

.price {
  color: #ff7101;
  font-size: 24px;
}

@media (max-width: 450px) {
    .item{
        .img{
            height: 140px;
        }
    }
}
</style>


<template>
    <div class="item" v-if="bean">
        <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                <div class="img">
                    <img :src="bean.image" alt="直播封面" class="bg" :onerror="errorImg"/>
                    <img src="../../.././assets/playbtn.png" alt="直播按钮" class="play" />
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
                <div class="info">
                    <div class="row1">
                        <div class="title">
                            <router-link :to="{ name: 'Livevideo', params: { id: bean.open_class_id }}">{{bean.description}}</router-link>
                            
                        </div>
                        <div class="price">{{`￥:${bean.price}`}}</div>
                    </div>

                    <el-row>
                        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                            <div class="types">
                                {{bean.types ? bean.types.join('-') : ''}}
                            </div>
                            <!-- <div class="time">
                                <icon-svg iconClass="time"></icon-svg>&nbsp;&nbsp;{{bean.open_class_time}}</div>
                            <div class="teacher">
                                <icon-svg iconClass="login"></icon-svg>&nbsp;&nbsp;{{bean.teacher}}
                                <div class="price1">{{`￥:${bean.price}`}}</div>
                            </div> -->
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                            <share></share>
                        </el-col>
                    </el-row>
                    <div class="action">
                        <div>
                            <div class="time">
                                <icon-svg iconClass="time"></icon-svg>&nbsp;&nbsp;{{bean.open_class_time}}</div>
                            <div class="teacher">
                                <icon-svg iconClass="login"></icon-svg>&nbsp;&nbsp;{{bean.teacher}}
                                <div class="price1">{{`￥:${bean.price}`}}</div>
                            </div>
                        </div>
                        <div>
                            <el-button-group>
                                <el-button >咨询</el-button>
                                <el-button type="primary">报名</el-button>
                            </el-button-group>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Share from "../.././livevideodetail/components/share";
export default {
  props: {
    bean: {
      type: Object,
      default: {}
    }
  },
  components: {
    Share
  },
  data(){
      return {
          errorImg:'this.src="' + require('../../../assets/default.png') + '"',
      }
  }
};
</script>


<style lang="scss" scoped>
.item {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 20px;
  .img {
    height: 140px;
    position: relative;
    .bg {
      border: 1px solid grey;
      padding: 1px;
      width: 100%;
      height: 100%;
    }
    .play {
      position: absolute;
      width: 40px;
      height: 40px;
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
    .teacher {
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
}

.price {
  color: #ff7101;
  font-size: 24px;
}
</style>


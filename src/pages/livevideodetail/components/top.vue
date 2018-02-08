<template>
  <div class="wrapper">
    <div class="content">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="img">
            <img :src="detailBean.image" alt="直播封面" class="bg" :onerror="errorImg" />
            <img src="../../.././assets/playbtn.png" alt="直播按钮" class="play" @click="handlePlay" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <div class="info">
            <div class="title">
              {{detailBean.description}}
            </div>
            <el-row>
              <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
                <div class="types">
                  {{detailBean.types ? detailBean.types.join('-') : ''}}
                </div>
                <div class="time">
                  <icon-svg iconClass="time"></icon-svg>&nbsp;&nbsp;{{detailBean.open_class_time}}</div>
                <div class="teacher">
                  <icon-svg iconClass="login"></icon-svg>&nbsp;&nbsp;{{detailBean.teacher}}
                  <div class="price1">{{`￥:${detailBean.price}`}}</div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                <share></share>
              </el-col>
            </el-row>
            <div class="action">
              <div class="btns">
                <btns :bean="detailBean"></btns>
              </div>
              <div class="price">{{`￥:${detailBean.price}`}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog :visible.sync="dialogDown" width="300px" center>
      <div slot="title">建议下载客户端,观看更流畅!</div>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDown = false">下载客户端</el-button>
        <el-button type="primary" @click="dialogDown = false">网页版观看</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { lvdetail } from "@/api/livevideo";
import Btns from "./btns";
import Share from "./share";

import { mapMutations, mapState } from "vuex";
import { bjroom } from "@/api/livevideo";
export default {
  data() {
    return {
      detailBean: {},
      errorImg: 'this.src="' + require("../../../assets/default.png") + '"',
      dialogDown: false
    };
  },
  props: {
    lvId: {
      type: String,
      required: true
    }
  },
  mounted() {
    let p = { id: this.lvId };
    lvdetail(p).then(res => {
      this.detailBean = res;
    });
  },
  components: {
    Btns,
    Share
  },
  methods: {
    handlePlay() {
      let p = { id: this.lvId };
      bjroom(p).then(res => {
        if (res.type == 2) {
          //回放
          window.open(res.url);
        } else if (res.type == 1) {
          //直播
          var url =
            "baijiacloud://urlpath=" +
            encodeURIComponent(res.url) +
            "&token=token&ts=ts";
          window.open(url);
          this.dialogDown = true;
        }
      });
    }
  },
  computed: {
    ...mapState(["login"])
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 400px;
  margin-top: 20px;
  padding-top: 40px;
  background-image: url(../../.././assets/bg_ds.jpg);
  .content {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px;
    .img {
      height: 230px;
      position: relative;
      border: 1px solid grey;
      // padding: 1px;
      overflow: hidden;
      &:hover .bg {
        transform: scale(1.05);
      }
      .bg {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }
      .play {
        position: absolute;
        left: 50%;
        margin-left: -30px;
        top: 50%;
        margin-top: -30px;
        cursor: pointer;
      }
    }
    .info {
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 1;
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
        margin-bottom: 10px;
        .price1 {
          display: none;
        }
      }

      .action {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .price {
          color: #ff7101;
          font-size: 30px;
          line-height: 1;
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .wrapper {
    padding: 10px;
    .content {
      padding: 0px;
      overflow-x: hidden;
      background-color: transparent;
      .img {
        margin-bottom: 10px;
        background-color: #fff;
      }
      .info {
        background-color: #fff;
        padding: 10px;
        .teacher {
          .price1 {
            display: block;
            float: right;
          }
        }
        .action {
          .price {
            display: none;
          }
        }
      }
    }
  }
}
</style>



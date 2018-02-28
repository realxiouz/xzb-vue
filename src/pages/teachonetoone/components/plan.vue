<template>
  <div class="plan-wrapper">
    <div class="programs">
      <div>
        <span>教学方案</span>
        <el-button @click="handleShowAddProgram" type="primary">+添加教学方案</el-button>
      </div>
      <ul>
        <li v-for=" item in programs" :key="item.id">
          <div class="info">
            <div class="img-name">
              <img :src="item.avatar" alt="">
              <span>{{item.title}}</span>
            </div>
            <div class="time">
              {{item.add_time}}
            </div>
            <div class="act">
              <el-button type="text" @click="handleEditProgram(item)">编辑</el-button>
              <el-button type="text" @click="handleDelProgram(item)">删除</el-button>
              <el-button type="primary" @click="handleSendToClass(item)" :disabled="item.status == 0">{{item.status == 0 ? '修订中' : '发送给学员'}}</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="plans">
      <div class="plan-title">
        <span>上课计划</span>
        <el-button @click="handleAddPlan" type="primary">+添加上课计划</el-button>
      </div>
      <div class="choose-sort">
        <div class="time">
          <span :class="{active : true}" @click="handleTimeSort">日期
            <i :class="timeSort== 0? 'el-icon-arrow-down': 'el-icon-arrow-up'"></i>
          </span>
        </div>
      </div>
      <plan-item v-for="item in plans" :key="item.open_class_id" :bean="item" @sendPlan="handleSendPlan" @delPlan="handleDelPlan" @editPlan="handleEditPlan"></plan-item>
    </div>
    <!-- 教学方案添加 编辑 dialog -->
    <el-dialog title="教学方案" :visible.sync="dialogProgram" :width=" window.screen.width < 500 ? '300px' : '600px'" v-if="dialogProgram">
      <el-form :model="formProgram">
        <el-form-item>
          <el-input placeholder="目标标题" v-model="formProgram.title"></el-input>
        </el-form-item>
        <el-form-item>
          <q-editor @editorData="handleProgramData" :initData="initFormProgram"></q-editor>
        </el-form-item>
        <el-form-item>
          <el-form-item label="上传附件">
            <el-upload class="upload" action="/api/uploadAttach" :on-success="handleSuccessAttach" :limit="1" :file-list="attachList" :on-remove="handleRemoveAttach">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitProgram(0)">保存为草稿</el-button>
        <el-button type="primary" @click="submitProgram(1)">存为正式方案</el-button>
      </span>
    </el-dialog>
    <!-- 教学计划添加 编辑 dialog -->
    <el-dialog title="教学方案" :visible.sync="dialogPlan" :width=" window.screen.width < 500 ? '300px' : '600px'" v-if="dialogPlan">
      <el-form :model="formPlan">
        <el-form-item>
          <el-input placeholder="目标标题" v-model="formPlan.description"></el-input>
        </el-form-item>
        <el-form-item>
          <q-editor @editorData="handlePlanData" :initData="initFormPlan"></q-editor>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="datetime" placeholder="选择上课时间" v-model="formPlan.open_class_time" :picker-options="pickerOption"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model.number="formPlan.class_hour" placeholder="时长">
            <template slot="append">小时</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="上课老师" v-model="formPlan.teacher" :disabled="!isAddPlan"></el-input>
        </el-form-item>
        <el-form-item label="上传封面" prop="img">
          <el-upload action="/api/uploadImage" :limit="1" :on-success="handleImgSuccess" :on-error="handleImgError" ref="imgUpload" :before-upload="beforeImgUpload" list-type="picture" :file-list="imgList" :on-remove="handleImgRemove">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="isAddPlan">
          <el-button type="primary" @click="handleCreateRoom">生成直播间</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formPlan.is_open">作为直播公开课(获得更多的推荐)</el-checkbox>
        </el-form-item>
        <el-form-item v-if="formPlan.is_open">
          <el-form-item label="上传附件">
            <el-upload action="/api/uploadAttach" :on-success="handleSuccessAttachPlan" :limit="1" :file-list="attachListPlan" :on-remove="handleRemoveAttachPlan">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPlan">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  programs,
  sendprogram,
  delprogram,
  addprogram,
  editprogram,
  addplan,
  sendplan,
  delplan,
  editplan,
  oneplanlist
} from "@/api/service";

import { createroom } from "@/api/livevideo";
import qEditor from "@/components/quill-editor";
import PlanItem from "./planitem";

import { mapState, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState(["orderId"]),
    plansParam() {
      return {
        orderid: this.orderId,
        sort: this.sort
      };
    },
    programsParam(){
      return {
        id: this.$route.params.id,
        type:0,
        orderid: this.orderId
      };
    }
  },
  watch: {
    plansParam(val){
      this.getPlans();
    },
    programsParam(){
      this.getPrograms();
    }
  },
  methods: {
    getPrograms() {
      programs( this.programsParam ).then(res => {
        this.programs = res;
      });
    },
    getPlans() {
      oneplanlist(this.plansParam).then(res => {
          this.plans = res.plans;
        }
      );
    },
    handleSendToClass(item) {
      if (item.is_sended == 1) {
        this.$message.error("已发送过了");
        return;
      }
      this.sendType = 1;
      this.proId = item.id;
      this.submmitSend();
    },
    handleShowAddProgram() {
      this.isAddProgram = true;
      this.formProgram = {};
      this.attachList = [];
      this.initFormProgram = "";
      this.dialogProgram = true;
    },
    handleEditProgram(item) {
      this.isAddProgram = false;
      this.formProgram.id = item.id;
      this.formProgram.title = item.title;
      this.initFormProgram = item.content;
      this.formProgram.attach = item.attach;
      if (item.attach) {
        this.attachList = [];
        this.attachList.push({
          url: item.attach.path,
          name: item.attach.name.split("/")[
            item.attach.name.split("/").length - 1
          ]
        });
      }
      this.dialogProgram = true;
    },
    handleDelProgram(item) {
      delprogram({ id: item.id }).then(res => {
        this.$message.success("已删除");
        this.getPrograms();
      });
    },
    submmitSend() {
      if (this.sendType === 1) {
        sendprogram({
          id: this.proId,
          type: 0,
          order_id: this.orderId
        }).then(res => {
          this.$message.success("发送完毕");
          this.getPrograms();
        });
      } else if (this.sendType === 2) {
        sendplan({
          id: this.proId,
          type: 0,
          order_id: this.orderId
        }).then(res => {
          this.$message.success("发送完毕");
          this.getPlans();
        });
      }
    },
    handleSuccessAttach(res, file, fl) {
      if (!res.success) {
        this.$message.error(res.message.msg);
        return;
      }
      this.formProgram.attach = res.data.file;
    },
    handleSuccessAttachPlan(res, file, fl) {
      if (!res.success) {
        this.$message.error(res.message.msg);
        return;
      }
      this.formPlan.attach = res.data.file;
    },
    handleRemoveAttach() {
      this.formProgram.attach = null;
    },
    handleRemoveAttachPlan() {
      this.formPlan.attach = null;
    },
    handleProgramData(html) {
      this.formProgram.content = html;
    },
    submitProgram(status) {
      if (this.isAddProgram) {
        addprogram(
          Object.assign({}, this.formProgram, {
            status,
            order_id: this.orderId,
            service_id: this.$route.params.id,
          })
        ).then(res => {
          this.dialogProgram = false;
          this.$message.success("方案添加成功");
          this.getPrograms();
        });
      } else {
        editprogram(
          Object.assign({}, this.formProgram, {
            status,
            service_id: this.$route.params.id,
          })
        ).then(res => {
          this.dialogProgram = false;
          this.$message.success("方案编辑成功");
          this.getPrograms();
        });
      }
    },
    // 教学计划相关方法
    handleAddPlan() {
      this.isAddPlan = true;

      this.formPlan = {
        is_open: false,
        image: require("../../../assets/default.png")
      };
      this.imgList = [
        { url: require("../../../assets/default.png"), name: "default.png" }
      ];
      this.attachListPlan = [];
      this.initFormPlan = "";

      this.dialogPlan = true;
    },
    handleEditPlan(item) {
      this.isAddPlan = false;

      this.formPlan = {
        open_class_id: item.open_class_id,
        description: item.description,
        content_course: item.content_course,
        open_class_time: new Date(item.open_class_time),
        class_hour: item.class_hour,
        teacher: item.nickname,
        image: item.image,
        attach: item.attach,
        live_id: item.live_id,
        service_id: item.service_id,
        is_open: item.is_open == 1,

        order_id: this.orderId
      };
      this.imgList = [];
      this.attachListPlan = [];
      this.initFormPlan = item.content_course;

      if (item.attach) {
        this.attachListPlan.push({
          url: item.attach.path,
          name: item.attach.name.split("/")[
            item.attach.name.split("/").length - 1
          ]
        });
      }
      if (item.image) {
        this.imgList.push({
          url: item.image,
          name: item.image.split("/")[item.image.split("/").length - 1]
        });
      }
      this.dialogPlan = true;
    },
    handleCreateRoom() {
      let p = {
        open_class_time: this.formPlan.open_class_time,
        class_hour: this.formPlan.class_hour,
        description: this.formPlan.description
      };
      createroom(p).then(res => {
        this.liveId = res.liveid;
        this.$message.success(`直播间创建成功`);
      });
    },
    submitPlan() {
      if (this.isAddPlan) {
        let p = Object.assign({}, this.formPlan, {
          live_id: this.liveId,
          service_id: this.$route.params.id,
          order_id: this.orderId
        });
        addplan(p).then(res => {
          this.dialogPlan = false;
          this.$message.success("添加成功");
          this.getPlans();
        });
      } else {
        editplan(this.formPlan).then(res => {
          this.dialogPlan = false;
          this.$message.success("编辑成功");
          this.getPlans();
        });
      }
    },
    handleImgSuccess(res, file, fl) {
      if (!res.success) {
        this.$refs.imgUpload.clearFiles();
        this.$message.error(res.message.msg);
        return;
      }
      this.formPlan.image = res.data.file.url;
    },
    handleImgError(err, file, fl) {
      this.$message.error("图片上传失败");
    },
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleImgRemove() {
      this.formPlan.image = "";
    },
    handleTimeSort() {
      this.timeSort = !this.timeSort;
      if (this.timeSort) {
        this.sort = "dateup";
      } else {
        this.sort = "datedown";
      }
    },
    handleSendPlan(item) {
      this.sendType = 2;
      this.proId = item.open_class_id;
      this.submmitSend();
    },
    handleDelPlan(id) {
      delplan({ id }).then(res => {
        this.$message.success("课程已删除");
        this.getPlans();
      });
    },
    handlePlanData(html) {
      this.formPlan.content_course = html;
    }
  },
  data() {
    return {
      programs: [], //方案
      plans: [], //计划

      proId: "",

      dialogProgram: false,
      formProgram: {},
      initFormProgram: "",
      isAddProgram: false,
      attachList: [],

      dialogPlan: false,
      formPlan: {},
      imgList: [],
      attachListPlan: [],
      isAddPlan: false,
      initFormPlan: "",

      //时间选择选项
      pickerOption: {
        disabledDate(val) {
          if (+new Date() - val - 24 * 3600 * 1000 < 0) {
            return false;
          }
          return true;
        }
      },

      sort: "datedown",

      sendType: 1,

      timeSort: 0,
      liveId: "",
      window: window,
    };
  },
  components: {
    qEditor,
    PlanItem
  },
  mounted() {
    this.getPlans();
    this.getPrograms();
  }
};
</script>

<style lang="scss" scoped>
@import ".@/../style/element-variables";
.plan-wrapper {
  .title {
    padding: 0 20px;
    line-height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #999;
    font-size: 0.9rem;
    > span {
      font-weight: bold;
      font-size: 1.2rem;
      color: lightgreen;
    }
  }

  .programs {
    padding: 20px;
    background-color: #fff;
    ul {
      > li {
        border: 1px solid #ededed;
        background-color: #f8f8f8;
        margin-top: 10px;
        padding: 10px 20px;
        .info {
          display: flex;
          align-items: center;
          .img-name {
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .time {
            margin: 0 30px;
            flex: 1;
          }
        }
      }
    }
  }
  .choose-type,
  .choose-class {
    ul {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      li {
        padding: 20px;
        font-size: 0.8rem;
        > span {
          cursor: pointer;
          padding: 5px;
          &.active {
            background-color: $--color-primary;
            color: #fff;
          }
        }
      }
    }
  }
  .choose-sort {
    display: flex;
    background-color: #fff;
    font-size: 0.8rem;
    .time {
      padding: 20px;
      > span {
        cursor: pointer;
        padding: 5px;
        &.active {
          background-color: $--color-primary;
          color: #fff;
        }
      }
    }
  }

  .plan-title{
    padding: 20px;
    background-color: #fff;
    margin: 10px 0;
  }
}
</style>



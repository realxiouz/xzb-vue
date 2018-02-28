<template>
  <div class="plan-wrapper">
    <div class="title">该阶段共有&nbsp;
      <span>{{inforBean.num}}</span>&nbsp;次课</div>
    <div class="target">
      <div>阶段目标</div>
      <div class="content">
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            {{inforBean.title}}
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-button type="text" @click="handleShowTargetEdit">编辑</el-button>
            <el-button type="primary">发送至各班级</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="programs">
      <div>
        <span>教学方案</span>
        <el-button @click="handleShowAddProgram" v-if="programAuth">+添加教学方案</el-button>
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
              <el-button type="text" @click="handleEditProgram(item)" v-if="programAuth">编辑</el-button>
              <el-button type="text" @click="handleDelProgram(item)" v-if="programAuth">删除</el-button>
              <el-button type="primary" @click="handleSendToClass(item)" :disabled="item.status == 0">{{item.status == 0 ? '修订中' : '发送到班级'}}</el-button>
            </div>
          </div>
          <div class="sended" v-if="item.sendedclasses.length > 0">
            <div>已发送至以下班级:</div>
            <ul>
              <li v-for="bean in item.sendedclasses" :key="bean.id">{{bean.name}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="plans">
      <div>
        <span>上课计划</span>
        <el-button @click="handleAddPlan" v-if="planAuth">+添加上课计划</el-button>
      </div>
      <div class="choose-type">
        <ul>
          <li>
            <span :class="{active : usertype == 1}" @click="usertype=1">发布者</span>
          </li>
          <li>
            <span :class="{active : usertype == 2}" @click="usertype=2">班主任</span>
          </li>
          <li>
            <span :class="{active : usertype == 3}" @click="usertype=3">公开课</span>
          </li>
        </ul>
      </div>
      <!-- <div class="choose-class">
        <ul>
          <li v-for="item in classes" :key="item.id">
            <span :class="{active : item.id == classid}" @click="classid=item.id">{{item.name}}</span>
          </li>
        </ul>
      </div> -->
      <div class="choose-sort">
        <div class="time">
          <span :class="{active : true}" @click="handleTimeSort">日期
            <i :class="timeSort== 0? 'el-icon-arrow-down': 'el-icon-arrow-up'"></i>
          </span>
        </div>
      </div>
      <plan-item v-for="item in plans" :key="item.open_class_id" :bean="item" @sendPlan="handleSendPlan" @delPlan="handleDelPlan" @editPlan="handleEditPlan"></plan-item>
    </div>
    <!-- 阶段目标dialog -->
    <el-dialog title="编辑阶段目标" :visible.sync="dialogTarget" :width=" window.screen.width < 500 ? '300px' : '600px'" v-if="dialogTarget">
      <el-form :model="formTarget">
        <el-form-item>
          <el-input placeholder="目标标题" v-model="formTarget.title"></el-input>
        </el-form-item>
        <el-form-item>
          <q-editor @editorData="handleData" :initData="initFormTarget"></q-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTarget = false">取 消</el-button>
        <el-button type="primary" @click="handleEditTarget">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发送班级dialog -->
    <el-dialog title="选择班级" :visible.sync="dialogChooseClass" :width=" window.screen.width < 500 ? '300px' : '600px'" v-if="dialogChooseClass">
      <el-form>
        <el-checkbox-group v-model="selClasses">
          <el-form-item v-for="item in toBeSelClasses" :key="item.id">
            <el-checkbox :label="item.id" :disabled="item.is_sended === 1 || item.sended_able === 0">
              {{`${item.name} ${item.class_num && item.period_num ? `(${item.class_num}/${item.period_num})` : ''}`}}
            </el-checkbox>
          </el-form-item>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChooseClass = false">取 消</el-button>
        <el-button type="primary" @click="submmitSendPrograms">确 定</el-button>
      </span>
    </el-dialog>
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
import { mapState } from "vuex";
import {
  period,
  programs,
  plans,
  edittarget,
  sendprogram,
  delprogram,
  addprogram,
  editprogram,
  addplan,
  sendplan,
  delplan,
  editplan
} from "@/api/service";

import { createroom } from "@/api/livevideo";
import qEditor from "@/components/quill-editor";
import PlanItem from "./planitem";
export default {
  computed: {
    ...mapState(["periodId", "classes", "classId"]),
    plansParam() {
      return {
        id: this.$route.params.id,
        usertype: this.usertype,
        classid: this.classId,
        sort: this.sort
      };
    },
    //班主任班级不同 权限不同
    programsParam() {
      return {
        id: this.$route.params.id,
        type: 2,
        clsid: this.classId,
      };
    }
  },
  watch: {
    periodId: {
      handler: function(val) {
        //有阶段id才能获取阶段信息(2018-02-11)
        if(val > 0){
          this.getPeriodInfo(val);
        }
      },
      immediate: true
    },
    plansParam: {
      handler: function(val) {
        this.getPlans();
      }
    },
    programsParam:{
      handler: function(val) {
        this.getPrograms();
      }
    }
  },
  methods: {
    getPeriodInfo(id) {
      //阶段信息
      this.getPeriod(id);
      //教学方案
      this.getPrograms();
      //教学计划
      this.getPlans();
    },
    getPrograms() {
      programs(Object.assign({}, this.programsParam, { lnid: this.periodId })).then(res => {
        this.programs = res;
      });
    },
    getPeriod(id) {
      period({ id }).then(res => {
        this.inforBean = res;
        this.formTarget.title = res.title;
        this.initFormTarget = res.target;
      });
    },
    getPlans() {
      if (this.classId > 0) {
        plans(Object.assign({}, this.plansParam, { lnid: this.periodId })).then(
          res => {
            this.plans = res.plans;
          }
        );
      }
    },
    handleShowTargetEdit() {
      this.dialogTarget = true;
    },
    handleSendToClass(item) {
      this.sendType = 1;
      this.selClasses = [];
      this.toBeSelClasses = item.sendclasses;
      this.proId = item.id;
      this.dialogChooseClass = true;
    },
    handleData(html) {
      this.formTarget.target = html;
    },
    handleEditTarget() {
      edittarget({
        id: this.periodId,
        title: this.formTarget.title,
        target: this.formTarget.target
      }).then(res => {
        this.dialogTarget = false;
        this.$message.success("目标编辑成功");
        this.getPeriodInfo(this.periodId);
      });
    },
    handleShowAddProgram() {
      this.isAddProgram = true;
      this.formProgram = {};
      this.attachList = [];
      this.initFormProgram = "";
      this.dialogProgram = true;
    },
    handleEditProgram(item) {
      if(!item.editable){
        this.$message.error('不能编辑');
        return;
      }
      this.isAddProgram = false;
      this.formProgram.id = item.id;
      this.formProgram.title = item.title;
      this.formProgram.learning_periods_id = item.learning_periods_id;
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
      if(!item.deleteable){
        this.$message.error('不能删除');
        return;
      }
      delprogram({ id: item.id }).then(res => {
        this.$message.success("已删除");
        this.getPrograms();
      });
    },
    submmitSendPrograms() {
      if (this.sendType === 1) {
        sendprogram({ id: this.proId, type: 2, classes: this.selClasses }).then(
          res => {
            this.$message.success("发送完毕");
            this.dialogChooseClass = false;
            this.getPrograms();
          }
        );
      } else if (this.sendType === 2) {
        sendplan({
          id: this.sendClassId,
          type: 2,
          classes: this.selClasses
        }).then(res => {
          this.$message.success("发送完毕");
          this.dialogChooseClass = false;
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
            service_id: this.$route.params.id,
            status,
            learning_periods_id: this.periodId
          })
        ).then(res => {
          this.dialogProgram = false;
          this.$message.success("方案添加成功");
          this.getPrograms();
        });
      } else {
        editprogram(
          Object.assign({}, this.formProgram, {
            service_id: this.$route.params.id,
            status
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
      //班主任没有权限 添加(02-23)
      if(!this.planAuth){
        this.$message.error('没有此权限');
        return;
      }

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
        learning_periods_id: item.learning_periods_id,
        is_open: item.is_open == 1
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
          learning_periods_id: this.periodId
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
      this.selClasses = [];
      this.sendType = 2;
      this.toBeSelClasses = item.sendclass;
      this.sendClassId = item.open_class_id;
      this.dialogChooseClass = true;
    },
    handleDelPlan(id) {
      if(!this.planAuth){
        this.$message.error('没有此权限');
        return;
      }
      delplan({ id }).then(res => {
        this.$message.success("课程已删除");
        this.getPlans();
      });
    },
    handlePlanData(html) {
      this.formPlan.content_course = html;
    },
  },
  data() {
    return {
      // inforBean: { num: 0, title: "" }, //信息
      programs: [], //方案
      plans: [], //计划

      dialogTarget: false,
      formTarget: {},
      initFormTarget: "",

      dialogChooseClass: false,
      toBeSelClasses: [],
      selClasses: [],
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
      usertype: 1,
      // classid: 0,
      sort: "datedown",

      sendType: 1,
      sendClassId: 0,

      timeSort: 0,
      liveId: "",
      window:window,

      inforBean: { num: 0, title: "" } //信息
    };
  },
  components: {
    qEditor,
    PlanItem
  },
  mounted() {
    // this.classid = this.classes[0].id;
  },
  props:{
    planAuth:{
      type: Boolean,
      default: true
    },
    programAuth:{
      type: Boolean,
      default: true
    },
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

  .target {
    background-color: #fff;
    padding: 20px;
  }

  .programs {
    ul {
      > li {
        .info {
          display: flex;
          .img-name {
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
        }
        .sended {
          ul {
            display: flex;
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
}
</style>



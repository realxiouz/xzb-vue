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
        <el-button @click="handleShowAddProgram">+添加教学方案</el-button>
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
    <div class="plans"></div>
    <el-dialog title="编辑阶段目标" :visible.sync="dialogTarget" width="300px" v-if="dialogTarget">
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

    <el-dialog title="选择班级" :visible.sync="dialogChooseClass" width="300px" v-if="dialogChooseClass">
      <el-form>
        <el-checkbox-group v-model="selClasses">
          <el-form-item v-for="item in toBeSelClasses" :key="item.id">
            <el-checkbox :label="item.id" :disabled="item.is_sended === 1">{{item.name}}</el-checkbox>
          </el-form-item>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChooseClass = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmitSendPrograms">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="教学方案" :visible.sync="dialogProgram" width="300px" v-if="dialogProgram">
      <el-form :model="formProgram">
        <el-form-item>
          <el-input placeholder="目标标题" v-model="formProgram.title"></el-input>
        </el-form-item>
        <el-form-item>
          <q-editor @editorData="handleAddProgramData" :initData="initFormProgram"></q-editor>
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
        <el-button @click="submitAddProgram(0)">保存为草稿</el-button>
        <el-button type="primary" @click="submitAddProgram(1)">存为正式方案</el-button>
      </span>
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
  editprogram
} from "@/api/service";
import qEditor from "@/components/quill-editor";
export default {
  computed: {
    ...mapState(["periodId"])
  },
  watch: {
    periodId: {
      handler: function(val) {
        this.getPeriodInfo(val);
      },
      immediate: true
    }
  },
  methods: {
    getPeriodInfo(id) {
      //阶段信息
      this.getPeriod(id);
      //教学方案
      this.getPrograms(id);
      //教学计划
      plans({ id: this.$route.params.id, lnid: id }).then(res => {
        // console.log(res);
      });
    },
    getPrograms(id) {
      programs({ id: this.$route.params.id, type: 2, lnid: id }).then(res => {
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
    handleShowTargetEdit() {
      this.dialogTarget = true;
    },
    handleSendToClass(item) {
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
      this.isAddProgram = false;
      this.formProgram.id = item.id;
      this.formProgram.title = item.title;
      this.formProgram.learning_periods_id = item.learning_periods_id;
      this.initFormProgram = item.content;
      this.formProgram.attach = item.attach;
      if(item.attach){
        this.attachList = [];
        this.attachList.push({url: item.attach.path, name: item.attach.name.split('/')[item.attach.name.split('/').length -1]});
      }
      this.dialogProgram = true;
    },
    handleDelProgram(item) {
      delprogram({ id: item.id }).then(res => {
        this.$message.success("已删除");
        this.getPrograms(this.periodId);
      });
    },
    handleSubmmitSendPrograms() {
      sendprogram({ id: this.proId, type: 2, classes: this.selClasses }).then(
        res => {
          this.$message.success("发送完毕");
          this.dialogChooseClass = false;
          this.getPrograms(this.periodId);
        }
      );
    },
    handleSuccessAttach(res, file, fl) {
      if (!res.success) {
        this.$message.error(res.message.msg);
        return;
      }
      this.formProgram.attach = res.data.file;
    },
    handleRemoveAttach(){
      this.formProgram.attach = null;
    },
    handleAddProgramData(html) {
      this.formProgram.content = html;
    },
    submitAddProgram(status) {
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
          this.getPrograms(this.periodId);
        });
      } else {
        editprogram(
          Object.assign({}, this.formProgram, {
            service_id: this.$route.params.id,
            status,
          })
        ).then(res => {
          this.dialogProgram = false;
          this.$message.success("方案编辑成功");
          this.getPrograms(this.periodId);
        });
      }
    }
  },
  data() {
    return {
      inforBean: { num: 0, title: "" }, //信息
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
      attachList:[],
    };
  },
  components: {
    qEditor
  }
};
</script>

<style lang="scss" scoped>
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
}
</style>



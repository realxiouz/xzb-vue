<template>
    <div>
        <div class="class-setting">
            <div class="title">
                <span>班级设置</span>
            </div>
            <el-form ref="form" :model="formClass" label-width="80px">
                <el-form-item label="班级名称">
                    <el-input v-model="formClass.name" :disabled="formClass.is_default == 1" :maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="人数上限">
                    <el-input v-model.number="formClass.num" :disabled="formClass.is_default == 1" :max="500"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formClass.is_open">开放班级报名,截止报名日期:</el-checkbox>
                    <el-date-picker v-model="formClass.end_time" type="datetime" placeholder="选择日期时间" v-if="formClass.is_open">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formClass.auto_sendplan">自动通知学员上课计划</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formClass.auto_sendscheme">自动发送学习方案给学员</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formClass.is_rate">设置班主任的提成比例</el-checkbox>
                    <el-input v-model.number="formClass.adviser_percentage" :max="100" v-if="formClass.is_rate" style="width:100px">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSaveClass">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="class-master">
            <div class="title">
                <span>班主任</span>
                <!-- <el-button type="primary">+添加班主任</el-button> -->
            </div>
            <div class="add-master">
                <el-form :inline="true" :model="formMaster">
                    <el-form-item label="昵称">
                        <el-input v-model="formMaster.nickname" placeholder="昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formMaster.phone" placeholder="手机"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleAddMaster">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="masters">
                <ul>
                    <li v-for="item in advisers" :key="item.id">
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                昵称:{{item.nickname}}
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                电话:{{item.phone}}
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                <el-button-group>
                                    <el-button type="primary" @click="handleDelMaster(item)">删除</el-button>
                                    <el-button type="primary" @click="showDialogSetting(item)">权限
                                    </el-button>
                                </el-button-group>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog title="设置权限" :visible.sync="dialogSetting" width="300px">
            <el-form :model="formSetting">
                <el-checkbox-group v-model="formSetting.authority">
                    <el-form-item>
                        <el-checkbox label="1">拟定学习规划</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="2">拟定上课计划</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="3">拟定课前预习计划</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="4">拟定课后练习</el-checkbox>
                    </el-form-item>
                </el-checkbox-group>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSetting = false">取 消</el-button>
                <el-button type="primary" @click="handleSetAuthority">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import {
  classinfo,
  classset,
  addmaster,
  delmaster,
  setmasterauth
} from "@/api/service";
export default {
  computed: {
    ...mapState(["classId"])
  },
  watch: {
    classId: {
      handler: function(val) {
        this.getClassInfo(val);
      },
      immediate: true
    }
  },
  data() {
    return {
      formClass: {},
      formMaster: {},
      advisers: [],
      dialogSetting: false,
      formSetting: { authority: [] },
      master: ""
    };
  },
  methods: {
    handleSaveClass() {
      let p = {
        id: this.classId,
        name: this.formClass.name,
        num: this.formClass.num,
        is_open: this.formClass.is_open,
        auto_sendplan: this.formClass.auto_sendplan,
        auto_sendscheme: this.formClass.auto_sendscheme,
        end_time: this.formClass.end_time,
        adviser_percentage: this.formClass.is_rate
          ? this.formClass.adviser_percentage
          : "0"
      };
      classset(p).then(res => {
        this.getClassInfo(this.classId);
        this.$message.success("班级设置完毕");
      });
    },
    handleAddMaster() {
      addmaster(
        Object.assign({}, this.formMaster, {
          service_id: this.$route.params.id,
          class_id: this.classId
        })
      ).then(res => {
        // let p = { id: this.classId };
        // classinfo(p).then(res => {
        //   this.formClass = res.classinfo;
        //   this.advisers = res.advisers;
        //   this.$message.success("班主任添加成功");
        // });
        this.getClassInfo(this.classId);
        this.$message.success("班主任添加成功");
      });
    },
    handleDelMaster(item) {
      let p = { id: item.id };
      delmaster(p).then(res => {
        this.getClassInfo(this.classId);
        this.$message.success("班主任已删除");
      });
    },
    showDialogSetting(item) {
      this.formSetting.authority = item.authority;
      this.master = item;
      this.dialogSetting = true;
    },
    handleSetAuthority() {
      let p = { authority: this.formSetting.authority, id: this.master.id };
      setmasterauth(p).then(res => {
        this.getClassInfo(this.classId);
        this.$message.success("权限修改完毕");
        this.dialogSetting = false;
      });
    },
    getClassInfo(id) {
      let p = { id };
      classinfo(p).then(res => {
        //以此种方式生成对象,出来checkbox不能改变的bug(2018-02-11)
        this.formClass = {
          is_default: res.classinfo.is_default,
          name: res.classinfo.name,
          num: res.classinfo.num,
          is_open: res.classinfo.is_open == 1,
          end_time: res.classinfo.end_time == null ? new Date() : new Date(res.classinfo.end_time),
          auto_sendplan: res.classinfo.auto_sendplan == 1,
          auto_sendscheme: res.classinfo.auto_sendscheme == 1,
          is_rate: res.classinfo.adviser_percentage > 0,
          adviser_percentage: res.classinfo.adviser_percentage
        };
        // this.formClass.is_default = res.classinfo.is_default;
        // this.formClass.name = res.classinfo.name;
        // this.formClass.num = res.classinfo.num;
        // this.formClass.auto_sendplan = res.classinfo.auto_sendplan == 1 ? true : false;
        // this.formClass.auto_sendscheme = res.classinfo.auto_sendscheme == 1 ? true : false;
        this.advisers = res.advisers;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  > span {
    border-bottom: 3px solid lightgreen;
  }
}
</style>



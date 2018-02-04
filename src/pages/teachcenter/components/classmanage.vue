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
                    <el-checkbox v-model="formClass.auto_sendplan">自动通知学员上课计划</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formClass.auto_sendscheme">自动发送学习方案给学员</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSaveClass">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="class-master">
            <div class="title">
                <span>班主任</span>
                <el-button type="primary">+添加班主任</el-button>
            </div>
            <div class="add-master">
                <el-form :inline="true" :model="formMaster">
                    <el-form-item label="昵称">
                        <el-input v-model="formMaster.nickname" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formMaster.phone" placeholder="审批人"></el-input>
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
                                    <el-button type="primary">权限
                                    </el-button>
                                </el-button-group>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { classinfo, classset, addmaster, delmaster } from "@/api/service";
export default {
  computed: {
    ...mapState(["classId"])
  },
  watch: {
    classId: {
      handler: function(val) {
        let p = { id: val };
        classinfo(p).then(res => {
          this.formClass = res.classinfo;
          this.advisers = res.advisers;
        });
      },
      immediate: true
    }
  },
  data() {
    return {
      formClass: {},
      formMaster: {},
      advisers: []
    };
  },
  methods: {
    handleSaveClass() {
      classset().then(res => {
        console.log(res);
      });
    },
    handleAddMaster() {
      addmaster(
        Object.assign({}, this.formMaster, {
          service_id: this.$parent.$route.params.id,
          class_id: this.classId
        })
      ).then(res => {
        console.log(res);
      });
    },
    handleDelMaster(item){
        let p ={id: item.id};
        delmaster(p).then( res => {
            console.log(res)
        })
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



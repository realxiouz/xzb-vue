<template>
    <el-form label-width="80px" ref="form" :model="form" :label-position="labelPosition" style="max-width:800px">
        <el-form-item label="专业类型">
            <el-select v-model="form.type" placeholder="请选择专业类型" @change="handleSel">
                <el-option label="非统考" :value="1"></el-option>
                <el-option label="统考" :value="2"></el-option>
                <el-option label="专业课" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <template v-if="form.type == 1">
            <el-form-item label="地区">
                <el-select v-model="form.selArea" placeholder="请选择地区" @change="getSchools">
                    <el-option v-for="item in areas" :label="item.title" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大学">
                <el-select v-model="form.selCollege" placeholder="请选择大学" @change="getInstitutions">
                    <el-option v-for="item in colleges" :label="item.title" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学院">
                <el-select v-model="form.selInstitution" placeholder="请选择学院" @change="getMajors">
                    <el-option v-for="item in institutions" :label="item.title" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业">
                <el-select v-model="form.selMajor" placeholder="请选择专业" @change="sendSelMajor">
                    <el-option v-for="item in majors" :label="item.title" :value="`${item.id}-${item.major_id}`" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
        </template>
        <el-form-item label="专业分类" v-if="form.type == 2">
            <el-cascader :options="options" :show-all-levels="false" v-model="form.selMajors" @change="sendSelMajor">
            </el-cascader>
        </el-form-item>
        <el-form-item label="专业" v-if="form.type == 3">
            <el-select v-model="form.selSub" placeholder="请选择专业" @change="sendSelMajor">
                <el-option v-for="item in subs" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import { publicsubs, unidieds, schools } from "@/api/livevideo";
export default {
  data() {
    return {
      form: {
        type: "",//选择类型
        selSub: "", //专业课 选择的专业
        selArea: "",//非统考 选择的地区
        selCollege: "",//非统考 选择的大学
        selInstitution: "",//非统考 选择的学院
        selMajor: "",//非统考 选择的专业

        selMajors:[] //统考 选择的专业
      },
      subs: [], // 专业课 全部可选的专业

      options: [], //统考 全部可供选择的专业

      areas: [], //非统考 全部可选的地区
      colleges: [],//非统考 当前地区下的大学
      institutions: [],//非统考 当前大学下的学院
      majors: [], //非统考 当前学院下的专业,

      schoolID:'' //保存schoolId
    };
  },
  props: {
    labelPosition: {
      type: String,
      default: "right"
    },
    initBean:{
      type:Object
    }
  },
  methods: {
    handleSel(val) {
      if (val == 3) {
        if (this.subs.length == 0) {
          publicsubs().then(res => (this.subs = res));
        }
      } else if (val == 2) {
        if (this.options.length == 0) {
          unidieds().then(res => {
            for (let i = 0; i < res.length; i++) {
              this.options.push({ label: res[i].title, value: res[i].id });
              for (let j = 0; j < res[i].child.length; j++) {
                if (!this.options[i].children) {
                  this.options[i].children = [];
                }
                this.options[i].children.push({
                  label: res[i].child[j].title,
                  value: res[i].child[j].id
                });
              }
            }
          });
        }
      } else if (val == 1) {
        if (this.areas.length == 0) {
          let p = {
            pid: 0,
            type: 0
          };
          schools(p).then(res => {
            this.areas = res;
          });
        }
      }
    },
    getSchools(pid) {
      let p = {
        pid,
        type: 1
      };
      schools(p).then(res => {
        this.colleges = res;
        this.institutions = [];
        this.majors = [];

        this.form.selCollege = "";
        this.form.selInstitution = "";
        this.form.selMajor = "";
      });
    },
    getInstitutions(pid) {
      this.schoolID = pid;
      console.log("schoolID is " + this.schoolID)
      let p = {
        pid,
        type: 2
      };
      schools(p).then(res => {
        this.institutions = res;
        this.majors = [];

        this.form.selInstitution = "";
        this.form.selMajor = "";
      });
    },
    getMajors(pid) {
      let p = {
        pid,
        type: 3
      };
      schools(p).then(res => {
        this.majors = res;
        this.form.selMajor = "";
      });
    },
    sendSelMajor(val){
      if(this.form.type == 2){
        val = val.length == 2 ? val[1] : val[0];
      }
      if(this.form.type == 1){
        val = `${this.schoolID}-${val}`
      }
      this.$emit("listenFromChild",val,this.form.type);
    }
  },
  mounted(){
    if(this.initBean != null){
      if(this.initBean.public_subject_id > 0){
        this.form.type = 3;
        console.log(3);
      } else if(this.initBean.unified_id > 0){
        this.form.type = 2;
        console.log(2)
      } else {
        this.form.type = 1;
        console.log(1)
      }
    }
  }
};
</script>


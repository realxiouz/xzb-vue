<template>
  <div class="wrapper">
    <div class="content">
      <div class="title">
        <el-button type="primary" @click="handleAddClass">+新建班级</el-button>
      </div>
      <div class="classes">
        <ul>
          <li v-for=" item in bean" :key="item.id">
            <div class="name">{{item.name}}</div>
            <div class="num">{{`(${item.member_num}/${item.num == 0 ? '无上限': item.num})`}}</div>
            <div class="time">{{item.is_default == 1 ? '截止时间不限' : `截止时间: ${item.end_time ? item.end_time:'未设定'}`}}</div>
            <div class="do">
              <el-button @click="handleManageClass(item)">班级管理</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- newclass dialog -->
    <el-dialog title="新建班级" :visible.sync="dialogNewClass" width="300px" center>
      <el-input placeholder="输入班级名称(最多16字)" v-model="classname" :maxlength="16"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewClass = false">取 消</el-button>
        <el-button type="primary" @click="handleNewClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tutorclass, turornewclass } from "@/api/service";
export default {
  data() {
    return {
      bean: [],
      dialogNewClass: false,
      classname: ''
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id
    };
    tutorclass(p).then(res => {
      this.bean = res;
    });
  },
  methods: {
    handleAddClass() {
      this.dialogNewClass = true;
      this.classname = '';
    },
    handleNewClass(){
      if(!this.classname.trim()){
        this.$message.error(`好像还没输入吧`);
        return;
      }
      let p ={
        service_id: this.$parent.$route.params.id,
        name: this.classname
      };
      turornewclass(p).then( res => {
        if(res.status){
          this.bean.push({id:res.class_id, name: res.name, num: 100, member_num: 0});
          this.dialogNewClass = false;
          this.classname = '';
          this.$message.success(`班级创建成功`);
        }
      })
    },
    handleManageClass(item) {
      this.$message.error(`管理 todo.id is ${item.id}`);
    }
  }
};
</script>

<style>
.contentBody p img {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
@import "../../../../style/element-variables";
.wrapper {
  background-color: #fff;
  padding: 20px;
  .classes {
    ul {
      li {
        display: flex;
        height: 60px;
        padding: 10px;
        border-bottom: 1px dashed #aaa;
        align-items: center;
        font-size: 0.9rem;
        &:nth-of-type(even) {
          background-color: #fafafa;
        }
        &:last-child {
          border-bottom: none;
        }
        .name {
          width: 300px;
          margin-right: 30px;
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
        .num {
          width: 80px;
          margin-right: 30px;
          color: $--color-primary;
          font-weight: bold;
        }
        .time {
          width: 100px;
          color: #999;
          flex: 1;
        }
      }
    }
  }
}
</style>




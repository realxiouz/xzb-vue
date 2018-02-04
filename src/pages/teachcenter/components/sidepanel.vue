<template>
    <div class="tc-side-content">
        <div class="head">
            <div>全部班级
            </div>
            <div>
                <el-button type="primary" size="small" @click="handleAddClass">+新建班级</el-button>
            </div>
        </div>
        <div class="body">
            <div class="text" v-for="item in bean" :key="item.id" @click="handleSelClass(item)" :class="{active: classId == item.id}">{{item.name}}</div>
        </div>
    </div>
</template>


<script>
import { tutorclass, turornewclass } from "@/api/service";
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      bean: [],
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id
    };
    tutorclass(p).then(res => {
      this.bean = res;
      this.SET_CLASS_ID(this.bean[0].id)
    });
  },
  methods: {
    ...mapMutations(['SET_CLASS_ID']) ,
    handleAddClass() {
      this.$message.error("new todo");
    },
    handleSelClass(item) {
      if (this.classId != item.id) {
        this.SET_CLASS_ID(item.id);
      }
    }
  },
  computed:{
      ...mapState(['classId'])
  }
};
</script>

<style lang="scss" scoped>
.tc-side-content {
  background-color: #fff;
  .head {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #e6e6e6;
    padding: 0 20px;
    font-weight: bold;
  }
  .text {
    // height: 60px;
    border-bottom: solid 1px #e6e6e6;
    padding: 0 20px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    &.active {
      background-color: #f2f2f2;
      color: lightgreen;
    }
  }
}
</style>


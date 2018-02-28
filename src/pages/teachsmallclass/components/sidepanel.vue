<template>
  <div class="tc-side-content">
    <template v-if="type == 1">
      <div class="head">
        <div>班级群
        </div>
      </div>
      <!-- <div class="body">
        <div class="text" v-for="item in classesBean" :key="item.id" @click="handleSelClass(item)" :class="{active: classId == item.id}">{{item.name}}</div>
      </div> -->
    </template>
  </div>
</template>


<script>
import {
  smallgroups
} from "@/api/service";
export default {
  data() {
    return {
      classesBean: [],
    };
  },
  mounted() {
    smallgroups({id: this.$route.params.id}).then( res => {
      this.classesBean = res;
    })
  },
  props: {
    type: Number,
    default: 1
  },
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


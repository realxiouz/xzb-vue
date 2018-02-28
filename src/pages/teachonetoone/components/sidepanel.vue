<template>
  <div class="tc-side-content">
    <template>
      <div class="head">
        <div>全部学员
        </div>
      </div>
      <div class="body">
        <template v-if="students.length > 0 ">
          <div class="text" v-for="item in students" :key="item.id" @click="handleSelClass(item)" :class="{active: orderId == item.id}">
            {{`${item.nickname}(${item.alreadynum}/${item.num})`}}
          </div>
        </template>
        <div class="text" v-else>暂无学生报名</div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { onemembers } from "@/api/service";
export default {
  data() {
    return {
      students: []
    };
  },
  mounted() {
    onemembers({ id: this.$route.params.id }).then(res => {
      this.students = res.members;
      if (this.students.length > 0) {
        this.SET_ORDER_ID(this.students[0].id);
      }
    });
  },
  methods: {
    ...mapMutations(["SET_ORDER_ID"]),
    handleSelClass(item) {
      this.SET_ORDER_ID(item.id);
    }
  },
  computed: {
    ...mapState(["orderId"])
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


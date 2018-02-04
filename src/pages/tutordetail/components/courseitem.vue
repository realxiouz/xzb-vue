<template>
    <div class="course-item-wrapper">
        <div class="program">
            <div class="title">
                <span>教学方案</span>
            </div>
            <ul>
                <li v-if="programs.length === 0">还没有发布阶段方案!</li>
                <li v-for="item in programs" :key="item.id">
                    <div class="title">{{item.title}}</div>
                    <div class="other">{{item.content}}</div>
                </li>
            </ul>
        </div>
        <div class="plan">
            <div class="title">
                <span>上课计划</span>
            </div>
            <ul>
                <li v-if="plans.length === 0">还没有发布阶段方案!</li>
                <li v-for="item in plans" :key="item.id">
                    <list-item :bean="item"></list-item>
                </li>
            </ul>
            <div class="page">
                <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { tutorstagecourse } from "@/api/service";
import ListItem from "./listitemlivevideo";
export default {
  data() {
    return {
      programs: [],
      plans: [],
      totalCount: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.getData();
  },
  props: {
    beanId: {
      type: String
    }
  },
  components: {
    ListItem
  },
  methods: {
    handleChangeCurrent() {
      this.currentPage = page;
    },
    getData() {
      let p = { id: this.beanId, page: this.currentPage };
      tutorstagecourse(p).then(res => {
        this.plans = res.plans;
        this.programs = res.program;
        this.totalCount = +res.count;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/element-variables";
.course-item-wrapper {
  .program,
  .plan {
    ul {
      li {
        border-bottom: 1px solid #aaa;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
.title {
  padding: 20px 0;
  span {
    font-weight: bold;
    border-bottom: 3px solid $--color-primary;
  }
}
</style>



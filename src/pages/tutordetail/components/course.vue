<template>
    <div class="wrapper">
        <div class="content">
            <template v-if="type == 1">
                <ul>
                    <li v-for="item in bean" :key="item.id">
                        <div class="title">
                            <div class="name">{{item.title}}</div>
                            <div class="times">该阶段共有
                                <span>{{item.num}}</span>
                                次课</div>
                            <div class="target">
                                阶段目标: {{item.target ? item.target : '还未设置'}}
                            </div>
                            <div class="act">
                                <el-button type="text" @click="handleShowOrHide(item)">
                                    <i :class="curShowId == item.id ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
                                </el-button>
                            </div>
                        </div>
                        <course-item v-if="curShowId == item.id" :beanId="item.id"></course-item>
                    </li>
                </ul>
            </template>
            <template v-if="type == 2"></template>
        </div>
    </div>
</template>

<script>
import { tutorcourse } from "@/api/service";
import CourseItem from "./courseitem";
export default {
  data() {
    return {
      bean: null,
      curPage: 1,
      type: 1,

      curShowId:''
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id,
      page: this.curPage
    };
    tutorcourse(p).then(res => {
      this.type = res.type;
      if (res.type == 1) {
        this.bean = res.lens;
      } else if (res.type == 2) {
        this.bean = res;
      }
    });
  },
  methods: {
      handleShowOrHide(item){
          if(this.curShowId == item.id){
              this.curShowId = -1;
              return;
          }
          this.curShowId = item.id;
      }
  },
  components: {
    CourseItem
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
  padding: 0 20px;
  .content {
    .title {
      display: flex;
      align-items: flex-end;
      padding: 20px 0;
      .name {
        font-size: 24px;
        font-weight: bold;
        color: $--color-primary;
        margin-right: 40px;
      }
      .times {
        margin-right: 40px;
        span {
          font-weight: bold;
          color: $--color-primary;
        }
      }
      .target {
        flex: 1;
      }
    }
  }
}
</style>




<template>
    <div>
        <div v-for="item in list" :key="item.open_class_id">
            <lv-item :bean="item"></lv-item>
        </div>
        <div class="page">
            <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent"></el-pagination>
        </div>
    </div>
</template>


<script>
import { ucsliveclass } from "@/api/usercenter";
import LvItem from "@/pages/list/components/lvitem";
export default {
  mounted() {
      this.getData();
  },
  data() {
    return {
      list: [],
      totalCount: 0,
      currentPage: 1
    };
  },
  components: {
    LvItem
  },
  methods: {
    handleChangeCurrent(page) {
      this.currentPage = page;
    },
    getData() {
      let p = { page: this.currentPage };
      ucsliveclass(p).then(res => {
        this.list = res.list;
        this.totalCount = +res.count;
      });
    }
  }
};
</script>


<style lang="scss" scoped>

</style>

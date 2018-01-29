<template>
    <div>
        <div v-if="totalCount > 0" v-for="item in list" :key="item.open_class_id">
            <lv-item :bean="item"></lv-item>
        </div>
        <div v-if="totalCount == 0" class="msg">他还没有发布信息喔!</div>
        <div class="page" v-if="totalCount > 10">
            <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent"></el-pagination>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .msg{
        background-color: #fff;
        height: 100px;
        padding: 20px;
        margin: 10px 0;
    }
</style>

<script>
import LvItem from "@/pages/list/components/lvitem";
import { lv } from "@/api/othercenter";
export default {
  components: {
    LvItem
  },
  data() {
    return {
      list: [],
      totalCount: 0,
      currentPage: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let p = { page: this.currentPage, type: this.type, id: this.personId };
      lv(p).then(res => {
        this.list = res.list;
        this.totalCount = +res.count;
      });
    },
    handleChangeCurrent(page) {
      this.currentPage = page;
      this.getData();
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    personId: {}
  }
};
</script>

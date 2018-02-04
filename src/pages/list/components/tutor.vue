<template>
  <div>
    <div v-for="item in list" :key="item.service_id">
      <list-item :bean="item"></list-item>
    </div>
    <div class="page">
      <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent"></el-pagination>
    </div>

  </div>
</template>

<script>
import { tutorlist } from "@/api/service";
import ListItem from "./tutoritem";
export default {
  data() {
    return {
      list: [],
      totalCount: 0,
      currentPage:1,
    };
  },
  components: {
    ListItem
  },
  mounted() {
    this.getData();
  },
  props: {
    lvParams: {
      type: Object
    }
  },
  watch: {
    lvParams(val, oldVal) {
    
      if(val.id !== oldVal.id || 
      val.type !== oldVal.type || 
      val.mtype !== oldVal.mtype || 
      val.keywords !== oldVal.keywords ||
      val.sk !== oldVal.sk ||
      val.sort !== oldVal.sort ){
        console.log(val);
        this.getData(val);
      }
      
      
    }
  },
  methods: {
    getData(p) {
      tutorlist(p).then(res => {
        this.list = res.list;
        this.totalCount = +res.count;
      });
    },
    handleChangeCurrent(page){
      this.currentPage = page;
      this.getData(Object.assign({}, this.lvParams, {page}))
    }
  }
};
</script>


<style lang="scss" scoped>

</style>




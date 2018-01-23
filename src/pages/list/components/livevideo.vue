<template>
  <div>
    <div v-for="item in list" :key="item.open_class_id">
      <lv-item :bean="item"></lv-item>
    </div>

  </div>
</template>

<script>
import { oclist } from "@/api/livevideo";
import LvItem from "./lvitem";
export default {
  data() {
    return {
      list: [],
      total: 0
    };
  },
  components: {
    LvItem
  },
  mounted() {
    oclist().then(res => {
      console.log(res);
      this.list = res.list;
      this.total = res.count;
    });
    console.log(this.lvParams)
  },
  props:{
    lvParams:{
      type: Object
    }
  }
};
</script>


<style lang="scss" scoped>

</style>




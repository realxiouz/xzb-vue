<template>
    <div>
      <div v-for="item in beans" :key="item.id" style="background-color:#fff">
        <communicate :bindItem="item"></communicate> 
      </div>
    </div>
</template>

<script>
import { ocpost } from "@/api/livevideo";
import  Communicate from "@/components/communicate-item";
export default {
  data() {
    return {
      beans: []
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id,
      page: 1,
      pagecount: 10
    };
    ocpost(p).then(res => {
      this.beans = res.mps;
    });
  },
  components:{
    Communicate
  }
};
</script>

<style lang="scss" scoped>

</style>



<template>
    <div>{{bean}}
    </div>
</template>

<script>
import { ocpost } from "@/api/livevideo";
export default {
  data() {
    return {
      bean: {}
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id,
      page: 1,
      pagecount: 10
    };
    ocpost(p).then(res => {
      this.bean = res;
    });
  }
};
</script>

<style lang="scss" scoped>

</style>



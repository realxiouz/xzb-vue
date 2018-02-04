<template>
  <div class="wrapper">
    <div class="content">
      <div class="title">
        详细描述:
      </div>
      <div class="contentBody" v-html="bean.detail">
      </div>
    </div>
  </div>
</template>

<script>
import { tutordetail } from "@/api/service";
export default {
  data() {
    return {
      bean: {}
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id
    };
    tutordetail(p).then(res => {
      this.bean = res;
    });
  },
  methods: {

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
.wrapper{
  background-color: #fff;
  padding: 20px;
}
</style>




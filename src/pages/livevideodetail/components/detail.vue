<template>
  <div>
      <div class="attch"></div>
      <div class="content" v-html="bean.content_course">
      </div>
  </div>
</template>

<script>
import { ocdetail } from "@/api/livevideo";
export default {
    data(){
        return {
            bean:{}
        }
        
    },
    mounted(){
        let p ={
            id: this.$parent.$route.params.id,
        };
        ocdetail(p).then( res => {
            this.bean = res;
        })

    }
}
</script>

<style lang="scss" scoped>

</style>



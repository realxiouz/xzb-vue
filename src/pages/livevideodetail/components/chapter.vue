<template>
  <div>{{bean}}
  </div>
</template>

<script>
import { occhapter } from "@/api/livevideo";
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
        occhapter(p).then( res => {
            this.bean = res;
        })

    }
}
</script>

<style lang="scss" scoped>

</style>



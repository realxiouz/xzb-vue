<template>
  <div>{{bean}}
  </div>
</template>

<script>
import { ocbooks } from "@/api/livevideo";
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
        ocbooks(p).then( res => {
            this.bean = res;

        })

    }
}
</script>

<style lang="scss" scoped>

</style>



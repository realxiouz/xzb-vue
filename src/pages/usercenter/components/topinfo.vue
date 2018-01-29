<template>
    <div class="top-info">

    </div>
</template>

<script>
import { userinfo } from '@/api/usercenter';
export default {
    mounted(){
        userinfo().then( res => {
            console.log(res)
        })
    }
}
</script>
<style lang="scss" scoped>

.top-info{
    height: 200px;
    background-image: url(../../../assets/ucinfo.png);
}

</style>


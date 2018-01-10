<template>
    <div @click="changeImgCode" v-loading="loading" :style="{width:width, height: height}" style="cursor: pointer" element-loading-spinner="el-icon-loading">
        <img :src="imgSrc" style="width:100%;height:100%"/>
    </div>
</template>

<script>
import { emailCode } from '@/api/log';
export default {
    data(){
        return {
            imgSrc: '',
            loading: true
        }
    },
    methods: {
        getImgSrc(){

            this.loading = true;
            emailCode().then( res => {
                this.imgSrc = `data:image/png;base64,${res.data.data}`;
                this.loading = false;
            } )
        },
        changeImgCode(){
            this.getImgSrc();
        }
    },
    mounted(){
        this.getImgSrc()
    },
    props: {
        width: {
            type: String,
            default: "100px",
        },
        height: {
            type: String,
            default: "40px",
        }
    }
}
</script>


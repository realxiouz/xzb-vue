<template>
    <div class="headerContainer">
        <span style="font-weight: bold;font-size: large;">{{title}}</span>
        <!-- 不是弹窗暂时去掉 -->
        <!-- <div class="right">
            <span>{{subTitle}}</span>
            <span><icon-svg :iconClass="icon"></icon-svg></span>
        </div> -->
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default: '注册新助邦'
        },
        subTitle:{
            type: String,
            default: '登录'
        },
        icon: {
            type: String,
            default: 'arrowleft'
        }
    }
}
</script>

<style lang="scss" scoped>
.headerContainer{
    text-align: center;
    padding: 0 10px;
    line-height: 26px;
    margin-bottom: 25px;
    cursor: pointer;
    div{
        float: right;
        span{
            color: #13BC98;
            &:nth-child(1){
                font-size: 18px;
            }
            &:nth-child(2){
                color:#fff;
                background-color: #13BC98;
                padding:5px;
                border-radius: 50%;
                width:24px;
                height:24px;
                margin-left:6px;
            }
        }
    }
}
</style>




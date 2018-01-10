<template>
    <div class="headerContainer">
        <span>{{title}}</span>
        <div class="right">
            <span>{{subTitle}}</span>
            <span><icon-svg :iconClass="icon"></icon-svg></span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            default: '注册新助邦账号'
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
    padding-right: 10px;
    div{
        float: right;
    }
}
</style>




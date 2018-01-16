<template>
    <div class="content" :class="{active: isActive}">
        <div class="icon">
            <icon-svg :iconClass="icon"></icon-svg>
        </div>
        <div class="right">
            <div class="title">{{title}}</div>
            <div class="subTitle">{{subTitle}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "资料"
    },
    subTitle: {
      type: String,
      default: "您能提供的考研资料"
    },
    icon: {
      type: String,
      default: "books"
    },
    isActive:{
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import ".@/../style/element-variables";
.content {
  border: 1px solid #eee;
  padding: 20px 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover{
    >.right{
      color: $--color-primary;
    }
  }
  &.active{
    background-color: $--color-primary;
    >.right{
      .title{
        color: #fff;
      }
      .subTitle{
        color: #fff;
      }
    }
    >.icon{
      color: #fff;
    }
  }
  .icon {
    font-size: 60px;
    margin-top: -25px;
    float: left;
    color: $--color-primary;
  }
  .right {
    .title{
        font-size: 16px;
        font-weight: 500;
    }
    .subTitle {
      white-space: nowrap;
      line-height: 24px;
      overflow: hidden;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>



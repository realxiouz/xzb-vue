<template>
  <div class="group">
    <ul>
      <template v-if="me">
        <li @click="handleTianjia">添加系列</li>
        <li @click="handleBianJi">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>编辑</p>
        </li>
        <li@click="handleXiaJia">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>下架</p>
        </li>
        <li @click="handleTuiGuan">
          <icon-svg iconClass="wechat"></icon-svg>
          <p>推广</p>
        </li>
      </template>
      <template v-else>
        <li @click="handle">报名</li>
        <li @click="handleZhiXun">
          <icon-svg iconClass="telephone"></icon-svg>
          <p>咨询</p>
        </li>
        <li @click="handleTiWen">
          <icon-svg iconClass="question"></icon-svg>
          <p>提问</p>
        </li>
        <li @click="handleTuiGuan">
          <icon-svg iconClass="push"></icon-svg>
          <p>推广</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    me: {
      type: Number,
      default: 0
    },
  },
  methods:{
      handle(){
        this.$message.error("baoming todo");
      },
      handleZhiXun(){
        this.$message.error("zhixun todo");
      },
      handleTiWen(){
        this.$message.error("tiwen todo");
      },
      handleTuiGuan(){
        this.$message.error("tuiguan todo");
      },
      handleTianjia(){
        this.$message.error("Tianjia todo");
      },
      handleBianJi(){
        this.$message.error("BianJi todo");
      },
      handleXiaJia(){
        this.$message.error("XiaJia todo");
      },
      handleTuiGuan(){
        this.$message.error("TuiGuang todo");
      }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/element-variables";
.group {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    li {
      &:hover > p{
        color:$--color-primary;
      }
      height: 70px;
      text-align: center;
      cursor: pointer;
      padding: 0 25px;
      > p{
        color:#c1c1c1;
        font-size: .8rem;
        margin-top: -8px;
      }
    }
    li:nth-child(1) {
      width: 144px;
      line-height: 70px;
      color: #fff;
      background-color: $--color-primary;
    }
    li:nth-child(2) {
      background-color: #eee;
      font-size: 2rem;
      border-right: 1px solid #dedede;
      color: #c1c1c1;
    }
    li:nth-child(3) {
      background-color: #eee;
      font-size: 2rem;
      border-right: 1px solid #dedede;
      color: #c1c1c1;
    }
    li:nth-child(4) {
      background-color: #eee;
      font-size: 2rem;
      color: #c1c1c1;
    }
  }
}

@media (max-width: 400px) {
  .group {
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
    ul {
      li {
        padding: 0 12px;
      }
      li:nth-child(1) {
        // width: 144px;
        order: 4;
        flex: auto;
      }
      li:nth-child(2) {
        order: 3;
        border-left: 1px solid #dedede;
        border-right: none;
      }
      li:nth-child(3) {
        order: 2;
        border-left: 1px solid #dedede;
        border-right: none;
      }
      li:nth-child(4) { 
        order: 1;

      }
    }
  }
}
</style>



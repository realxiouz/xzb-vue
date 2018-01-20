<template>
  <div class="group">
    <ul>
      <template v-if="me">
        <li>添加系列</li>
        <li>
          <icon-svg iconClass="wechat"></icon-svg>
          <span>重新编辑</span>
        </li>
        <li>
          <icon-svg iconClass="wechat"></icon-svg>
          <span>下架</span>
        </li>
        <li>
          <icon-svg iconClass="wechat"></icon-svg>
          <span>设置推广</span>
        </li>
      </template>
      <template v-else>
        <li>报名</li>
        <li>
          <icon-svg iconClass="telephone"></icon-svg>
          <p>咨询</p>
        </li>
        <li>
          <icon-svg iconClass="question"></icon-svg>
          <p>提问</p>
        </li>
        <li>
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
      height: 70px;
      text-align: center;
      cursor: pointer;
      padding: 0 25px;
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
      > p {
        font-size: 1rem;
        margin-top: -8px;
        color: #000;
      }
    }
    li:nth-child(3) {
      background-color: #eee;
      font-size: 2rem;
      border-right: 1px solid #dedede;
      color: #c1c1c1;
      > p {
        font-size: 1rem;
        margin-top: -8px;
        color: #000;
      }
    }
    li:nth-child(4) {
      background-color: #eee;
      font-size: 2rem;
      color: #c1c1c1;
      > p {
        font-size: 1rem;
        margin-top: -8px;
        color: #000;
      }
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



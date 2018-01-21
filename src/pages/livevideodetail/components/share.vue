<template>
    <div class="share">
        <ul>
            <li @click="handleLike">
                <span class="icon">
                    <icon-svg iconClass="like"></icon-svg>
                </span>
                <span>{{likeNum}}</span>
            </li>
            <li @click="handleCollect">
                <span class="icon">
                    <icon-svg iconClass="collect"></icon-svg>
                </span>
                <span>{{collectNum}}</span>
            </li>
            <li @click="handleShare">
                <span class="icon">
                    <icon-svg iconClass="share"></icon-svg>
                </span>
                <span>分享</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    likeNum: {
      type: String,
      default: "99"
    },
    collectNum: {
      type: String,
      default: "100"
    }
  },
  methods:{
    handleLike(){
      this.$message.error("like todo");
    },
    handleCollect(){
      this.$message.error("collect todo");
    },
    handleShare(){
      this.$message.error("sahre todo");
    },

  }
};
</script>

<style lang="scss" scoped>
.share {
  float: right;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    li {
      margin-left: 10px;
      cursor: pointer;
      .icon {
        background-color: #ccc;
        color: #fff;
        border-radius: 50%;
        display: inline-block;
        width: 26px;
        height: 26px;
        font-size: 18px;
        text-align: center;
      }
    }
  }
}

@media (max-width: 400px) {
  .share {
    float: none;
    ul {
      justify-content: space-around;
      li {
        margin-left: 0px;
      }
    }
  }
}
</style>



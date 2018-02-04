<template>
    <div class="books">
        <ul>
            <li v-for="book in beans" :key="book.id">
                <div class="img">
                    <img :src="book.book_image" alt="">
                </div>
                <div class="bookName">{{book.book_name}}</div>
                <div class="bookBuy">
                    <el-button size="small" type="primary">去购买</el-button>
                </div>
            </li>
        </ul>
        <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent" @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
import { tutorbook } from "@/api/service";
export default {
  data() {
    return {
      beans: [],
      currentPage: 1,
      totalCount: 0,
    //   pageSize:2
    };
  },
  methods: {
    handleChangeCurrent(v) {
      this.currentPage = v;
      this.getData();
    },
    handleSizeChange(v){
        this.pageSize = v;
        this.getData();
    },
    getData() {
      let p = {
        id: this.$parent.$route.params.id,
        page: this.currentPage,
        // pagecount: this.pageSize
      };
      tutorbook(p).then(res => {
        this.beans = res.books;
        this.totalCount = +res.count;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.books {
  ul {
    margin-top: 0px;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    li {
      text-align: center;
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .8rem 0;
      .img {
        width: 75px;
        height: 100px;
        margin-bottom: 1rem;
        img {
          width: 100%;
          height: 100%;
          padding: 1px;
          border: 1px solid gray;
        }
      }
      .bookName {
        font-size: 0.8rem;
        margin-bottom: 0.8rem;
      }
      .bookBuy {
        margin-bottom: 0.8rem;
      }
    }
  }
}

@media (max-width: 400px) {
  .books {
    ul {
      li {
        width: 33%;
      }
    }
  }
}
</style>



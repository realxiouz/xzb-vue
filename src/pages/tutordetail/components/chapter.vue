<template>
  <div>
      <div class="chapterContent" v-for="(item, inx) in beans" :key="item.id">
          <div class="chapterTitle">
              <span class="inx">{{inx+1}}</span>
              <span class="name">{{item.title}}</span>
          </div>
          <div class="chapterChild" v-for="(child,index) in item.child" :key="child.id">
              <a href="" target="_blank">
              <span class="index">{{`${inx+1}.${index+1}`}}</span>
              <span class="title">{{child.title}}</span>
              </a>
          </div>

      </div>
  </div>
</template>

<script>
import { tutorchapter } from "@/api/service";
export default {
    data(){
        return {
            beans:[]
        }
        
    },
    mounted(){
        let p ={
            id: this.$parent.$route.params.id,
        };
        tutorchapter(p).then( res => {
            this.beans = res;
        })

    }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/element-variables";
    .chapterContent{
        margin-top: 10px;
        .chapterTitle{
            border-bottom: 2px solid grey;
            line-height: 3rem;
            .inx{
                display: inline-block;
                background-color: $--color-primary;
                color: #fff;
                padding: 0 10px;
            }
            .name{
                font-weight: bold;
                margin-left: 1rem;
            }
        }
        .chapterChild{
            border-bottom: 1px dashed #c1c1c1;
            line-height: 2rem;
            font-size: .8rem;
            
            .index{
                color: #c1c1c1;
            }
            .title{
                color: #c1c1c1;
            }
        }
    }
</style>



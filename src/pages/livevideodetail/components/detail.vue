<template>
  <div>
    <div class="attch">
      <div class="title">
        参考讲义:
      </div>
      <div class="attchBody">
        <div v-if="bean.attachment_id === 0">暂无讲义</div>
        <div v-else>
          <el-button type="primary" @click="handleDownload">下载讲义</el-button>
          <!-- <a href="/" download="ceshi.txt">点击下载</a> -->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        详细描述:
      </div>
      <div class="contentBody" v-html="bean.content_course">

      </div>
    </div>
  </div>
</template>

<script>
import { ocdetail, ocdownloadattach } from "@/api/livevideo";
export default {
  data() {
    return {
      bean: {}
    };
  },
  mounted() {
    let p = {
      id: this.$parent.$route.params.id
    };
    ocdetail(p).then(res => {
      this.bean = res;
    });
  },
  methods: {
    handleDownload() {
      if (this.bean.is_pay) {
        let p = {
          id: this.bean.attachment_id
        };
        ocdownloadattach(p).then(res => {
          window.open(res.path);
        });

        // var blob = new Blob(["啊啊啊<<&&"]);
        // var url = URL.createObjectURL(blob);
        // document.getElementById("aa").setAttribute("href", url);
      } else {
        this.$message.error("请先购买");
      }
    }
  }
};
</script>

<style>
.contentBody p img {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
</style>



<template>
    <div class="list">
        <el-tabs v-model="active">
            <el-tab-pane label="最新" name="first">
                <lv-list :personId="id"></lv-list>
            </el-tab-pane>
            <el-tab-pane label="已结束" name="second">
                <lv-list :personId="id" :type="2"></lv-list>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import LvList from "./livevideolist";
export default {
  data() {
    return {
      active: "first",
      id: '',
    };
  },
  components: {
    LvList
  },
  created() {
    this.id = this.$parent.$route.params.id;
  }
};
</script>

<style lang="scss" scoped>

</style>



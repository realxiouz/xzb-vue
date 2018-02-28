<template>
  <el-menu mode="vertical" :default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <sidebar-item :routes="typeRoutes"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapState(['typeRoutes']),
  }
};
</script>

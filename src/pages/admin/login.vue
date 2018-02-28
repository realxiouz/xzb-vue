<template>
    <div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLogBean">
            <el-form-item label="用户名">
                <el-input v-model="formLogBean.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLogBean.password" type='password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAdminLog">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { adminLog } from "@/api/admin";
export default {
  data() {
    return {
      labelPosition: "right",
      formLogBean: { username: "alhelp&xzb", password: "adminzhang" }
    };
  },
  methods: {
    handleAdminLog() {
      let p = {
        username: this.formLogBean.username,
        password: this.formLogBean.password
      };
      adminLog(p).then(res => {
        //todo
        // this.$router.addRoutes([
        //   {
        //     path: "/manage/service",
        //     // redirect: 'service',
        //     name: "AdminLayout",
        //     component: () => import("@/pages/admin/pages/service/res"),
        //     meta: { title: "service", icon: "qq" },
        //     children: [
        //       {
        //         path: "res",
        //         component: () => import("@/pages/admin/pages/service/res"),
        //         meta: { title: "documentation" }
        //       }
        //     ]
        //   }
        // ]);
        this.$router.push("/manage/service/type1/res");
      });
    }
  }
};
</script>


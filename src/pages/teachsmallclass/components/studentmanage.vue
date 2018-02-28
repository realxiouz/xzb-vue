<template>
  <div>
    <div class="students">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select v-model="type" slot="prepend" placeholder="请选择" style="width:100px">
            <el-option label="昵称" value="nickname"></el-option>
            <el-option label="电话" value="phone"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <div class="stus">
        <el-table ref="multipleTable" :data="students" tooltip-effect="dark" style="width: 100%">
          <el-table-column label="头像" width="60">
            <template slot-scope="scope"><img :src="scope.row.avatar" alt="" class="avatar"></template>
          </el-table-column>
          <el-table-column label="昵称" width="150">
            <template slot-scope="scope">
              <span class="nickname">{{scope.row.nickname}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="add_time" label="时间" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination small layout="total, prev, pager, next" :total="totalCount" @current-change="handleChangeCurrent">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { smallmembers } from "@/api/service";
export default {
  computed: {
    ...mapState(["classId"]),
    studentBean() {
      return {
        id: this.$route.params.id,
        page: this.page,
        keywords: this.keywords,
        ktype: this.ktype
      };
    }
  },
  watch: {
    studentBean: {
      handler: function(val) {
        smallmembers(val).then(res => {
          this.students = res.members;
          this.totalCount = +res.count;
        });
      },
      immediate: true
    },
    search(val) {
      if (val == "") {
        this.keywords = "";
      }
    }
  },
  data() {
    return {
      type: "",
      search: "",

      page: 1,
      keywords: "",
      ktype: "",

      students: [],
      totalCount: 0
    };
  },
  methods: {
    handleSearch() {
      if (this.type == "" || this.search == "") {
        this.$message.error("完善搜索条件");
        return;
      }
      this.ktype = this.type;
      this.keywords = this.search;
    },
    handleChangeCurrent(val) {
      this.page = val;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.students {
  padding: 10px 20px;
  background-color: #fff;
  .stus {
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .nickname {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>



<template>
  <div>
    <div class="topChooseMajor">
      <div class="choose-wrapper">
        <el-button @click="handleBtnClick">{{btnTitle}}</el-button>
      </div>
    </div>

    <div class="tree" v-if="showChooseTree">
      <el-tree :props="treeProp" :load="loadNode" lazy accordion @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>

</template>

<script>
import {
  getCircleByPS,
  getCircleByMajor,
  getCircleBySchool
} from "@/api/livevideo";
export default {
  data() {
    return {
      treeProp: {
        label: "title",
        isLeaf: "end"
      },
      showChooseTree: false,
      btnTitle: "选择圈子"
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([
          { title: "按公共课" },
          { title: "按统考", end: true },
          { title: "非统考" },
          { title: "地区" }
        ]);
      }
      //获取level1数据
      if (node.data.title === "按公共课") {
        getCircleByPS().then(res => {
          resolve(res);
        });
      }
      if (node.data.title === "非统考") {
        getCircleByMajor().then(res => {
          resolve(res);
        });
      }
      if (node.data.title === "地区") {
        let data = [
          { title: "以A为索引的地区", id: "A" },
          { title: "以B为索引的地区", id: "B" },
          { title: "以F为索引的地区", id: "F" },
          { title: "以G为索引的地区", id: "G" },
          { title: "以H为索引的地区", id: "H" },
          { title: "以J为索引的地区", id: "J" },
          { title: "以L为索引的地区", id: "L" },
          { title: "以N为索引的地区", id: "N" },
          { title: "以Q为索引的地区", id: "Q" },
          { title: "以S为索引的地区", id: "S" },
          { title: "以T为索引的地区", id: "T" },
          { title: "以X为索引的地区", id: "X" },
          { title: "以Y为索引的地区", id: "Y" },
          { title: "以Z为索引的地区", id: "Z" }
        ];
        resolve(data);
      }
      //获取level2数据
      if (node.level === 2 && node.parent.data.title === "非统考") {
        let p = { id: node.data.id };
        getCircleByMajor(p).then(res => {
          resolve(res);
        });
      }
      if (node.level === 2 && node.parent.data.title === "地区") {
        let p = { id: node.data.id };
        getCircleBySchool(p).then(res => {
          resolve(res);
        });
      }
      //获取level3数据
      if (node.level === 3 && node.parent.parent.data.title === "地区") {
        let p = { id: node.data.id };
        getCircleBySchool(p).then(res => {
          resolve(res);
        });
      }
    },
    handleNodeClick(data) {
      if (data.end) {
        // this.$message.success(`圈子id是${data.id}------圈子是${data.title}`);
        this.showChooseTree = false;
        this.btnTitle = data.title;
        this.$emit("chooseCirle",data.id);
      }
    },
    handleBtnClick() {
      this.showChooseTree = !this.showChooseTree;
    }
  }
};
</script>

<style lang="scss" scoped>
.topChooseMajor {
  background-image: url(../../.././assets/bg_topbanner.jpg);
  height: 200px;
  .choose-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    align-items: center;
  }
}

.tree {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

@media (max-width: 450px) {
  .topChooseMajor {
    height: 150px;
  }
}
</style>


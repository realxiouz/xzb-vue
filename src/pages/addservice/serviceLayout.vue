<template>
    <div class="wrapper">
        <el-row :gutter="0">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" class="leftPart">slider</el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="rightPart">
                <el-tabs v-model="currentTab">
                    <el-tab-pane label="考研" name="first">
                        <div class="type">
                            <div class="title">服务类别</div>
                            <el-row :gutter="10">
                                <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                    <icon-button @click="currentIconBtn = 1" :isActive="firstActive"></icon-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                    <icon-button icon="answer" title="个性化辅导" subTitle="答疑或授课" @click="currentIconBtn = 2" :isActive="secActive"></icon-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                    <icon-button icon="focus" title="直播课" subTitle="公益或收费" @click="currentIconBtn = 3" :isActive="thirdActive"></icon-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                                    <icon-button icon="package" title="打包课" subTitle="已发布的服务" @click="currentIconBtn = 4" :isActive="forthActive"></icon-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="chooseMajor">
                            <div class="title">确认专业</div>
                            <el-form>
                                <el-cascader :options="options" v-model="selectedOptions">
                                </el-cascader>
                                <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
                            </el-form>

                        </div>
                        <div class="description">
                            <div class="title">详细描述</div>
                            <el-form label-width="80px" ref="form" :model="form" :label-position="labPosition" style="max-width:800px">
                                <el-form-item label="标题">
                                    <el-input v-model="form.title"></el-input>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <quill-editor v-model="form.content" ref="myQuillEditor"></quill-editor>
                                </el-form-item>
                                <el-form-item label="上课时间">
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="11">
                                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="主讲人">
                                    <el-input v-model="form.teacher"></el-input>
                                </el-form-item>
                                <el-form-item label="费用">
                                    <el-radio-group v-model="form.resource">
                                        <el-radio label="免费"></el-radio>
                                        <el-radio label="收费"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="上传讲义">
                                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB。<br> 2.请不要上传包含其他教育机构链接、logo、水印等广告，或带有色情、危害社会、无分享价值等类型的资料。
                                            <br> 3.资料名称、资料简介必须与资料内容一致，否则将不能通过审核。
                                            <br> 4.技巧：选择分类，这样同类的资料就可以得到推荐，尽量填写详细的介绍。
                                        </div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="上传封面">
                                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">1.支持格式：压缩包,TXT, DOC, PPT, PDF, xls, 每份文档不超过50MB.</div>
                                    </el-upload>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="公务员" name="second" disabled>公务员</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import IconButton from "./component/iconbutton";
import { unidieds, schools } from "@/api/log";
export default {
  data() {
    return {
      selectedOptions: [],
      currentTab: "first",
      options: [],
      options2: [],
      props: {
        value: "label",
        children: "cities"
      },
      form: {},
      labPosition: "left",
      currentIconBtn: 1,
      firstActive: true,
      secActive: false,
      thirdActive: false,
      forthActive: false
    };
  },
  components: {
    IconButton
  },
  methods: {
    handleItemChange(val) {
      console.log("active item:", val);
      setTimeout(_ => {
        if (val.indexOf("江苏") > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [
            {
              label: "南京"
            }
          ];
        } else if (val.indexOf("浙江") > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [
            {
              label: "杭州"
            }
          ];
        }
      }, 300);
    }
  },
  wacth:{
      currentIconBtn(val){
          if(val == 1){
              firstActive=true;secActive=false;thirdActive=false;forthActive=false;
          } else if(val == 2){
              firstActive=false;secActive=true;thirdActive=false;forthActive=false;
          } else if(val == 3){
                firstActive=false;secActive=false;thirdActive=true;forthActive=false;
          } else if(val == 4){
                firstActive=false;secActive=false;thirdActive=false;forthActive=true;
          }
      }
  },
  mounted() {
    // let p = {
    //   pid: 6,
    //   type: 1
    // };
    // unidieds(p).then(res => console.log(res.data));
    let w = document.documentElement.offsetWidth || document.body.offsetWidth;
    if(w < 400){
        this.labPosition = 'top'
    }
    // let p1 = {
    //   pid: 1000000,
    //   type: 1
    // };
    // schools(p1).then(res => console.log(res.data));
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
  .leftPart {
    background-color: #fff;
    border: 1px solid black;
  }
  .rightPart {
    background-color: #fff;
    border: 1px solid black;
    padding: 10px;

    .type {
        margin-bottom: 20px;
    }
    .chooseMajor {
        margin-bottom: 20px;
    }
    .description {
        margin-bottom: 20px;
    }
  }
}

//标题样式
.title {
  display: inline-block;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 10px;
  border-bottom: 2px solid #1ecca7;
  padding: 0 10px 10px;
}
</style>



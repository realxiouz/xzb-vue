<template>
    <div>
        <quill-editor v-model="bindData" :options="editorOption" :disabled="!editAble"></quill-editor>
    </div>
</template>

<script>
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  props: {
      bindData: {
          type: String
      },
      editAble:{
          type: Boolean,
          default: true
      }
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: "/api/uploadImage",
        res: respnse => {
          return respnse.data.img.url;
        }
      }
    });
  },
  data(){
      return {
          editorOption:{}
      }
  }
};
</script>

<style lang="scss" scoped>

</style>



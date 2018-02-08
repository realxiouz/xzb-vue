<template>
    <div>
        <quill-editor ref="editor" :options="editorOption" :disabled="!editAble" :content="content" @change="onEditorChange($event)"></quill-editor>
    </div>
</template>

<script>
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  props: {
    bindData: {
      type: String
    },
    editAble: {
      type: Boolean,
      default: true
    },
    initData: {
      type: String
    },
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
    this.content = this.initData;
    this.$emit('editorData', this.initData)
    // this.$refs.editor.change();
  },
  data() {
    return {
      editorOption: {},
      content:""
    };
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html;
      this.$emit('editorData', html)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>



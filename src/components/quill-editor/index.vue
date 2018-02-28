<template>
  <div>
    <quill-editor ref="editor" :options="editorOption" :disabled="!editAble" :content="content" @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script>
import { quillRedefine } from "vue-quill-editor-upload";
import { mapState } from "vuex";
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
    }
  },
  created() {
    this.editorOption = Object.assign({},quillRedefine({
      uploadConfig: {
        action: "/api/uploadImage",
        res: respnse => {
          return respnse.data.img.url;
        }
      }
    }), {modules: {
        toolbar: this.toolbarOptions
    }});
    // this.editorOption = quillRedefine({
    //   uploadConfig: {
    //     action: "/api/uploadImage",
    //     res: respnse => {
    //       return respnse.data.img.url;
    //     }
    //   }
    // });
    this.content = this.initData;
    this.$emit("editorData", this.initData);
    // this.$refs.editor.change();
  },
  data() {
    return {
      editorOption: {},
      content: "",
      toolbarOptions: []
    };
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      this.content = html;
      this.$emit("editorData", html);
    }
  },
  computed: {
    ...mapState(["responsiveMode"])
  },
  watch: {
    responsiveMode: {
      handler: function(val) {
        if (val) {
          console.log(`responsiveMode is ${val}`)
          this.toolbarOptions = [
            ["bold", "italic"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }], //, { 'list': 'bullet' }
            // [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            ["link", "image"],
            ["clean"] // remove formatting button
          ];
        } else {
          this.toolbarOptions = [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }], //, { 'list': 'bullet' }
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            ["link", "image"],
            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ["clean"] // remove formatting button
          ];
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>

</style>



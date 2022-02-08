<template>
  <div>
    <el-dialog
      title="生成JSON"
      :visible.sync="dialogVisible"
      width="60%"
      custom-class="jsonClass"
    >
      <div class="jsonPage">
        <codemirror
          style="height: 100%"
          ref="myEditor"
          :value="editorJson"
        ></codemirror>
      </div>
      <div class="jsonPage_footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button
          id="cpBtn"
          type="primary"
          @click="copyFunc"
          size="small"
          data-clipboard-action="copy"
          :data-clipboard-text="editorJson"
          >复 制</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { codemirror } from "vue-codemirror-lite";

export default {
  data() {
    return {
      dialogVisible: false,
      jsonData: {},
      editorJson: "",
    };
  },
  components: {
    codemirror,
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.editorJson = JSON.stringify(this.jsonData, null, "\t");
      }
    },
  },
  methods: {
    copyFunc() {
      // 复制数据
      const clipboard = new Clipboard("#cpBtn");
      clipboard.on("success", () => {
        this.$message.success("复制成功");
      });
      clipboard.on("error", () => {
        this.$message.error("复制失败");
      });
      setTimeout(() => {
        // 销毁实例
        clipboard.destroy();
      }, 150);
    },
  },
};
</script>
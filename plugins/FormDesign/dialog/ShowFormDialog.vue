<template>
  <div class="showFormDialogPage">
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      top="30px"
    >
        <show-form
          ref="showForm"
          v-if="dialogVisible"
          :data="jsonData"
          :dynamicData="dynamicData"
        ></show-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="getData" size="small"
          >获取数据</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ShowForm from "../showPage/ShowForm.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      jsonData: {},
      dynamicData: {},
      dialogWidth: "",
    };
  },
  components: {
    ShowForm,
  },
  methods: {
    getData() {
      const data = this.$refs.showForm.formData
      this.$emit('createJSON', data)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
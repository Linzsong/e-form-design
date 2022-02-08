<template>
  <div class="showFormPage">
    <el-form
      :inline="data.inline"
      ref="formData"
      :model="formData"
      :label-width="data.config.labelWidth + 'px'"
      :label-position="data.config.labelPosition"
      :size="data.config.size"
    >
      <show-form-layout
        v-for="record in data.list"
        :key="record.key"
        :record="record"
        :formData="formData"
        :dynamicData="dynamicData"
        @submit="submit"
        @reset="reset"
        @changeform="changeform"
        @handleCopy="handleCopy"
        @handleDelete="handleDelete"
        @dynamicAdd="dynamicAdd"
      ></show-form-layout>
    </el-form>
  </div>
</template>

<script>
import ShowFormLayout from "./ShowFormLayout.vue";

export default {
  name: "EFormShow",
  data() {
    return {
      formData: {},
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    dynamicData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ShowFormLayout,
  },
  created() {
    this.setFormData(this.data.list);
  },
  watch: {
    data: {
      handler(newName) {
        // 设置表单数据默认值
        this.formData = {};
        this.setFormData(newName.list);
      },
      deep: true,
    },
  },
  methods: {
    submit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log("submit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      for (const key in this.formData) {
        if (Object.hasOwnProperty.call(this.formData, key)) {
          this.formData[key] = null;
        }
      }
      this.$refs.formData.resetFields();
    },
    changeform(obj) {
      this.formData = obj;
    },
    setFormData(list) {
      // 设置 formData 数据
      list.forEach((record) => {
        const {
          type,
          model,
          options: { defaultValue },
          columns,
          list,
          trs,
        } = record;
        if (typeof model !== "undefined") {
          if (["grid", "tabs"].includes(type)) {
            // 栅格布局、标签页
            columns.forEach((column) => {
              this.setFormData(column.list);
            });
          } else if (["card", "inline"].includes(type)) {
            // 卡片布局、行内布局
            this.setFormData(list);
          } else if (type === "tableLayout") {
            // 表格布局
            trs.forEach((tr) => {
              tr.tds.forEach((td) => {
                this.setFormData(td.list);
              });
            });
          } else if (type === "dynamicTab") {
            // 动态表格
            this.formData[model] = [];
          } else {
            // 递归后逻辑
            // 设置数据
            this.formData[model] = defaultValue;
          }
        }
      });
    },
    // 动态表格 copy
    handleCopy(scope, model) {
      this.formData[model].push({
        ...scope.row,
        key: new Date().getTime() + Math.ceil(Math.random() * 1000),
      });
    },
    // 动态表格 添加行
    dynamicAdd(record) {
      const { list, model } = record;
      const key = new Date().getTime() + Math.ceil(Math.random() * 1000);
      let obj = { key: key };
      if (list && list.length > 0) {
        list.forEach((item) => {
          // 有默认值则赋值，无默认值则为null
          obj[item.model] = item.options.defaultValue
            ? item.options.defaultValue
            : null;
        });
      }
      this.formData[model].push(obj);
    },
    // 动态表格 删除
    handleDelete(scope, model) {
      const index = scope.$index;
      this.formData[model].splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
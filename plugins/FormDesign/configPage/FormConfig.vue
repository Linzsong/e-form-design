<template>
  <div class="formConfig">
    <el-form label-position="top">
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="config.labelPosition" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单标签宽度">
        <el-slider
          v-model="config.labelWidth"
          show-input
          :min="0"
          :max="300"
          :step="2"
        >
        </el-slider>
      </el-form-item>
      <el-form-item label="组件尺寸">
        <el-radio-group v-model="config.size" size="small">
          <el-radio-button label="medium">大型</el-radio-button>
          <el-radio-button label="small">中型</el-radio-button>
          <el-radio-button label="mini">小型</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表单模式">
        <el-radio-group v-model="config.inline" size="small">
          <el-radio-button :label="false">块级模式</el-radio-button>
          <el-radio-button :label="true">行内模式</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <!-- 表单设计器 -->
    <e-form-design :dynamicData="dynamicData"></e-form-design>
    <!-- 样式显示 -->
    <!-- <e-form-show :dynamicData="dynamicData" :data="data"></e-form-show> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 动态数据配置
      dynamicData: {
        // 动态选项
        options: [
          {
            value: "1",
            label: "选项a",
          },
          {
            value: "2",
            label: "选项b",
          },
          {
            value: "3",
            label: "选项c",
          },
        ],
        // 动态方法
        dynamicFun: () => {
          console.log(1234);
        },
      },
      data: {
        list: [
          {
            type: "input",
            label: "单行文本",
            icon: "el-icon-edit",
            model: "input_1644324741527_51403",
            key: "1644324741527_51403",
            options: {
              type: "text",
              width: "100%",
              labelWidth: {
                isOpen: false,
                width: 100,
              },
              defaultValue: "",
              placeholder: "请输入",
              clearable: false,
              hidden: false,
              disabled: false,
            },
            rules: [
              {
                required: false,
                message: "必填项",
              },
              {
                userFlag: false,
                type: "string",
                message: "请输入字符串",
              },
            ],
          },
          {
            type: "textarea",
            label: "多行文本",
            icon: "el-icon-edit-outline",
            model: "textarea_1644324745445_57222",
            key: "1644324745445_57222",
            options: {
              labelWidth: {
                isOpen: false,
                width: 100,
              },
              width: "100%",
              defaultValue: "",
              placeholder: "请输入",
              hidden: false,
              disabled: false,
              rows: 3,
            },
            rules: [
              {
                required: false,
                message: "必填项",
              },
              {
                userFlag: false,
                type: "string",
                message: "请输入字符串",
              },
            ],
          },
          {
            type: "select",
            label: "下拉框",
            icon: "el-icon-edit-outline",
            model: "select_1644324748243_27667",
            key: "1644324748243_27667",
            options: {
              labelWidth: {
                isOpen: false,
                width: 100,
              },
              width: "",
              defaultValue: "",
              hidden: false,
              disabled: false,
              clearable: false,
              placeholder: "请选择",
              options: [
                {
                  value: "1",
                  label: "选项1",
                },
                {
                  value: "2",
                  label: "选项2",
                },
                {
                  value: "3",
                  label: "选项3",
                },
              ],
              dynamic: false,
              dynamicKey: "",
              filterable: false,
            },
            rules: [
              {
                required: false,
                message: "必填项",
              },
            ],
          },
        ],
        config: {
          labelWidth: 100,
          labelPosition: "right",
          size: "small",
          inline: false,
        },
      },
    };
  },
};
</script>

<style>
</style>
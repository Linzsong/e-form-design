# 表单设计器e-form-design

## 介绍

参考项目[k-form-making](https://toscode.gitee.com/doemsy/k-form-design)，由于在项目中必须使用element-ui进行开发，因此封装了一套由VUE+element-ui实现的表单设计器，采用SCSS作为CSS预编译器语言，主要功能可以通过简单的拖拽操作，生成表单配置的JSON数据，通过配置数据可以将表单还原，让表单开发趋于低代码，更加简单快捷。

- [github](https://github.com/Linzsong/e-form-design)
- [码云](https://gitee.com/linzisong/e-form-design)

## 特性

- 可视化配置页面
- 提供栅格、表格等布局
- 布局嵌套使用
- 提供预览、保存、生成json、生成可执行代码等操作
- 支持表单验证
- 快速获取表单数据

- EFormDesign 表单设计器（基于可视化操作快速设计出表单页面，生成配置json或页面）
- EFormBuild 表单构建器（根据设计器中获取的配置json数据，快速构建出表单页面）

## 安装

```
# 使用yarn 
yarn add e-form-design

# 使用npm 
npm i e-form-design --save
```

## 引入组件

```
// 在main.js引入

import EFormDesign from 'E-form-design'
import 'E-form-design/lib/E-form-design.css'
Vue.use(EFormDesign)
Vue.use(EFormDesign)
```

## 使用组件

```vue
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
      // 表单配置数据
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
```
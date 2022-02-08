// 基础控件
export const baseLists = [
  {
    type: "input",
    label: "单行文本",
    icon: "el-icon-edit",
    model: "",
    key: "",
    options: {
      type: "text",
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      defaultValue: "", // 默认值
      placeholder: "请输入",
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
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
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "100%", // 宽度
      defaultValue: "", // 默认值
      placeholder: "请输入",
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      rows: 3, // 行数
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
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
    type: "inputNumber",
    label: "计数器",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "", // 宽度
      defaultValue: 0, // 默认值
      placeholder: "请输入",
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      step: 1, // 步长
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "radio",
    label: "单选框",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "100%", // 宽度
      defaultValue: "", // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
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
      dynamic: false, // 数据源是否动态
      dynamicKey: "", // 动态数据
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "checkbox",
    label: "多选框",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "100%", // 宽度
      defaultValue: [], // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
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
      dynamic: false, // 数据源是否动态
      dynamicKey: "", // 动态数据
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "select",
    label: "下拉框",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "", // 宽度
      defaultValue: "", // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
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
      dynamic: false, // 数据源是否动态
      dynamicKey: "", // 动态数据
      filterable: false, // 是否可搜索
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "timePicker",
    label: "时间选择器",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "", // 宽度
      defaultValue: null, // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      clearable: true, // 是否显示清除按钮
      readonly: false, // 完全只读
      editable: true, // 文本框可输入
      placeholder: "请选择",
      startPlaceholder: "",
      endPlaceholder: "",
      isRange: false, // 是否为时间范围选择
      valueFormat: "HH:mm:ss", // 默认格式
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "datePicker",
    label: "日期选择器",
    icon: "el-icon-edit-outline",
    model: "",
    key: "",
    options: {
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      width: "", // 宽度
      defaultValue: null, // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      clearable: true, // 是否显示清除按钮
      readonly: false, // 完全只读
      editable: true, // 文本框可输入
      placeholder: "请选择",
      startPlaceholder: "",
      endPlaceholder: "",
      valueFormat: "yyyy-MM-dd", // 默认格式
      dateType: "date",
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "rate",
    label: "评星",
    icon: "el-icon-star-off",
    model: "",
    key: "",
    options: {
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      defaultValue: null, // 默认值
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowHalf: false, // 允许半选
      startMax: 5, // 最大分值
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "switch",
    label: "开关",
    icon: "el-icon-open",
    model: "",
    key: "",
    options: {
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      defaultValue: null, // 默认值
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "slider",
    label: "滑块",
    icon: "el-icon-s-operation",
    model: "",
    key: "",
    options: {
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      defaultValue: 0, // 默认值
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      min: 0,
      max: 100,
      step: 1,
      showInput: false, // 是否显示输入框
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    type: "text",
    // label: "",
    icon: "el-icon-ice-cream-round",
    model: "",
    key: "",
    options: {
      width: "100%", // 宽度
      // labelWidth: {
      //   isOpen: true,
      //   width: 0,
      // }, // 标签宽度
      defaultValue: "这是一段文字", // 默认值
      hidden: false, // 是否隐藏，false显示，true隐藏
      fontSize: 14,
      color: "#606266",
      fontWeight: "normal",
      marginLeft: 0,
      marginRight: 0,
      align: "left",
    },
  },
  {
    type: "button",
    // label: "",
    icon: "el-icon-switch-button",
    model: "",
    key: "",
    options: {
      width: "", // 宽度
      labelWidth: {
        isOpen: true,
        width: 0,
      }, // 标签宽度
      defaultValue: "按钮", // 默认值
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      btnType: "primary", // 按钮类型
      plain: false, // 是否朴素按钮
      round: false, // 是否圆角按钮
      nativeType: "submit", // 原生 type 属性
      dynamicFun: "", // 动态函数方法名称
    },
  },
  {
    type: "alert",   // 提示框
    icon: "el-icon-warning-outline",
    model: "",
    key: "",
    options: {
      width: "100%", // 宽度
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      defaultValue: "这是一段提示",
      alertType: "success",
      description: "",
      closable: true,
      showIcon: false,
      effect: "light",
    },
  },
  {
    type: "html",   // html
    icon: "el-icon-eleme",
    model: "",
    key: "",
    options: {
      defaultValue: "<strong>HTML</strong>",
      hidden: false, // 是否隐藏，false显示，true隐藏
    },
  },
  {
    label: "图片上传",
    type: "uploadImg",   // 图片
    icon: "el-icon-picture-outline",
    model: "",
    key: "",
    options: {
      // defaultValue: [],
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      multiple: true,   // 是否支持多选文件
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      data: "",   // 额外参数（JSON格式）
      limit: 3,   // 最大上传数量
      drag: false,   // 是否启用拖拽上传
      fileName: "",   // 文件名称
      action: "",   // 上传地址
      headers: "",    // 设置上传请求头
      lisTtype: "text",   //	文件列表的类型  text/picture/picture-card
      placeholder: '上传',
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
  {
    label: "文件上传",
    type: "uploadFile",   // 文件
    icon: "el-icon-upload",
    model: "",
    key: "",
    options: {
      // defaultValue: [],
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      multiple: true,   // 是否支持多选文件
      width: "100%", // 宽度
      labelWidth: {
        isOpen: false,
        width: 100,
      }, // 标签宽度
      data: "",   // 额外参数（JSON格式）
      limit: 3,   // 最大上传数量
      drag: false,   // 是否启用拖拽上传
      fileName: "",   // 文件名称
      action: "",   // 上传地址
      headers: "",    // 设置上传请求头
      placeholder: '上传',
    },
    rules: [
      {
        // 验证规则
        required: false, // 必须填写
        message: "必填项",
      },
    ],
  },
];

export const layoutLists = [
  {
    type: "divider",
    icon: "el-icon-minus",
    label: "分割线",
    key: "",
    model: "",
    options: {
      labelValue: '--分割--',
      contentPosition: "left"
    }
  },
  {
    type: "card",
    icon: "el-icon-postcard",
    label: "卡片布局",
    key: "",
    model: "",
    list: [],
    options: {
      shadow: 'always',  // 显示阴影时机 	always / hover / never
      hidden: false,
    }
  },
  {
    type: "tabs",
    icon: "el-icon-files",
    label: "标签页",
    key: "",
    model: "",
    columns: [
      {
        value: 'value1_' + Math.ceil(Math.random() * 1000),
        label: '选项1',
        list: []
      },
      {
        value: 'value2_' + Math.ceil(Math.random() * 1000),
        label: '选项2',
        list: []
      }
    ],
    options: {
      tabsType: '',  // 风格类型 	card/border-card/''
      tabPosition:  'top',  // 选项卡所在位置 top/right/bottom/left
      hidden: false,
    }
  },
  {
    type: "dynamicTab",
    label: "动态表格",
    icon: "el-icon-coffee",
    key: "",
    model: "",
    list: [],
    options: {
      scrollY: null,
      width: "100%",
      hideSequence: true,    // 隐藏序号
      hidden: false,
    },
  },
  {
    type: "inline",
    label: "行内布局",
    icon: "el-icon-s-operation",
    key: "",
    model: "",
    list: [],
    options: {
      hidden: false,
    },
  },
  {
    type: "grid",
    label: "栅格布局",
    icon: "el-icon-c-scale-to-original",
    key: "",
    model: "",
    columns: [
      {
        span: 12,
        list: [],
      },
      {
        span: 12,
        list: [],
      },
    ],
    options: {
      gutter: 0,
    },
  },
  {
    type: "tableLayout",
    icon: "el-icon-s-grid",
    label: "表格布局",
    key: "",
    model: "",
    options: {
      borderWidth: 1,
      width: "100%",
      paddingStyle: '12px', // 用来设置td 的style 字段暂时保留
      color: '#dcdfe6', // 边框颜色
    },
    trs: [
      {
        // 第一行
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            width: "",
            height: "",
            list: [],
            rowNo: [0],   // 记录所占的行
            colNo: [0],   // 记录所占的列
          }, //  一行第一格（列）
          {
            colspan: 1,
            rowspan: 1,
            width: "",
            height: "",
            list: [],
            rowNo: [0],
            colNo: [1],
          }, //  一行第二格（列）
        ],
      },
      {
        // 第二行
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            width: "",
            height: "",
            list: [],
            rowNo: [1],
            colNo: [0],
          }, //  二行第一格（列）
          {
            colspan: 1,
            rowspan: 1,
            width: "",
            height: "",
            list: [],
            rowNo: [1],
            colNo: [1],
          }, //  二行第二格（列）
        ],
      },
    ],
  },
];


<template>
  <div class="formConfig">
    <el-form label-position="top" v-if="record.key">
      <el-form-item label="字段标识">
        <el-input
          size="small"
          v-model="record.model"
          placeholder="请输入字段表示"
        ></el-input>
      </el-form-item>
      <el-form-item label="标题" v-if="isShowFunc(0, 'label')">
        <el-input
          size="small"
          v-model="record.label"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="开启时间范围" v-if="isShowFunc(1, 'isRange')">
        <el-switch v-model="record.options.isRange" @change="handleReset">
        </el-switch>
      </el-form-item>
      <el-form-item label="占位内容" v-if="isShowFunc(1, 'placeholder')">
        <div v-if="record.options.isRange">
          <el-input
            size="small"
            v-model="record.options.startPlaceholder"
            placeholder="开始时间占位内容"
          ></el-input>
          <el-input
            size="small"
            v-model="record.options.endPlaceholder"
            placeholder="结束时间占位内容"
          ></el-input>
        </div>
        <el-input
          v-else
          size="small"
          v-model="record.options.placeholder"
          placeholder="请输入占位内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="文本类型" v-if="isShowFunc(1, 'type')">
        <el-radio-group v-model="record.options.type" size="small">
          <el-radio label="text">文本</el-radio>
          <el-radio label="password">密码</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选项配置" v-if="isShowFunc(1, 'options')">
        <select-config
          :record="record"
          @handleDelete="(obj) => $emit('handleDelete', obj)"
          @handleAdd="(obj) => $emit('handleAdd', obj)"
        ></select-config>
      </el-form-item>
      <el-form-item label="默认值" v-if="isShowFunc(1, 'defaultValue')">
        <!-- 单选框、下拉框默认值 -->
        <el-radio-group
          v-if="record.type === 'radio' || record.type === 'select'"
          v-model="record.options.defaultValue"
        >
          <div v-if="!record.options.dynamic">
            <el-radio
              v-for="option in record.options.options"
              :key="option.value"
              :label="option.value"
              >{{ option.label }}</el-radio
            >
          </div>
          <div v-else>
            <!-- 动态数据 -->
            <el-radio
              v-for="option in dynamicData[record.options.dynamicKey]"
              :key="option.value"
              :label="option.value"
              >{{ option.label }}</el-radio
            >
          </div>
        </el-radio-group>
        <!-- 复选框默认值 -->
        <el-checkbox-group
          v-else-if="record.type === 'checkbox'"
          v-model="record.options.defaultValue"
        >
          <div v-if="!record.options.dynamic">
            <el-checkbox
              v-for="option in record.options.options"
              :key="option.value"
              :label="option.value"
              >{{ option.label }}</el-checkbox
            >
          </div>
          <div v-else>
            <!-- 动态数据 -->
            <el-checkbox
              v-for="option in dynamicData[record.options.dynamicKey]"
              :key="option.value"
              :label="option.value"
              >{{ option.label }}</el-checkbox
            >
          </div>
        </el-checkbox-group>
        <!-- 时间选择默认值 -->
        <el-time-picker
          key="1"
          v-else-if="record.type === 'timePicker' && !record.options.isRange"
          v-model="record.options.defaultValue"
          placeholder="请选择时间"
          size="small"
        >
        </el-time-picker>
        <el-time-picker
          key="2"
          v-else-if="record.type === 'timePicker' && record.options.isRange"
          v-model="record.options.defaultValue"
          is-range
          range-separator="-"
          placeholder="选择时间范围"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="small"
          :value-format="record.options.valueFormat"
        >
        </el-time-picker>

        <el-date-picker
          key="3"
          v-else-if="
            record.type === 'datePicker' &&
            !['monthrange', 'daterange', 'datetimerange'].includes(
              record.options.dateType
            )
          "
          v-model="record.options.defaultValue"
          placeholder="选择日期"
          size="small"
          :value-format="record.options.valueFormat"
          :type="record.options.dateType"
        >
        </el-date-picker>

        <el-date-picker
          key="4"
          v-else-if="
            record.type === 'datePicker' &&
            ['monthrange', 'daterange', 'datetimerange'].includes(
              record.options.dateType
            )
          "
          v-model="record.options.defaultValue"
          range-separator="-"
          placeholder="选择日期"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="small"
          :value-format="record.options.valueFormat"
          :type="record.options.dateType"
        >
        </el-date-picker>

        <el-rate
          v-else-if="record.type === 'rate'"
          v-model="record.options.defaultValue"
          :allow-half="record.options.allowHalf"
          :max="record.options.max"
        ></el-rate>

        <el-switch
          v-else-if="record.type === 'switch'"
          v-model="record.options.defaultValue"
        >
        </el-switch>

        <el-slider
          v-else-if="record.type === 'slider'"
          v-model="record.options.defaultValue"
          size="small"
          :max="record.options.max"
          :min="record.options.min"
          :step="record.options.step"
        ></el-slider>

        <el-input
          v-else
          size="small"
          v-model="record.options.defaultValue"
          placeholder="请输入默认值"
        ></el-input>
        <el-button
          v-if="
            record.type === 'radio' ||
            record.type === 'select' ||
            record.type === 'checkbox'
          "
          type="primary"
          icon="el-icon-refresh"
          circle
          size="small"
          @click="handleReset"
          title="重置选项"
        ></el-button>
      </el-form-item>

      <!-- 图片上传 start -->
      <el-form-item label="样式类型" v-if="isShowFunc(1, 'lisTtype')">
        <el-radio-group v-model="record.options.lisTtype" size="small">
          <el-radio label="text">文字样式</el-radio>
          <el-radio label="picture">图片样式</el-radio>
          <el-radio label="picture-card">卡片样式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最大上传数量" v-if="isShowFunc(1, 'limit')">
        <el-input-number
          size="small"
          v-model="record.options.limit"
          placeholder="请输入"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="文件名称" v-if="isShowFunc(1, 'fileName')">
        <el-input
          size="small"
          v-model="record.options.fileName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传地址" v-if="isShowFunc(1, 'action')">
        <el-input
          size="small"
          v-model="record.options.action"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="额外参数（JSON格式）" v-if="isShowFunc(1, 'data')">
        <el-input
          size="small"
          v-model="record.options.data"
          type="textarea"
          :rows="3"
          placeholder="JSON格式"
        ></el-input>
      </el-form-item>
      <!-- 图片上传 end -->

      <!-- 按钮 start -->
      <el-form-item label="按钮类型" v-if="isShowFunc(1, 'btnType')">
        <el-radio-group v-model="record.options.btnType" size="small">
          <el-radio label="primary">主要</el-radio>
          <el-radio label="success">成功</el-radio>
          <el-radio label="warning">警告</el-radio>
          <el-radio label="danger">危险</el-radio>
          <el-radio label="info">信息</el-radio>
          <el-radio label="text">文字</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="朴素按钮" v-if="isShowFunc(1, 'plain')">
        <el-switch v-model="record.options.plain" size="small"></el-switch>
      </el-form-item>
      <el-form-item label="圆角按钮" v-if="isShowFunc(1, 'round')">
        <el-switch v-model="record.options.round" size="small"></el-switch>
      </el-form-item>
      <el-form-item label="按钮操作" v-if="isShowFunc(1, 'nativeType')">
        <el-radio-group v-model="record.options.nativeType" size="small">
          <el-radio label="submit">提交</el-radio>
          <el-radio label="reset">重置</el-radio>
          <el-radio label="dynamic">动态函数</el-radio>
        </el-radio-group>
        <el-input
          v-show="record.options.nativeType === 'dynamic'"
          v-model.number="record.options.dynamicFun"
          size="small"
          placeholder="动态函数名"
        ></el-input>
      </el-form-item>
      <!-- 按钮 end-->

      <!-- 警告提示 start -->
      <el-form-item label="提示类型" v-if="isShowFunc(1, 'alertType')">
        <el-radio-group v-model="record.options.alertType" size="small">
          <el-radio label="success">成功</el-radio>
          <el-radio label="warning">警告</el-radio>
          <el-radio label="error">危险</el-radio>
          <el-radio label="info">信息</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提示主题" v-if="isShowFunc(1, 'effect')">
        <el-radio-group v-model="record.options.effect" size="small">
          <el-radio label="light">light</el-radio>
          <el-radio label="dark">dark</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="辅助性文字" v-if="isShowFunc(1, 'description')">
        <el-input
          size="small"
          v-model="record.options.description"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="显示关闭按钮" v-if="isShowFunc(1, 'closable')">
        <el-switch v-model="record.options.closable" size="small"></el-switch>
      </el-form-item>
      <el-form-item label="显示图标" v-if="isShowFunc(1, 'showIcon')">
        <el-switch v-model="record.options.showIcon" size="small"></el-switch>
      </el-form-item>

      <!-- 警告提示 end -->

      <el-form-item label="操作属性" v-if="isShowFunc(1, 'hidden')">
        <el-checkbox v-model="record.options.hidden">隐藏</el-checkbox>
        <el-checkbox
          v-model="record.options.disabled"
          v-if="isShowFunc(1, 'disabled')"
          >禁用</el-checkbox
        >
        <el-checkbox
          v-model="record.options.clearable"
          v-if="isShowFunc(1, 'clearable')"
          >可清除</el-checkbox
        >
        <el-checkbox
          v-model="record.options.readonly"
          v-if="isShowFunc(1, 'readonly')"
          >完全只读</el-checkbox
        >
        <el-checkbox
          v-model="record.options.editable"
          v-if="isShowFunc(1, 'editable')"
          >文本框可输入</el-checkbox
        >
        <el-checkbox
          v-model="record.options.multiple"
          v-if="isShowFunc(1, 'multiple')"
          >多选</el-checkbox
        >
        <el-checkbox v-model="record.options.drag" v-if="isShowFunc(1, 'drag')"
          >拖拽上传</el-checkbox
        >
      </el-form-item>

      <el-form-item label="可搜索" v-if="isShowFunc(1, 'filterable')">
        <el-switch v-model="record.options.filterable"> </el-switch>
      </el-form-item>
      <el-form-item label="时间格式" v-if="isShowFunc(1, 'valueFormat')">
        <el-input
          size="small"
          v-model="record.options.valueFormat"
          placeholder="HH:mm:ss"
          @input="handleReset"
        ></el-input>
      </el-form-item>

      <el-form-item label="日期类型" v-if="isShowFunc(1, 'dateType')">
        <el-select
          v-model="record.options.dateType"
          size="small"
          @change="handleReset"
        >
          <el-option
            v-for="option in dateType"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设置步长" v-if="isShowFunc(1, 'step')">
        <el-input-number
          v-model="record.options.step"
          size="small"
          :min="1"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="最大分值" v-if="isShowFunc(1, 'startMax')">
        <el-input-number
          v-model="record.options.startMax"
          size="small"
          :max="10"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="isShowFunc(1, 'max')">
        <el-input-number
          v-model="record.options.max"
          size="small"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最小值" v-if="isShowFunc(1, 'min')">
        <el-input-number
          v-model="record.options.min"
          size="small"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="显示输入框" v-if="isShowFunc(1, 'showInput')">
        <el-switch v-model="record.options.showInput" size="small"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="isShowFunc(1, 'allowHalf')">
        <el-switch v-model="record.options.allowHalf" size="small"></el-switch>
      </el-form-item>

      <el-form-item label="文本高度" v-if="isShowFunc(1, 'rows')">
        <el-input
          size="small"
          v-model.number="record.options.rows"
          placeholder="请输入文本高度"
        ></el-input>
      </el-form-item>

      <el-form-item label="宽度" v-if="isShowFunc(1, 'width')">
        <el-input
          size="small"
          v-model="record.options.width"
          placeholder="请输入宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="标签宽度" v-if="isShowFunc(1, 'labelWidth')">
        <el-checkbox v-model="record.options.labelWidth.isOpen"
          >自定义宽度</el-checkbox
        >
        <el-slider
          :disabled="!record.options.labelWidth.isOpen"
          v-model="record.options.labelWidth.width"
          show-input
          :max="500"
        >
        </el-slider>
      </el-form-item>

      <el-form-item label="校验" v-if="isShowFunc(0, 'rules')">
        <el-checkbox v-model="record.rules[0].required">必填项</el-checkbox>
        <el-input
          v-if="record.rules[0].required"
          size="small"
          v-model="record.rules[0].message"
          placeholder="自定义错误提示"
        ></el-input>
        <div class="flex-sb" v-if="record.rules[1]">
          <el-checkbox v-model="record.rules[1].userFlag"></el-checkbox>
          <el-select
            v-model="record.rules[1].type"
            placeholder="请选择"
            size="small"
            :disabled="!record.rules[1].userFlag"
          >
            <el-option key="string" label="字符串" value="string"> </el-option>
            <el-option key="number" label="数字" value="number"> </el-option>
            <el-option key="integer" label="整数" value="integer"> </el-option>
            <el-option key="float" label="浮点数" value="float"> </el-option>
            <el-option key="url" label="URL地址" value="url"> </el-option>
            <el-option key="email" label="邮箱地址" value="email"> </el-option>
            <el-option key="phone" label="手机号码" value="phone"> </el-option>
          </el-select>
        </div>
        <el-input
          v-if="record.rules[1] && record.rules[1].userFlag"
          size="small"
          v-model="record.rules[1].message"
          placeholder="自定义错误提示"
        ></el-input>
      </el-form-item>

      <!-- 文本 start-->
      <el-form-item label="字体大小" v-if="isShowFunc(1, 'fontSize')">
        <el-input-number
          v-model="record.options.fontSize"
          size="small"
          :min="12"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="颜色" v-if="isShowFunc(1, 'color')">
        <el-color-picker
          v-model="record.options.color"
          size="small"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="字体粗细" v-if="isShowFunc(1, 'fontWeight')">
        <el-radio-group v-model="record.options.fontWeight" size="small">
          <el-radio-button label="lighter">减细</el-radio-button>
          <el-radio-button label="normal">正常</el-radio-button>
          <el-radio-button label="bold">加粗</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="对齐方式" v-if="isShowFunc(1, 'align')">
        <el-radio-group v-model="record.options.align" size="small">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="左边距" v-if="isShowFunc(1, 'marginLeft')">
        <el-input-number
          v-model="record.options.marginLeft"
          size="small"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="右边距" v-if="isShowFunc(1, 'marginRight')">
        <el-input-number
          v-model="record.options.marginRight"
          size="small"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <!-- 文本 end-->

      <!-- 动态表格 start -->
      <template v-if="record.type === 'dynamicTab'">
        <el-form-item label="表格高度">
          <el-input
            size="small"
            v-model.number="record.options.scrollY"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-switch
            v-model="record.options.hideSequence"
            size="small"
          ></el-switch>
        </el-form-item>
      </template>
      <!-- 动态表格 end -->

      <!-- 分割线 start -->
      <template v-if="record.type === 'divider'">
        <el-form-item label="字体粗细">
          <el-radio-group v-model="record.options.contentPosition" size="small">
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <!-- 分割线 end -->

      <!-- 卡片 start -->
      <template v-if="record.type === 'card'">
        <el-form-item label="阴影显示">
          <el-radio-group v-model="record.options.shadow" size="small">
            <el-radio-button label="always">常驻</el-radio-button>
            <el-radio-button label="hover">悬停</el-radio-button>
            <el-radio-button label="never">隐藏</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <!-- 卡片 end -->

      <!--标签页 start -->
      <template v-if="record.type === 'tabs'">
        <el-form-item label="风格类型">
          <el-radio-group v-model="record.options.tabsType" size="small">
            <el-radio-button label="">默认</el-radio-button>
            <el-radio-button label="border-card">卡片</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签位置">
          <el-radio-group v-model="record.options.tabPosition" size="small">
            <el-radio-button label="top">上</el-radio-button>
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="bottom">下</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签设置">
          <select-config-tabs
            :record="record"
            @handleDelete="(obj) => $emit('handleDelete', obj)"
            @handleAdd="(obj) => $emit('handleAdd', obj)"
          ></select-config-tabs>
        </el-form-item>
      </template>

      <!--标签页 end -->

      <!-- 栅格布局 start -->
      <template v-if="record.type === 'grid'">
        <el-form-item label="栅格间距">
          <el-input
            size="small"
            v-model="record.options.gutter"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="列配置项">
          <div v-for="(column, index) in record.columns" :key="index">
            <el-row>
              <el-col :span="21">
                <el-input
                  size="small"
                  v-model.number="column.span"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <i
                  class="el-icon-delete-solid icon-delete-solid"
                  @click="$emit('handleDelete', { type: 'grid', index: index })"
                ></i>
              </el-col>
            </el-row>
          </div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            size="small"
            @click="$emit('handleAdd', { type: 'grid' })"
          ></el-button>
        </el-form-item>
      </template>
      <!-- 栅格布局 end -->

      <!-- 表格布局 start -->
      <template v-if="record.type === 'tableLayout'">
        <el-form-item label="表格边框">
          <el-slider v-model="record.options.borderWidth" :max="5" :min="0">
          </el-slider>
        </el-form-item>
        <el-form-item label="表格边距类型">
          <el-radio-group v-model="record.options.paddingStyle" size="mini">
            <el-radio-button label="12px">宽松</el-radio-button>
            <el-radio-button label="8px 12px">适中</el-radio-button>
            <el-radio-button label="3px 6px">紧凑</el-radio-button>
            <el-radio-button label="0">无边距</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>
      <!-- 表格布局 end -->
    </el-form>
    <div v-else>
      <el-empty description="请选择表单控件" :image-size="100"></el-empty>
    </div>
  </div>
</template>

<script>
import SelectConfig from "./SelectConfig.vue";
import SelectConfigTabs from "./SelectConfigTabs.vue";
export default {
  data() {
    return {
      dateType: [
        { label: "年", value: "year" },
        { label: "年月", value: "month" },
        { label: "年月日", value: "date" },
        { label: "多日期", value: "dates" },
        { label: "星期", value: "week" },
        { label: "日期时间", value: "datetime" },
        { label: "月份范围", value: "monthrange" },
        { label: "日期范围", value: "daterange" },
        { label: "日期时间范围", value: "datetimerange" },
      ],
    };
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
    dynamicData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SelectConfig,
    SelectConfigTabs,
  },
  created() {},
  methods: {
    isShowFunc(flag, target) {
      // 判断字段是否显示的方法
      let type = "";
      if (flag === 0) {
        type = typeof this.record[target];
      } else if (flag === 1) {
        type = typeof this.record.options[target];
      }
      return type !== "undefined";
    },
    handleReset() {
      this.$emit("handleResetSelectValue", { type: this.record.type });
    },
  },
  computed: {
    // 隐藏默认值框
    // isHiddenValue() {
    //   console.log(['radio'].includes(this.record.type));
    //   return !(['radio'].includes(this.record.type))
    // }
  },
};
</script>

<style scoped lang="scss">
</style>
<template>
  <el-form-item
    :label="record.label"
    :labelWidth="labelWidth"
    :rules="itemRules"
    :prop="record.model"
    v-if="
      [
        'input',
        'textarea',
        'inputNumber',
        'radio',
        'checkbox',
        'select',
        'timePicker',
        'datePicker',
        'number',
        'rate',
        'switch',
        'slider',
        'button',
        'uploadImg',
        'uploadFile',
      ].includes(record.type)
    "
  >
    <el-input
      v-if="record.type === 'input' && !jugeNumber"
      :style="{ width: record.options.width }"
      :show-password="record.options.type === 'password'"
      v-model="itemData"
      :placeholder="record.options.placeholder"
      :clearable="record.options.clearable"
      :disabled="record.options.disabled"
    ></el-input>
    <el-input
      v-else-if="record.type === 'input' && jugeNumber"
      :style="{ width: record.options.width }"
      type="number"
      v-model.number="itemData"
      :placeholder="record.options.placeholder"
      :clearable="record.options.clearable"
      :disabled="record.options.disabled"
    ></el-input>
    <el-input
      v-else-if="record.type === 'textarea' && !jugeNumber"
      :style="{ width: record.options.width }"
      type="textarea"
      v-model="itemData"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      :rows="record.options.rows"
      :maxlength="100"
    ></el-input>
    <el-input
      v-else-if="record.type === 'textarea' && jugeNumber"
      :style="{ width: record.options.width }"
      type="textarea"
      v-model.number="itemData"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      :rows="record.options.rows"
    ></el-input>
    <el-input-number
      v-else-if="record.type === 'inputNumber'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :step="record.options.step"
    >
    </el-input-number>
    <el-radio-group
      v-else-if="record.type === 'radio'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
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
    <el-checkbox-group
      v-else-if="record.type === 'checkbox'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
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
    <el-select
      v-else-if="record.type === 'select'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :placeholder="record.options.placeholder"
      :clearable="record.options.clearable"
      :filterable="record.options.filterable"
    >
      <div v-if="!record.options.dynamic">
        <el-option
          v-for="option in record.options.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        >
        </el-option>
      </div>
      <div v-else>
        <!-- 动态数据 -->
        <el-option
          v-for="option in dynamicData[record.options.dynamicKey]"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        >
        </el-option>
      </div>
    </el-select>
    <el-time-picker
      v-else-if="record.type === 'timePicker'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :is-range="record.options.isRange"
      :start-placeholder="record.options.startPlaceholder"
      :end-placeholder="record.options.endPlaceholder"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      :clearable="record.options.clearable"
      :readonly="record.options.readonly"
      :editable="record.options.editable"
      :value-format="record.options.valueFormat"
      range-separator="-"
    >
    </el-time-picker>
    <el-date-picker
      v-else-if="record.type === 'datePicker'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :start-placeholder="record.options.startPlaceholder"
      :end-placeholder="record.options.endPlaceholder"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      range-separator="-"
      :type="record.options.dateType"
    >
    </el-date-picker>
    <el-rate
      v-else-if="record.type === 'rate'"
      :style="{ width: record.options.width }"
      v-model="itemData"
      :allow-half="record.options.allowHalf"
      :max="record.options.startMax"
      :disabled="record.options.disabled"
    ></el-rate>

    <el-switch
      v-else-if="record.type === 'switch'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
    >
    </el-switch>
    <el-slider
      v-else-if="record.type === 'slider'"
      v-model="itemData"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :max="record.options.max"
      :min="record.options.min"
      :step="record.options.step"
      :showInput="record.options.showInput"
    ></el-slider>

    <el-button
      v-else-if="record.type === 'button'"
      :style="{ width: record.options.width }"
      :type="record.options.btnType"
      :plain="record.options.plain"
      :round="record.options.round"
      :disabled="record.options.disabled"
      @click="
        record.options.nativeType === 'submit'
          ? $emit('submit')
          : record.options.nativeType === 'reset'
          ? $emit('reset')
          : dynamicData[record.options.dynamicFun]
          ? dynamicData[record.options.dynamicFun]()
          : false
      "
      >{{ itemData }}</el-button
    >
    <el-upload
      v-else-if="record.type === 'uploadImg'"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :action="record.options.action"
      :multiple="record.options.multiple"
      :limit="record.options.limit"
      :file-list="itemData"
      :list-type="record.options.lisTtype"
    >
      <el-button
        v-if="
          record.options.lisTtype === 'text' ||
          record.options.lisTtype === 'picture'
        "
        size="small"
        type="primary"
        icon="el-icon-upload2"
        >{{ record.options.placeholder }}</el-button
      >
      <i v-else class="el-icon-plus"></i>
    </el-upload>

    <el-upload
      v-else-if="record.type === 'uploadFile'"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :action="record.options.action"
      :multiple="record.options.multiple"
      :limit="record.options.limit"
      :file-list="itemData"
      :list-type="record.options.lisTtype"
    >
      <el-button size="small" type="primary" icon="el-icon-upload2">{{
        record.options.placeholder
      }}</el-button>
    </el-upload>
  </el-form-item>
  <!-- 隐藏标签 -->
  <div
    v-else-if="record.type === 'text'"
    :style="{
      display: 'inline-block',
      width: record.options.width,
      color: record.options.color,
      textAlign: record.options.align,
      fontSize: record.options.fontSize + 'px',
      fontWeight: record.options.fontWeight,
      paddingLeft: record.options.marginLeft + 'px',
      paddingRight: record.options.marginRight + 'px',
    }"
  >
    {{ itemData }}
  </div>
  <div v-else-if="record.type === 'alert'">
    <el-alert
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :title="itemData"
      :type="record.options.alertType"
      :description="record.options.description"
      :show-icon="record.options.showIcon"
      :effect="record.options.effect"
      :closable="record.options.closable"
    >
    </el-alert>
  </div>
  <div v-else-if="record.type === 'html'" v-html="itemData"></div>
  <!-- 分割线 -->
  <div v-else-if="record.type === 'divider'">
    <el-divider :content-position="record.options.contentPosition">{{
      record.label
    }}</el-divider>
  </div>
</template>

<script>
export default {
  name: "ShowFormItem",
  data() {
    return {
      // itemData: JSON.parse(JSON.stringify(this.formData[this.record.model])),
      itemData: this.formData[this.record.model]
    };
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    dynamicData: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    console.log(this.record.model);
  },
  computed: {
    labelWidth() {
      if (this.record.options.labelWidth) {
        const { isOpen, width } = this.record.options.labelWidth;
        return isOpen ? width + "px" : "";
      } else {
        return "";
      }
    },
    jugeNumber() {
      return ["number", "integer", "float"].includes(this.record.rules[1].type);
    },
    itemRules() {
      // 校验规则设置
      let ruleArr = [];
      if (this.record.rules) {
        let rules = this.record.rules;
        ruleArr.push(rules[0]);
        if (rules[1] && rules[1].userFlag) {
          if (rules[1].type === "phone") {
            ruleArr.push({
              pattern: /^1\d{10}$/,
              message:
                rules[1].message ||
                "Please enter the correct mobile phone number.",
            });
          } else {
            ruleArr.push({
              ...rules[1],
              message:
                rules[1].message || `Please enter the correct ${rules[1].type}`,
            });
          }
        }
      }
      return ruleArr;
    },
  },
  watch: {
    itemData: {
      // 监听 itemData 中的值的变化，当值发生变化的时候，通知父组件修改 formData 的值；
      // 若不监听，会是的rules表单校验功能失效
      handler(val) {
        // console.log('itemData', val);
        // this.formData[this.record.model] = val;
        this.$emit("changeFormData", {
          ...this.formData,
          [this.record.model]: val,
        });
        return val
      },
      deep: true,
    },
    formData: {
      // 对 itemData 中进行赋值处理，当外面修改了 formData 中的默认值时，需要对默认值进行重新赋值
      handler(val) {
        // console.log(1);
        this.itemData = val[this.record.model];
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
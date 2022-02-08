<template>
  <el-form-item
    class="tab-form-itme"
    :labelWidth="'0'"
    :prop="tabModel + '[' + scope.$index + ']' + '.' + record.model"
    :rules="itemRules"
  >
    <el-input
      v-if="record.type === 'input' && !jugeNumber"
      :style="{ width: record.options.width }"
      :show-password="record.options.type === 'password'"
      v-model="formDataTab[scope.$index][record.model]"
      :placeholder="record.options.placeholder"
      :clearable="record.options.clearable"
      :disabled="record.options.disabled"
    ></el-input>
    <el-input
      v-else-if="record.type === 'input' && jugeNumber"
      :style="{ width: record.options.width }"
      type="number"
      v-model.number="formDataTab[scope.$index][record.model]"
      :placeholder="record.options.placeholder"
      :clearable="record.options.clearable"
      :disabled="record.options.disabled"
    ></el-input>
    <el-input
      v-else-if="record.type === 'textarea' && !jugeNumber"
      :style="{ width: record.options.width }"
      type="textarea"
      v-model="formDataTab[scope.$index][record.model]"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      :rows="record.options.rows"
      :maxlength="100"
    ></el-input>
    <el-input
      v-else-if="record.type === 'textarea' && jugeNumber"
      :style="{ width: record.options.width }"
      type="textarea"
      v-model.number="formDataTab[scope.$index][record.model]"
      :placeholder="record.options.placeholder"
      :disabled="record.options.disabled"
      :rows="record.options.rows"
    ></el-input>
    <el-input-number
      v-else-if="record.type === 'inputNumber'"
      v-model="formDataTab[scope.$index][record.model]"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :step="record.options.step"
    >
    </el-input-number>
    <el-radio-group
      v-else-if="record.type === 'radio'"
      v-model="formDataTab[scope.$index][record.model]"
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
      v-model="formDataTab[scope.$index][record.model]"
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
      v-model="formDataTab[scope.$index][record.model]"
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
      v-model="formDataTab[scope.$index][record.model]"
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
      v-model="formDataTab[scope.$index][record.model]"
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
      v-model="formDataTab[scope.$index][record.model]"
      :allow-half="record.options.allowHalf"
      :max="record.options.startMax"
      :disabled="record.options.disabled"
    ></el-rate>

    <el-switch
      v-else-if="record.type === 'switch'"
      v-model="formDataTab[scope.$index][record.model]"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
    >
    </el-switch>
    <el-slider
      v-else-if="record.type === 'slider'"
      v-model="formDataTab[scope.$index][record.model]"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :max="record.options.max"
      :min="record.options.min"
      :step="record.options.step"
      :showInput="record.options.showInput"
    ></el-slider>

    <el-upload
      v-else-if="record.type === 'uploadImg'"
      :style="{ width: record.options.width }"
      :disabled="record.options.disabled"
      :action="record.options.action"
      :multiple="record.options.multiple"
      :limit="record.options.limit"
      :file-list="
        formDataTab[scope.$index][record.model] === null
          ? []
          : formDataTab[scope.$index][record.model]
      "
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
      :file-list="
        formDataTab[scope.$index][record.model] === null
          ? []
          : formDataTab[scope.$index][record.model]
      "
      :list-type="record.options.lisTtype"
    >
      <el-button size="small" type="primary" icon="el-icon-upload2">{{
        record.options.placeholder
      }}</el-button>
    </el-upload>
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
      {{ record.options.defaultValue }}
    </div>
  </el-form-item>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
    },
    scope: {
      type: Object,
    },
    dynamicData: {
      type: Object,
      default: () => {},
    },
    formDataTab: {
      type: Array,
      default: () => [],
    },
    tabModel: {
      type: String,
      required: true,
    },
  },
  computed: {
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
};
</script>
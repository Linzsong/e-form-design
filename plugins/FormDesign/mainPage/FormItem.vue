<template>
  <div
    class="itemPage"
    @click.stop="$emit('handleSelectItem', record)"
    :class="{
      active: record.key === selectItem.key,
      hiddenClass: record.options.hidden,
    }"
  >
    <el-form-item
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
          'text',
          'button',
          'alert',
          'uploadImg',
          'uploadFile',
        ].includes(record.type)
      "
      :label="record.label"
      class="form-item"
      :label-width="labelWidth"
      :rules="record.rules"
    >
      <el-input
        v-if="record.type === 'input'"
        v-model="record.options.defaultValue"
        :style="{ width: record.options.width }"
        :placeholder="record.options.placeholder"
        :type="record.options.type"
        :disabled="record.options.disabled"
        :clearable="record.options.clearable"
      >
      </el-input>
      <el-input
        v-else-if="record.type === 'textarea'"
        type="textarea"
        v-model="record.options.defaultValue"
        :style="{ width: record.options.width }"
        :placeholder="record.options.placeholder"
        :rows="record.options.rows"
        :disabled="record.options.disabled"
      >
      </el-input>
      <el-input-number
        v-else-if="record.type === 'inputNumber'"
        v-model="record.options.defaultValue"
        :style="{ width: record.options.width }"
        :disabled="record.options.disabled"
        :step="record.options.step"
      >
      </el-input-number>
      <el-radio-group
        v-else-if="record.type === 'radio'"
        v-model="record.options.defaultValue"
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
        v-model="record.options.defaultValue"
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
        v-model="record.options.defaultValue"
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
        v-model="record.options.defaultValue"
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
        v-model="record.options.defaultValue"
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
        v-model="record.options.defaultValue"
        :allow-half="record.options.allowHalf"
        :max="record.options.startMax"
        :disabled="record.options.disabled"
      ></el-rate>

      <el-switch
        v-else-if="record.type === 'switch'"
        v-model="record.options.defaultValue"
        :style="{ width: record.options.width }"
        :disabled="record.options.disabled"
      >
      </el-switch>

      <el-slider
        v-else-if="record.type === 'slider'"
        v-model="record.options.defaultValue"
        :style="{ width: record.options.width }"
        :disabled="record.options.disabled"
        :max="record.options.max"
        :min="record.options.min"
        :step="record.options.step"
        :showInput="record.options.showInput"
      ></el-slider>

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

      <el-button
        v-else-if="record.type === 'button'"
        :style="{ width: record.options.width }"
        :type="record.options.btnType"
        :plain="record.options.plain"
        :round="record.options.round"
        :disabled="record.options.disabled"
        >{{ record.options.defaultValue }}</el-button
      >

      <el-alert
        v-else-if="record.type === 'alert'"
        :style="{ width: record.options.width }"
        :disabled="record.options.disabled"
        :title="record.options.defaultValue"
        :type="record.options.alertType"
        :description="record.options.description"
        :show-icon="record.options.showIcon"
        :effect="record.options.effect"
        :closable="record.options.closable"
      >
      </el-alert>

      <el-upload
        v-else-if="record.type === 'uploadImg'"
        :style="{ width: record.options.width }"
        :disabled="record.options.disabled"
        :action="record.options.action"
        :multiple="record.options.multiple"
        :limit="record.options.limit"
        :file-list="record.options.defaultValue"
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
        :file-list="record.options.defaultValue"
        :list-type="record.options.lisTtype"
      >
        <el-button size="small" type="primary" icon="el-icon-upload2">{{
          record.options.placeholder
        }}</el-button>
      </el-upload>
      <div v-else>无</div>
    </el-form-item>
    <div
      v-else-if="record.type === 'html'"
      v-html="record.options.defaultValue"
    ></div>
    <div class="itemPage_key">
      {{ record.model }}
    </div>
    <div
      class="itemPage_operation"
      :class="
        record.key === selectItem.key
          ? 'itemPage_operation_active'
          : 'itemPage_operation_none'
      "
    >
      <!-- 复制 -->
      <i
        class="el-icon-document-copy itemPage_operation_icon"
        @click.stop="$emit('handleCopy')"
      ></i>
      <!-- 删除 -->
      <i
        class="el-icon-delete itemPage_operation_icon"
        @click.stop="$emit('handleDelete')"
      ></i>
    </div>
  </div>
</template>

<script>
// import draggable from "vuedraggable";

export default {
  props: {
    record: {
      required: true,
    },
    selectItem: {
      required: true,
    },
    config: {
      required: true,
    },
    dynamicData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    // draggable,
  },
  methods: {
    handleStart(e, list) {
      console.log(e.oldIndex, list);
    },
  },
  computed: {
    labelWidth() {
      if (this.record.options.labelWidth) {
        const { isOpen, width } = this.record.options.labelWidth;
        return isOpen ? width + "px" : "";
      } else {
        return "0px";
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
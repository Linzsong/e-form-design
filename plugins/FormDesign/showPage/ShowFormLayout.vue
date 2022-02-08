<template>
  <div class="showFormLayouPage">
    <!-- 栅格布局 -->
    <div v-if="record.type === 'grid'">
      <el-row class="gridPage" :gutter="record.options.gutter">
        <el-col
          v-for="(column, index) in record.columns"
          :key="index"
          :span="column.span"
        >
          <!-- 使用递归组件必须要写上组件的name -->
          <show-form-layout
            v-for="item in column.list"
            :key="item.key"
            :record="item"
            :formData="formData"
            :dynamicData="dynamicData"
            @submit="submit"
            @reset="reset"
            @changeform="(obj) => $emit('changeform', obj)"
          ></show-form-layout>
        </el-col>
      </el-row>
    </div>
    <!-- 动态表格 -->
    <div v-else-if="record.type === 'dynamicTab'">
      <el-table
        :data="formData[record.model]"
        border
        :style="record.options.width"
        :height="record.options.scrollY"
      >
        <el-table-column
          v-if="record.options.hideSequence"
          type="index"
          label="序号"
          width="100"
          align="center"
        />

        <el-table-column
          v-for="(item, index) in record.list"
          :key="item.model"
          :prop="item.model"
          :label="item.label"
          align="center"
          min-width="220px"
        >
          <template slot-scope="scope">
            <show-form-table
              :record="record.list[index]"
              :scope="scope"
              :dynamicData="dynamicData"
              :formDataTab="formData[record.model]"
              :tabModel="record.model"
            ></show-form-table>
          </template>
        </el-table-column>
        <el-table-column
          v-if="record.list.length === 0"
          label="  "
          min-width="100"
        />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-minus"
              circle
              plain
              size="mini"
              @click="$emit('handleDelete', scope, record.model)"
            ></el-button>
            <el-button
              icon="el-icon-document-copy"
              circle
              plain
              size="mini"
              @click="$emit('handleCopy', scope, record.model)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        class="add-btn"
        icon="el-icon-plus"
        size="small"
        @click="$emit('dynamicAdd', record)"
        >加一行</el-button
      >
    </div>

    <!-- 卡片布局 -->
    <div v-else-if="record.type === 'card'">
      <el-card :shadow="record.options.shadow">
        <div slot="header">
          <span>{{ record.label }}</span>
        </div>
        <show-form-layout
          v-for="record in record.list"
          :key="record.key"
          :record="record"
          :formData="formData"
          :dynamicData="dynamicData"
          @submit="submit"
          @reset="reset"
          @changeform="(obj) => $emit('changeform', obj)"
        ></show-form-layout>
      </el-card>
    </div>
    <!-- 标签页 -->
    <div v-else-if="record.type === 'tabs'">
      <el-tabs
        :value="record.columns[0].value"
        :type="record.options.tabsType"
        :tabPosition="record.options.tabPosition"
      >
        <el-tab-pane
          v-for="column in record.columns"
          :key="column.value"
          :label="column.label"
          :name="column.value"
        >
          <show-form-layout
            v-for="item in column.list"
            :key="item.key"
            :record="item"
            :formData="formData"
            :dynamicData="dynamicData"
            @submit="submit"
            @reset="reset"
            @changeform="(obj) => $emit('changeform', obj)"
          ></show-form-layout>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 行内布局 -->
    <div v-else-if="record.type === 'inline'">
      <div class="inline-layout">
        <show-form-layout
          v-for="record in record.list"
          :key="record.key"
          :record="record"
          :formData="formData"
          :dynamicData="dynamicData"
          @submit="submit"
          @reset="reset"
          @changeform="(obj) => $emit('changeform', obj)"
        ></show-form-layout>
      </div>
    </div>
    <!-- 表格布局 -->
    <div v-else-if="record.type === 'tableLayout'">
      <table
        class="table-layout"
        :width="record.options.width"
        :border="record.options.borderWidth"
        :bordercolor="record.options.color"
      >
        <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
          <td
            class="table-td"
            v-for="(tdItem, tdIndex) in trItem.tds"
            :key="tdIndex"
            :colspan="tdItem.colspan"
            :rowspan="tdItem.rowspan"
            :style="{
              width: tdItem.width + 'px',
              height: tdItem.height + 'px',
              padding: record.options.paddingStyle,
              borderWidth: record.options.borderWidth + 'px',
            }"
          >
            <template>
              <show-form-layout
                v-for="citem in tdItem.list"
                :key="citem.key"
                :record="citem"
                :formData="formData"
                :dynamicData="dynamicData"
                @submit="submit"
                @reset="reset"
                @changeform="(obj) => $emit('changeform', obj)"
              ></show-form-layout>
            </template>
          </td>
        </tr>
      </table>
    </div>

    <show-form-item
      v-else-if="!record.options.hidden"
      :record="record"
      :formData="formData"
      :dynamicData="dynamicData"
      @changeFormData="changeFormData"
      @submit="$emit('submit')"
      @reset="$emit('reset')"
    ></show-form-item>
  </div>
</template>

<script>
import ShowFormItem from "./ShowFormItem.vue";
import ShowFormTable from "./ShowFormTable.vue";

export default {
  name: "ShowFormLayout", // 重要
  data() {
    return {
      // dynamicTableData: [],
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
  components: {
    ShowFormItem,
    ShowFormTable,
  },
  created() {},
  methods: {
    submit() {
      this.$emit("submit");
    },
    reset() {
      this.$emit("reset");
    },
    changeFormData(obj) {
      this.$emit("changeform", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
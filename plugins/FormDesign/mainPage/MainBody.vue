<template>
  <div class="container_main_body">
    <div class="no-list" v-show="data.list.length === 0">
      从左侧拖拽来添加字段
    </div>
    <el-form
      ref="showForm"
      class="container_main_body_form"
      :inline="data.config.inline"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
      :size="data.config.size"
    >
      <draggable
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move',
        }"
        v-model="data.list"
        @add="addListData"
        @start="(e) => $emit('startDrag', data.list[e.oldIndex])"
      >
        <transition-group tag="div" name="list-fade" class="list-main">
          <layout-item
            class="drag-move"
            v-for="(record, index) in data.list"
            :key="record.key"
            :record="record"
            :config="data.config"
            :selectItem.sync="selectItem"
            :dragType="dragType"
            :index="index"
            :insertAllowedType="insertAllowedType"
            :dynamicData="dynamicData"
            @handleSelectItem="handleSelectItem"
            @handleAdd="addListData"
            @handleColAdd="handleColAdd"
            @handleDelete="handleDelete"
            @handleCopy="handleCopy"
            @openMenu="openMenu"
            @handleAddFormTable="handleAddFormTable"
          >
          </layout-item>
      
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import LayoutItem from "./LayoutItem.vue";

export default {
  props: {
    data: {
      required: true,
    },
    selectItem: {
      required: true,
    },
    dragType: {
      type: String,
      require: true,
    },
    insertAllowedType: {
      type: Array,
      require: true,
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      // listData: [],
    };
  },
  components: {
    draggable,
    LayoutItem,
  },
  created() {
    // this.data.list = this.data.list;
  },
  methods: {
    // 该方法仅适合第一层中的表单项
    addListData(evt) {
      // 深度拷贝
      let index = evt.newIndex; // 新增index
      this.data.list[index] = JSON.parse(JSON.stringify(this.data.list[index]));
      // console.log(this.data.list);
      // 生成model和key值
      const key = new Date().getTime() + "_" + Math.ceil(Math.random() * 99999);
      const model = this.data.list[index].type + "_" + key;
      this.$set(this.data.list, index, {
        ...this.data.list[index],
        key: key,
        model: model,
      });
      // 高亮新生产的表单控件
      this.handleSelectItem(this.data.list[index]);
    },
    // 栅格布局、卡片布局、标签页、动态表格、行内布局 中添加栏位中的子项
    handleColAdd(evt, column) {
      let index = evt.newIndex;
      column[index] = JSON.parse(JSON.stringify(column[index]));
      // 生成model和key值
      const key = new Date().getTime() + "_" + Math.ceil(Math.random() * 99999);
      const model = column[index].type + "_" + key;
      this.$set(column, index, {
        ...column[index],
        key: key,
        model: model,
      });
      // 高亮新生产的表单控件
      this.handleSelectItem(column[index]);
    },
    // 表格布局 中添加栏位中的子选项
    handleAddFormTable($event, tbData, trIndex, tdIndex) {
      let newIndex = $event.newIndex;
      // 数据解耦
      tbData.trs[trIndex].tds[tdIndex].list[newIndex] = JSON.parse(JSON.stringify(tbData.trs[trIndex].tds[tdIndex].list[newIndex]));
      const key = new Date().getTime() + "_" + Math.ceil(Math.random() * 99999);
      const model = tbData.trs[trIndex].tds[tdIndex].list[newIndex].type + "_" + key;
      this.$set(tbData.trs[trIndex].tds[tdIndex].list, newIndex, {
        ...tbData.trs[trIndex].tds[tdIndex].list[newIndex],
        key: key,
        model: model,
      })

      // 高亮新生产的表单控件
      this.handleSelectItem(tbData.trs[trIndex].tds[tdIndex].list[newIndex])

    },
    // dragStart(evt: customEventType, list: lsitType[]): void {
    //   console.log('dragStart...')
    //   // 拖拽结束,自动选择拖拽的控件项
    //   // this.$emit("handleSetSelectItem", list[evt.oldIndex]);
    // }
    handleCopy() {
      const traverse = (array) => {
        array.forEach((element, index) => {
          if (element.key === this.selectItem.key) {
            // 找到已选择的表单组件，复制添加到选择节点后面
            array.splice(index + 1, 0, element);
            // 重置 key
            const newIndex = index + 1;
            // 生成新的key 和 model
            const key =
              new Date().getTime() + "_" + Math.ceil(Math.random() * 99999);
            const model = array[newIndex].type + "_" + key;
            this.$set(array, newIndex, {
              ...array[newIndex],
              key: key,
              model: model,
            });
            if (["dynamicTab", "inline", "card"].includes(element.type)) {
              // 动态表格的复制，置空内容
              this.$set(array, newIndex, {
                ...array[newIndex],
                list: [],
              });
            } else if (["grid"].includes(element.type)) {
              // 栅格布局复制，置空内容
              let columnArr = [];
              element.columns.forEach((column) => {
                columnArr.push({
                  span: column.span,
                  list: [],
                });
              });
              this.$set(array, newIndex, {
                ...array[newIndex],
                columns: columnArr,
              });
            } else if (["tabs"].includes(element.type)) {
              // 标签页复制，置空内容
              let columnArr = [];
              element.columns.forEach((column) => {
                columnArr.push({
                  value: column.value,
                  label: column.label,
                  list: [],
                });
              });
              this.$set(array, newIndex, {
                ...array[newIndex],
                columns: columnArr,
              });
            } else if (["tableLayout"].includes(element.type)) {
              // 标签页布局复制，置空内容
              let trsNewArr = [];
              element.trs.forEach((trsArr) => {
                let tdsNewArr = [];
                trsArr.tds.forEach((tdsArr, tdsIndex) => {
                  tdsNewArr.push({
                    ...tdsArr[tdsIndex],
                    list: [],
                  });
                });
                trsNewArr.push({
                  tds: tdsNewArr,
                });
              });
              this.$set(array, newIndex, {
                ...array[newIndex],
                trs: trsNewArr,
              });
            }
            // 高亮新生产的表单控件
            this.handleSelectItem(array[newIndex]);
            return;
          }
          if (["grid", "tabs"].includes(element.type)) {
            // 栅格布局、标签页 内的复制
            element.columns.forEach((item) => {
              traverse(item.list);
            });
          } else if (["dynamicTab", "card", "inline"].includes(element.type)) {
            // 动态表格、卡片布局 内的复制
            traverse(element.list);
          } else if (["tableLayout"].includes(element.type)) {
            // 表格布局内的复制
            element.trs.forEach((trsArr) => {
              trsArr.tds.forEach((tdsArr) => {
                traverse(tdsArr.list);
              });
            });
          }
        });
      };
      traverse(this.data.list);
    },
    handleDelete() {
      const traverse = (array) => {
        array.forEach((element, index) => {
          if (element.key === this.selectItem.key) {
            // 找到已选择的表单组件,进行删除
            array.splice(index, 1);
            // 控件高亮处理
            if (array.length === 0 && index === 0) {
              // 删除首个，且只有一个
              this.$emit("handleSelectItem", "");
            } else if (array.length === index) {
              // 删除最后一个时，往上移动
              this.handleSelectItem(array[index - 1]);
            } else {
              // 其他删除往上移动
              this.handleSelectItem(array[index]);
            }
            return;
          }
          if (["grid", "tabs"].includes(element.type)) {
            // 栅格布局内的删除
            element.columns.forEach((item) => {
              traverse(item.list);
            });
          } else if (["dynamicTab", "card", "inline"].includes(element.type)) {
            // 动态表格内的删除
            traverse(element.list);
          } else if(["tableLayout"].includes(element.type)) {
            // 表格布局内的删除
            element.trs.forEach((trsArr) => {
              trsArr.tds.forEach((tdsArr) => {
                traverse(tdsArr.list);
              });
            });
          }
        });
      };
      traverse(this.data.list);
    },
    handleSelectItem(record) {
      this.$emit("handleSelectItem", record);
    },
    openMenu($event, trIndex, tdIndex, record) {
      this.$emit("openMenu", $event, trIndex, tdIndex, record);
    },
  },
};
</script>

<style scoped>
</style>
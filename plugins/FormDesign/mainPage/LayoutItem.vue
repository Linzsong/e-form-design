<template>
  <div>
    <template>
      <!-- 栅格布局 -->
      <template v-if="record.type === 'grid'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <el-row class="gridPage" :gutter="record.options.gutter">
            <el-col
              v-for="(column, index) in record.columns"
              :key="index"
              :span="column.span"
            >
              <div class="gridPage_cell">
                <draggable
                  tag="div"
                  class="draggable-box"
                  v-bind="{
                    group: 'form-draggable',
                    ghostClass: 'moving',
                    animation: 180,
                    handle: '.drag-move',
                  }"
                  v-model="column.list"
                  @add="$emit('handleColAdd', $event, column.list)"
                >
                  <transition-group
                    tag="div"
                    name="list-fade"
                    class="list-main"
                  >
                    <layout-item
                      class="drag-move"
                      v-for="item in column.list"
                      :key="item.key"
                      :record="item"
                      :config="config"
                      :selectItem.sync="selectItem"
                      :dragType="dragType"
                      :insertAllowedType="insertAllowedType"
                      :dynamicData="dynamicData"
                      @handleSelectItem="handleSelectItem"
                      @handleColAdd="handleColAdd"
                      @handleCopy="$emit('handleCopy')"
                      @handleDelete="$emit('handleDelete')"
                      @openMenu="openMenu"
                    >
                    </layout-item>
                  </transition-group>
                </draggable>
              </div>
            </el-col>
          </el-row>

          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 动态表格 -->
      <template v-else-if="record.type === 'dynamicTab'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <div class="dynamicTab">
            <draggable
              tag="div"
              style="width: 100%"
              class="dynamicTab_drag"
              v-bind="{
                group: isAllowDrag ? 'form-draggable' : '',
                ghostClass: 'movingTab',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="record.list"
              @add="$emit('handleColAdd', $event, record.list)"
            >
              <transition-group
                tag="div"
                name="list-fade"
                class="list-main dynamicTab_tran"
              >
                <layout-item
                  class="drag-move dynamicTab_layout"
                  v-for="item in record.list"
                  :key="item.key"
                  :record="item"
                  :config="config"
                  :selectItem.sync="selectItem"
                  :dragType="dragType"
                  :insertAllowedType="insertAllowedType"
                  :dynamicData="dynamicData"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleDelete="$emit('handleDelete')"
                  @openMenu="openMenu"
                >
                </layout-item>
              </transition-group>
            </draggable>
          </div>
          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 分割线 -->
      <template v-else-if="record.type === 'divider'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <el-divider
            :content-position="record.options.contentPosition"
            @openMenu="openMenu"
            >{{ record.label }}</el-divider
          >
          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 卡片布局 -->
      <template v-else-if="record.type === 'card'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <el-card :shadow="record.options.shadow">
            <div slot="header">
              <span>{{ record.label }}</span>
            </div>
            <draggable
              tag="div"
              class=""
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="record.list"
              @add="$emit('handleColAdd', $event, record.list)"
            >
              <transition-group tag="div" name="list-fade" class="list-main layout-drag">
                <layout-item
                  class="drag-move"
                  v-for="item in record.list"
                  :key="item.key"
                  :record="item"
                  :config="config"
                  :selectItem.sync="selectItem"
                  :dragType="dragType"
                  :insertAllowedType="insertAllowedType"
                  :dynamicData="dynamicData"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleDelete="$emit('handleDelete')"
                  @openMenu="openMenu"
                >
                </layout-item>
              </transition-group>
            </draggable>
          </el-card>
          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 标签页 -->
      <template v-else-if="record.type === 'tabs'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
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
              <draggable
                tag="div"
                class="tabs_drag"
                v-bind="{
                  group: 'form-draggable',
                  ghostClass: 'moving',
                  animation: 180,
                  handle: '.drag-move',
                }"
                v-model="column.list"
                @add="$emit('handleColAdd', $event, column.list)"
              >
                <transition-group tag="div" name="list-fade" class="list-main layout-drag">
                  <layout-item
                    class="drag-move"
                    v-for="item in column.list"
                    :key="item.key"
                    :record="item"
                    :config="config"
                    :selectItem.sync="selectItem"
                    :dragType="dragType"
                    :insertAllowedType="insertAllowedType"
                    :dynamicData="dynamicData"
                    @handleSelectItem="handleSelectItem"
                    @handleColAdd="handleColAdd"
                    @handleCopy="$emit('handleCopy')"
                    @handleDelete="$emit('handleDelete')"
                    @openMenu="openMenu"
                  >
                  </layout-item>
                </transition-group>
              </draggable>
            </el-tab-pane>
          </el-tabs>
          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 行内布局 -->
      <template v-else-if="record.type === 'inline'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <div class="dynamicTab">
            <draggable
              tag="div"
              style="width: 100%"
              class="inline_drag"
              v-bind="{
                group: isAllowDrag ? 'form-draggable' : '',
                ghostClass: 'movingTab',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="record.list"
              @add="$emit('handleColAdd', $event, record.list)"
            >
              <transition-group
                tag="div"
                name="list-fade"
                class="list-main inline_tran"
              >
                <layout-item
                  class="drag-move dynamicTab_layout"
                  v-for="item in record.list"
                  :key="item.key"
                  :record="item"
                  :config="config"
                  :selectItem.sync="selectItem"
                  :dragType="dragType"
                  :insertAllowedType="insertAllowedType"
                  :dynamicData="dynamicData"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleDelete="$emit('handleDelete')"
                  @openMenu="openMenu"
                >
                </layout-item>
              </transition-group>
            </draggable>
          </div>
          <div
            class="itemPage_operation layoutPage_operation"
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
      <!-- 表格布局 -->
      <template v-else-if="record.type == 'tableLayout'">
        <div
          class="itemPage layoutPage"
          @click.stop="$emit('handleSelectItem', record)"
          :class="{ active: record.key === selectItem.key }"
        >
          <div>
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
                  @contextmenu.prevent="
                    $emit('openMenu', $event, trIndex, tdIndex, record)
                  "
                  :style="{
                    width: tdItem.width + 'px',
                    height: tdItem.height + 'px',
                    padding: record.options.paddingStyle,
                    borderWidth: record.options.borderWidth + 'px',
                  }"
                >
                  <draggable
                    tag="div"
                    style="width: 100%"
                    class="inline_drag"
                    v-bind="{
                      group: 'form-draggable',
                      ghostClass: 'movingTab',
                      animation: 180,
                      handle: '.drag-move',
                    }"
                    v-model="tdItem.list"
                    @add="
                      $emit(
                        'handleAddFormTable',
                        $event,
                        record,
                        trIndex,
                        tdIndex
                      )
                    "
                  >
                    <transition-group
                      tag="div"
                      name="list-fade"
                      class="list-main tabLayout"
                    >
                      <layout-item
                        class="drag-move"
                        v-for="el in tdItem.list"
                        :key="el.key"
                        :record="el"
                        :config="config"
                        :selectItem.sync="selectItem"
                        :dragType="dragType"
                        :insertAllowedType="insertAllowedType"
                        :dynamicData="dynamicData"
                        @handleSelectItem="handleSelectItem"
                        @handleColAdd="handleColAdd"
                        @handleCopy="$emit('handleCopy')"
                        @handleDelete="$emit('handleDelete')"
                        @handleAddFormTable="handleAddFormTable"
                        @openMenu="openMenu"
                      >
                      </layout-item>
                    </transition-group>
                  </draggable>
                </td>
              </tr>
            </table>
          </div>

          <div
            class="itemPage_operation layoutPage_operation"
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

      <template v-else>
        <form-item
          :key="record.key"
          :selectItem.sync="selectItem"
          :record="record"
          :config="config"
          @handleSelectItem="handleSelectItem"
          @handleCopy="$emit('handleCopy')"
          @handleDelete="$emit('handleDelete')"
          @openMenu="$emit('openMenu')"
          :dynamicData="dynamicData"
        />
        <!-- @handleDelete="$emit('handleDelete')" -->
        <!-- @handleShowRightMenu="$emit('handleShowRightMenu')" -->
      </template>
    </template>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import FormItem from "./FormItem.vue";

export default {
  name: "layoutItem",
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
    dragType: {
      type: String,
      require: true,
    },
    insertAllowedType: {
      type: Array,
      require: true,
    },
    index: {
      type: Number,
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    },
  },
  created() {
  },
  components: {
    draggable,
    FormItem,
  },
  computed: {
    isAllowDrag() {
      // console.log();
      console.log(this.dragType, this.insertAllowedType.includes(this.dragType));
      return this.insertAllowedType.includes(this.dragType);
    },
  },
  methods: {
    handleStart() {
      // e, list
    },
    handleSelectItem(record) {
      this.$emit("handleSelectItem", record);
    },
    handleColAdd(e, list) {
      this.$emit("handleColAdd", e, list);
    },
    handleAddFormTable($event, tbData, trIndex, tdIndex) {
      console.log("handleAddFormTable", $event, tbData, trIndex, tdIndex);
      this.$emit("handleAddFormTable", $event, tbData, trIndex, tdIndex);
    },
    openMenu($event, trIndex, tdIndex, record) {
      this.$emit("openMenu", $event, trIndex, tdIndex, record);
    },
  },
};
</script>

<style scoped>
.dynamicTab_class {
  display: inline-block;
}
</style>
<template>
  <div class="formPage">
    <el-container class="container">
      <el-header class="container_header">My Form Design</el-header>
      <el-container>
        <el-aside class="container_aside-left" width="300px">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基础字段" name="1">
              <base-items :list="baseLists" @startDrag="startDrag"></base-items>
            </el-collapse-item>
            <el-collapse-item title="布局字段" name="2">
              <base-items
                :list="layoutLists"
                @startDrag="startDrag"
              ></base-items>
            </el-collapse-item>
          </el-collapse>
        </el-aside>
        <el-main class="container_main">
          <main-head
            v-model="previewSize"
            @preview="preview"
            @createJSON="createJSON(data)"
            @clearAll="clearAll"
          ></main-head>
          <main-body
            :data="data"
            :selectItem="selectItem"
            :dragType="dragType"
            :insertAllowedType="insertAllowedType"
            @handleSelectItem="handleSelectItem"
            @openMenu="openMenu"
            @startDrag="startDrag"
            :dynamicData="dynamicData"
          ></main-body>
        </el-main>
        <el-aside class="container_aside-right" width="280px">
          <el-tabs
            class="container_aside_content"
            v-model="activeName"
            :stretch="true"
          >
            <el-tab-pane
              class="container_aside_content_config"
              label="字段属性"
              name="0"
            >
              <el-scrollbar style="height: 100%">
                <element-config
                  :record="selectItem"
                  @handleAdd="handleAdd"
                  @handleDelete="handleDelete"
                  @handleResetSelectValue="handleResetSelectValue"
                  :dynamicData="dynamicData"
                ></element-config>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane
              class="container_aside_content_config"
              label="表单属性"
              name="1"
            >
              <el-scrollbar style="height: 100%">
                <form-config :config="data.config"></form-config>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
    <json-dialog ref="jsonDialog"></json-dialog>
    <show-form-dialog
      ref="showFormDialog"
      @createJSON="createJSON"
    ></show-form-dialog>
    <div
      v-show="visible"
      :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
      class="right-menu"
    >
      <ul>
        <li :class="{ disabled: !addColFlag }" @click="handleAddCol">
          <i class="el-icon-arrow-right" />右插入列
        </li>
        <li :class="{ disabled: !addRowFlag }" @click="handleAddRow">
          <i class="el-icon-arrow-down" />下插入行
        </li>
        <el-divider class="divider"></el-divider>
        <li @click="handleRightMerge(trIndex, tdIndex)">
          <i class="el-icon-caret-right" />向右合并
        </li>
        <li @click="handleDownMerge(trIndex, tdIndex)">
          <i class="el-icon-caret-bottom" />向下合并
        </li>
        <el-divider class="divider"></el-divider>
        <li @click="handleSplitCol(trIndex, tdIndex)">
          <i class="el-icon-s-ticket" />拆分列
        </li>
        <li @click="handleSplitRow(trIndex, tdIndex)">
          <i class="el-icon-s-unfold" />拆分行
        </li>
        <el-divider class="divider"></el-divider>
        <li @click="handleDeleteCol(trIndex, tdIndex)">
          <i class="el-icon-delete" />删除列
        </li>
        <li @click="handleDeleteRow(trIndex, tdIndex)">
          <i class="el-icon-delete-solid" />删除行
        </li>
        <el-divider class="divider"></el-divider>
        <li @click="handleSetHW(trIndex, tdIndex)">
          <i class="el-icon-s-tools" />设置宽高
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseItems from "./FormDesign/leftPage/BaseItems.vue";
import MainHead from "./FormDesign/mainPage/MainHead.vue";
import MainBody from "./FormDesign/mainPage/MainBody.vue";
import ElementConfig from "./FormDesign/configPage/ElementConfig.vue";
import FormConfig from "./FormDesign/configPage/FormConfig.vue";
import JsonDialog from "./FormDesign/dialog/JsonDialog.vue";
import ShowFormDialog from "./FormDesign/dialog/ShowFormDialog.vue";

import { baseLists, layoutLists } from "./FormDesign/config/config.js";
export default {
  name: "EFormDesign",
  props: {
    dynamicData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    data: {
      type: Object,
      default: function () {
        return {
          list: [],
          config: {
            labelWidth: 100,
            labelPosition: "right",
            size: "small",
            inline: false,
          },
        };
      },
    },
  },
  data() {
    return {
      activeNames: ["1", "2"],
      baseLists: [],
      layoutLists: [],
      // data: {
      //   list: [],
      //   config: {
      //     labelWidth: 100,
      //     labelPosition: "right",
      //     size: "small",
      //     inline: false,
      //   },
      // },
      selectItem: {
        type: "",
        icon: "",
        key: "",
        model: "",
        label: "",
        options: {},
        rules: [],
      },
      formData: [], // 主体内容数据
      configData: {}, // 表单配置数据
      updateTime: 0, // 更新时间
      activeName: "1", // tabs 中的显示属性

      dragType: "", // 拖拽左侧栏中的类型
      insertAllowedType: [
        "input",
        "textarea",
        "inputNumber",
        "radio",
        "checkbox",
        "select",
        "timePicker",
        "datePicker",
        "number",
        "rate",
        "switch",
        "slider",
        "uploadImg",
        "uploadFile",
      ], // 允许插入递归的类型
      // 表格布局字段
      visible: false, // 表格布局右键显示字段
      menuTop: 0,
      menuLeft: 0,
      tdIndex: 0,
      trIndex: 0,
      tbData: "",
      addColFlag: true, // 添加列标识位 true 可添加  false 不可添加
      addRowFlag: true, // 添加列标识位 true 可添加  false 不可添加
      visibleFlag: false,
      cellWidth: 0,
      cellHeight: 0,
      menuSelectValue: {},
      previewSize: "pc",
    };
  },
  components: {
    BaseItems,
    MainHead,
    MainBody,
    ElementConfig,
    FormConfig,
    JsonDialog,
    ShowFormDialog,
  },
  created() {
    this.baseLists = baseLists;
    this.layoutLists = layoutLists;

    this.formData = this.data.list;
    this.configData = this.data.config;
  },
  mounted() {
    // 添加监听取消右键菜单
    document.addEventListener("click", this.handleRemoveRightMenu, true);
    document.addEventListener("contextmenu", this.handleRemoveRightMenu, true);
  },
  methods: {
    handleSelectItem(record) {
      // 操作间隔不能低于100毫秒
      const newTime = new Date().getTime();
      if (newTime - this.updateTime < 100) {
        return false;
      }

      this.updateTime = newTime;

      // 设置selectItem的值
      this.selectItem = record
        ? record
        : {
            type: "",
            icon: "",
            key: "",
            model: "",
            label: "",
            options: {},
            rules: [],
          };
      // 字段属性显示控制
      if (this.selectItem.key) {
        this.activeName = "0";
      } else {
        this.activeName = "1";
      }
      return true;
    },
    handleChangeTab(flag) {
      this.activeName = flag;
    },

    // 预览函数
    preview() {
      this.$refs.showFormDialog.dialogVisible = true;
      this.$refs.showFormDialog.jsonData = this.data;
      this.$refs.showFormDialog.dynamicData = this.dynamicData;
      this.$refs.showFormDialog.dialogWidth =
        this.previewSize === "pc"
          ? "1240px"
          : this.previewSize === "pad"
          ? "810px"
          : "415px";
    },

    // 清空
    clearAll() {
      this.$confirm("是否确认清空表单字段?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.data = {
            list: [],
            config: {
              labelWidth: 100,
              labelPosition: "right",
              size: "small",
              inline: false,
            },
          };
          this.formData = this.data.list;
          this.configData = this.data.config;
          this.activeName = "1";
          this.selectItem = {
            type: "",
            icon: "",
            key: "",
            model: "",
            label: "",
            options: {},
            rules: [],
          };
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        })
        .catch(() => {});
    },

    // 生成JSON
    createJSON(data) {
      this.$refs.jsonDialog.dialogVisible = true;
      this.$refs.jsonDialog.jsonData = data;
    },

    // 添加选项方法
    handleAdd(option) {
      const { type } = option;

      // 栅格布局新增列
      if (type === "grid") {
        this.selectItem.columns.push({
          span: 12,
          list: [],
        });
      } else if (type === "radio_checked_select") {
        // 单选框、多选框、下拉框新增
        let len = this.selectItem.options.options.length + 1;
        let value = `value${len}_${Math.ceil(Math.random() * 1000)}`;
        this.selectItem.options.options.push({
          value: value,
          label: "选项" + len,
        });
      } else if (type === "tabs") {
        let len = this.selectItem.columns.length + 1;
        let value = `value${len}_${Math.ceil(Math.random() * 1000)}`;
        this.selectItem.columns.push({
          value: value,
          label: "选项" + len,
          list: [],
        });
      }
    },
    // 删除方法
    handleDelete(option) {
      const { type, index } = option;
      if (type === "grid" || type === "tabs") {
        // 栅格布局删除列
        this.selectItem.columns.splice(index, 1);
      } else if (type === "radio_checked_select") {
        // 单选框、多选框、下拉框删除
        const { label } = this.selectItem.options.options[index];
        const { defaultValue } = this.selectItem.options;
        const type = typeof defaultValue;
        if (type === "string") {
          // defaultValue 类型为字符串
          if (label === defaultValue) {
            this.selectItem.options.defaultValue = "";
          }
        } else if (type === "object") {
          // defaultValue 类型为数组
          defaultValue.forEach((item, indexChilden) => {
            if (label === item) {
              this.selectItem.options.defaultValue.splice(indexChilden, 1);
            }
          });
        }
        this.selectItem.options.options.splice(index, 1);
      }
    },
    handleResetSelectValue(option) {
      const type = option.type;
      if (type === "radio" || type === "select") {
        this.selectItem.options.defaultValue = "";
      } else if (type === "checkbox") {
        this.selectItem.options.defaultValue = [];
      } else if (type === "timePicker" || type === "datePicker") {
        this.selectItem.options.defaultValue = null;
      }
    },
    startDrag(value) {
      this.dragType = value.type;
    },

    /**
     * 表格布局方法
     */

    // 显示右键菜单
    openMenu(e, trIndex, tdIndex, record) {
      e.stopPropagation();
      // 显示
      this.visible = true;
      // 定位
      if (document.body.clientHeight - e.clientY > 332) {
        this.menuTop = e.clientY;
      } else {
        this.menuTop = e.clientY - 332;
      }
      this.menuLeft = e.clientX;
      this.trIndex = trIndex;
      this.tdIndex = tdIndex;

      this.menuSelectValue = record;
      this.isAddCol(trIndex, tdIndex);
      this.isAddRow(trIndex, tdIndex);
      return false;
    },
    // 判断选择的格子能否添加列
    isAddCol(trIndex, tdIndex) {
      let flag = true;
      let cell = this.menuSelectValue.trs[trIndex].tds[tdIndex];
      let colNoMax = cell.colNo.reduce((a, b) => {
        return a > b ? a : b;
      });

      this.menuSelectValue.trs.forEach((trItem) => {
        trItem.tds.forEach((tdItem) => {
          let itemFlag = tdItem.colNo.find((item) => item === colNoMax);
          if (typeof itemFlag !== "undefined") {
            let max = tdItem.colNo.reduce((a, b) => {
              return a > b ? a : b;
            });
            if (itemFlag < max) {
              // 不是最后一个，证明colNo还有更大的，说明他跨行了,不能新增
              flag = false;
            }
          }
        });
      });
      if (flag) {
        this.addColFlag = true;
      } else {
        this.addColFlag = false;
      }
    },
    // 判断选择的格子能否添加行
    isAddRow(trIndex) {
      let flag = true;
      let tdsArr = this.menuSelectValue.trs[trIndex].tds;
      tdsArr.forEach((tdItem) => {
        if (tdItem.rowspan > 1) {
          flag = false;
        }
      });
      if (flag) {
        this.addRowFlag = true;
      } else {
        this.addRowFlag = false;
      }
    },
    // 取消右键菜单
    handleRemoveRightMenu() {
      this.visible = false;
    },
    // 向下合并
    handleDownMerge(trIndex, tdIndex) {
      let trsArr = this.menuSelectValue.trs;
      let trrArrLen = trsArr.length;
      let cell = this.menuSelectValue.trs[trIndex].tds[tdIndex];

      if (trrArrLen - cell.rowspan <= trIndex) {
        this.$message.error("当前是最后一行，无法向下合并");
        return false;
      }

      // rows cols 为所占行、列的最大值
      let rows = cell.rowNo.reduce((a, b) => {
        return a > b ? a : b;
      });
      let cols = cell.colNo.reduce((a, b) => {
        return a > b ? a : b;
      });

      // nextRows nextCols 下一行 下一列
      let nextRows = 0;
      let nextCols = 0;

      // 找 nextRows 和 nextCols
      trsArr.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem) => {
          tdItem.rowNo.forEach((item) => {
            if (item == rows + 1) {
              nextRows = trI;
            }
          });
        });
      });
      trsArr[nextRows].tds.forEach((tdItem, tdIndex) => {
        tdItem.colNo.forEach((item) => {
          if (item == cols) {
            nextCols = tdIndex;
          }
        });
      });

      // 当新生产的行
      if (cell.colspan !== trsArr[nextRows].tds[nextCols].colspan) {
        this.$message.error("当前表格无法向下合并");
        return false;
      }

      cell.rowspan += trsArr[nextRows].tds[nextCols].rowspan;

      cell.rowNo = cell.rowNo.concat(trsArr[nextRows].tds[nextCols].rowNo);

      trsArr[nextRows].tds = trsArr[nextRows].tds.filter(
        (item, index) => index !== nextCols
      );
    },
    // 向右合并
    handleRightMerge(trIndex, tdIndex) {
      let tdsArr = this.menuSelectValue.trs[trIndex].tds;
      // 总列数
      const sumCols = tdsArr
        .map((item) => item.colspan)
        .reduce(function (partial, value) {
          return partial + value;
        });
      if (sumCols - tdsArr[tdIndex].colspan <= tdIndex) {
        this.$message.error("当前是最后一列，无法向右合并");
        return false;
      }
      if (tdsArr[tdIndex].rowspan !== tdsArr[tdIndex + 1].rowspan) {
        this.$message.error("当前表格无法向右合并");
        return false;
      }

      tdsArr[tdIndex].colspan += tdsArr[tdIndex + 1].colspan;

      tdsArr[tdIndex].colNo = tdsArr[tdIndex].colNo.concat(
        tdsArr[tdIndex + 1].colNo
      );

      this.menuSelectValue.trs[trIndex].tds = tdsArr.filter((item, index) => {
        return index !== tdIndex + 1;
      });
    },
    // 右插入列
    handleAddCol() {
      // 序号处理，保证colNo升序且唯一
      let trsArr = this.menuSelectValue.trs;
      let max = 0;
      let len = trsArr[this.trIndex].tds.length;
      let arrIndex = [];
      if (len - 1 <= this.tdIndex) {
        // 最后一列
        max = trsArr[this.trIndex].tds[len - 1].colNo.reduce((a, b) => {
          return a > b ? a : b;
        });
        trsArr.forEach((trItem, trInd) => {
          trItem.tds.forEach((tdItem, tdInd) => {
            if (tdInd == 0) {
              let obj = this.findIndexFunc(trInd, max);
              arrIndex.push(obj.y);
            }
          });
        });
      } else {
        // 不是最后一列，新增列在前一列的colNo中的最大值
        // 下一列开始全部 +1
        let data = trsArr[this.trIndex].tds[this.tdIndex].colNo.reduce(
          (a, b) => {
            return a > b ? a : b;
          }
        );
        max = data;
        trsArr.forEach((trItem, trInd) => {
          trItem.tds.forEach((tdItem, tdInd) => {
            if (tdInd == 0) {
              let obj = this.findIndexFunc(trInd, max);
              arrIndex.push(obj.y);
            }
            tdItem.colNo.forEach((i, j) => {
              if (i > data) {
                tdItem.colNo[j] = tdItem.colNo[j] + 1;
              }
            });
          });
        });
      }
      // 新增操作
      trsArr.forEach((item, i) => {
        item.tds.splice(arrIndex[i] + 1, 0, {
          colspan: 1,
          rowspan: 1,
          list: [],
          rowNo: [i], // 行号
          colNo: [max + 1], // 列号
          width: "",
          height: "",
        });
      });
    },
    // 下插入行
    handleAddRow() {
      let max = 0;
      let trsArr = this.menuSelectValue.trs;
      let len = trsArr.length;
      // 获取总col值
      const sumCols = trsArr[0].tds
        .map((item) => item.colspan)
        .reduce(function (partial, value) {
          return partial + value;
        });

      if (len - 1 <= this.trIndex) {
        // 最后一row
        max = trsArr[len - 1].tds[this.tdIndex].rowNo.reduce((a, b) => {
          return a > b ? b : a;
        });
      } else {
        // 不是最后一行，新增行在前一行的rowNo中的最大值
        // 下一行开始全部 +1
        let data = trsArr[this.trIndex].tds[this.tdIndex].rowNo.reduce(
          (a, b) => {
            return a > b ? b : a;
          }
        );
        max = data;
        trsArr.forEach((trItem) => {
          trItem.tds.forEach((tdItem) => {
            tdItem.rowNo.forEach((i, j) => {
              if (i > data) {
                tdItem.rowNo[j] = tdItem.rowNo[j] + 1;
              }
            });
          });
        });
      }
      // 新增操作
      const rowJson = { tds: [] };
      for (let i = 0; i < sumCols; i++) {
        rowJson.tds.push({
          colspan: 1,
          rowspan: 1,
          list: [],
          rowNo: [max + 1], // 行号
          colNo: [i], // 列号
          width: "",
          height: "",
        });
      }
      let differRow = trsArr[this.trIndex].tds[this.tdIndex].rowspan;
      trsArr.splice(this.trIndex + differRow, 0, rowJson);
    },
    // 拆分列
    handleSplitCol(trIndex, tdIndex) {
      let cell = this.menuSelectValue.trs[trIndex].tds[tdIndex];
      let colNo = JSON.parse(JSON.stringify(cell.colNo));
      if (colNo.length <= 1) {
        this.$message.error("拆分失败，该列无法拆分");
        return false;
      }
      colNo.forEach((item, index) => {
        if (index == 0) {
          cell.colspan = 1;
          cell.colNo = [];
          cell.colNo.push(item);
          cell.width = "";
          cell.height = "";
        } else {
          this.menuSelectValue.trs[trIndex].tds.splice(item, 0, {
            colspan: 1,
            rowspan: JSON.parse(JSON.stringify(cell.rowspan)),
            rowNo: JSON.parse(JSON.stringify(cell.rowNo)),
            colNo: [item],
            list: [],
            width: "",
            height: "",
          });
        }
      });
    },
    // 拆分行
    handleSplitRow(trIndex, tdIndex) {
      let cell = this.menuSelectValue.trs[trIndex].tds[tdIndex];
      let rowNo = JSON.parse(JSON.stringify(cell.rowNo));
      if (rowNo.length <= 1) {
        this.$message.error("拆分失败，该行无法拆分");
        return false;
      }
      rowNo.forEach((item, index) => {
        if (index == 0) {
          cell.rowspan = 1;
          cell.rowNo = [];
          cell.rowNo.push(item);
          cell.width = "";
          cell.height = "";
        } else {
          let colNo1 = cell.colNo[0];
          this.menuSelectValue.trs[item].tds.splice(colNo1, 0, {
            colspan: JSON.parse(JSON.stringify(cell.colspan)),
            rowspan: 1,
            rowNo: [item],
            colNo: JSON.parse(JSON.stringify(cell.colNo)),
            list: [],
            width: "",
            height: "",
          });
        }
      });
    },
    // 删除列
    handleDeleteCol(trIndex, tdIndex) {
      let colI = this.menuSelectValue.trs[trIndex].tds[tdIndex].colspan;
      if (colI > 1) {
        this.$message.error("删除失败，请拆分后再删除");
        return false;
      }
      let colNo = this.menuSelectValue.trs[trIndex].tds[tdIndex].colNo[0];
      let colArr = []; // 记录关联的行 唯一坐标 和 标准坐标
      let mergeArr = []; // 记录该合并的坐标和合并数
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          let flag = tdItem.colNo.findIndex((element) => element == colNo);
          if (flag !== -1) {
            colArr.push({
              x: trI, // 唯一坐标
              y: tdI,
              xNo: tdItem.rowNo[0], // 第一个标准坐标
              yNo: tdItem.colNo[0],
            });
          }
        });
      });
      // 拆分所有格子，记录超过两个行的格子，为删除后拆分做准备
      colArr.forEach((i) => {
        let obj = this.findIndexFunc(i.xNo, i.yNo);
        if (this.menuSelectValue.trs[obj.x].tds[obj.y].colspan > 1) {
          if (this.menuSelectValue.trs[obj.x].tds[obj.y].colspan === 2) {
            this.handleSplitCol(obj.x, obj.y); // 列拆分
          } else {
            mergeArr.push({
              xNo: this.menuSelectValue.trs[i.x].tds[i.y].rowNo[0], // 第一个标准坐标
              yNo: this.menuSelectValue.trs[i.x].tds[i.y].colNo[0],
              line: this.menuSelectValue.trs[i.x].tds[i.y].colspan - 2, // 合并次数，删了一行-1，2行合并一次-1
            });
            this.handleSplitCol(obj.x, obj.y); // 列拆分
          }
        }
      });
      // 删除列
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          let flag = tdItem.colNo.findIndex((element) => element == colNo);
          if (flag !== -1) {
            this.menuSelectValue.trs[trI].tds.splice(tdI, 1);
          }
        });
      });

      // 对标准格子序号重排序
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          tdItem.colNo.forEach((c, i) => {
            if (c > colNo) {
              // 大于colNo序号的，序号进行-1处理
              this.menuSelectValue.trs[trI].tds[tdI].colNo[i] -= 1;
            }
          });
        });
      });
      // 合并原先拆分的格子
      mergeArr.forEach((item) => {
        let obj = this.findIndexFunc(item.xNo, item.yNo);
        for (let i = 0; i < item.line; i++) {
          this.handleRightMerge(obj.x, obj.y);
        }
      });
    },
    // 删除行
    handleDeleteRow(trIndex, tdIndex) {
      /**
       * 规定：
       * 唯一坐标:  一个格子只有一个坐标
       * 标准坐标: 每一个标准格子中的坐标，一个合并格中可包含多个标准坐标
       */

      let rowI = this.menuSelectValue.trs[trIndex].tds[tdIndex].rowspan;
      if (rowI > 1) {
        this.$message.error("删除失败，请拆分后再删除");
        return false;
      }
      let rowNo = this.menuSelectValue.trs[trIndex].tds[tdIndex].rowNo[0];
      let lineArr = []; // 记录关联的行 唯一坐标 和 标准坐标
      let mergeArr = []; // 记录该合并的坐标和合并数

      // 找到所关联的格子 唯一坐标 和 标准坐标
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          let flag = tdItem.rowNo.findIndex((element) => element == rowNo);
          if (flag !== -1) {
            lineArr.push({
              x: trI, // 唯一坐标
              y: tdI,
              xNo: tdItem.rowNo[0], // 第一个标准坐标
              yNo: tdItem.colNo[0],
            });
          }
        });
      });
      // 拆分所有格子，记录超过两个行的格子，为删除后拆分做准备
      lineArr.forEach((i) => {
        let obj = this.findIndexFunc(i.xNo, i.yNo);
        if (this.menuSelectValue.trs[obj.x].tds[obj.y].rowspan > 1) {
          if (this.menuSelectValue.trs[obj.x].tds[obj.y].rowspan === 2) {
            this.handleSplitRow(obj.x, obj.y); // 行拆分
          } else {
            mergeArr.push({
              xNo: this.menuSelectValue.trs[i.x].tds[i.y].rowNo[0], // 第一个标准坐标
              yNo: this.menuSelectValue.trs[i.x].tds[i.y].colNo[0],
              line: this.menuSelectValue.trs[i.x].tds[i.y].rowspan - 2, // 合并次数，删了一行-1，2行合并一次-1
            });
            this.handleSplitRow(obj.x, obj.y); // 行拆分
          }
        }
      });
      // 删除行
      this.menuSelectValue.trs.splice(rowNo, 1);
      // 对标准格子序号重排序
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          tdItem.rowNo.forEach((r, i) => {
            if (r > rowNo) {
              // 大于rowNo序号的，序号进行-1处理
              this.menuSelectValue.trs[trI].tds[tdI].rowNo[i] -= 1;
            }
          });
        });
      });
      // 合并原先拆分的格子
      mergeArr.forEach((item) => {
        let obj = this.findIndexFunc(item.xNo, item.yNo);
        for (let i = 0; i < item.line; i++) {
          this.handleDownMerge(obj.x, obj.y);
        }
      });
    },
    // 通过 标准坐标 => 找到 唯一坐标
    findIndexFunc(x, y) {
      let obj = {};
      this.menuSelectValue.trs.forEach((trItem, trI) => {
        trItem.tds.forEach((tdItem, tdI) => {
          if (
            tdItem.rowNo.findIndex((item) => item === x) !== -1 &&
            tdItem.colNo.findIndex((item) => item === y) !== -1
          ) {
            obj.x = trI;
            obj.y = tdI;
          }
        });
      });
      if (JSON.stringify(obj) === "{}") {
        console.log(
          "error!注意: 该错误是个不可忽视的!，findIndexFunc未找到真实坐标!"
        );
      }
      return obj;
    },
  },
  // watch: {
  //   // 调试使用。。。
  //   data: {
  //     handler(val) {
  //       console.log("data数据：", val.list[0]);
  //     },
  //     deep: true,
  //   },
  // },
};
</script>
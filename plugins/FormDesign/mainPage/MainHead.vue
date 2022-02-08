<template>
  <div class="container_main_header">
    <div>
      <i
        class="el-icon-monitor container_main_header_icon"
        :class="{'icon-active' : previewSize==='pc'}"
        @click="$emit('changeSize', 'pc')"
      ></i>
      <i
        class="el-icon-mobile container_main_header_icon"
        :class="{'icon-active' : previewSize==='pad'}"
        @click="$emit('changeSize', 'pad')"
      ></i>
      <i
        class="el-icon-mobile-phone container_main_header_icon"
        :class="{'icon-active' : previewSize==='phone'}"
        @click="$emit('changeSize', 'phone')"
      ></i>
    </div>
    <div>
      <el-button
        type="primary"
        round
        icon="el-icon-view"
        size="mini"
        plain
        @click="$emit('preview')"
        >预览</el-button
      >
      <el-button
        type="success"
        round
        icon="el-icon-tickets"
        size="mini"
        plain
        @click="$emit('createJSON')"
        >生产JSON</el-button
      >
      <el-button
        type="danger"
        round
        icon="el-icon-delete"
        size="mini"
        plain
        @click="$emit('clearAll')"
        >清空</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    previewSize: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: 'previewSize',
    event: "changeSize"
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
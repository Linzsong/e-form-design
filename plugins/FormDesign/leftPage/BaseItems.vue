<template>
  <div>
    <draggable
      tag="ul"
      :value="list"
      v-bind="{
        group: { name: 'form-draggable', pull: 'clone', put: false },
        sort: false,
        animation: 180,
      }"
      @start="(e) => $emit('startDrag', list[e.oldIndex])"
    >
      <li v-for="(val, index) in list" :key="index">
        <i :class="val.icon"></i>
        {{ val | labelName }}
      </li>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    list: {
      required: true,
    },
  },
  filters: {
    labelName: function (value) {
      if (value.label && typeof value.label === "string") {
        return value.label;
      } else {
        return value.type === "text"
          ? "文本"
          : value.type === "button"
          ? "按钮"
          : value.type === "alert"
          ? "提示框"
          : value.type === "html"
          ? "HTML"
          : "";
      }
    },
  },
};
</script>

<style scoped>
</style>
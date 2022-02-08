<template>
  <div>
    <div>
      <draggable
          tag="div"
          class="abc"
          v-bind="{
            group: 'form-config',
            animation: 180,
            handle: '.el-icon-rank',
          }"
          v-model="record.columns"
        >
          <transition-group tag="div" name="el-fade-in" class="list-main">
            <div v-for="(option, index) in record.columns" :key="option.value">
              <i class="el-icon-rank icon-rank"></i>
              <el-input class="option_input" v-model="option.label" size="small" placeholder="label值"></el-input>
              <el-input class="option_input" v-model="option.value" size="small" placeholder="value值"></el-input>
              <i class="el-icon-delete-solid icon-delete-solid" @click="$emit('handleDelete',{type: 'tabs', index: index})"></i>
            </div>
          </transition-group>
        </draggable>
        <el-button type="primary" icon="el-icon-plus" circle size="small" @click="$emit('handleAdd',{type: 'tabs'})"></el-button>

    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
    };
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  components: {
    draggable,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
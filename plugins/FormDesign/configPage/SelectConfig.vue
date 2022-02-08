<template>
  <div>
    <el-radio-group v-model="record.options.dynamic" size="small">
      <el-radio-button :label="false" :value="false">静态数据</el-radio-button>
      <el-radio-button :label="true" :value="true">动态数据</el-radio-button>
    </el-radio-group>
    <div v-if="!record.options.dynamic">
      <draggable
          tag="div"
          class="abc"
          v-bind="{
            group: 'form-config',
            animation: 180,
            handle: '.el-icon-rank',
          }"
          v-model="record.options.options"
        >
          <transition-group tag="div" name="el-fade-in" class="list-main">
            <div v-for="(option, index) in record.options.options" :key="option.value">
              <i class="el-icon-rank icon-rank"></i>
              <el-input class="option_input" v-model="option.label" size="small" placeholder="label值"></el-input>
              <el-input class="option_input" v-model="option.value" size="small" placeholder="value值"></el-input>
              <i class="el-icon-delete-solid icon-delete-solid" @click="$emit('handleDelete',{type: 'radio_checked_select', index: index})"></i>
            </div>
          </transition-group>
        </draggable>
        <el-button type="primary" icon="el-icon-plus" circle size="small" @click="$emit('handleAdd',{type: 'radio_checked_select'})"></el-button>

    </div>
    <div v-else>
      <el-input v-model="record.options.dynamicKey" placeholder="动态数据变量名" size="small"></el-input>
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
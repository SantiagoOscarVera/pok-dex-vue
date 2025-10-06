<template>
  <button
    :class="['base-btn', btnClass]"
    :style="btnStyle"
    @click.stop="onClick"
  >
    <img v-if="icon" :src="icon" :alt="iconAlt" class="btn-icon" />
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  icon: String,
  iconAlt: {
    type: String,
    default: ''
  },
  btnClass: {
    type: [String, Object, Array],
    default: ''
  },
  btnStyle: {
    type: [String, Object],
    default: ''
  }
})
const emit = defineEmits(['click'])
function onClick(e) {
  emit('click', e)
}
</script>

<style scoped>
.base-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 0;
}
.btn-icon {
  vertical-align: middle;
  margin-right: 14px;
}
</style>

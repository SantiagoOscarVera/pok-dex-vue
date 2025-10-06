<template>
  <div class="search-wrapper">
    <span class="search-icon">
      <img :src="icon" alt="Search" width="18" height="18" />
    </span>
    <input
      v-model="modelValueProxy"
      class="search-input"
      type="text"
      :placeholder="placeholder"
      autocomplete="off"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Search'
  },
  icon: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<style scoped>
.search-wrapper {
  position: relative;
  margin-bottom: 36px;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #bfbfbf;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
}

.search-input::placeholder {
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 8.75;
  color: #bfbfbf;
  opacity: 1;
}
.search-input {
  padding: 10px 40px;
  border-radius: 5px;
  border: none;
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 8.75;
  color: #353535;
  background: #ffffff;
  outline: none;
  box-sizing: border-box;
  width: 315px;
  height: 50px;
  box-shadow: 0px 2px 10px 0 rgb(0 0 0 / 0.04);
}

@media (min-width: 768px) {
  .search-input {
    width: 570px;
  }
}
</style>

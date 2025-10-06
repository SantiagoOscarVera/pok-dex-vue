

<template>
  <Transition name="fade">
    <div class="loader-ball-wrapper" :class="{ 'loader-ball-bg': background }" v-if="show" :style="{ background: background }">
      <img :src="loaderBallSvg" :alt="altText" class="loader-ball-spin loader-ball-size" :style="{ width: size + 'px', height: size + 'px' }" />
      <slot />
    </div>
  </Transition>
</template>

<script setup>
import loaderBallSvg from '../assets/images/loader-ball.svg';
const props = defineProps({
  show: { type: Boolean, default: true },
  size: { type: Number, default: 120 },
  background: { type: String, default: '#fff' }
})

const altText = 'Loading...'
</script>

<style scoped>
.loader-ball-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.loader-ball-spin {
  animation: spin 1.1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

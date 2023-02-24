<template>
  <div class="card" :style="{ background }">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  background: {
    type: String,
    default: 'rgba(17, 16, 45, 0.2)',
  },
});
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  position: relative;
  padding: 15px 20px;
  box-sizing: border-box;

  .content {
    height: 100%;
  }
}
</style>

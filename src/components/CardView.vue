<template>
  <div class="card">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.card {
  background: rgba(17, 16, 45, 0.7);
  height: 100%;
  position: relative;
  padding: 15px 20px;
  box-sizing: border-box;

  .content {
    height: 100%;
  }
}
</style>

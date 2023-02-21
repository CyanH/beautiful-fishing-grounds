<template>
  <div class="left">
    <top-view></top-view>
    <middle-view></middle-view>
    <bottom-view></bottom-view>
  </div>
</template>

<script setup lang="ts">
import topView from './left/top.vue';
import middleView from './left/middle.vue';
import bottomView from './left/bottom.vue';
</script>

<style lang="scss" scoped>
.left {
  width: 27%;
  height: 100%;
  padding-right: 10px;
  box-sizing: border-box;
}
</style>

<template>
  <data-bar></data-bar>
  <map-view></map-view>

  <component :is="currentComponent"></component>
</template>

<script setup lang="ts">
import dataBar from './breed/dataBar.vue';

import mapView from './breed/map.vue';
import emitter from '@/utils/eventbus';
import { defineAsyncComponent, markRaw, onUnmounted, ref } from 'vue';

const rightDrawer = markRaw(defineAsyncComponent(() => import('./breed/rightDrawer.vue')));
const baseDrawer = markRaw(defineAsyncComponent(() => import('./breed/baseDrawer.vue')));
const pondDrawer = markRaw(defineAsyncComponent(() => import('./breed/pondDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./breed/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./breed/szDrawer.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./breed/videoDrawer.vue')));
const tljDrawer = markRaw(defineAsyncComponent(() => import('./breed/tljDrawer.vue')));
const currentComponent = ref(rightDrawer);

emitter.on('setRightDrawer', (name) => {
  if (name === 'base') {
    currentComponent.value = baseDrawer;
  } else if (name === 'pond') {
    currentComponent.value = pondDrawer;
  } else if (name === 'qxz') {
    currentComponent.value = qxzDrawer;
  } else if (name === 'sz') {
    currentComponent.value = szDrawer;
  } else if (name === 'sxt') {
    currentComponent.value = videoDrawer;
  } else if (name === 'tlj') {
    currentComponent.value = tljDrawer;
  } else {
    currentComponent.value = rightDrawer;
  }
});

onUnmounted(() => {
  emitter.emit('setRightDrawer', '');
});
</script>

<style lang="scss" scoped></style>

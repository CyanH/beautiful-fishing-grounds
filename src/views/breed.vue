<template>
  <left-drawer v-if="componentName !== 'pond'" />
  <map-view></map-view>

  <component :is="currentComponent"></component>
</template>

<script setup lang="ts">
import mapView from './breed/map.vue';
import emitter from '@/utils/eventbus';
import { defineAsyncComponent, markRaw, onUnmounted, ref } from 'vue';

const leftDrawer = markRaw(defineAsyncComponent(() => import('./breed/leftDrawer.vue')));
const rightDrawer = markRaw(defineAsyncComponent(() => import('./breed/rightDrawer.vue')));
const baseDrawer = markRaw(defineAsyncComponent(() => import('./breed/baseDrawer.vue')));
const pondDrawer = markRaw(defineAsyncComponent(() => import('./breed/pondDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./breed/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./breed/szDrawer.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./breed/videoDrawer.vue')));
const currentComponent = ref(rightDrawer);
const componentName = ref('');

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
  } else {
    currentComponent.value = rightDrawer;
  }
  componentName.value = name as string;
});

onUnmounted(() => {
  emitter.emit('setRightDrawer', '');
});
</script>

<style lang="scss" scoped></style>

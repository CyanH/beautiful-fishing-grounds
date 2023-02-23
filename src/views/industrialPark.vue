<template>
  <left-drawer />
  <data-bar></data-bar>
  <component :is="currentComponent"></component>

  <map-view></map-view>
</template>

<script setup lang="ts">
import emitter from '@/utils/eventbus';
import dataBar from './industrialPark/dataBar.vue';
import { defineAsyncComponent, markRaw, onMounted, onUnmounted, ref } from 'vue';
import mapView from './industrialPark/map.vue';

const leftDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/leftDrawer.vue')));
const rightDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/rightDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./breed/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./breed/szDrawer.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./breed/videoDrawer.vue')));
let currentComponent = ref(rightDrawer);

onMounted(() => {
  emitter.on('setRightDrawer', (name) => {
    if (name === 'qxz') {
      currentComponent.value = qxzDrawer;
    } else if (name === 'sz') {
      currentComponent.value = szDrawer;
    } else if (name === 'sxt') {
      currentComponent.value = videoDrawer;
    } else {
      currentComponent.value = rightDrawer;
    }
  });
});

onUnmounted(() => {
  emitter.emit('setRightDrawer', '');
});
</script>

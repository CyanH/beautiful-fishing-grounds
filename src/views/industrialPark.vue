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
const allDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/allDrawer.vue')));
const parkDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/parkDrawer.vue'))); //园区概况
const subjectMain = markRaw(defineAsyncComponent(() => import('./industrialPark/subjectMain.vue'))); //实施主体
const breedBaseMain = markRaw(defineAsyncComponent(() => import('./industrialPark/breedBaseMain.vue'))); //养殖基地
const projectMain = markRaw(defineAsyncComponent(() => import('./industrialPark/projectMain.vue'))); //养殖基地
const farmMain = markRaw(defineAsyncComponent(() => import('./industrialPark/farmMain.vue'))); //联农带农
const eventDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/eventDrawer.vue'))); //园区大事记
const overallDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/overallDrawer.vue')));
const subjectDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/subjectDrawer.vue')));
const breedBase = markRaw(defineAsyncComponent(() => import('./industrialPark/breedBaseDrawer.vue')));
const projectDrawer = markRaw(defineAsyncComponent(() => import('./industrialPark/projectDrawer.vue')));
let currentComponent = ref(allDrawer);

onMounted(() => {
  emitter.on('setRightDrawer', (name) => {
    if (name === 'event') {
      currentComponent.value = eventDrawer;
    } else if (name === 'subjectMain') {
      currentComponent.value = subjectMain;
    } else if (name === 'breedBaseMain') {
      currentComponent.value = breedBaseMain;
    } else if (name === 'projectMain') {
      currentComponent.value = projectMain;
    } else if (name === 'farmMain') {
      currentComponent.value = farmMain;
    } else if (name === 'overall') {
      currentComponent.value = overallDrawer;
    } else if (name === 'subject') {
      // 实施主体
      currentComponent.value = subjectDrawer;
    } else if (name === 'breedBase') {
      // 养殖基地
      currentComponent.value = breedBase;
    } else if (name === 'project') {
      // 建设项目
      currentComponent.value = projectDrawer;
    } else if (name === 'park') {
      // 园区概况
      currentComponent.value = parkDrawer;
    } else {
      currentComponent.value = allDrawer;
    }
  });
});

onUnmounted(() => {
  emitter.emit('setRightDrawer', '');
});
</script>

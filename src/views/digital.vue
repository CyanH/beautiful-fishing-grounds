<template>
  <data-bar :form="state.form"></data-bar>
  <!-- <map-view :form="state.form"></map-view> -->

  <left-drawer :form="state.form"></left-drawer>
  <component :is="currentComponent" :form="state.form"></component>
</template>

<script setup lang="ts">
import dataBar from './digital/dataBar.vue';
import leftDrawer from './digital/leftDrawer.vue';
// import mapView from './digital/map.vue';
import emitter from '@/utils/eventbus';
import { getPlantBase } from '@/api/breed';
import { defineAsyncComponent, markRaw, onMounted, onUnmounted, reactive, ref } from 'vue';
import { resetDrawerShow } from '@/composables/resetDrawer';

const rightDrawer = markRaw(defineAsyncComponent(() => import('./digital/rightDrawer.vue')));
const pondDrawer = markRaw(defineAsyncComponent(() => import('./digital/pondDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./digital/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./digital/szDrawer.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./digital/videoDrawer.vue')));
const tljDrawer = markRaw(defineAsyncComponent(() => import('./digital/tljDrawer.vue')));
const currentComponent = ref(rightDrawer);
const state = reactive({ form: {} as any });

emitter.on('setRightDrawer', (name) => {
  if (name === 'pond') {
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

onMounted(() => {
  getPlantBase({ info: '国泰水产' }).then((res: any) => {
    state.form = res.content[0];
  });
});

onUnmounted(() => {
  resetDrawerShow();
});
</script>

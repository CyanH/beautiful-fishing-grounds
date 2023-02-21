<template>
  <left-drawer></left-drawer>
  <map-view></map-view>

  <template v-if="show">
    <center-drawer :wuliu="wuliu_id"></center-drawer>
  </template>
  <component :is="currentComponent"></component>
</template>

<script setup lang="ts">
import emitter from '@/utils/eventbus';
import leftDrawer from './market/leftDrawer.vue';
// import rightDrawer from './market/rightDrawer.vue';
import mapView from './market/map.vue';
import { resetDrawerShow } from '@/composables/resetDrawer';
import { onUnmounted, defineAsyncComponent, markRaw, ref } from 'vue';

const rightDrawer = markRaw(defineAsyncComponent(() => import('./market/rightDrawer.vue')));
// 物流信息
const wuDrawer = markRaw(defineAsyncComponent(() => import('./market/wuDrawer.vue')));
// 贸易订单
const maoDrawer = markRaw(defineAsyncComponent(() => import('./market/maoDrawer.vue')));
// 物流信息详情
const centerDrawer = markRaw(defineAsyncComponent(() => import('./market/centerDrawer.vue')));
let currentComponent = ref(rightDrawer);
const show = ref(false);
let wuliu_id = ref('');
emitter.on('setRightDrawer', (name) => {
  console.log(name);
  if (name === 'wu') {
    currentComponent.value = wuDrawer;
  } else if (name === 'mao') {
    currentComponent.value = maoDrawer;
  } else {
    currentComponent.value = rightDrawer;
  }
});

emitter.on('clickWuDrawer', (item: any) => {
  wuliu_id.value = item.id;
  show.value = item.flag;
});

onUnmounted(() => {
  resetDrawerShow();
});
</script>

<style lang="scss" scoped></style>

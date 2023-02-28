<template>
  <left-drawer></left-drawer>
  <component :is="currentComponent"></component>
  <map-view />
  <img class="img_title" src="@/assets/image/qj/title.png" alt="" />
</template>

<script setup lang="ts">
import leftDrawer from './digital/leftDrawer.vue';
import emitter from '@/utils/eventbus';
import { defineAsyncComponent, markRaw, onUnmounted, reactive, ref } from 'vue';
import { resetDrawerShow } from '@/composables/resetDrawer';

const rightDrawer = markRaw(defineAsyncComponent(() => import('./digital/rightDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./digital/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./digital/szDrawer.vue')));
const mapView = markRaw(defineAsyncComponent(() => import('./digital/map.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./digital/videoDrawer.vue')));

const currentComponent = ref(rightDrawer);

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

onUnmounted(() => {
  resetDrawerShow();
});
</script>
<style scoped lang="scss">
.img_title {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, -50%);
  z-index: 9;
}
</style>

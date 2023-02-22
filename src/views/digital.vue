<template>
  <video-view :form="state.form"></video-view>
  <left-drawer :form="state.form"></left-drawer>
  <component :is="currentComponent" :form="state.form"></component>
</template>

<script setup lang="ts">
import leftDrawer from './digital/leftDrawer.vue';
import videoView from './digital/video.vue';
import emitter from '@/utils/eventbus';
import { getPlantBase } from '@/api/breed';
import { defineAsyncComponent, markRaw, onMounted, onUnmounted, reactive, ref } from 'vue';
import { resetDrawerShow } from '@/composables/resetDrawer';

const rightDrawer = markRaw(defineAsyncComponent(() => import('./digital/rightDrawer.vue')));
const qxzDrawer = markRaw(defineAsyncComponent(() => import('./digital/qxzDrawer.vue')));
const szDrawer = markRaw(defineAsyncComponent(() => import('./digital/szDrawer.vue')));
const videoDrawer = markRaw(defineAsyncComponent(() => import('./digital/videoDrawer.vue')));

const currentComponent = ref(rightDrawer);
const state = reactive({ form: {} as any });

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

onMounted(() => {
  getPlantBase({ info: '国泰水产' }).then((res: any) => {
    state.form = res.content[0];
  });
});

onUnmounted(() => {
  resetDrawerShow();
});
</script>

<template>
  <div class="container">
    <header-view />
    <div class="content">
      <router-view />
    </div>

    <div v-show="route.path !== '/digital'">
      <div id="marsMap" class="mars3d-container"></div>
      <div class="logo">美丽渔场</div>
    </div>
    <video-view v-if="route.path === '/digital'" />
  </div>
</template>

<script setup lang="ts">
import * as mars3d from 'mars3d';
import { markRaw, onMounted } from 'vue';
import { useCommonStore } from './store';
import headerView from './common/header.vue';
import videoView from './views/video.vue';
import { getDefaultContextMenu } from '@/utils/getDefaultContextMenu';
import { useRoute } from 'vue-router';

const configUrl = 'config/config.json';
const commonStore = useCommonStore();
const route = useRoute();

onMounted(() => {
  initMap();
});

const initMap = async () => {
  await mars3d.Util.fetchJson({ url: configUrl }).then((data: any) => {
    const map = new mars3d.Map('marsMap', data.map3d);
    // 绑定当前项目的默认右键菜单
    map.bindContextMenu(getDefaultContextMenu(map));
    const rawMap = markRaw(map);
    commonStore.setMap(rawMap);
  });
};
</script>

<style lang="scss" scoped>
.container {
  background: url('@/assets/image/background.png') center no-repeat;
  height: 100%;
  background-size: 100% 100%;
}

.content {
  height: calc(100% - 66px);
  position: relative;
  overflow: hidden;
}

.mars3d-container {
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  position: absolute;
  left: 15px;
  bottom: 15px;
}
</style>

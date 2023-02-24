<template>
  <div class="video-container">
    <div id="video-container" ref="videoEle" style="height: 100%" />
  </div>
</template>

<script setup lang="ts">
import EZUIKit from 'ezuikit-js';
import { getVideoData } from '@/api/breed';
import { onMounted, onUnmounted, ref } from 'vue';

const videoEle = ref<HTMLDivElement | null>(null);
let player: any;

onMounted(() => {
  getData();
});

const getData = () => {
  getVideoData({ plantWlwId: '6ba781c68c87465cbc82852ca4fff7b7' }).then((res: any) => {
    if (res.videoData) {
      let dom = videoEle.value as HTMLDivElement;

      if (dom) {
        player = new EZUIKit.EZUIKitPlayer({
          id: 'video-container', // 视频容器ID
          accessToken: res.token,
          url: res.videoData.url,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
        });
      }
    }
  });
};

onUnmounted(() => {
  if (player) {
    player.stop();
    player.destroy();
    player = null;
  }
});
</script>

<style lang="scss" scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <v-drawer direction="right">
    <v-card direction="right">
      <div style="height: 50%">
        <v-title :title="plantStore.equipName" hasClose />
        <div class="container">
          <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
          <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
          <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
          <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
          <video-container v-if="hasPlayer" ref="videoEle" />
          <div v-show="!hasPlayer" class="noVideo">
            <img src="@/assets/image/noVideo.png" />
            <div class="text">暂无视频</div>
          </div>
        </div>
      </div>

      <div class="photo">
        <v-title title="历史图片" />
        <div class="content">
          <div v-for="(item, index) in state.list" class="bar">
            <el-image
              style="width: 125px; height: 125px"
              :src="setImageUrl(item.address)"
              :preview-src-list="state.srcList"
              :initial-index="clickIndex"
              preview-teleported
              @click="clickIndex = index"
            />
            <div style="margin-top: 5px">{{ item.createTime }}</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { getVideoData } from '@/api/breed';
import { useBreedStore } from '@/store';

const plantStore = useBreedStore();
const state = reactive({ list: [] as any[], srcList: [] as any[] });
const videoEle = ref<HTMLDivElement | null>(null);
const clickIndex = ref(0);
let hasPlayer = ref(true);

onMounted(() => {
  getData();
});

watch(
  () => plantStore.equipId,
  () => {
    getData();
  }
);

const getData = () => {
  hasPlayer.value = false;
  getVideoData({ plantWlwId: plantStore.equipId }).then((res: any) => {
    if (res.videoData) {
      hasPlayer.value = true;
      nextTick(() => {
        //@ts-ignore
        videoEle.value.getVideo(res.token, res.videoData.url, res.deviceSerial,res.channelNo);
      });
    }

    if (res.videoPic) {
      state.list = res.videoPic;
      state.srcList = [];
      res.videoPic.map((it: any) => {
        let imgUrl = setImageUrl(it.address);
        state.srcList.push(imgUrl);
      });
    }
  });
};

const setImageUrl = (url: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + url;
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  padding: 5px;
  box-sizing: border-box;
  height: calc(100% - 48px);
  position: relative;

  .top-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .top-right {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg);
  }

  .bottom-left {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(270deg);
  }

  .bottom-right {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }

  .noVideo {
    img {
      width: 332px;
      margin: auto;
    }

    .text {
      color: #b9b9b9;
      text-align: center;
      font-size: 14px;
    }
  }
}

.photo {
  height: 50%;
  padding-top: 10px;
  box-sizing: border-box;
}

.content {
  height: calc(100% - 60px);
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #2a3aa1;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .bar {
 

    text-align: center;
    color: #fff;
    margin-bottom: 10px;

    img {
      width: 100%;
    }
  }
}
</style>

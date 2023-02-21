<template>
  <v-drawer direction="right" hasArrow>
    <v-card>
      <v-title title="养殖环境" />
      <div class="flex container">
        <div v-for="item in state.weatherData" class="bar flex">
          <img :src="getImgUrl(item.icon)" class="icon" />
          <div>
            <div class="name">{{ item.name }}</div>
            <div style="padding-top: 6px">
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <v-title title="水质环境" />
      <div class="flex container">
        <div v-for="item in state.waterData" class="bar flex">
          <img :src="getImgUrl(item.icon)" class="icon" />
          <div>
            <div class="name">{{ item.name }}</div>
            <div style="padding-top: 6px">
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <v-title title="投料机数据" />
      <div class="flex container">
        <div v-for="item in state.baitData" class="bar flex">
          <img :src="getImgUrl(item.icon)" class="icon" />
          <div>
            <div class="name">{{ item.name }}</div>
            <div style="padding-top: 6px">
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <v-title title="养殖实况" />
      <div class="video-container">
        <div class="video-name" v-if="hasPlayer">{{ state.videoData[state.chooseIndex].WlwName }}</div>
        <video-container v-if="hasPlayer" ref="videoEle" />
        <div class="flex" v-show="!hasPlayer" style="height: 100%">
          <div class="noVideo">
            <img src="@/assets/image/noVideo.png" />
            <div class="text">暂无视频</div>
          </div>
        </div>

        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <img
          src="@/assets/image/arrow.png"
          class="swiper-button-prev"
          :class="state.chooseIndex === 0 ? 'noClick' : ''"
          @click="handleVideoClick(false)"
        />

        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <img
          src="@/assets/image/arrow.png"
          class="swiper-button-next"
          :class="state.videoData.length === 0 || state.chooseIndex === state.videoData.length - 1 ? 'noClick' : ''"
          @click="handleVideoClick(true)"
        />
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { wlwInfo } from '@/api/digital';

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
});
const hasPlayer = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);
const state = reactive({
  weatherData: [
    {
      icon: 'wd',
      name: '温度',
      value: 0,
      unit: '℃',
    },
    {
      icon: 'sd',
      name: '湿度',
      value: 0,
      unit: '%',
    },
    {
      icon: 'yl',
      name: '雨量',
      value: 0,
      unit: 'mm',
    },
    {
      icon: 'fs',
      name: '风速',
      value: 0,
      unit: 'm/s',
    },
    {
      icon: 'gz',
      name: '光照',
      value: 0,
      unit: 'lux',
    },
    {
      icon: 'fx',
      name: '风向',
      value: 0,
      unit: '',
    },
  ],
  waterData: [
    {
      icon: 'ph',
      name: 'Ph',
      value: 0,
    },
    {
      icon: 'ddl',
      name: '电导率',
      value: 0,
      unit: 'ms/cm',
    },
    {
      icon: 'rjy',
      name: '溶解氧',
      value: 0,
      unit: 'mg/L',
    },
    {
      icon: 'zd',
      name: '浊度',
      value: 0,
      unit: 'ntu',
    },
    {
      icon: 'wd',
      name: '水温',
      value: 0,
      unit: '℃',
    },
  ],
  baitData: [
    {
      icon: 'tll',
      name: '投料量',
      value: 0,
      unit: 'kg',
    },
    {
      icon: 'tlcs',
      name: '投料次数',
      value: 0,
      unit: '次',
    },
    {
      icon: 'tlsc',
      name: '投料时长',
      value: 0,
      unit: 'h',
    },
  ],
  videoData: [] as any[],
  chooseIndex: 0,
});

watch(
  () => props.form,
  () => {
    getData();
  }
);

onMounted(() => {
  getData();
});

const getData = () => {
  if (props.form.id) {
    wlwInfo({ plantBaseId: props.form.id }).then((res: any) => {
      let weatherData = res.plantWeatherData;
      state.weatherData[0].value = weatherData.temp;
      state.weatherData[1].value = weatherData.humi;
      state.weatherData[2].value = weatherData.rain;
      state.weatherData[3].value = weatherData.speed;
      state.weatherData[4].value = weatherData.raid;
      state.weatherData[5].value = weatherData.windDirection;

      let waterData = res.plantWaterData;
      state.waterData[0].value = waterData.ph;
      state.waterData[1].value = waterData.ddl;
      state.waterData[2].value = waterData.oxy;
      state.waterData[3].value = waterData.zd;
      state.waterData[4].value = waterData.temp;

      let baitData = res.plantBaitData;
      state.baitData[0].value = baitData.amount;
      state.baitData[1].value = baitData.by1;
      state.baitData[2].value = baitData.workTime;

      state.videoData = res.plantVideoData;
    });
  }
};

const handleVideoClick = (statu: boolean) => {
  if (statu && state.chooseIndex < state.videoData.length - 1) {
    state.chooseIndex++;
  } else if (!statu && state.chooseIndex > 0) {
    state.chooseIndex--;
  } else {
    console.log(state.chooseIndex);
    return;
  }
  setVideo(state.videoData[state.chooseIndex]);
};

const setVideo = (item: any) => {
  hasPlayer.value = false;
  if (item.videoData) {
    hasPlayer.value = true;
    nextTick(() => {
      //@ts-ignore
      videoEle.value.getVideo(item.token, item.videoData.url, item.deviceSerial);
    });
  }
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  flex-wrap: wrap;

  .bar {
    margin-bottom: 1.5vh;
    width: 33.33%;

    .icon {
      width: 46px;
      margin-right: 8px;
    }

    .name {
      font-size: 14px;
      color: #fff;
    }

    .num {
      color: #00f6ff;
      font-size: 28px;
    }

    .unit {
      font-size: 12px;
      color: #00f6ff;
      padding-left: 5px;
    }
  }
}

.video-container {
  height: calc(100% - 554px);
  padding: 15px 25px 0;
  box-sizing: border-box;
  position: relative;

  .video-name {
    position: absolute;
    left: 25px;
    bottom: 10px;
    z-index: 9;
    font-size: 16px;
    padding: 6px 12px;
    background: rgba(17, 16, 45, 0.6);
  }

  .noVideo {
    width: 100%;
    img {
      width: 60%;
      margin: auto;
    }

    .text {
      color: #b9b9b9;
      text-align: center;
      font-size: 14px;
    }
  }
}

.swiper-container {
  width: 100%;
}
.swiper-button-prev,
.swiper-button-next {
  width: 12px;
  height: auto;
}
.swiper-button-prev {
  left: 0;
  transform: rotate(180deg);
}

.swiper-button-next {
  right: 0;
}

.noClick {
  opacity: 0.35;
}
</style>

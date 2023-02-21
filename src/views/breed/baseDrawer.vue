<template>
  <v-drawer direction="right">
    <v-card>
      <div class="top">
        <v-title :title="state.baseInfo.plantBaseName" />

        <div class="content">
          <img
            align="right"
            v-if="state.baseInfo.pidList && state.baseInfo.pidList.length > 0"
            :src="returnImgUrl(state.baseInfo.pidList[0].address)"
            class="img"
          />
          <div class="con_one_l">{{ state.baseInfo.baseShortinfo }}</div>
        </div>
      </div>

      <div class="middle">
        <v-title title="生产情况变化趋势分析" />
        <div class="flex legend">
          <div class="title" :class="gmActive === 0 ? 'active' : ''" @click="handleChooseGm(0)">产量</div>
          <div class="title" :class="gmActive === 1 ? 'active' : ''" @click="handleChooseGm(1)">产值</div>
        </div>
        <div class="chart" ref="chartEle"></div>
      </div>

      <div class="bottom">
        <v-title title="智慧物联" />
        <div class="flex nav">
          <div class="title" :class="equipActive === 0 ? 'active' : ''" @click="handleEquipClick(0)">气象设备</div>
          <div class="title" :class="equipActive === 1 ? 'active' : ''" @click="handleEquipClick(1)">水质设备</div>
          <div class="title" :class="equipActive === 2 ? 'active' : ''" @click="handleEquipClick(2)">视频设备</div>
        </div>
        <div class="content">
          <div class="swiper-container weather" v-show="equipActive === 0">
            <div class="swiper-wrapper">
              <div class="swiper-slide container" v-for="cItem in state.weatherData">
                <div class="flex" style="margin-bottom: 25px">
                  <span class="line-bar"></span>
                  <span class="equip-name">{{ cItem.name }}</span>
                </div>
                <div class="flex slide-content">
                  <div v-for="item in cItem.data" class="bar flex">
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
              </div>
            </div>

            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev weather-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next weather-next" />
          </div>

          <div class="swiper-container water" v-show="equipActive === 1">
            <div class="swiper-wrapper">
              <div class="swiper-slide container" v-for="cItem in state.waterData">
                <div class="flex" style="margin-bottom: 25px">
                  <span class="line-bar"></span>
                  <span class="equip-name">{{ cItem.name }}</span>
                </div>
                <div class="flex slide-content">
                  <div v-for="item in cItem.data" class="bar flex">
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
              </div>
            </div>

            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev water-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next water-next" />
          </div>

          <div class="video-container" v-show="equipActive === 2">
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
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { loadChart } from './chart/lineChart';
import { useBreedStore } from '@/store';

import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { getPlantBase, plantAnalyze, plantWeatherInfo, plantWaterInfo, plantVideoInfo } from '@/api/breed';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const breedStore = useBreedStore();
let myChart: echarts.ECharts;
const chartEle = ref<HTMLDivElement | null>(null);
const gmActive = ref(0);
const equipActive = ref(0);
const hasPlayer = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);

const state = reactive({
  baseInfo: {} as any,
  weatherData: [] as any[],
  waterData: [] as any[],
  chooseIndex: 0,
  videoData: [] as any[],
});

watch(
  () => breedStore.baseName,
  (val) => {
    if (val !== '') getData();
  }
);

onMounted(() => {
  myChart = echarts.init(chartEle.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

const getData = () => {
  getPlantBase({ info: breedStore.baseName }).then((res: any) => {
    state.baseInfo = res.content[0];
  });
  gmActive.value = 0;
  equipActive.value = 0;
  handleChooseGm(gmActive.value);

  plantWeatherInfo({ info: breedStore.baseName }).then((res: any) => {
    let arr = [] as any[];
    res.content.map((item: any) => {
      let data = [
        {
          icon: 'wd',
          name: '温度',
          value: item.plantWeatherData.temp,
          unit: '℃',
        },
        {
          icon: 'sd',
          name: '湿度',
          value: item.plantWeatherData.humi,
          unit: '%',
        },
        {
          icon: 'yl',
          name: '雨量',
          value: item.plantWeatherData.rain,
          unit: 'mm',
        },
        {
          icon: 'fs',
          name: '风速',
          value: item.plantWeatherData.speed,
          unit: 'm/s',
        },
        {
          icon: 'gz',
          name: '光照',
          value: item.plantWeatherData.raid,
          unit: 'lux',
        },
        {
          icon: 'fx',
          name: '风向',
          value: item.plantWeatherData.windDirection,
          unit: '',
        },
      ];
      arr.push({ name: item.name, data });
    });
    state.weatherData = arr;
    nextTick(() => {
      new Swiper('.weather', {
        navigation: {
          nextEl: '.weather-next',
          prevEl: '.weather-prev',
          hideOnClick: true,
        },
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      });
    });
  });

  plantWaterInfo({ info: breedStore.baseName }).then((res: any) => {
    let arr = [] as any[];
    res.content.map((item: any) => {
      console.log('itemitem', item);

      let data = [
        {
          icon: 'ph',
          name: 'Ph',
          value: item.plantWaterData ? item.plantWaterData.ph : '',
        },
        {
          icon: 'ddl',
          name: '电导率',
          value: item.plantWaterData ? item.plantWaterData.ddl : '',
          unit: 'ms/cm',
        },
        {
          icon: 'rjy',
          name: '溶解氧',
          value: item.plantWaterData ? item.plantWaterData.oxy : '',
          unit: 'mg/L',
        },
        {
          icon: 'zd',
          name: '浊度',
          value: item.plantWaterData ? item.plantWaterData.zd : '',
          unit: 'ntu',
        },
        {
          icon: 'wd',
          name: '水温',
          value: item.plantWaterData ? item.plantWaterData.temp : '',
          unit: '℃',
        },
      ];
      arr.push({ name: item.name, data });
    });
    state.waterData = arr;
  });

  plantVideoInfo({ info: breedStore.baseName }).then((res: any) => {
    state.videoData = res.content;
  });
};

const handleChooseGm = (index: number) => {
  myChart.clear();
  gmActive.value = index;
  plantAnalyze({ id: index, info: breedStore.baseName }).then((res: any) => {
    let data = [] as number[],
      date = [] as string[];
    res.content.map((item: { sum: number; date: string }) => {
      data.push(item.sum);
      date.push(item.date);
    });

    let name = index === 0 ? '产量' : '产值';
    let unit = index === 0 ? '吨' : '万元';
    loadChart(myChart, data, date, name, unit);
  });
};

const handleEquipClick = (index: number) => {
  equipActive.value = index;
  if (index === 1) {
    nextTick(() => {
      new Swiper('.water', {
        navigation: {
          nextEl: '.water-next',
          prevEl: '.water-prev',
          hideOnClick: true,
        },
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      });
    });
  } else if (index === 2) {
    if (state.videoData.length > 0) {
      nextTick(() => {
        setVideo(state.videoData[state.chooseIndex]);
      });
    }
  }
};

const setVideo = (item: any) => {
  hasPlayer.value = false;
  if (item.mapList.videoData) {
    hasPlayer.value = true;
    nextTick(() => {
      //@ts-ignore
      videoEle.value.getVideo(item.mapList.token, item.mapList.videoData.url, item.deviceSerial);
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

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};

const returnImgUrl = (img: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + img;
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.top {
  height: 25%;

  .content {
    margin: 12px 0 10px;
    height: calc(100% - 60px);
    padding-right: 10px;
    overflow-y: auto;
    text-indent: 2em;
    line-height: 22px;
    letter-spacing: 2px;
    color: #fff !important;
    font-size: 14px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #00f6ff;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .img {
      width: 120px;
      height: 100px;
      border-radius: 10px;
      padding-left: 5px;
      display: inline-block;
    }
  }
}

.middle {
  height: 35%;

  .chart {
    height: calc(100% - 64px);
  }

  .legend {
    justify-content: end;
  }

  .title {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
    padding: 0 8px 8px;
    cursor: pointer;

    &:not(:nth-of-type(1)) {
      margin-left: 40px;
    }
  }

  .active {
    position: relative;
    color: #2fddff;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background: linear-gradient(to right, transparent 0, #3cf8ff 15%, #3cf8ff 85%, transparent 100%);
    }
  }
}

.bottom {
  height: 40%;
  .nav {
    padding: 15px 0;
    .title {
      height: 32px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 18px;
      padding: 0 8px;
      cursor: pointer;

      &:not(:nth-of-type(1)) {
        margin-left: 40px;
      }
    }

    .active {
      position: relative;
      color: #2fddff;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background: linear-gradient(to right, transparent 0, #3cf8ff 15%, #3cf8ff 85%, transparent 100%);
      }
    }
  }
  .content {
    height: calc(100% - 100px);
  }
  .container {
    height: 100%;
    box-sizing: border-box;

    .line-bar {
      background: linear-gradient(to bottom, transparent, #a0d8ff);
      width: 4px;
      height: 19px;
      margin-right: 10px;
    }

    .equip-name {
      font-size: 16px;
    }

    .slide-content {
      padding-left: 30px;
      flex-wrap: wrap;
    }

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
    width: 100%;
    height: 100%;
    padding: 0 25px 10px;
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

<template>
  <v-drawer direction="right">
    <v-card>
      <div class="top">
        <v-title title="养殖基地指标" />
        <div class="target flex-around">
          <div class="bar" v-for="item in state.list">
            <div class="icon-box flex">
              <img :src="getImgUrl(item.icon)" class="icon" />
              <img src="@/assets/image/industrialPark/icon_bottom.png" class="icon-bg" />
            </div>
            <div>
              <span class="num">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>

            <div class="label">{{ item.name }}</div>
          </div>
        </div>
      </div>

      <div class="middle">
        <v-title title="养殖规模" />
        <div class="flex legend">
          <div class="title" :class="gmActive === 0 ? 'active' : ''" @click="handleChooseGm(0)">产量</div>
          <div class="title" :class="gmActive === 1 ? 'active' : ''" @click="handleChooseGm(1)">产值</div>
        </div>
        <div class="chart" ref="chartEle"></div>

        <div class="progress-container">
          <vue3-seamless-scroll :list="state.yzgmList" class="seamless-warp" :step="0.2" :hover="true">
            <div class="row" v-for="(item, index) in state.yzgmList">
              <div class="flex-between" style="margin-bottom: 5px">
                <div>
                  <span class="order num" :style="{ color: index === 0 ? '#FFCC00' : '' }">TOP.0{{ index + 1 }}</span>
                  <span class="label">{{ item.BaseName }}</span>
                </div>
                <div class="value">
                  <span class="num">{{ item.value }}</span>
                  <span>{{ gmActive === 0 ? '吨' : '万元' }}</span>
                </div>
              </div>
              <div class="flex">
                <div class="progress-bar">
                  <div class="el-progress-bar__outer">
                    <div
                      class="el-progress-bar__inner"
                      :style="{
                        background: index === 0 ? 'linear-gradient(90deg, #E75700, #FFEB09)' : '',
                        width: (Number(item.value) / state.yzgmTotal) * 100 + '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>

      <div class="bottom">
        <v-title title="智慧物联" />
        <div class="flex nav">
          <div class="title" :class="equipActive === 0 ? 'active' : ''" @click="handleEquipClick(0)">气象设备</div>
          <div class="title" :class="equipActive === 1 ? 'active' : ''" @click="handleEquipClick(1)">水质设备</div>
          <div class="title" :class="equipActive === 2 ? 'active' : ''" @click="handleEquipClick(2)">视频设备</div>
        </div>
        <div class="content flex">
          <div class="swiper-container weather" v-show="equipActive === 0">
            <div class="swiper-wrapper">
              <div class="swiper-slide container flex" v-for="cItem in state.weatherData">
                <div v-for="item in cItem" class="bar">
                  <div class="flex">
                    <svg-icon :name="item.svgname"></svg-icon>
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div style="padding-top: 6px">
                    <span class="num">{{ item.value }}</span>
                    <span class="unit">{{ item.unit }}</span>
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
              <div class="swiper-slide container flex" v-for="cItem in state.waterData">
                <div v-for="item in cItem" class="bar">
                  <div class="flex">
                    <svg-icon :name="item.svgname"></svg-icon>
                    <div class="name">{{ item.name }}</div>
                  </div>
                  <div style="padding-top: 6px">
                    <span class="num">{{ item.value }}</span>
                    <span class="unit">{{ item.unit }}</span>
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
            <video-container v-if="hasPlayer" ref="videoEle" />
            <div v-show="!hasPlayer" class="noVideo">
              <img src="@/assets/image/noVideo.png" />
              <div class="text">暂无视频</div>
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

  <div class="legendBar animate__animated animate__fadeInRight">
    <div class="flex row">
      <img src="@/assets/image/industrialPark/i_yzjd.png" class="icon" />
      <span>养殖基地(5)</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { loadChart } from './chart/breedBase/lineChart';
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import { plantBaseAll, plantBaseBreeding, waterNewDataAll, weatherNewDataAll } from '@/api/industrial';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { getRealTime } from '@/api/breed';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let myChart: echarts.ECharts;
const chartEle = ref<HTMLDivElement | null>(null);
const gmActive = ref(0);
const equipActive = ref(0);
const hasPlayer = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);
const state = reactive({
  list: [
    {
      name: '养殖基地',
      value: 5,
      unit: '个',
      icon: 'icon_yzjd',
    },
    {
      name: '养殖面积',
      value: 231,
      unit: '亩',
      icon: 'icon_yzmj',
    },
    {
      name: '企业品牌',
      value: 3,
      unit: '个',
      icon: 'icon_qypp',
    },
    {
      name: '年产值',
      value: 230,
      unit: '万元',
      icon: 'icon_ncz',
    },
  ],
  yzgmTotal: 0,
  yzgmList: [] as any[],
  weatherData: [] as any[],
  waterData: [] as any[],
  chooseIndex: 0,
  videoData: [] as any[],
});

onMounted(() => {
  console.log('😀😀😀');
  myChart = echarts.init(chartEle.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

const getData = () => {
  plantBaseAll().then((res: any) => {
    state.list[0].value = res.baseSum;
    state.list[1].value = res.areaSum;
    state.list[2].value = res.szyxBrand;
    state.list[3].value = res.sumSaleAmount;
  });

  handleChooseGm(0);

  weatherNewDataAll().then((res: any) => {
    let arr = [] as any[];
    res.content.map((item: any) => {
      let data = [
        {
          svgname: 'wd',
          name: '温度',
          value: item.temp,
          unit: '℃',
        },
        {
          svgname: 'sd',
          name: '湿度',
          value: item.humi,
          unit: '%',
        },
        {
          svgname: 'jy',
          name: '雨量',
          value: item.rain,
          unit: 'mm',
        },
        {
          svgname: 'fs',
          name: '风速',
          value: item.speed,
          unit: 'm/s',
        },
        {
          svgname: 'gz',
          name: '光照',
          value: item.raid,
          unit: 'lux',
        },
        {
          svgname: 'fx',
          name: '风向',
          value: item.windDirection,
          unit: '',
        },
      ];
      arr.push(data);
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

  waterNewDataAll().then((res: any) => {
    let arr = [] as any[];
    res.content.map((item: any) => {
      let data = [
        {
          svgname: 'ph',
          name: 'Ph',
          value: item.ph,
        },
        {
          svgname: 'ddl',
          name: '电导率',
          value: item.ddl,
          unit: 'ms/cm',
        },
        {
          svgname: 'rjy',
          name: '溶解氧',
          value: item.oxy,
          unit: 'mg/L',
        },
        {
          svgname: 'zd',
          name: '浊度',
          value: item.zd,
          unit: 'ntu',
        },
        {
          svgname: 'wd',
          name: '水温',
          value: item.temp,
          unit: '℃',
        },
      ];
      arr.push(data);
    });
    state.waterData = arr;
  });

  getRealTime().then((res: any) => {
    state.videoData = res.content;
  });
};

const handleChooseGm = (index: number) => {
  state.yzgmTotal = 0;
  myChart.clear();
  gmActive.value = index;
  plantBaseBreeding({ id: index }).then((res: any) => {
    res.baseInfo.map((item: any) => {
      state.yzgmTotal += Number(item.value);
    });
    state.yzgmList = res.baseInfo;

    let data = [] as number[],
      date = [] as string[];
    res.name.map((item: { sum: number; date: string }) => {
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
  if (item.videoData) {
    hasPlayer.value = true;
    nextTick(() => {
      //@ts-ignore
      videoEle.value.getVideo(item.token, item.videoData.url, item.deviceSerial);
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
  return new URL(`../../assets/image/industrialPark/${url}.png`, import.meta.url).href;
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.target {
  padding: 12px 0;
  text-align: center;

  .icon-box {
    position: relative;
    align-items: flex-end;
    height: 55px;
    .icon {
      width: 28px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      animation: float 2s infinite linear;
    }
    @keyframes float {
      0% {
        top: 0;
      }
      50% {
        top: 25%;
      }
      100% {
        top: 0;
      }
    }

    .icon-bg {
      width: 74px;
      margin: 0 auto;
    }
  }

  .num {
    font-size: 28px;
    color: #00f6ff;
  }

  .unit {
    color: rgba(0, 246, 255, 0.64);
    font-size: 12px;
  }

  .label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 3px;
  }
}

.middle {
  padding: 12px 0;
  height: 45%;
  box-sizing: border-box;

  .chart {
    height: calc(100% - 186px);
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

  .progress-container {
    height: 120px;
    overflow: hidden;
    .row {
      margin-bottom: 10px;
    }

    .order {
      color: #00f6ff;
      font-size: 18px;
      margin-right: 10px;
    }
    .label {
      color: #fff;
      font-size: 14px;
    }

    .value {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.64);

      .num {
        font-size: 20px;
        color: #fff;
        margin-right: 5px;
      }
    }

    .progress-bar {
      width: 100%;

      .el-progress-bar__outer {
        height: 6px;
        border-radius: 5px;
        background-color: rgba(219, 255, 248, 0.12);

        .el-progress-bar__inner {
          border-radius: 25px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(90deg, #1c51ea, #11fffc);

          &::after {
            position: absolute;
            border-radius: 25px;
            width: 100%;
            left: -100%;
            background: inherit;
            animation: progress-bar-stripes 3s linear 2s infinite;
          }

          @keyframes progress-bar-stripes {
            0% {
              left: -100%;
            }
            to {
              left: 0;
            }
          }
        }
      }
    }
  }
}

.bottom {
  height: calc(55% - 168px);
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
    padding-left: 40px;
    box-sizing: border-box;
    flex-wrap: wrap;

    .bar {
      margin-bottom: 1.5vh;
      width: 33.33%;

      .svg-icon {
        color: #fff;
        width: 20px;
        height: 20px;
      }

      .name {
        font-size: 16px;
        color: #fff;
      }

      .num {
        color: #00f6ff;
        font-size: 24px;
      }

      .unit {
        font-size: 14px;
        color: #00f6ff;
        padding-left: 5px;
      }
    }
  }

  .video-container {
    width: 100%;
    height: 100%;
    padding: 0 25px;
    box-sizing: border-box;
    position: relative;
    .noVideo {
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

.legendBar {
  position: absolute;
  padding: 15px;
  background-color: rgba(17, 16, 45, 0.7);
  border-radius: 2px;
  right: 27%;
  top: 110px;
  color: #fff;
  font-size: 14px;
  z-index: 7;

  .row:not(:last-child) {
    margin-bottom: 12px;
  }

  .icon {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
}
</style>

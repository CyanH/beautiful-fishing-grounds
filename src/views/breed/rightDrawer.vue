<template>
  <v-drawer direction="right">
    <v-card>
      <div class="top">
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
      <div class="middle">
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
                        <span class="num" :class="item.icon === 'fx' ? 'little' : ''">{{ item.value }}</span>
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
      <div class="bottom">
        <v-title title="巡检记录" />
        <div class="content">
          <div class="head">
            <p>塘口</p>
            <p>巡检员</p>
            <p>巡检内容</p>
            <p>巡检时间</p>
          </div>
          <vue3-seamless-scroll :list="state.list" class="seamless-warp" :step="0.2" :hover="true" :limitScrollNum="2">
            <div v-for="(item, index) in state.list" :key="index" class="body">
              <p>{{ item.plantMassifName }}</p>
              <p>{{ item.inspectPerson }}</p>
              <p>{{ item.info }}</p>
              <p>{{ parseTime(item.inspectDate, '{y}-{m}-{d}') }}</p>
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>
    </v-card>
  </v-drawer>

  <div class="warn">
    <img src="@/assets/image/breed/fish.gif" class="fish" />
    <img src="@/assets/image/breed/bg.png" class="bg" />
    <div class="title">预警信息</div>
    <div class="content">
      <vue3-seamless-scroll :list="state.warnList" :step="0.3" :hover="true" :limitScrollNum="5">
        <div v-for="(item, index) in state.warnList">
          <div class="flex">
            <img src="@/assets/image/breed/warn.png" class="tip" />
            <span class="desc">{{ item.exceptionInfo }}</span>
          </div>
          <div class="line"></div>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import { plantBaseBreeding, waterNewDataAll, weatherNewDataAll } from '@/api/industrial';
import { getRealTime, plantInspect, configRecords } from '@/api/breed';
import { loadChart } from './chart/lineChart';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { parseTime } from '@/utils/parseTime';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let myChart: echarts.ECharts;
const chartEle = ref<HTMLDivElement | null>(null);
const gmActive = ref(0);
const equipActive = ref(0);
const hasPlayer = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);
const state = reactive({
  yzgmTotal: 0,
  yzgmList: [] as any[],
  weatherData: [] as any[],
  waterData: [] as any[],
  chooseIndex: 0,
  videoData: [] as any[],
  list: [] as any[],
  warnList: [] as any[],
});

onMounted(() => {
  myChart = echarts.init(chartEle.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

const getData = () => {
  handleChooseGm(0);

  weatherNewDataAll().then((res: any) => {
    let arr = [] as any[];
    res.content.map((item: any) => {
      let data = [
        {
          icon: 'wd',
          name: '温度',
          value: item.temp,
          unit: '℃',
        },
        {
          icon: 'sd',
          name: '湿度',
          value: item.humi,
          unit: '%',
        },
        {
          icon: 'yl',
          name: '雨量',
          value: item.rain,
          unit: 'mm',
        },
        {
          icon: 'fs',
          name: '风速',
          value: item.speed,
          unit: 'm/s',
        },
        {
          icon: 'gz',
          name: '光照',
          value: item.raid,
          unit: 'lux',
        },
        {
          icon: 'fx',
          name: '风向',
          value: item.windDirection,
          unit: '',
        },
      ];
      arr.push({ name: item.info, data });
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
          icon: 'ph',
          name: 'Ph',
          value: item.ph,
        },
        {
          icon: 'ddl',
          name: '电导率',
          value: item.ddl,
          unit: 'ms/cm',
        },
        {
          icon: 'rjy',
          name: '溶解氧',
          value: item.oxy,
          unit: 'mg/L',
        },
        {
          icon: 'zd',
          name: '浊度',
          value: item.zd,
          unit: 'ntu',
        },
        {
          icon: 'wd',
          name: '水温',
          value: item.temp,
          unit: '℃',
        },
      ];
      arr.push({ name: item.info, data });
    });
    state.waterData = arr;
  });

  getRealTime().then((res: any) => {
    state.videoData = res.content;
  });

  plantInspect().then((res: any) => {
    state.list = res.content;
  });

  configRecords({ warning: 0, size: 50 }).then((res: any) => {
    state.warnList = res.content;
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
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.top {
  padding-bottom: 12px;
  height: 44%;
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
    // overflow-y: auto;
    // padding-right: 5px;
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
  // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // .progress-container::-webkit-scrollbar {
  //   width: 2px;
  // }
  // /*定义滑块 内阴影+圆角*/
  // .progress-container::-webkit-scrollbar-thumb {
  //   border-radius: 2px;
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  //   background-color: rgba(29,51,116, 1);
  // }
  // /*定义滚动条轨道 内阴影+圆角*/
  // .progress-container::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  //   border-radius: 2px;
  //   // background-color: rgba(255, 255, 255, 0.8);
  // }
}

.middle {
  height: 38%;
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

      .little {
        font-size: 22px;
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

.bottom {
  height: 18%;

  .content {
    margin-top: 10px;
    height: calc(100% - 48px);
    font-size: 14px;
  }

  .head {
    background: rgba(19, 39, 165, 0.5);
    display: flex;
  }
  .body {
    display: flex;
    width: 100%;
  }
  .head,
  .body {
    p {
      color: #fff;
      text-align: center;
      margin: 9px 0;
      width: 25%;
    }
  }

  .seamless-warp {
    width: 100%;
    height: calc(100% - 34px);
    overflow: hidden;
    .body:nth-child(even) {
      background: rgba(19, 39, 165, 0.2);
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

.warn {
  position: absolute;
  left: 12%;
  bottom: 28px;

  .fish {
    width: 130px;
    position: absolute;
    bottom: -20px;
    left: -5px;
  }

  .bg {
    width: 356px;
  }

  .title {
    position: absolute;
    font-size: 16px;
    top: 5px;
    left: 6%;
  }

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 68%;
    overflow-y: hidden;

    .tip {
      width: 26px;
      margin-right: 15px;
    }

    .desc {
      font-size: 14px;
    }

    .line {
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0,
        rgba(160, 205, 255, 0.2) 5%,
        rgba(160, 205, 255, 0.2) 95%,
        transparent 100%
      );
      margin: 10px 0;
    }
  }
}
</style>

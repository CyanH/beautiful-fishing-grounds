<template>
  <v-drawer direction="right" hasArrow>
    <v-card>
      <!-- <div>预警等级</div> -->
      <!-- <div class="lineBox"></div>
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

        <img
          src="@/assets/image/arrow.png"
          class="swiper-button-prev"
          :class="state.chooseIndex === 0 ? 'noClick' : ''"
          @click="handleVideoClick(false)"
        />

        <img
          src="@/assets/image/arrow.png"
          class="swiper-button-next"
          :class="state.videoData.length === 0 || state.chooseIndex === state.videoData.length - 1 ? 'noClick' : ''"
          @click="handleVideoClick(true)"
        />
      </div> -->
      <v-title title="气象监测" />
      <div class="qxjc">
        <div class="yjdj">预警等级</div>
        <div class="xian_all">
          <div class="xian"></div>
          <div class="dian"></div>
          <!-- <div class="dian_yy"></div> -->
        </div>
        <div class="qxz">
          <div class="qxz_all" v-for="item,index in state.qxjc">
            <div class="sex">
              <div v-for="items,index in item.k" class="k" :class="items.flag ? 'o' + (index + 1) : ''"></div>
            </div>
            <img class="img" :src="getImgUrl(item.icon)" alt="">
            <div class="right">
              <div class="top">{{ item.name }}</div>
              <div class="nums">
                <span class="wd num">{{ item.value }}</span>
                <span class="dw">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-title title="养殖指数" />
      <div class="yzzs">
        <img class="img_yuan" src="@/assets/image/qj/yuan.png" alt="">
        <img class="img_di" src="@/assets/image/qj/di.png" alt="">
        <div class="img_title">
          <div class="num value">80.56%</div>
          <div>养殖指数</div>
        </div>
        <img class="zhong" src="@/assets/image/qj/zhong.png" alt="">
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
  qxjc: [
    {
      icon: 'wd',
      name: '温度',
      value: 29.5,
      unit: '℃',
      k: [
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
    {
      icon: 'sd',
      name: '湿度',
      value: 64.5,
      unit: '%',
      k: [
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
    {
      icon: 'yl',
      name: '雨量',
      value: 150,
      unit: 'mm',
      k: [
        {
          flag: true
        },
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
    {
      icon: 'fs',
      name: '风速',
      value: 29.5,
      unit: 'm/s',
      k: [
        {
          flag: true
        },
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
    {
      icon: 'gz',
      name: '光照',
      value: 64.5,
      unit: 'lux',
      k: [
        {
          flag: true
        },
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
    {
      icon: 'fx',
      name: '风向',
      value: '北',
      unit: '',
      k: [
        {
          flag: true
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        },
        {
          flag: false
        }
      ]
    },
  ],
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
.qxjc{
  width: 100%;
  height: calc(100% - 470px);
  .yjdj{ 
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    font-size: 16px;
  }
  .xian_all{
    width: 100%;
    height: 5px;
    position: relative;
    margin-top: 12px;
    .dian{
      width: 15px;
      height: 15px;
      background-color: rgb(104,214,78);
      position: absolute;
      border-radius: 50%;
      top: -5px;
      left: 12%;
      z-index: 5;
      box-shadow: 0 0 15px 10px rgba(104,214,78.5,0.5)
    }
    .xian{
      width: 100%;
      height: 5px;
      margin-left: 8px;
      z-index: 2;
      background:linear-gradient(
          90deg,
          rgb(104,214,78) 0%,
          rgb(104,214,78) 16.66%,
          rgb(242,215,65) 0,
          rgb(242,215,65) 32.833%,
          rgb(254,139,62) 0,
          rgb(254,139,62) 49.4987%,
          rgb(230,81,48) 0,
          rgb(230,81,48) 66.15867%,
          rgb(196,44,37) 0,
          rgb(196,44,37) 82.825267%,
          rgb(175,8,0) 0,
          rgb(175,8,0) 100%
      );
    }
  }
  .qxz{
    width: 100%;
    margin-top: 12px;
    height: calc(100% - 90px);
    display: flex;
    flex-wrap: wrap;
    .qxz_all{
      width: calc(50% - 25px);
      height: 33%;
      display: flex;
      align-items: center;
      // justify-content: center;
      padding-left: 25px;
      .sex{
        width: 11px;
        .k{
          width: 11px;
          height: 4px;
          margin-bottom: 4px;
          background:rgba(0,0,0,0.7);
        }

        .o1{
          background: #68D64E;
        }
        .o2{
          background: #f2d741;
        }
        .o3{
          background: #fe8b3e;
        }
        .o4{
          background: #e65130;
        }
        .o5{
          background: #c42c25;
        }
        .o6{
          background: #af0800;
        }
      }
      .img{
        margin-left: 12px;
      }
      .right{
        margin-left: 12px;
        .top{
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255,255,255,0.8);
          margin-bottom: 4px;
        } 
        .nums{
          color: #70F3FC;
          
          font-weight: bold;
          .wd{
            font-size: 32px;
            margin-right: 4px;
            font-family: DIN;
          }
          .dw{
            font-size: 14px;
          }
        }
      }
    }
  }
}
.yzzs{
  width: 100%;
  // height: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  // align-items: center;
  position: relative;
  padding-top: 20px;
  .img_yuan{
    height: 320px;
    animation: bounce_down1 4s linear infinite;
  }
  .img_di{
    width: 65%;
    position: absolute;
    bottom: 24px;
  }
  .zhong{
    position: absolute;
    height: 262px;
    left: 50%;
    top: 43%;
    transform: translate(-50%,-50%);
    animation: rotate 6s infinite linear;
  }
  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes bounce_down1 {
      25% {
          transform: translateY(-2px);
      }
      50% {
          transform: translateY(0);
      }
      75% {
          transform: translateY(2px);
      }
      100% {
          transform: translateY(0);
      }
  }
  .img_title{
    position: absolute;
    left: 50%;
    top: 43%;
    transform: translate(-50%,-50%);
    text-align: center;
    .value{
      color: #00f6ff;
      margin-bottom: 6px;
      font-size: 52px;
    }
  }
}
</style>

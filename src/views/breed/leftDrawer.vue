<template>
  <v-drawer direction="left">
    <v-card :background="'rgba(17, 16, 45, 0.6)'">
      <div class="top">
        <v-title title="养殖记录" />
        <div class="top_o1">
          <div class="swiper-container breed-swiper-yzjl">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in state.breedList">
                <div class="card">
                  <div class="contents flex">
                    <div class="right">
                      <div class="titels">{{ item.title }}</div>
                      <div class="xm">
                        <div class="nrs">
                          <div class="ls">作业人：</div>
                          <div class="r">{{ item.zyr }}</div>
                        </div>
                        <div class="nrs">
                          <div class="ls">作业时间：</div>
                          <div class="r">{{ item.zytime }}</div>
                        </div>
                        <div class="nrs">
                          <div class="ls">作业内容：</div>
                          <div class="r">{{ item.zycontent }}</div>
                        </div>
                      </div>
                    </div>
                    <img :src="getImgUrl(item.img)" style="margin-right: 10px" />
                  </div>
                </div>
              </div>
            </div>

            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev breed-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next breed-next" />
          </div>
        </div>
      </div>

      <div>
        <v-title title="养殖环境" />
        <div class="yzhj">
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
        </div>
      </div>

      <div>
        <v-title title="水质环境" />
        <div class="szhj">
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
        </div>
      </div>

      <v-title title="出入塘统计" />
      <div class="crt">
        <div class="chart" ref="shangan"></div>
      </div>
    </v-card>
  </v-drawer>

  <div class="warn">
    <img src="@/assets/image/breed/bg.png" class="bg" />
    <img src="@/assets/image/breed/pao.png" class="pao1" />
    <img src="@/assets/image/breed/pao.png" class="pao2" />

    <div class="title">智能预警</div>
    <div class="content">
      <vue3-seamless-scroll :list="state.warnList" :step="0.3" :hover="true" :limitScrollNum="5">
        <div v-for="(item, index) in state.warnList" class="">
          <div class="flex">
            <img src="@/assets/image/breed/warn.png" class="tip" />
            <span class="desc">{{ item.desc }}</span>
          </div>
          <div class="line"></div>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { nextTick, onMounted, reactive, ref } from 'vue';
import { loadChart } from './chart/crtChart';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { waterNewData, weatherNewData } from '@/api/breed';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let myChar_shangan: echarts.ECharts;
let shangan = ref<HTMLDivElement | null>(null);

const state = reactive({
  clickIndex: 0,
  breedList: [
    {
      img: 'sltw',
      zyr: '李晓武',
      zytime: '2023-01-30 12:34:43',
      zycontent: '人工投喂罗氏沼虾4小时',
      title: '饲料投放',
    },
    {
      img: 'xtql',
      zyr: '吴波江',
      zytime: '2023-02-03 16:34:43',
      zycontent: '人工清理虾塘垃圾',
      title: '虾塘清理',
    },
    {
      img: 'xbyy',
      zyr: '王凡',
      zytime: '2023-02-05 08:23:43',
      zycontent: '人工巡查虾塘用药',
      title: '虾病用药',
    },
    {
      img: 'jcsy',
      zyr: '苏无衣',
      zytime: '2023-02-07 13:34:22',
      zycontent: '人工巡查虾塘检查水源',
      title: '检查水源',
    },
  ],
  weatherData: [
    {
      icon: 'wd',
      name: '温度',
      value: 18,
      unit: '℃',
    },
    {
      icon: 'sd',
      name: '湿度',
      value: 67.7,
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
      value: 1.2,
      unit: 'm/s',
    },
    {
      icon: 'gz',
      name: '光照',
      value: 65864,
      unit: 'lux',
    },
    {
      icon: 'fx',
      name: '风向',
      value: '北',
      unit: '',
    },
  ],
  waterData: [
    {
      icon: 'wd',
      name: '水温',
      value: 20.6,
      unit: '℃',
    },
    {
      icon: 'ph',
      name: 'pH值',
      value: 7.66,
    },
    {
      icon: 'rjy',
      name: '溶解氧',
      value: 8.27,
      unit: 'mg/L',
    },
    {
      icon: 'ddl',
      name: '电导率',
      value: 4386,
      unit: 'ms/cm',
    },
    {
      icon: 'zd',
      name: '浊度',
      value: 5.4,
      unit: 'NTU',
    },
    {
      name: '总碱度',
      icon: 'zjd',
      value: 8.1,
      unit: 'mmol/L',
    },
    {
      name: '硬度',
      icon: 'yd',
      value: 58,
      unit: 'mg/L',
    },
  ],
  warnList: [
    { desc: '塘口21的水质监测四，当前电导率为9562.00us/cm，高于阀值9554.00us/cm, 请注意处理!' },
    { desc: '塘口3的美丽虾场气象站，当前空气湿度为86.10%, 高于阀值66.10%, 请注意处理!' },
    { desc: '塘口18的水质监测二，当前溶解氧为2.80mg/L，低于阀值3.00mg/L, 请注意处理!' },
    { desc: '塘口4的水质监测一，当前温度为16.20℃, 低于阀值18.20℃, 请注意处理!' },
    { desc: '塘口13的美丽虾场气象站，当前温度为18.60℃, 低于阀值23.40℃, 请注意处理!' },
    { desc: '塘口8的水质监测三，当前ph值为8.96，高于阀值8.6, 请注意处理!' },
    { desc: '塘口31的美丽虾场气象站，当前光照为28394.00lux, 高于阀值25000.00lux, 请注意处理!' },
  ],
});

onMounted(() => {
  nextTick(() => {
    new Swiper('.breed-swiper-yzjl', {
      navigation: {
        nextEl: '.breed-next',
        prevEl: '.breed-prev',
        hideOnClick: true,
      },
      autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });
  });

  myChar_shangan = echarts.init(shangan.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChar_shangan.resize();
  });
  getContent();

  getData();
});

const getData = () => {
  weatherNewData({ plantWlwId: '40236136' }).then((res: any) => {
    state.weatherData[0].value = res.content.temp;
    state.weatherData[1].value = res.content.humi;
    state.weatherData[2].value = res.content.rain;
    state.weatherData[3].value = res.content.speed;
    state.weatherData[4].value = res.content.raid;
    state.weatherData[5].value = res.content.windDirection;
  });

  waterNewData({ plantWlwId: '40241986' }).then((res: any) => {
    state.waterData[0].value = res.content.temp;
    state.waterData[1].value = res.content.ph;
    state.waterData[2].value = res.content.oxy;
    state.waterData[3].value = res.content.ddl;
    state.waterData[4].value = res.content.zd;
  });
};

const getContent = () => {
  let data1 = [7, 9, 9, 6, 7, 5, 8];
  let data2 = [23, 28, 32, 24, 28, 23, 36];
  let date = ['2017年', '2018年', '2019年', '2020年', '2021年', '2022年'];
  let new_datas = [];
  let new_data = [
    {
      name: '入塘',
      color: '#11FCFF',
      o1_color: 'rgba(17, 252, 255,1)',
      o2_color: 'rgba(17, 252, 255,0)',
      data: data1,
    },
    {
      name: '出塘',
      color: '#37f197',
      o1_color: 'rgba(55,241,151,1)',
      o2_color: 'rgba(55,241,151,0)',
      data: data2,
    },
  ];
  for (let i = 0; i < new_data.length; i++) {
    new_datas.push({
      name: new_data[i].name,
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: new_data[i].color,
        },
      },
      itemStyle: {
        color: new_data[i].color,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: new_data[i].o1_color,
              },
              {
                offset: 1,
                color: new_data[i].o2_color,
              },
            ],
            false
          ),
        },
      },
      data: new_data[i].data,
    });
  }
  loadChart(myChar_shangan, new_datas, date, '吨');
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.swiper-button-prev,
.swiper-button-next {
  width: 12px;
  height: auto;
  transform: translateY(-50%);
}
.swiper-button-prev {
  left: 0;
  transform: rotate(180deg) translateY(50%);
}

.swiper-button-next {
  right: 0;
}

.top_o1 {
  height: 115px;
  margin-top: 5px;
  .swiper-container {
    height: 100%;

    .swiper-slide {
      padding: 0 15px;
      box-sizing: border-box;
    }

    .card {
      height: 100%;

      .title {
        position: relative;
        top: 5px;
        left: 20px;
        font-size: 16px;
        .num {
          font-size: 18px;
          margin-right: 8px;
        }
      }

      .contents {
        width: 100%;
        height: calc(100%);
        padding: 0 10px;
        box-sizing: border-box;

        img {
          width: 98px;
          height: 98px;
          flex-shrink: 0;
        }
        .right {
          width: calc(100% - 98px);
          height: 100%;
          .titels {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
          }
          .xm {
            width: 100%;
            height: calc(100% - 30px);
            .nrs {
              display: flex;
              width: 95%;
              text-align: left;
              height: 32%;
              align-items: center;
              .ls {
                width: 35%;
                font-size: 15px;
              }
              .r {
                width: 65%;
                font-size: 15px;
              }
            }
          }
        }
      }
    }
  }
}
.yzhj {
  width: 100%;
  margin-top: 12px;
  .container {
    flex-wrap: wrap;

    .bar {
      margin-bottom: 12px;
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
}
.szhj {
  width: 100%;
  margin-top: 12px;
  .container {
    flex-wrap: wrap;

    .bar {
      margin-bottom: 12px;
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
}
.crt {
  width: 100%;
  height: calc(100% - 591px);
  .chart {
    width: 100%;
    height: 100%;
  }
}

.warn {
  position: absolute;
  left: 27%;
  bottom: 15px;
  z-index: 10;

  .bg {
    width: 356px;
  }

  .pao1 {
    position: absolute;
    bottom: 42px;
    left: 58px;
    animation: up1 3s linear infinite;
  }

  @keyframes up1 {
    0% {
      scale: 0.3;
    }

    100% {
      scale: 1;
      transform: translate(16px, -24px);
    }
  }

  .pao2 {
    position: absolute;
    bottom: 42px;
    left: 45px;
    animation: up2 3s linear infinite;
    opacity: 0;
    scale: 0.5;
  }

  @keyframes up2 {
    75% {
      scale: 0.7;
      opacity: 1;
    }

    100% {
      scale: 1;
      transform: translate(6px, -16px);
    }
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
    top: 37%;
    transform: translate(-50%, -50%);
    width: 85%;
    overflow-y: hidden;
    height: 52px;
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

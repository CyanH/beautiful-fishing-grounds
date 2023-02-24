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
                    <img :src="item.img" style="margin-right: 10px" />
                  </div>
                </div>
              </div>
            </div>

            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev breed-yzjl-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next breed-yzjl-next" />
          </div>
        </div>
      </div>
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
      <v-title title="罗氏沼虾出入塘统计" />
      <div class="crt">
        <div class="chart" ref="shangan"></div>
      </div>
    </v-card>
  </v-drawer>

  <div class="warn">
    <img src="@/assets/image/xia.png" class="fish" />
    <img src="@/assets/image/breed/bg.png" class="bg" />
    <div class="title">智能预警</div>
    <div class="content">
      <vue3-seamless-scroll :list="state.warnList" :step="0.3" :hover="true" :limitScrollNum="5">
        <div v-for="(item, index) in state.warnList" class="">
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
import { nextTick, onMounted, reactive, ref } from 'vue';
import { loadChart } from './chart/crtChart';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { configRecords } from '@/api/breed';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let myChar_shangan: echarts.ECharts;
let shangan = ref<HTMLDivElement | null>(null);
const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};

const state = reactive({
  clickIndex: 0,
  breedList: [
    {
      img: getImgUrl('qy_1'),
      zyr: '李某某',
      zytime: '2022-11-30 12:34:43',
      zycontent: '人工投海鲈鱼苗12小时',
      title: '海恒海鲈鱼投苗',
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
  warnList: [] as any[],
});

onMounted(() => {
  nextTick(() => {
    new Swiper('.breed-swiper-yzjl', {
      navigation: {
        nextEl: '.breed-yzjl-prev',
        prevEl: '.breed-yzjl-prev',
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
  configRecords({ warning: 0, size: 50 }).then((res: any) => {
    state.warnList = res.content;
  });
};

const getContent = () => {
  let data1 = [50, 30, 20, 160, 60, 70, 100];
  let data2 = [70, 50, 20, 50, 60, 120, 170];
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
const clickImage = (index: number, indexs: number) => {
  state.clickIndex = index * 3 + indexs;
};
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 16px;
  height: 160px;
}
.bottom_all {
  width: 100%;
  height: calc(100% - 455px);
}

.swiper-box {
  margin-top: 12px;

  .swiper-content {
    padding: 0 30px;

    .border-wrapper {
      position: relative;
      width: 110px;
      height: 110px;
      border: 1px solid #a0d8ff;

      :deep(.el-image) {
        width: 100%;
        height: 100%;
      }

      :deep(.el-image__placeholder) {
        background: url('@/assets/image/sl_new.gif') center no-repeat;
        background-size: 100%;
      }
    }
  }
}
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
  height: 120px;
  margin-top: 8px;
  .swiper-container {
    height: 100%;
    margin-top: 8px;

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
        padding: 5px 10px 0;
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
  height: 150px;
  margin: 16px auto;
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
}
.szhj {
  width: 100%;
  height: 150px;
  margin: 16px auto;
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
}
.crt {
  width: 100%;
  height: calc(100% - 640px);
  .chart {
    width: 100%;
    height: 100%;
  }
}

.warn {
  position: absolute;
  left: 27%;
  bottom: 60px;
  z-index: 10;
  .fish {
    // width: 80px;
    height: 80px;
    position: absolute;
    bottom: -40px;
    left: 0px;
    transform: rotateY(180deg);
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
    overflow-y: hidden;
    height: 210px;
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

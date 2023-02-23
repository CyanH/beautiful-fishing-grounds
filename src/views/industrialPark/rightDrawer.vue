<template>
  <div class="legend animate__animated animate__fadeInRight">
    <div class="flex row" v-for="item in state.list">
      <img :src="getImgUrl(item.icon)" class="icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>

  <v-drawer direction="right">
    <v-card>
      <div class="top">
        <v-title title="宣传视频"></v-title>
        <div class="video">
          <video controls autoplay src="@/assets/image/industrialPark/xcsp.mp4"></video>
        </div>
        <div class="esc">
          <div class="esc_con">
            <img src="@/assets/image/industrialPark/r_esc.png" alt="" />
            <div class="one1 one2_all">
              <div class="b_5">产值(亿元)</div>
              <div class="xian"></div>
              <div>
                <span class="num">16.2</span>
              </div>
            </div>
            <div class="one2 one2_all">
              <div class="b_5">养殖产量(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">2.65</span>
              </div>
            </div>
            <div class="one3 one2_all">
              <div class="b_5">苗种场(家)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one4 one2_all">
              <div class="b_5">养殖厂家(家)</div>
              <div class="xian"></div>
              <div>
                <span class="num">4</span>
              </div>
            </div>
            <div class="one5 one2_all">
              <div class="b_5">示范基地(个)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one6 one2_all">
              <div class="b_5">养殖面积(万亩)</div>
              <div class="xian"></div>
              <div>
                <span class="num">3.56</span>
              </div>
            </div>
            <div class="title">一产</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <v-title title="特色产品"></v-title>
        <div class="chanping flex">
          <div class="swiper-container swiper-container1">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in state.breedList">
                <div class="card">
                  <div class="title">
                    <span class="num">{{ index + 1 }}</span>
                    <span>{{ item.breedName }}</span>
                  </div>
                  <div class="content flex">
                    <img :src="getImgUrl(item.img)" style="margin-right: 10px" />
                    <div class="desc">{{ item.note }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next" />
          </div>
        </div>
        <v-title title="智慧物联"></v-title>
        <div class="zhwl">
          <div class="zhwl_top">
            <div class="zhwl_div" v-for="item in state.zhwl">
              <div class="name">{{ item.name }}</div>
              <div class="val">
                <span class="num">{{ item.value }}</span
                >({{ item.danwe }})
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="zhwl_bottom">
            <div class="left">
              <div class="chart" ref="chartEle_right"></div>
            </div>
            <div class="right">
              <div class="chart" ref="chartEle_xm"></div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { reactive, onMounted, nextTick, ref } from 'vue';
// 项目
import { loadXmChart } from './chart/zhwlChart';
import { RightChart } from './chart/zhwlRight';
// 轮播图
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);
const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}`, import.meta.url).href;
};
let myChar_xm: echarts.ECharts;
let chartEle_xm = ref<HTMLDivElement | null>(null);
let myChar_right: echarts.ECharts;
let chartEle_right = ref<HTMLDivElement | null>(null);
const state = reactive({
  list: [
    {
      icon: 'ico_qxz.png',
      name: '气象设备(3)',
    },
    {
      icon: 'ico_sz.png',
      name: '水质设备(2)',
    },
    {
      icon: 'ico_sxt.png',
      name: '摄像头(2)',
    },
    {
      icon: 'ico_cx.png',
      name: '城乡融合发展轴',
    },
    {
      icon: 'ico_hx.png',
      name: '渔业发展核心区',
    },
    {
      icon: 'ico_ly.png',
      name: '游览观光带',
    },
  ],
  breedList: [
    {
      breedName: '盐焗罗氏沼虾',
      img: 'yjlsx.webp',
      note: '盐焗罗氏沼虾，新鲜罗氏沼虾晒干，水煮盐炯。去虾线，鲜甜美味。经过加工处理、装罐加入调味料、密封、杀菌等工艺',
    },
    {
      breedName: '油焖罗氏沼虾',
      img: 'ymlsx.png',
      note: '油焖罗氏沼虾的做法简单，营养丰富，可以调理身体，促进发育，还可以防治高血压和心肌梗塞，孕产妇吃了还可以催乳，儿童吃了对抵抗力和身体发育都有很好的帮助，而且这道油焖罗氏沼虾外观红亮，味道飘香。',
    },
  ],
  zhwl: [
    {
      name: '覆盖农户',
      value: 10,
      danwe: '家',
    },
    {
      name: '监测数据',
      value: 964400,
      danwe: '条',
    },
    {
      name: '今日预警',
      value: 0,
      danwe: '条',
    },
  ],
});
onMounted(() => {
  nextTick(() => {
    new Swiper('.swiper-container1', {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
      },
      autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });
  });
  createChart();
});
const createChart = () => {
  // 项目进度
  myChar_xm = echarts.init(chartEle_xm.value as HTMLDivElement);
  myChar_right = echarts.init(chartEle_right.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChar_xm.resize();
    myChar_right.resize();
  });
  loadXmChart(myChar_xm, 80);
  RightChart(myChar_right);
};
</script>

<style lang="scss" scoped>
.line {
  height: 2px;
  background: linear-gradient(
    to right,
    transparent 0,
    rgba(147, 203, 255, 0.2) 15%,
    rgba(147, 203, 255, 0.2) 85%,
    transparent 100%
  );
  margin: 8px 0;
}

.legend {
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
    width: 22px;
    height: 26px;
    margin-right: 15px;
  }
}
.top {
  width: 100%;
  height: calc(49% - 24px);
  padding-bottom: 24px;
  .video {
    width: 100%;
    height: calc(100% - 212px);
    margin-top: 8px;
    text-align: center;
    video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .esc {
    // height: calc(100% - 250px);
    height: 200px;
    // margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    .esc_con {
      width: 50%;
      // height: 100%;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 80%;
      }
      .one1 {
        left: -70px;
        top: 14px;
        text-align: right;
      }
      .one2 {
        right: -105px;
        top: 13px;
      }
      .one3 {
        left: -70px;
        top: 38%;
        text-align: right;
      }
      .one4 {
        right: -90px;
        top: 37.5%;
      }
      .one5 {
        left: -85px;
        bottom: 13px;
        text-align: right;
      }
      .one6 {
        right: -105px;
        bottom: 13px;
      }
      .one2_all {
        position: absolute;
        font-size: 14px;
        .b_5 {
          margin-bottom: 5px;
        }
        .xian {
          width: 100%;
          height: 4px;
          background-color: aqua;
          border-radius: 4px;
        }
        .num {
          color: #ffb400;
          font-size: 20px;
        }
      }

      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: #70f3fc;
        font-weight: bold;
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 51%;
  .chanping {
    width: 100%;
    height: 150px;
    position: relative;
    padding-top: 8px;
    padding-bottom: 8px;
    .swiper-container {
      height: 100%;
      .swiper-slide {
        padding: 0 15px;
        box-sizing: border-box;
      }

      .card {
        height: 100%;
        background: url('@/assets/image/bg.png') center no-repeat;
        background-size: 100% 100%;

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

        .content {
          height: calc(100% - 21px);
          padding: 0px 10px 0;
          box-sizing: border-box;

          img {
            width: 98px;
            height: 98px;
            flex-shrink: 0;
          }

          .desc {
            height: 98px;
            font-size: 13px;
            line-height: 1.3;
            letter-spacing: 2px;
            color: #fff;
            overflow-y: auto;

            &::-webkit-scrollbar {
              width: 4px;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 10px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: #324686;
            }
            &::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              border-radius: 0;
              background: rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }
  .zhwl {
    width: 100%;
    height: calc(100% - 234px);
    padding-top: 12px;
    .zhwl_top {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .zhwl_div {
        width: 33%;
        height: 50px;
        text-align: center;
        .name {
          font-size: 14px;
          margin-bottom: 4px;
        }
        .val {
          font-size: 12px;
          color: #00f6ff;
          span {
            font-size: 26px;
            padding-right: 4px;
          }
        }
      }
    }
    .zhwl_bottom {
      width: 100%;
      height: calc(100% - 68px);
      display: flex;
      .left {
        width: 60%;
        height: 100%;
        .chart {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 40%;
        height: 100%;
        .chart {
          width: 100%;
          height: 100%;
        }
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
</style>

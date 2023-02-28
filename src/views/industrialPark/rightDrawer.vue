<template>
  <v-drawer direction="right">
    <v-card>
      <div class="top">
        <v-title title="罗氏沼虾大丰收"></v-title>
        <div class="video">
          <video controls autoplay src="@/assets/image/industrialPark/xcsp.mp4"></video>
        </div>
        <div class="esc">
          <div class="esc_con">
            <img src="@/assets/image/industrialPark/esc.png" alt="" />
            <div class="one1">产值 <span class="num">13.2</span> (亿元)</div>
            <div class="one2 one2_all">
              <div class="b_5">加工产量(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">3.2</span>
              </div>
            </div>
            <div class="one3 one2_all">
              <div class="b_5">水产冷库(个)</div>
              <div class="xian"></div>
              <div>
                <span class="num">4</span>
              </div>
            </div>
            <div class="one4 one2_all">
              <div class="b_5">年加工能力(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">6.2</span>
              </div>
            </div>
            <div class="one5 one2_all">
              <div class="b_5">仓储能力(吨/次)</div>
              <div class="xian"></div>
              <div>
                <span class="num">3.56</span>
              </div>
            </div>
            <div class="title">二三产</div>
          </div>
        </div>
      </div>
      <div class="bottom">
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
            <div class="chart" ref="chartEle_right"></div>
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
import { loadChart } from './chart/zhwlChart';
// 轮播图
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let myChar_right: echarts.ECharts;
const chartEle_right = ref<HTMLDivElement | null>(null);

const state = reactive({
  zhwl: [
    {
      name: '覆盖农户',
      value: 10,
      danwe: '家',
    },
    {
      name: '监测数据',
      value: 964,
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
  myChar_right = echarts.init(chartEle_right.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChar_right.resize();
  });

  loadChart(myChar_right, 80);
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

.top {
  width: 100%;
  padding-bottom: 15px;
  .video {
    width: 100%;
    height: 250px;
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
    margin-top: 24px;
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
        position: absolute;
        top: -8px;
        font-size: 14px;
        .num {
          color: #ffb400;
          font-size: 20px;
        }
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
      .one2 {
        left: -90px;
        top: 29%;
        text-align: right;
      }
      .one3 {
        top: 29%;
        right: -79px;
      }
      .one4 {
        left: -110px;
        bottom: 6.5%;
        text-align: right;
      }
      .one5 {
        right: -100px;
        bottom: 6.5%;
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
  height: calc(100% - 526px);

  .zhwl {
    height: calc(100% - 29px);
    padding-top: 12px;
    box-sizing: border-box;
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

      .chart {
        width: 100%;
        height: 100%;
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

<template>
  <v-drawer direction="right">
    <div style="height: 100%">
      <v-card>
        <v-title :title="title" :hasClose="true" />
        <div class="container">
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

          <!-- 轮播图 -->
          <div class="top_two">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in state._two">
                  <div class="content">
                    <div class="content_grid" v-for="(_item, indexs) in item">
                      <div class="border-wrapper">
                        <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
                        <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
                        <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
                        <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
                        <el-image
                          :src="_item.new_img"
                          preview-teleported
                          :initial-index="clickIndex"
                          :preview-src-list="state._new_img_two"
                          @click="elImage_Click(index, indexs)"
                        />
                      </div>
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
          <!-- 视图表 -->
          <div class="top_there">
            <div class="chart" ref="chartEle"></div>
          </div>
          <!-- 企业 -->
          <div class="top_foru">
            <div class="nav flex">
              <div @click.stop="_active('1')" :class="[_num === '1' ? '_active' : '']">
                企业介绍
                <img v-if="_num === '1'" src="@/assets/image/guang.png" alt="" />
              </div>
              <div @click.stop="_active('2')" :class="[_num === '2' ? '_active' : '']">
                建设项目
                <img v-if="_num === '2'" src="@/assets/image/guang.png" alt="" />
              </div>
              <div @click.stop="_active('3')" :class="[_num === '3' ? '_active' : '']">
                企业荣誉
                <img v-if="_num === '3'" src="@/assets/image/guang.png" alt="" />
              </div>
            </div>
            <div class="con">
              <div class="con_one" v-show="_num === '1'">
                <img align="right" src="@/assets/image/qy.jpg" class="img" />
                <div class="con_one_l">
                  <!-- {{state._four.shortInfo}} -->
                  {{ removeHtmlStyle(state._four.shortInfo) }}
                </div>
              </div>
              <div class="con_two" v-show="_num === '2'">
                <div class="_content" v-for="(item, index) in state._four.cyyprojectManagement" :key="item.id">
                  <div class="chart_pie" :id="_chart(index)"></div>
                  <div class="_content_right">
                    <p>{{ item.name }}</p>
                    <div class="_content_right_2">
                      <el-progress
                        :percentage="_number(item.progress)"
                        color="#00d4e7"
                        :stroke-width="10"
                        :show-text="false"
                      />
                    </div>
                    <div class="_content_right_3 flex">
                      <div>项目分类：{{ item.level }}</div>
                      <div class="right">投资金额：{{ _fund(item.fundSheng, item.fundLocal, item.fundCmp) }}万元</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="con_there" v-show="_num === '3'">
                <div class="border-wrapper" v-for="item in state._four.cyyHonorManagement">
                  <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
                  <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
                  <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
                  <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
                  <img :src="_img(item.address)" class="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-drawer>
</template>

<script setup lang="ts">
import { useParkStore } from '@/store';
import { onMounted, reactive, ref, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import { computed } from '@vue/reactivity';

import { loadChart } from './chart/suChart';
import { pie_Chart } from './chart/pieChart';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
// 获取公司的 实施主体接口
import { getCyyImplementationsInfo } from '@/api/industrial';
// 时间
import { parseTime } from '@/utils/parseTime';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);
const parkStore = useParkStore();

let myChart: echarts.ECharts;
let chartEle = ref<HTMLDivElement | null>(null);
// 轮播图查看
const clickIndex = ref(0);
// 标题
const title = computed(() => {
  return parkStore.param.name;
});

const state = reactive({
  list: [
    {
      name: '养殖基地',
      value: 23,
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
      name: '年供产量',
      value: 2.3,
      unit: '吨',
      icon: 'icon_ncz',
    },
  ],
  _two: [] as any[],
  _four: {
    shortInfo: '', // 企业介绍
    cyyprojectManagement: [] as any[], // 建设项目
    cyyHonorManagement: [] as any[], //企业荣誉
  },
  _new_two: [] as any,
  _new_img_two: [] as any,
});
let _num = ref('1');
//获取公司的 实施主体
let _id = ref(parkStore.param.id);
watch(
  () => parkStore.param.id,
  (_new, _old) => {
    _id.value = _new;
    _Model();
  }
);
const _Model = () => {
  getCyyImplementationsInfo({
    id: _id.value,
  }).then((res: any) => {
    console.log(res);
    _num.value = '1';
    /*
      plantBase 基地
      plantArea 面积
      yearYield 年产量
      SzyxBrandManagement 品牌
    */
    state.list[0].value = res.plantBase;
    state.list[1].value = res.plantArea;
    state.list[2].value = res.SzyxBrandManagement;
    state.list[3].value = res.yearYield;
    // 企业轮播图
    if (res.cyyImplementationsPic.length > 0) {
      console.log('res.cyyImplementationsPic', res.cyyImplementationsPic);

      let _array: any[] = [];
      for (let i = 0; i < res.cyyImplementationsPic.length; i++) {
        let new_img = _img(res.cyyImplementationsPic[i]);
        let old_img = res.cyyImplementationsPic[i];
        _array.push({
          new_img,
          old_img,
        });
        state._new_two.push({ old_img });
        state._new_img_two.push(new_img);
      }
      let b: any[] = [];
      state._two = group(b, _array);
    } else {
      state._two = [];
    }
    nextTick(() => {
      _lo();
    });
    // 项目进度
    XianMu(res.cyyprojectManagement);
    // 企业介绍
    state._four.shortInfo = res.shortInfo;
    // 企业荣誉
    if (res.cyyHonorManagement.length > 0) {
      state._four.cyyHonorManagement = [];
      for (let index = 0; index < res.cyyHonorManagement.length; index++) {
        state._four.cyyHonorManagement.push(res.cyyHonorManagement[index]);
      }
    } else {
      state._four.cyyHonorManagement = [];
    }
    // 建设项目
    state._four.cyyprojectManagement = res.cyyprojectManagement;
  });
};
const _lo = () => {
  new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
    },
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  });
};
// 返回完整图片路径
const _img = (img: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + img;
};
// 计算总金额
const _fund = (fundSheng: number, fundLocal: number, fundCmp: number) => {
  return fundSheng + fundLocal + fundCmp;
};
// 进度条 转 整型
const _number = (num: string) => {
  return Number(num);
};
const _chart = (index: number) => {
  return 'chart_pie' + index;
};
// 建设项目
const jian_She = () => {
  for (let i = 0; i < state._four.cyyprojectManagement.length; i++) {
    let _chart_pie = 'chart_pie' + i;
    let a = document.getElementById(_chart_pie) as HTMLElement;
    console.log(a);
    let b = echarts.init(a);
    let _p = _number(state._four.cyyprojectManagement[i].progress);
    let progress_1 = _p.toFixed(2) + '%';
    let progress_2 = _p;
    pie_Chart(b, progress_1, progress_2);
    window.addEventListener(_chart_pie, () => {
      b.resize();
    });
  }
};
// 轮播图
const group = (newArr: any, arr: any) => {
  if (arr.length > 0) {
    if (arr.length > 3) {
      //arr 的长度大于 分组数
      newArr.push(arr.splice(0, 3)); //分组
      group(newArr, arr); //递归
    } else {
      //如果长度不够分为一组，就直接把剩余的分为一组
      newArr.push(arr.splice(0, arr.length));
    }
  }
  return newArr;
};
onMounted(() => {
  _Model();
});
// 项目进度
const XianMu = (data: any) => {
  console.log(data);

  let progress_array = [] as any;
  let tzjd_array = [] as any;
  let data_time = [] as any;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].updateTime);

    progress_array.push(_number(data[i].progress).toFixed(2));
    tzjd_array.push(_number(data[i].tzjd).toFixed(2));
    data_time.push(parseTime(data[i].planFinishDate, '{m}/{d}'));
  }
  console.log(data_time);

  myChart = echarts.init(chartEle.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
  loadChart(myChart, progress_array, tzjd_array, data_time);
};
// 切换
const _active = (num: string) => {
  _num.value = num;
  if (num === '2') {
    jian_She();
  }
};
// 去除富文本的标签
const removeHtmlStyle = (html: any) => {
  let relStyle = /style\s*?=\s*?(['"])[\s\S]*?\1/g; //去除样式
  let relTag = /<.+?>/g; //去除标签
  let relClass = /class\s*?=\s*?(['"])[\s\S]*?\1/g; // 清除类名
  let newHtml = '';
  if (html) {
    newHtml = html.replace(relStyle, '');
    newHtml = newHtml.replace(relTag, '');
    newHtml = newHtml.replace(relClass, '');
    newHtml = newHtml.replaceAll('&nbsp;', '');
  }
  return newHtml;
};
// 轮播图放大
const elImage_Click = (f: number, z: number) => {
  let _d = state._new_two;
  for (let index = 0; index < _d.length; index++) {
    if (_d[index].old_img === state._two[f][z].old_img) {
      clickIndex.value = index;
    }
  }
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% - 38px);
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
  // 轮播图
  .top_two {
    width: 100%;
    height: 80px;
    position: relative;
    margin-bottom: 12px;
    .content {
      padding: 0 30px;
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      place-items: center;
      .content_grid {
        width: 100%;
        .border-wrapper {
          position: relative;
          padding: 5px;
          // width: 90px;
          // height: 80px;

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
            bottom: 2px;
            transform: rotate(270deg);
          }

          .bottom-right {
            position: absolute;
            right: 0;
            bottom: 2px;
            transform: rotate(180deg);
          }

          :deep(.el-image) {
            width: 100%;
            height: 80px;
          }
          :deep(.el-image__placeholder) {
            background: url('@/assets/image/sl_new.gif') center no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
  //
  .top_there {
    width: 100%;
    height: 250px;
    padding-top: 20px;
    z-index: 5;
    .chart {
      // width: 100%;
      height: 250px;
      z-index: 5;
    }
  }
  //
  .top_foru {
    width: 100%;
    height: calc(100% - 500px);
    z-index: 10000;
    overflow: hidden;
    margin-top: 8px;
    .nav {
      // height: 50px;
      text-align: center;
      margin-bottom: 10px;

      div {
        width: 100px;
        color: white;
        font-size: 15px;
        padding-bottom: 10px;
        cursor: pointer;
        position: relative;
        img {
          position: absolute;
          left: 50%;
          right: 50%;
          transform: translate(-50%, -50%);
          bottom: -4px;
        }
      }
      ._active {
        // border-bottom: 1px #00f6ff solid;
        color: #00f6ff;
      }
    }
    .con {
      height: calc(100% - 50px);
      overflow-x: auto;
      padding-right: 5px;
      .con_one {
        width: 100%;
        height: 100%;
        .img {
          width: 120px;
          height: 100px;
          border-radius: 10px;
          padding-left: 5px;
          display: inline-block;
        }
        .con_one_l {
          text-indent: 2em;
          line-height: 22px;
          letter-spacing: 2px;
          color: #fff !important;
          font-size: 15px;
        }
      }

      .con_two {
        width: 100%;
        height: 100%;
        ._content {
          width: 100%;
          height: 130px;
          display: flex;
          margin-bottom: 15px;
          background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(0, 212, 231, 0.2));
          border-radius: 10px;
          .chart_pie {
            width: 120px;
            height: 100%;
          }
          ._content_right {
            width: calc(100% - 120px);
            height: 100px;
            padding-right: 5px;
            p {
              height: 20px;
              color: white;
              font-size: 15px;
            }
            ._content_right_2 {
              width: 100%;
              height: 30px;
              .el-progress {
                flex: 1;
                border: 1px solid #00d4e7;
                border-radius: 22px;
                :deep(.el-progress-bar__outer) {
                  background-color: rgba(219, 255, 248, 0.02);
                }
                :deep(.el-progress-bar__inner) {
                  border-radius: 22px;
                }
              }
            }
            ._content_right_3 {
              height: 30px;
              div {
                flex: 1;
                color: white;
                font-size: 13px;
              }
              .right {
                text-align: right;
              }
            }
          }
        }
      }
      .con_there {
        width: 100%;
        // height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .border-wrapper {
          position: relative;
          padding: 5px;
          width: 27%;
          margin-bottom: 16px;
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

          .img {
            width: 100%;
            height: 80px;
            text-align: center;
          }
        }
      }
    }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .con::-webkit-scrollbar {
      width: 2px;
      // background-color: #00f6ff;
    }

    /*定义滑块 内阴影+圆角*/
    .con::-webkit-scrollbar-thumb {
      border-radius: 2px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
      background-color: rgba(35,63,147, 1);
    }

    /*定义滚动条轨道 内阴影+圆角*/
    .con::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      // background-color: rgba(255, 255, 255, 0.8);
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
}

.swiper-button-next {
  right: 0;
  transform: rotate(180deg) translateY(50%);
}
</style>

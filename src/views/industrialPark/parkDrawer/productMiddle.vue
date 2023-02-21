<template>
  <div class="flex chart-container">
    <div style="position: relative; height: 100%; flex: 1">
      <div class="center">
        <div class="num">{{ prize }}</div>
        <div class="name">成果</div>
      </div>

      <img src="@/assets/image/industrialPark/jscg_q.png" class="circle" />
      <div class="chart" ref="chartEle"></div>
    </div>
    <div class="flex-column">
      <div v-for="item in list" class="flex">
        <span class="tip" :style="{ backgroundColor: item.bgColor }"></span>
        <span class="name">{{ item.name }} {{ item.value }} ({{ item.unit }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getCyyGrowthRecord } from '@/api/industrial';
import * as echarts from 'echarts';
import { loadChart } from '../chart/cgChart';

let prize = ref(23);
let myChart: echarts.ECharts;
let chartEle = ref<HTMLDivElement | null>(null);

const list = reactive([
  {
    name: '引入产品数量',
    value: 235,
    unit: '个',
    bgColor: '#00DCFD',
  },
  {
    name: '引入技术数量',
    value: 346,
    unit: '项',
    bgColor: '#2892FF',
  },
  {
    name: '转化产品数量',
    value: 232,
    unit: '个',
    bgColor: '#28FFAB',
  },
  {
    name: '转化技术数量',
    value: 362,
    unit: '项',
    bgColor: '#fae150',
  },
  {
    name: '转化项目数量',
    unit: '个',
    value: 124,
    bgColor: '#FF6172',
  },
]);

onMounted(() => {
  myChart = echarts.init(chartEle.value as HTMLElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

const getData = () => {
  getCyyGrowthRecord({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    prize.value = data.prize;
    list[0].value = data.yrProduct;
    list[1].value = data.yrTechnology;
    list[2].value = data.zhProduct;
    list[3].value = data.zhTechnology;
    list[4].value = data.zhProject;
    loadChart(myChart, data);
  });
};
</script>

<style lang="scss" scoped>
.chart-container {
  height: calc(100% - 26vh - 428px);

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10000;

    .num {
      font-size: 20px;
      color: #00f6ff;
    }

    .name {
      color: #fff;
      padding-top: 0px;
    }
  }

  .circle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 132px;
    animation: rotation 5s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .chart {
    height: 100%;
  }

  .flex-column {
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .tip {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-right: 10px;
    }

    .name {
      font-size: 15px;
      color: #fff;
    }
  }
}
</style>

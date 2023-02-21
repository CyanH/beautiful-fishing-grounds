<template>
  <div class="tabs flex">
    <div :class="chooseIndex === 0 ? 'choose' : ''" @click="handleClick(0)">今天</div>
    <div :class="chooseIndex === 7 ? 'choose' : ''" @click="handleClick(7)">近七天</div>
    <div :class="chooseIndex === 15 ? 'choose' : ''" @click="handleClick(15)">近十五天</div>
  </div>

  <div class="chart" ref="chartEle"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { loadChart } from '../chart/qxzChart';
import { parseTime } from '@/utils/parseTime';
import { weatherHistory } from '@/api/breed';
import { useBreedStore } from '@/store';

const plantStore = useBreedStore();
let chooseIndex = ref(0);
let myChart: echarts.ECharts;
let chartEle = ref<HTMLDivElement | null>(null);

onMounted(() => {
  myChart = echarts.init(chartEle.value as HTMLElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

watch(
  () => plantStore.equipId,
  () => {
    getData();
  }
);

const getData = () => {
  myChart.clear();
  let startDate, endDate;
  if (chooseIndex.value === 0) {
    endDate = parseInt((new Date().getTime() / 1000).toString());
    startDate = endDate - (endDate % 86400) - 3600 * 8;
  } else {
    console.log(chooseIndex.value);
    endDate = new Date();
    startDate = new Date().getTime() - chooseIndex.value * 24 * 3600000;
  }
  startDate = parseTime(startDate as number, '{y}-{m}-{d} {h}:{m}:{s}') as string;
  endDate = parseTime(endDate as number, '{y}-{m}-{d} {h}:{m}:{s}') as string;
  weatherHistory(plantStore.equipId, startDate, endDate).then((res: any) => {
    let date = [] as any[];
    let temp = [] as any[];
    let humi = [] as any[];
    let rain = [] as any[];
    let speed = [] as any[];
    let raid = [] as any[];
    res.weatherData.map((it: any) => {
      date.push(it.resdate);
      temp.push(it.temp);
      humi.push(it.humi);
      rain.push(it.rain);
      speed.push(it.speed);
      raid.push(it.raid);
    });
    let data = [temp, humi, rain, speed, raid];
    loadChart(myChart, data, date);
  });
};

const handleClick = (index: number) => {
  chooseIndex.value = index;
  getData();
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.tabs {
  height: 0.14rem;
  margin: 0.02rem 0;

  div {
    cursor: pointer;
    margin-right: 0.1rem;
    padding: 0.02rem 0.1rem;
    font-size: 0.08rem;
    color: #fff;
  }

  .choose {
    color: #00f6ff;
  }
}

.chart {
  height: calc(100% - 65px);
}
</style>

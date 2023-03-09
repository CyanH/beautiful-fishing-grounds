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
import { loadChart, clearTimer } from '../chart/szChart';
import { parseTime } from '@/utils/parseTime';
import { waterHistory } from '@/api/breed';
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
  clearTimer();
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
  waterHistory(plantStore.equipId, startDate, endDate).then((res: any) => {
    let date = [] as any[];
    let ph = [] as any[];
    let ddl = [] as any[];
    let oxy = [] as any[];
    let zd = [] as any[];
    let temp = [] as any[];

    res.waterData.map((it: any) => {
      date.push(it.resdate);
      ph.push(it.ph);
      ddl.push(it.ddl);
      oxy.push(it.oxy);
      zd.push(it.zd);
      temp.push(it.temp);
    });
    let data = [ph, ddl, oxy, zd, temp];
    loadChart(myChart, data, date);
  });
};

const handleClick = (index: number) => {
  chooseIndex.value = index;
  getData();
};

onUnmounted(() => {
  clearTimer();
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

<template>
  <v-drawer direction="right">
    <div style="height: 26%; margin-bottom: 1.5vh">
      <v-card direction="right" title="塘口实况">
        <product-view></product-view>
      </v-card>
    </div>
    <div style="height: calc(46% - 3vh); margin-bottom: 1.5vh">
      <v-card direction="right" title="项目建设">
        <middle-view></middle-view>
      </v-card>
    </div>
    <div style="height: 28%">
      <v-card direction="right" title="带动农户">
        <div class="chart" ref="chartEle"></div>
      </v-card>
    </div>
  </v-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import productView from './rightDrawer/product.vue';
import middleView from './rightDrawer/middle.vue';
import { getLndnManagement } from '@/api/industrial';
import * as echarts from 'echarts';
import { loadChart } from './chart/ddnhChart';

let myChart: echarts.ECharts;
let chartEle = ref<HTMLDivElement | null>(null);

onMounted(() => {
  myChart = echarts.init(chartEle.value as HTMLElement);
  window.addEventListener('resize', () => {
    myChart.resize();
  });

  getData();
});

const getData = () => {
  getLndnManagement({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    loadChart(myChart, data);
  });
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
}
</style>

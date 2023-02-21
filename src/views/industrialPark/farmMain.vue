<template>
  <v-drawer direction="right">
    <v-card>
      <div class="top">
        <v-title title="数据指标" />
        <div class="ball-container">
          <div class="jmx ball">
            <div class="circle out"></div>
            <div class="circle in"></div>
            <img src="@/assets/image/industrialPark/icon_jmx.png" />
            <div class="value">
              <div>
                <span class="num">{{ state.param.jmxNumber }}</span>
                <span class="unit">户</span>
              </div>
              <div class="label">紧密型</div>
            </div>
          </div>
          <div class="ddpk ball">
            <div class="circle out"></div>
            <div class="circle in"></div>
            <img src="@/assets/image/industrialPark/icon_ddpk.png" />
            <div class="value">
              <div>
                <span class="num">{{ state.param.noMoneyNum }}</span>
                <span class="unit">户</span>
              </div>
              <div class="label">
                <div>带动贫困</div>
                <div>人口</div>
              </div>
            </div>
          </div>
          <div class="ddnh ball">
            <div class="circle out"></div>
            <div class="circle in"></div>
            <img src="@/assets/image/industrialPark/icon_ddnh.png" />
            <div class="value">
              <div>
                <span class="num">{{ state.param.allNumber }}</span>
                <span class="unit">户</span>
              </div>
              <div class="label">带动农户</div>
            </div>
          </div>
          <div class="fsx ball">
            <div class="circle out"></div>
            <div class="circle in"></div>
            <img src="@/assets/image/industrialPark/icon_fsx.png" />
            <div class="value">
              <div>
                <span class="num">{{ state.param.fsxNumber }}</span>
                <span class="unit">户</span>
              </div>
              <div class="label">辐射性</div>
            </div>
          </div>
          <div class="ssx ball">
            <div class="circle out"></div>
            <div class="circle in"></div>
            <img src="@/assets/image/industrialPark/icon_ssx.png" />
            <div class="value">
              <div>
                <span class="num">{{ state.param.ssxNumber }}</span>
                <span class="unit">户</span>
              </div>
              <div class="label">松散型</div>
            </div>
          </div>
        </div>
      </div>

      <div class="middle">
        <v-title title="人均可支配收入" />
        <div class="chart" ref="lineChartEle"></div>
      </div>

      <div class="bottom">
        <v-title title="企业联农带农效益分析" />
        <div class="chart flex">
          <div class="box">
            <img src="@/assets/image/industrialPark/pie_center.png" class="center" />
            <img src="@/assets/image/industrialPark/pie_out.png" class="out" />
            <div class="chart-content" ref="pieChartEle"></div>
          </div>
          <div class="box flex column">
            <div v-for="(item, index) in state.list" class="flex row">
              <span class="square" :style="{ background: colors[index] }"></span>
              <span class="name">{{ item.name }}({{ item.value }}户)</span>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { cyyImplLndn, cyyLndnEcharts, getLndnManagement } from '@/api/industrial';
import * as echarts from 'echarts';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { loadLineChart } from './chart/farm/lineChart';
import { loadPieChart } from './chart/farm/pieChart';

let lineChart: echarts.ECharts;
let lineChartEle = ref<HTMLDivElement | null>(null);
let pieChart: echarts.ECharts;
let pieChartEle = ref<HTMLDivElement | null>(null);
const colors = ['#0A68F8', '#E23511', '#11BA60', '#6931F2', '#D7A025'];
const state = reactive({
  param: {} as any,
  list: [] as any[],
});

onMounted(() => {
  getData();

  lineChart = echarts.init(lineChartEle.value as HTMLDivElement);
  pieChart = echarts.init(pieChartEle.value as HTMLDivElement);

  window.addEventListener('resize', () => {
    lineChart.resize();
    pieChart.resize();
  });
});

const getData = () => {
  getLndnManagement({ year: new Date().getFullYear() }).then((res: any) => {
    state.param = res.content[0];
  });
  cyyLndnEcharts().then((res: any) => {
    let data = res.content;
    let year = [] as number[],
      cyyAvg = [] as number[],
      qqAvg = [] as number[];
    data.map((item: { year: number; avgIncome: number; countyAvgIncome: number }) => {
      year.push(item.year);
      cyyAvg.push(item.avgIncome);
      qqAvg.push(item.countyAvgIncome);
      loadLineChart(lineChart, year, cyyAvg, qqAvg);
    });
  });
  cyyImplLndn().then((res: any) => {
    res.map((it: any) => {
      it.name = it.companyName;
      it.value = it.sum;
    });
    state.list = res;
    loadPieChart(pieChart, res);
  });
};

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    lineChart.resize();
    pieChart.resize();
  });
});
</script>

<style lang="scss" scoped>
.top {
  height: 34%;

  .ball-container {
    height: calc(100% - 38px);
    position: relative;
    .ball {
      position: absolute;
      transform: translateX(-50%);

      .circle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid;
        border-radius: 50%;

        @keyframes big {
          0% {
            opacity: 0.6;
          }
          19% {
            opacity: 0.6;
          }
          20% {
            opacity: 1;
          }
          21% {
            opacity: 0.6;
            border-width: 1px;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6);
            opacity: 0;
          }
        }
      }

      .out {
        animation: big 4s infinite linear;
      }

      .in {
        animation: big 4s infinite 2s linear;
      }

      img {
        width: 100%;
        animation: rotation 5s infinite linear;

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      }

      .value {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
        text-align: center;

        .num {
          font-size: 18px;
        }

        .unit {
          font-size: 14px;
          margin-left: 3px;
        }

        .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.64);
          margin-top: 5px;
        }
      }
    }

    .jmx {
      width: 88px;
      left: 15%;
      top: 7%;

      .circle {
        border-color: #ffd800;
        width: 65px;
        height: 65px;
      }
    }

    .ddpk {
      width: 103px;
      left: 23%;
      top: 48%;

      .circle {
        border-color: #43c3ff;
        width: 80px;
        height: 80px;
      }
    }
    .ddnh {
      width: 118px;
      left: 50%;
      top: 13%;

      .circle {
        border-color: #43c3ff;
        width: 95px;
        height: 95px;
      }
    }
    .fsx {
      width: 96px;
      left: 74%;
      top: 50%;

      .circle {
        border-color: #ba8dff;
        width: 75px;
        height: 75px;
      }
    }
    .ssx {
      width: 102px;
      left: 88%;
      top: 8%;

      .circle {
        border-color: #00ffff;
        width: 82px;
        height: 82px;
      }
    }
  }
}

.middle {
  height: 33%;
}

.bottom {
  height: 33%;
}

.chart {
  height: calc(100% - 38px);

  .box {
    position: relative;
    height: 100%;
    flex: 1;
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
    }

    .out {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 184px;
      animation: rotate 5s infinite linear;

      @keyframes rotate {
        0% {
          transform: translate(-50%, -50%) rotate(0deg);
        }

        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }

    .chart-content {
      height: 100%;
    }

    .square {
      width: 10px;
      height: 10px;
      margin-right: 10px;
    }

    .name {
      font-size: 14px;
    }
  }

  .column {
    padding-left: 30px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .row {
    margin-bottom: 10px;
  }
}
</style>

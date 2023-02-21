<template>
  <v-drawer direction="right">
    <v-card>
      <v-title :title="title" :hasClose="true" />
      <div class="container">
        <div class="o1">
          <div class="mb flex" v-for="item in _list._one">
            <span class="label">{{ item.title }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
        <div class="o2 flex">
          <div>
            <div class="chart" ref="chartEle_zc"></div>
          </div>
          <div>
            <div class="chart" ref="chartEle_xm"></div>
          </div>
          <div>
            <div class="chart" ref="chartEle_zj"></div>
          </div>
        </div>
        <div class="o3">
          <div class="chart" ref="chartEle_all"></div>
        </div>
        <div class="o4">
          <vue3-seamless-scroll
            v-if="_list._foru.length > 0"
            :list="_list._foru"
            :step="0.3"
            :hover="true"
            :limitScrollNum="4"
          >
            <el-timeline>
              <el-timeline-item
                color="#00f6ff"
                v-for="(activity, index) in _list._foru"
                :key="index"
                :timestamp="activity.timestamp"
                placement="top"
              >
                <div class="jd">
                  <el-progress :percentage="activity.progress" />
                </div>
                <div class="content">
                  {{ activity.info }}
                </div>
              </el-timeline-item>
            </el-timeline>
          </vue3-seamless-scroll>
          <div v-else class="o4_no">
            <img src="@/assets/image/noImg.png" />
            <div class="text">暂无数据</div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
// 接口
import { getCyyprojectManagementInfo } from '@/api/industrial';
import { onMounted, reactive, ref, watch, computed } from 'vue';
import { useParkStore } from '@/store';
// 时间
import { parseTime } from '@/utils/parseTime';
// 资金组成
import { loadZcChart } from './chart/project/zcChart';
// 项目
import { loadXmChart } from './chart/project/xmChart';
// 资金进度
import { loadZjChart } from './chart/project/zjChart';
// 项目、资金折线图
import { loadAllChart } from './chart/project/allChart';
const parkStore = useParkStore();
let myChart: echarts.ECharts;
let chartEle_zc = ref<HTMLDivElement | null>(null);
let myChar_xm: echarts.ECharts;
let chartEle_xm = ref<HTMLDivElement | null>(null);
let myChar_zj: echarts.ECharts;
let chartEle_zj = ref<HTMLDivElement | null>(null);
// 项目、资金折线图
let myChar_all: echarts.ECharts;
let chartEle_all = ref<HTMLDivElement | null>(null);
const _list = reactive({
  _one: [
    {
      title: '项目名称',
      value: '暂无名称',
    },
    {
      title: '实施主体',
      value: '暂无实施主体',
    },
    {
      title: '项目分类',
      value: '暂无项目分类',
    },
    {
      title: '项目金额',
      value: '暂无项目金额',
    },
    {
      title: '计划时间',
      value: '暂无计划时间',
    },
  ],
  _foru: [] as any,
});
// 标题
const title = computed(() => {
  return parkStore.param.name;
});
// 建设项目的id
let _id = ref(parkStore.param.id);
watch(
  () => parkStore.param.id,
  (_new, _old) => {
    _id.value = _new;
    _Model();
  }
);
onMounted(() => {
  _Model();
});
const _Model = () => {
  _list._foru = [];
  getCyyprojectManagementInfo({
    id: _id.value,
  }).then((res: any) => {
    console.log('总数据', res);
    _list._one[0].value = res.cyyprojectManagement.name;
    _list._one[1].value = res.cyyprojectManagement.cyyImplementationNames;
    _list._one[2].value = res.cyyprojectManagement.level;
    _list._one[3].value =
      res.cyyprojectManagement.finishFundCmp +
      res.cyyprojectManagement.finishFundLocal +
      res.cyyprojectManagement.finishFundSheng +
      ' 万元';
    _list._one[4].value =
      parseTime(res.cyyprojectManagement.startDate, '{y}-{m}-{d}') +
      ' 至 ' +
      parseTime(res.cyyprojectManagement.planFinishDate, '{y}-{m}-{d}');

    let progress = 0;
    let tzjd = 0;
    if (res.cyyprojectManagement.progress) {
      progress = _number(_number(res.cyyprojectManagement.progress).toFixed(2));
    }
    if (res.cyyprojectManagement.tzjd) {
      tzjd = _number(_number(res.cyyprojectManagement.tzjd).toFixed(2));
    }
    // 资金组成
    let zc_data = [] as any;
    zc_data[0] = {
      name: '省财政投资额',
      value: _number(res.cyyprojectManagement.fundSheng.toFixed(2)),
    };
    zc_data[1] = {
      name: '地方统筹资额',
      value: _number(res.cyyprojectManagement.fundLocal.toFixed(2)),
    };
    zc_data[2] = {
      name: '其他社会资本',
      value: _number(res.cyyprojectManagement.fundCmp.toFixed(2)),
    };
    let data = res.cyyprojectProgresses;
    // 项目进度
    let xm_data = [] as any;
    // 资金进度
    let zj_data = [] as any;
    // 时间轴
    let time_data = [] as any;
    for (let i = 0; i < data.length; i++) {
      xm_data.push(s_numbere(data[i].progress));
      zj_data.push(s_numbere(data[i].zjjd));
      time_data.push(parseTime(data[i].updateTime, '{m}/{d}'));
      _list._foru.push({
        timestamp: parseTime(data[i].updateTime, '{y}-{m}-{d}'),
        info: data[i].info,
        progress: s_numbere(data[i].progress),
      });
    }

    // 资金组成
    myChart = echarts.init(chartEle_zc.value as HTMLDivElement);
    // 项目进度
    myChar_xm = echarts.init(chartEle_xm.value as HTMLDivElement);
    // 资金进度
    myChar_zj = echarts.init(chartEle_zj.value as HTMLDivElement);
    // 项目、资金折线图
    myChar_all = echarts.init(chartEle_all.value as HTMLDivElement);
    window.addEventListener('resize', () => {
      myChart.resize();
      myChar_xm.resize();
      myChar_zj.resize();
      myChar_all.resize();
    });
    loadZcChart(myChart, zc_data);
    loadXmChart(myChar_xm, progress);
    loadZjChart(myChar_zj, tzjd);
    loadAllChart(myChar_all, xm_data, zj_data, time_data);
  });
};
// 进度条 转 整型
const _number = (num: string) => {
  return Number(num);
};
const s_numbere = (num: string) => {
  return Number(Number(num).toFixed(2));
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% - 38px);
}
.o1 {
  width: 100%;
  margin-top: 16px;
  padding: 0px 8px;
  height: 160px;
  .flex {
    align-items: baseline;
  }
  .mb {
    // margin-bottom: 20px;
    height: 32px;
    line-height: 32px;
  }
  .label {
    color: #b9b9b9;
    width: 70px;
    font-size: 14px;
    text-align-last: justify;
    margin-right: 24px;
  }
  .value {
    flex: 1;
    color: #fff;
    font-size: 14px;
  }
}
.o2 {
  width: 100%;
  height: 130px;
  div {
    flex: 1;
    height: 100%;
    .chart {
      width: 100%;
    }
  }
}
.o3 {
  width: 100%;
  height: 150px;
  .chart {
    width: 100%;
    height: 150px;
  }
}
.o4 {
  width: 100%;
  height: calc(100% - 500px);
  margin-top: 20px;
  // overflow-x: auto;
  overflow: hidden;
  .o4_no {
    width: 100%;
    height: 100%;
    text-align: center;
    img {
      width: 300px;
      margin: 0 auto;
    }
    .text {
      color: white;
      font-size: 16px;
    }
  }
  .content {
    color: white;
    line-height: 2em;
    font-size: 14px;
  }
  .el-timeline {
    padding: 0px 8px;
    :deep(.el-timeline-item) {
      padding-bottom: 24px;
    }
    :deep(.el-timeline-item__tail) {
      border-left: 1px dashed rgba(87, 255, 142, 0.3);
    }
    :deep(.el-timeline-item__timestamp) {
      color: #ffffff;
      padding-bottom: 8px;
      position: relative;
      font-family: 'DIN';
      font-size: 15px;
    }
    :deep(.el-timeline-item__node--normal) {
      width: 8px;
      height: 8px;
      left: 0.5px;
    }
    :deep(.el-timeline-item__timestamp) {
      padding-bottom: 0px;
    }
    .jd {
      width: 73%;
      position: absolute;
      right: 0;
      top: 2px;
      color: #57ff8e;
      .el-progress {
        :deep(.el-progress-bar__inner) {
          background-color: #57ff8e;
        }
        :deep(.el-progress__text) {
          color: white;
          padding-left: 5px;
          font-family: 'DIN';
          span {
            font-size: 20px;
          }
        }
        :deep(.el-progress-bar__outer) {
          background-color: rgba(235, 238, 245, 0.2);
        }
      }
    }
  }
}
</style>

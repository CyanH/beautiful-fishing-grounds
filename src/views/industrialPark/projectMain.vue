<template>
  <div class="legend animate__animated animate__fadeInRight">
    <div class="flex" style="margin-bottom: 12px">
      <div
        class="bar"
        :class="parkStore.projectChooseIndex === 0 ? 'active' : ''"
        @click="parkStore.projectChooseIndex = 0"
      >
        分类
      </div>
      <div
        class="bar"
        :class="parkStore.projectChooseIndex === 1 ? 'active' : ''"
        @click="parkStore.projectChooseIndex = 1"
      >
        进度
      </div>
      <div
        class="bar"
        style="border-right: 1px solid #00f6ff"
        :class="parkStore.projectChooseIndex === 2 ? 'active' : ''"
        @click="parkStore.projectChooseIndex = 2"
      >
        资金
      </div>
    </div>
    <div v-for="item in projectList" class="flex line">
      <img :src="getImgUrl(item.icon)" class="icon" />
      <span>{{ item.name }}({{ item.amount }})</span>
    </div>
  </div>

  <v-drawer direction="right">
    <v-card>
      <v-title title="项目建设" />
      <div class="project-content">
        <div class="pyramid-box">
          <img src="@/assets/image/industrialPark/pyramid.png" class="pyramid" />
          <div v-for="(item, index) in state.list" :key="index" class="pyramid-detail">
            <div :class="index % 2 === 0 ? 'right-bar' : 'left-bar'">
              <span class="num">{{ item.amount }}</span>
              <span style="color: #b5b5b5">项</span>
            </div>

            <div class="flex" v-if="index % 2 === 0">
              <img src="@/assets/image/industrialPark/line.png" />
              <span class="name">{{ item.type }}</span>
            </div>

            <div class="flex" v-else>
              <span class="name">{{ item.type }}</span>
              <img src="@/assets/image/industrialPark/line.png" class="mirror" />
            </div>
          </div>
        </div>

        <div class="progress-container">
          <div class="label">开工率</div>
          <div class="flex">
            <div class="progress-bar">
              <div class="el-progress-bar__outer">
                <div class="el-progress-bar__inner" style="" :style="{ width: state.kgl + '%' }"></div>
              </div>
            </div>
            <span class="num">{{ state.kgl }}%</span>
          </div>

          <div class="label">完工率</div>
          <div class="flex">
            <div class="progress-bar">
              <div class="el-progress-bar__outer">
                <div class="el-progress-bar__inner" style="" :style="{ width: state.wgl + '%' }"></div>
              </div>
            </div>
            <span class="num">{{ state.wgl }}%</span>
          </div>

          <div class="label">总进度</div>
          <div class="flex">
            <div class="progress-bar">
              <div class="el-progress-bar__outer">
                <div class="el-progress-bar__inner" style="" :style="{ width: state.zjd + '%' }"></div>
              </div>
            </div>
            <span class="num">{{ state.zjd }}%</span>
          </div>
        </div>
      </div>

      <v-title title="项目列表" />
      <div class="list">
        <div class="nav">
          <div>序号</div>
          <div>名称</div>
          <div>承担单位</div>
          <div>项目进度</div>
        </div>
        <div class="content">
          <vue3-seamless-scroll :list="state.projectList" :step="0.3" :hover="true" :limitScrollNum="11">
            <div class="row" v-for="(item, index) in state.projectList" :key="index">
              <div>{{ index + 1 }}</div>
              <el-tooltip placement="top" :disabled="item.name.length < 9">
                <template #content>{{ item.name }}</template>
                <span>{{ setText(item.name) }}</span>
              </el-tooltip>
              <el-tooltip placement="top" :disabled="setDisabled(item.cyyImplementationNames)">
                <template #content>{{ item.cyyImplementationNames }}</template>
                <span>{{ setText(item.cyyImplementationNames) }}</span>
              </el-tooltip>
              <div :class="setState(item.progress) === 0 ? 'wkg' : setState(item.progress) === 1 ? 'sgz' : 'ywg'">
                {{ setState(item.progress) === 0 ? '未开工' : setState(item.progress) === 1 ? '施工中' : '已完工' }}
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { useParkStore } from '@/store';
import { computed, onMounted, reactive } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { getProjectType, getCompletionRate, cyyprojectManagement } from '@/api/industrial';

const parkStore = useParkStore();
const state = reactive({
  list: [
    {
      type: '统筹资金',
      amount: 0,
    },
    {
      type: '土地流转',
      amount: 0,
    },
    {
      type: '农业品牌',
      amount: 0,
    },
    {
      type: '农业设施',
      amount: 0,
    },
    {
      type: '科技研发与信息支撑',
      amount: 0,
    },
    {
      type: '产业融合',
      amount: 0,
    },
  ],
  kgl: 0,
  wgl: 0,
  zjd: 0,
  projectList: [] as any[],
  projectLegend: [
    [
      { icon: 'i_cyrh.png', name: '产业融合', amount: 0 },
      { icon: 'i_tdlz.png', name: '土地流转', amount: 0 },
      { icon: 'i_nyss.png', name: '农业设施', amount: 0 },
      { icon: 'i_kjxx.png', name: '科技研发与信息支撑', amount: 0 },
      { icon: 'i_ggqy.png', name: '农业品牌', amount: 0 },
      { icon: 'i_dktx.png', name: '统筹资金', amount: 0 },
    ],

    [
      { icon: 'i_wkg.png', name: '未开工', amount: 0 },
      { icon: 'i_sgz.png', name: '施工中', amount: 0 },
      { icon: 'i_ywg.png', name: '已完工', amount: 0 },
    ],
    [
      { icon: 'i_xm_ws.png', name: '0-50万元', amount: 0 },
      { icon: 'i_xm_yb.png', name: '50-100万元', amount: 0 },
      { icon: 'i_xm_lb.png', name: '100-200万元', amount: 0 },
      { icon: 'i_xm_dylb.png', name: '>200万元', amount: 0 },
    ],
  ],
});

onMounted(() => [
  getProjectType().then((res: any) => {
    state.list.map((it) => {
      it.amount = res[it.type];
    });
    state.projectLegend[0].map((it) => {
      it.amount = res[it.name];
    });
  }),
  getCompletionRate().then((res: any) => {
    state.kgl = Number(res.kgl);
    state.wgl = Number(res.wgl);
    state.zjd = Number(res.zjd);
  }),

  cyyprojectManagement({ size: 50 }).then((res: any) => {
    state.projectList = res.content;
    const sgz = state.projectList.filter((item) => {
      return item.progress > 0 && item.progress < 100;
    });
    const ywg = state.projectList.filter((item) => {
      return item.progress >= 100;
    });
    const wkgNum = state.projectList.length - sgz.length - ywg.length;
    state.projectLegend[1][0].amount = wkgNum;
    state.projectLegend[1][1].amount = sgz.length;
    state.projectLegend[1][2].amount = ywg.length;

    const f = state.projectList.filter((it) => {
      return it.total <= 50;
    });
    const h = state.projectList.filter((it) => {
      return it.total > 50 && it.total <= 100;
    });
    const o = state.projectList.filter((it) => {
      return it.total > 100 && it.total <= 200;
    });
    const t = state.projectList.filter((it) => {
      return it.total > 200;
    });
    state.projectLegend[2][0].amount = f.length;
    state.projectLegend[2][1].amount = h.length;
    state.projectLegend[2][2].amount = o.length;
    state.projectLegend[2][3].amount = t.length;
  }),
]);

const projectList = computed(() => {
  return state.projectLegend[parkStore.projectChooseIndex];
});

const setText = (text: string) => {
  if (text && text.length > 8) {
    return text.slice(0, 7) + '...';
  } else {
    return text;
  }
};

const setDisabled = (text: string) => {
  return text && text.length < 9;
};

const setState = (progress: number) => {
  if (progress <= 0) {
    return 0; //未开工
  } else if (progress >= 100) {
    return 2; //已完工
  } else if (progress > 0) {
    return 1; //施工中
  }
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.project-content {
  padding: 20px 0;

  .pyramid-box {
    position: relative;

    .pyramid {
      width: 198px;
      margin: auto;
    }

    .pyramid-detail {
      position: absolute;
      color: #fff;
      white-space: nowrap;
      transform: translateX(-50%);

      &:nth-of-type(1) {
        top: -25px;
        left: 64%;
      }

      &:nth-of-type(2) {
        top: 0;
        left: 33%;
      }
      &:nth-of-type(3) {
        top: 6px;
        left: 67%;
      }
      &:nth-of-type(4) {
        top: 36px;
        left: 33%;
      }
      &:nth-of-type(5) {
        top: 75px;
        left: 72%;
      }
      &:nth-of-type(6) {
        top: 135px;
        left: 28%;
      }

      .right-bar {
        position: relative;
        top: 28px;
        left: 55px;
        display: inline-block;

        .name {
          padding-left: 5px;
        }
      }

      .left-bar {
        position: relative;
        top: 28px;
        left: 62%;
        transform: translateX(-50%);
        display: inline-block;

        .name {
          padding-right: 5px;
        }
      }

      .name {
        position: relative;
        top: 6px;
        font-size: 14px;
      }

      .num {
        font-size: 20px;
        padding-right: 5px;
      }

      .mirror {
        transform: rotateY(180deg);
      }
    }
  }

  .progress-container {
    margin-top: 20px;
    .label {
      color: #e6eeff;
      font-size: 16px;
    }
    .progress-bar {
      width: 80%;

      .el-progress-bar__outer {
        height: 10px;
        border-radius: 5px;
        background-color: rgba(219, 255, 248, 0.12);

        .el-progress-bar__inner {
          border-radius: 25px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(90deg, #1c51ea, #11fffc);

          &::after {
            position: absolute;
            border-radius: 25px;
            width: 100%;
            left: -100%;
            background: inherit;
            animation: progress-bar-stripes 3s linear 2s infinite;
          }

          @keyframes progress-bar-stripes {
            0% {
              left: -100%;
            }
            to {
              left: 0;
            }
          }
        }
      }
    }

    .num {
      margin-left: 12px;
      color: #00f6ff;
      font-size: 30px;
    }
  }
}

.list {
  height: calc(100% - 508px);
  padding-top: 15px;
  box-sizing: border-box;

  .nav {
    width: 100%;
    display: flex;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    background: rgba(19, 39, 165, 0.5);
    color: rgba(255, 255, 255, 0.8);
    text-align: center;

    :nth-child(1) {
      width: 15%;
    }
    :nth-child(2) {
      width: 34%;
    }
    :nth-child(3) {
      width: 33%;
    }
    :nth-child(4) {
      width: 18%;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 34px);
    overflow: hidden;

    .row {
      width: 100%;
      height: 38px;
      align-items: center;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      display: flex;

      &:nth-child(even) {
        background-color: rgba(19, 39, 165, 0.2);
      }

      :nth-child(1) {
        width: 15%;
      }
      :nth-child(2) {
        width: 34%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      :nth-child(3) {
        width: 33%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      :nth-child(4) {
        width: 18%;
      }
    }

    .wkg {
      color: #ff8251;
    }

    .sgz {
      color: #00f6ff;
    }

    .ywg {
      color: #22ff51;
    }
  }
}

.legend {
  position: absolute;
  padding: 15px;
  background-color: rgba(0, 22, 16, 0.6);
  border-radius: 2px;
  right: 27%;
  top: 110px;
  color: #fff;
  font-size: 14px;
  z-index: 7;

  .line:not(:last-child) {
    margin-bottom: 12px;
  }

  .icon {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
}

.bar {
  padding: 5px 8px;
  border-left: 1px solid #00f6ff;
  border-top: 1px solid #00f6ff;
  border-bottom: 1px solid #00f6ff;
  cursor: pointer;
}

.active {
  background-color: rgba(0, 255, 204, 0.3);
}
</style>

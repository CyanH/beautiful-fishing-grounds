<template>
  <div class="target flex-between">
    <div class="bar" v-for="item in state.list">
      <div>
        <span class="num">{{ item.value }}</span>
        <span class="unit">家</span>
      </div>
      <div class="label">{{ item.name }}</div>
    </div>
  </div>

  <div class="chart-container">
    <div class="flex">
      <div style="flex: 1">
        <div class="flex">
          <span class="name">陆丰水产产业总产值</span>
        </div>
        <div class="value">
          <span class="num">{{ countryCz }}</span>
          <span class="unit">万元</span>
        </div>

        <div class="el-progress-bar">
          <div class="el-progress-bar__outer" style="background-color: rgba(0, 246, 255, 0.21)">
            <div
              class="el-progress-bar__inner"
              style="width: 70%; background: linear-gradient(to right, rgba(0, 246, 255, 0.21), #00f6ff)"
            ></div>
          </div>
        </div>
      </div>

      <div style="flex: 1">
        <div class="flex">
          <span class="name">产业园农业产业总产值</span>
        </div>
        <div class="value">
          <span class="num">{{ cyyCz }}</span>
          <span class="unit">万元</span>
        </div>

        <div class="el-progress-bar">
          <div class="el-progress-bar__outer" style="background: rgba(0, 255, 180, 0.21)">
            <div
              class="el-progress-bar__inner"
              style="width: 50%; background: linear-gradient(to right, rgba(0, 255, 180, 0.21), #00ffb4)"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex bottom">
      <div style="flex: 1">
        <div style="text-align: center">
          <span class="num" style="color: #fff; padding-right: 0">{{ percent }}</span>
          <svg-icon
            :name="percentStatus === 1 ? 'up' : 'down'"
            class="icon"
            :style="{ color: percentStatus === 1 ? '#ff5466' : '#33D17C' }"
          ></svg-icon>
        </div>
        <img src="@/assets/image/industrialPark/cz_bot.gif" class="cz-bot" />
      </div>
      <div style="height: 100%; flex: 1" class="flex-column">
        <div v-for="item in state.czList">
          <div class="flex">
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="value">
            <span class="num">{{ item.value }}</span>
            <span class="unit">万元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { getCompanyNum, getCzValue } from '@/api/industrial';

const countryCz = ref(0);
const cyyCz = ref(0);
const percent = ref('100%');
const percentStatus = ref(0);

const state = reactive({
  list: [
    {
      name: '园内企业总数',
      value: 56,
    },
    {
      name: '国家级龙头企业',
      value: 1,
    },
    {
      name: '省级龙头企业',
      value: 2,
    },
    {
      name: '市级龙头企业',
      value: 5,
    },
  ],
  czList: [
    {
      name: '产业园一产值',
      value: 6987.0,
      bgColor: '#8B71FF',
    },
    {
      name: '产业园二三产值',
      value: 13976.0,
      bgColor: '#DD5B86',
    },
    {
      name: '产业园主导产业总产值',
      value: 0,
      bgColor: '#E2963C',
    },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  getCompanyNum({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    state.list[0].value = data.companyNum;
    state.list[1].value = data.countryCompanyNum;
    state.list[2].value = data.provinceCompanyNum;
    state.list[3].value = data.cityCompanyNum;
  });

  getCzValue({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    countryCz.value = data.countyPvValue.toFixed(2);
    cyyCz.value = data.cyyPvValue.toFixed(2);
    state.czList[0].value = data.onePvValue.toFixed(2);
    state.czList[1].value = data.twoThreePvValue.toFixed(2);
    state.czList[2].value = data.masterOneTwoThreePvValue.toFixed(2);
    percent.value = data.percent;
    percentStatus.value = data.percentStatus;
  });
};
</script>

<style lang="scss" scoped>
.target {
  margin: 15px 0 22px;
  position: relative;

  .bar {
    text-align: center;

    .num {
      font-size: 30px;
      color: #00f6ff;
      padding-right: 5px;
    }

    .unit {
      color: #57b7a4;
    }

    .label {
      color: #b9b9b9;
      padding-top: 6px;
      font-size: 14px;
    }
  }
}

.chart-container {
  height: 26vh;

  .name {
    font-size: 16px;
    color: #fff;
  }

  .value {
    margin-top: 5px;
  }

  .num {
    font-size: 26px;
    color: #00f6ff;
    padding-right: 5px;
  }

  .unit {
    color: rgba(0, 246, 255, 0.64);
  }

  .icon {
    height: 2.2em;
    width: 1.8em;
    vertical-align: text-bottom;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .el-progress-bar {
    margin-top: 5px;
    width: 80%;

    .el-progress-bar__outer {
      height: 10px;
      border-radius: 5px;

      .el-progress-bar__inner {
        border-radius: 3px;
        height: 6px;
        top: 50%;
        transform: translateY(-50%);

        &::after {
          position: absolute;
          border-radius: 3px;
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

  .bottom {
    margin-top: 20px;
    height: calc(100% - 66px);
  }
  .cz-bot {
    width: 176px;
    margin: auto;
  }
}
</style>

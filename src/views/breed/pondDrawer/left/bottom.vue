<template>
  <div class="middle">
    <card-view>
      <div class="flex">
        <div class="tbar"></div>
        <div class="title">水质环境</div>
      </div>
      <div class="flex box">
        <div class="flex row">
          <div v-for="(item, index) in state.waterData" :key="index" class="bar flex">
            <img :src="getImgUrl(item.icon)" class="icon" />
            <div>
              <div class="name">{{ item.name }}</div>
              <div style="padding-top: 6px">
                <span class="num">{{ item.value }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import cardView from '../card.vue';
import { waterNewData } from '@/api/breed';

const state = reactive({
  waterData: [
    {
      icon: 'wd',
      name: '水温',
      value: 1,
      unit: '℃',
    },
    {
      icon: 'rjy',
      name: '溶解氧',
      value: 1,
      unit: 'mg/L',
    },
    {
      icon: 'ph',
      name: 'pH值',
      value: 7,
    },
    {
      icon: 'ddl',
      name: '电导率',
      value: 1,
      unit: 'ms/cm',
    },

    {
      icon: 'zd',
      name: '浊度',
      value: 1,
      unit: 'NTU',
    },
    {
      name: '总碱度',
      icon: 'zjd',
      value: 8.1,
      unit: 'mmol/L',
    },
    {
      name: '硬度',
      icon: 'yd',
      value: 58,
      unit: 'mg/L',
    },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  waterNewData({ plantWlwId: '40241986' }).then((res: any) => {
    state.waterData[0].value = res.content.temp;
    state.waterData[1].value = res.content.ph;
    state.waterData[2].value = res.content.oxy;
    state.waterData[3].value = res.content.ddl;
    state.waterData[4].value = res.content.zd;
  });
};

const getImgUrl = (url: string) => {
  return new URL(`../../../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.tbar {
  display: inline-block;
  width: 4px;
  height: 20px;
  margin-right: 12px;
  background: linear-gradient(to bottom, transparent, #a0d8ff);
}

.title {
  font-weight: 800;
  font-size: 18px;
}

.middle {
  height: 36%;
  padding-top: 15px;
  box-sizing: border-box;
  .box {
    height: calc(100% - 21px);
    padding-top: 25px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
  }

  .row {
    flex-wrap: wrap;
  }

  .bar {
    margin-bottom: 20px;
    width: 33.33%;

    .icon {
      width: 46px;
      margin-right: 8px;
    }

    .name {
      font-size: 14px;
      color: #fff;
    }

    .num {
      color: #00f6ff;
      font-size: 28px;
    }

    .unit {
      font-size: 12px;
      color: #00f6ff;
      padding-left: 5px;
    }
  }
}
</style>

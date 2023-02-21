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
import { pondWaterData } from '@/api/breed';
import { useBreedStore } from '@/store';

const breedStore = useBreedStore();
const state = reactive({
  waterData: [
    {
      icon: 'ph',
      name: 'Ph',
      value: 7,
    },
    {
      icon: 'ddl',
      name: '电导率',
      value: 1,
      unit: 'ms/cm',
    },
    {
      icon: 'rjy',
      name: '溶解氧',
      value: 1,
      unit: 'mg/L',
    },
    {
      icon: 'zd',
      name: '浊度',
      value: 1,
      unit: 'ntu',
    },
    {
      icon: 'wd',
      name: '水温',
      value: 1,
      unit: '℃',
    },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  pondWaterData({ plantMassifId: breedStore.plantMassif.id }).then((res: any) => {
    state.waterData[0].value = res.ph;
    state.waterData[1].value = res.ddl;
    state.waterData[2].value = res.oxy;
    state.waterData[3].value = res.zd;
    state.waterData[4].value = res.temp;
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
  height: 34%;
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
    margin-bottom: 25px;
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

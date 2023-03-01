<template>
  <div class="flex row">
    <div v-for="(item, index) in state.weatherData" :key="index" class="bar flex">
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
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { waterNewData } from '@/api/breed';
import { useBreedStore } from '@/store';

const emit = defineEmits(['setDate']);
const plantStore = useBreedStore();
let state = reactive({
  weatherData: [
    {
      icon: 'wd',
      name: '水温',
      value: 1,
      unit: '℃',
    },
    {
      icon: 'ph',
      name: 'pH值',
      value: 7,
    },
    {
      icon: 'rjy',
      name: '溶解氧',
      value: 1,
      unit: 'mg/L',
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

watch(
  () => plantStore.equipId,
  () => {
    getData();
  }
);

const getData = () => {
  waterNewData({ plantWlwId: plantStore.equipId }).then((res: any) => {
    state.weatherData[0].value = res.content.ph;
    state.weatherData[1].value = res.content.ddl;
    state.weatherData[2].value = res.content.oxy;
    state.weatherData[3].value = res.content.zd;
    state.weatherData[4].value = res.content.temp;
    emit('setDate', res.content && res.content.date ? res.content.date : '-');
  });
};

const getImgUrl = (url: string) => {
  return new URL(`../../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.row {
  padding-top: 10px;
  flex-wrap: wrap;
}

.bar {
  margin-bottom: 15px;
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
</style>

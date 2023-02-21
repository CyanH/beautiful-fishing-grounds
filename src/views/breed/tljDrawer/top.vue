<template>
  <div class="flex row">
    <div v-for="(item, index) in state.baitData" :key="index" class="bar flex">
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
import { baitNewData } from '@/api/breed';
import { useBreedStore } from '@/store';

const emit = defineEmits(['setDate']);
const plantStore = useBreedStore();
const state = reactive({
  baitData: [
    {
      icon: 'tll',
      name: '投料量',
      value: 0,
      unit: 'kg',
    },
    {
      icon: 'tlcs',
      name: '投料次数',
      value: 0,
      unit: '次',
    },
    {
      icon: 'tlsc',
      name: '投料时长',
      value: 0,
      unit: 'h',
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
  baitNewData({ plantWlwId: plantStore.equipId }).then((res: any) => {
    state.baitData[0].value = res.content.amount;
    state.baitData[1].value = res.content.by1;
    state.baitData[2].value = res.content.workTime;

    emit('setDate', res.content.date);
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

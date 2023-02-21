<template>
  <div class="content">
    <vue3-seamless-scroll :list="state.list" :step="0.3" :hover="true" :limitScrollNum="4">
      <div v-for="item in state.list" class="flex-between list" style="margin-bottom: 12px">
        <img src="@/assets/image/breed/left_tip.png" class="tip" />

        <span class="date">{{ item.date }}</span>
        <span class="desc">{{ item.exceptionInfo }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { configRecords } from '@/api/breed';
import { useBreedStore } from '@/store';

const plantStore = useBreedStore();
const state = reactive({ list: [] as any[] });

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
  configRecords({ plantWlwId: plantStore.equipId, size: 50 }).then((res: any) => {
    state.list = res.content;
  });
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 48px);
  margin-top: 10px;
  overflow-y: hidden;
}

.list {
  background-color: rgba(187, 255, 187, 0.04);
  padding: 12px 16px;
  position: relative;
  margin-left: 8px;

  .tip {
    position: absolute;
    left: -5px;
  }
  .desc {
    font-size: 16px;
    color: #fff;
  }

  .date {
    font-size: 14px;
    color: #fff;
    width: 110px;
    flex-shrink: 0;
  }
}
</style>

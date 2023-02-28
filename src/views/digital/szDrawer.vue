<template>
  <v-drawer direction="right">
    <v-card :title="plantStore.equipName">
      <v-title :title="plantStore.equipName" hasClose>
        <template #right>
          <div class="text">最新上报：{{ upDate }}</div>
        </template>
      </v-title>
      <top-view @setDate="setDate"></top-view>

      <div style="height: 45%">
        <v-title title="历史数据" />
        <middle-view></middle-view>
      </div>

      <div class="bottom">
        <v-title title="预警信息" />
        <warn-info></warn-info>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import topView from './szDrawer/top.vue';
import middleView from './szDrawer/middle.vue';
import warnInfo from './szDrawer/warnInfo.vue';
import { useBreedStore } from '@/store';
import { ref } from 'vue';

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
});
const upDate = ref('');
const plantStore = useBreedStore();
const setDate = (date: string) => {
  upDate.value = date;
};
</script>

<style lang="scss" scoped>
.text {
  position: absolute;
  color: #fff;
  font-size: 12px;
  right: 40px;
}

.bottom {
  height: calc(55% - 250px);
  padding-top: 15px;
  box-sizing: border-box;
}
</style>

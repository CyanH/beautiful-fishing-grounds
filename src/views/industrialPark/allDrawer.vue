<template>
  <div class="legend animate__animated animate__fadeInRight">
    <div class="flex row" v-for="item in state.list">
      <img :src="getImgUrl(item.icon)" class="icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>

  <v-drawer direction="right">
    <v-card>
      <v-title title="园区概况"></v-title>
      <target-view></target-view>
      <div class="line"></div>
      <income-middle></income-middle>
      <div class="line"></div>
      <product-middle></product-middle>
      <div class="line"></div>
      <bottom-view></bottom-view>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import targetView from './parkDrawer/target.vue';
import incomeMiddle from './parkDrawer/incomeMiddle.vue';
import productMiddle from './parkDrawer/productMiddle.vue';
import bottomView from './parkDrawer/bottom.vue';
import { reactive } from 'vue';

const state = reactive({
  list: [
    {
      icon: 'gh_hxq.png',
      name: '一核：万亩水产融合发展核心区',
    },
    {
      icon: 'gh_sfq.png',
      name: '两区：健康水产标准化养殖示范区',
    },
    {
      icon: 'gh_zdq.png',
      name: '两区：健康水产标准化养殖示范区',
    },
    {
      icon: 'lg_ltqy.png',
      name: '实施主体(6)',
    },
    {
      icon: 'i_yzjd.png',
      name: '养殖基地(5)',
    },
    {
      icon: 'i_xm.png',
      name: '建设项目(31)',
    },
  ],
});

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.line {
  height: 2px;
  background: linear-gradient(
    to right,
    transparent 0,
    rgba(147, 203, 255, 0.2) 15%,
    rgba(147, 203, 255, 0.2) 85%,
    transparent 100%
  );
  margin: 15px 0;
}

.legend {
  position: absolute;
  padding: 15px;
  background-color: rgba(17, 16, 45, 0.7);
  border-radius: 2px;
  right: 27%;
  top: 110px;
  color: #fff;
  font-size: 14px;
  z-index: 7;

  .row:not(:last-child) {
    margin-bottom: 12px;
  }

  .icon {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
}
</style>

<template>
  <div class="legend animate__animated animate__fadeInRight">
    <div class="flex row">
      <img src="@/assets/image/industrialPark/gh_hxq.png" class="icon" />
      <span>一核：万亩水产融合发展核心区</span>
    </div>
    <div class="flex row">
      <img src="@/assets/image/industrialPark/gh_sfq.png" class="icon" />
      <span>两区：健康水产标准化养殖示范区</span>
    </div>
    <div class="flex row">
      <img src="@/assets/image/industrialPark/gh_zdq.png" class="icon" />
      <span>两区：水产品牌建设与营销推广重点区</span>
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

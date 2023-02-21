<template>
  <div class="data-bar flex-around animate__animated animate__fadeInDown">
    <div v-for="item in list" class="flex">
      <div class="box">
        <img src="@/assets/image/industrialPark/ico_bottom.png" class="ico_bottom" />
        <img :src="getImgUrl(item.icon)" class="icon" />
      </div>
      <div>
        <div class="name">{{ item.name }}</div>
        <div>
          <span class="num value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const list = reactive([
  {
    icon: 'ico_sy',
    name: '水域面积',
    value: 9960,
    unit: '亩',
  },
  {
    icon: 'ico_tk',
    name: '塘口',
    value: 2856,
    unit: '个',
  },
  {
    icon: 'ico_yz',
    name: '养殖户',
    value: 56,
    unit: '户',
  },
  {
    icon: 'ico_qy',
    name: '企业数',
    value: 6,
    unit: '个',
  },
]);

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.data-bar {
  position: absolute;
  top: 12px;
  background: linear-gradient(
    to right,
    transparent 0,
    rgba(17, 16, 45, 0.5) 10%,
    rgba(17, 16, 45, 0.5) 90%,
    transparent 100%
  );
  padding: 15px 20px;
  left: 27%;
  right: 27%;
  z-index: 9;

  .box {
    position: relative;
    margin-right: 10px;

    .ico_bottom {
      width: 60px;
    }

    .icon {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 21px;
    }
  }

  .name {
    font-size: 14px;
    color: #b9b9b9;
  }

  .value {
    font-size: 28px;
    color: #00f6ff;
  }

  .unit {
    font-size: 12px;
    color: rgba(0, 246, 255, 0.64);
    padding-left: 5px;
  }
}
</style>

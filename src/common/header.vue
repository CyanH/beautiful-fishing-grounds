<template>
  <div class="header">
    <div class="date">
      <span class="mr">{{ date }}</span>
      <span class="mr">{{ week }}</span>
      <span class="mr">{{ time }}</span>
      <span class="mr">{{ weather }}</span>
      <span class="mr">{{ degree }}°C</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { parseTime } from '@/utils/parseTime';
import { getWeather } from '@/api/common';

const date = ref(parseTime(new Date(), '{y}年{m}月{d}日'));
const week = ref(parseTime(new Date(), '{a}'));
const time = ref(parseTime(new Date(), '{h}:{m}:{s}'));
const weather = ref('');
const degree = ref(25);

onMounted(() => {
  setInterval(() => {
    time.value = parseTime(new Date(), '{h}:{m}:{s}');
  }, 1000);

  setInterval(() => {
    date.value = parseTime(new Date(), '{y}年{m}月{d}日');
    week.value = parseTime(new Date(), '{a}');
  }, 3600000);

  getWeather('广东省', '肇庆市', '高要市').then((res: any) => {
    weather.value = res.weather;
    degree.value = res.degree;
  });
});

</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background: url('@/assets/image/common/header.png') center no-repeat;
  height: 66px;
  width: 1913px;
  background-size: 100% 100%;
  margin: auto;
  z-index: 9;
  .date {
    position: absolute;
    top: 35px;
    transform: translateY(-50%);
    right: 1%;
    color: #ddfff7;
    font-size: 16px;
  }

  .title {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-family: 'PuHuiTi';
    font-size: 32px;
    font-style: italic;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .mr {
    margin-right: 12px;
  }

  .box {
    position: absolute;
    top: 28px;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
    img {
      width: 140px;
      height: 3.55vh;
    }

    span {
      position: absolute;
      font-size: 16px;
      top: 50%;
      left: 47%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      font-weight: 200;
      color: #ffffff;
    }
    .fontWeight_800 {
      font-weight: 700;
    }
  }
}
</style>

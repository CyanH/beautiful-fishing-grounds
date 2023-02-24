<template>
  <div class="header">
    <div class="dhl">
      <div
        class="chooseList"
        v-for="(item, index) in chooseList"
        :key="index"
        @click="handleChoose(item, index)"
        :class="['chooseList', chooseIndex === index ? 'chooseList_true' : 'chooseList_false']"
      >
        {{ item.name }}
      </div>
    </div>
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
import { useRouter } from 'vue-router';

const router = useRouter();

const date = ref(parseTime(new Date(), '{y}年{m}月{d}日'));
const week = ref(parseTime(new Date(), '{a}'));
const time = ref(parseTime(new Date(), '{h}:{m}:{s}'));
const weather = ref('');
const degree = ref(25);

const chooseList = [
  {
    icon: 'cyyq',
    name: '渔场分析',
    url: '/index',
    bg: 'cyyq_not',
    chooseBg: 'cyyq_c',
  },
  {
    icon: 'zhyz',
    name: '智慧养殖',
    url: '/breed',
    bg: 'zhyz_not',
    chooseBg: 'zhyz_c',
  },
  {
    icon: 'szsw',
    name: '智能物联',
    url: '/digital',
    bg: 'szsw_not',
    chooseBg: 'szsw_c',
  },
];
let chooseIndex = ref(0);
const handleChoose = (item: any, index: number) => {
  chooseIndex.value = index;
  router.push(item.url);
};

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
  // 导航栏
  .dhl {
    position: absolute;
    top: 39px;
    transform: translateY(-50%);
    left: 0.5%;
    display: flex;
    .chooseList {
      width: 122px;
      opacity: 0.8;
      border-radius: 0px 0px 20px 0px;
      margin-right: 4px;
      text-align: center;
      font-size: 16px;
      color: #e7eefd;
      cursor: pointer;
    }
    .chooseList_false {
      height: 46px;
      line-height: 46px;
      background-image: linear-gradient(90deg, rgba(0, 15, 64, 0.1) 10%, #0840a6 90%);
      font-family: Source Han Sans CN;
      font-weight: 400;
    }
    .chooseList_true {
      height: 52px;
      line-height: 52px;
      background: linear-gradient(90deg, rgba(2, 21, 82, 0.1) 10%, #0d62ff 90%);
      font-family: Source Han Sans CN;
      font-weight: 800;
    }
  }
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

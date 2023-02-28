<template>
  <div class="middle">
    <card-view>
      <div class="flex">
        <div class="tbar"></div>
        <div class="title">养殖环境</div>
      </div>
      <div class="flex box">
        <div class="flex row">
          <div v-for="(item, index) in state.weatherData" :key="index" class="bar flex">
            <img :src="getImgUrl(item.svgname)" class="icon" />
            <div>
              <div class="name">{{ item.title }}</div>
              <div style="padding-top: 6px">
                <span class="num">{{ item.num }}</span>
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
import { weatherNewData } from '@/api/breed';

const state = reactive({
  weatherData: [
    {
      svgname: 'wd',
      title: '温度',
      num: 28,
      unit: '℃',
    },
    {
      svgname: 'sd',
      title: '湿度',
      num: 35,
      unit: '%',
    },
    {
      svgname: 'yl',
      title: '雨量',
      num: 0,
      unit: 'mm',
    },
    {
      svgname: 'fs',
      title: '风速',
      num: 0,
      unit: 'm/s',
    },
    {
      svgname: 'gz',
      title: '光照',
      num: 10000,
      unit: 'lux',
    },
    {
      svgname: 'fx',
      title: '风向',
      num: '北',
    },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  weatherNewData({ plantWlwId: '40236136' }).then((res: any) => {
    state.weatherData[0].num = res.content.temp;
    state.weatherData[1].num = res.content.humi;
    state.weatherData[2].num = res.content.rain;
    state.weatherData[3].num = res.content.speed;
    state.weatherData[4].num = res.content.raid;
    state.weatherData[5].num = res.content.windDirection;
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
  height: 32%;
  padding-top: 15px;
  box-sizing: border-box;
  .box {
    height: calc(100% - 21px);
    padding-top: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
  }

  .row {
    flex-wrap: wrap;
  }

  .bar {
    margin-bottom: 20px;
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

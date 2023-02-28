<template>
  <v-drawer direction="left" hasArrow>
    <v-card>
      <div class="top">
        <v-title title="水质监测" />
        <div class="grid">
          <div class="card flex" v-for="item in state.list">
            <img :src="setImageUrl(item.icon)" class="icon" />
            <div>
              <div class="name">{{ item.name }}</div>
              <div class="value">
                <span class="num">{{ item.value }} </span>
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <v-title title="预警信息"></v-title>
        <div class="content">
          <vue3-seamless-scroll :list="state.warnList" :step="0.3" :hover="true" :limitScrollNum="5">
            <div v-for="(item, index) in state.warnList">
              <div class="flex">
                <img src="@/assets/image/breed/warn.png" class="tip" />
                <span class="desc">{{ item.desc }}</span>
              </div>
              <div class="line"></div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { waterNewData } from '@/api/breed';
import { onMounted, reactive } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const state = reactive({
  list: [
    {
      name: '水温',
      icon: 'wd',
      value: 15.76,
      unit: '℃',
    },
    {
      name: 'pH',
      icon: 'ph',
      value: 7.19,
      unit: '',
    },
    {
      name: '溶解氧',
      icon: 'rjy',
      value: 6.74,
      unit: 'mg/L',
    },
    {
      name: '电导率',
      icon: 'ddl',
      value: 9717,
      unit: 'ms/cm',
    },
    {
      name: '浊度',
      icon: 'zd',
      value: 257.97,
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
  warnList: [
    { desc: '塘口21的水质监测四，当前电导率为9562.00us/cm，高于阀值9554.00us/cm, 请注意处理!' },
    { desc: '塘口3的气象站三，当前空气湿度为86.10%, 高于阀值66.10%, 请注意处理!' },
    { desc: '塘口18的水质监测二，当前溶解氧为2.80mg/L，低于阀值3.00mg/L, 请注意处理!' },
    { desc: '塘口4的水质监测一，当前温度为16.20℃, 低于阀值18.20℃, 请注意处理!' },
    { desc: '塘口13的气象站二，当前温度为18.60℃, 低于阀值23.40℃, 请注意处理!' },
    { desc: '塘口8的水质监测三，当前ph值为8.96，高于阀值8.6, 请注意处理!' },
    { desc: '塘口31的气象站一，当前光照为28394.00lux, 高于阀值25000.00lux, 请注意处理!' },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  waterNewData({ plantWlwId: '40241986' }).then((res: any) => {
    state.list[0].value = res.content.temp;
    state.list[1].value = res.content.ph;
    state.list[2].value = res.content.oxy;
    state.list[3].value = res.content.ddl;
    state.list[4].value = res.content.zd;
  });
};

const setImageUrl = (name: string) => {
  return new URL(`../../assets/image/breed/${name}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.top {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 80px);
    grid-gap: 12px 25px;
    padding: 15px 0;
  }

  .card {
    padding-left: 25px;
    height: 100%;
    background: url('@/assets/image/digital/bg.png') center no-repeat;
    background-size: 100% 100%;

    .icon {
      width: 46px;
      margin-right: 12px;
    }
  }

  .name {
    font-size: 12px;
  }

  .value {
    color: #00f6ff;
    font-size: 12px;
    margin-top: 5px;

    .num {
      font-size: 26px;
      margin-right: 5px;
    }
  }
}

.bottom {
  height: calc(100% - 415px);

  .content {
    height: calc(100% - 50px);
    margin-top: 21px;
    box-sizing: border-box;
    overflow-y: hidden;

    .tip {
      width: 26px;
      margin-right: 15px;
    }

    .desc {
      font-size: 14px;
    }

    .line {
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0,
        rgba(160, 205, 255, 0.2) 5%,
        rgba(160, 205, 255, 0.2) 95%,
        transparent 100%
      );
      margin: 10px 0;
    }
  }
}
</style>

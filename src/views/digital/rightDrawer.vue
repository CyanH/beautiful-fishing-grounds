<template>
  <v-drawer direction="right" hasArrow>
    <v-card>
      <v-title title="气象监测" />
      <div class="qxjc">
        <div class="yjdj">预警等级</div>
        <div class="xian_all">
          <div class="xian"></div>
          <div class="dian"></div>
        </div>
        <div class="qxz">
          <div class="qxz_all" v-for="(item, index) in state.qxjc">
            <div class="sex">
              <div v-for="(items, index) in item.k" class="k" :class="items.flag ? 'o' + (index + 1) : ''"></div>
            </div>
            <img class="img" :src="getImgUrl(item.icon)" alt="" />
            <div class="right">
              <div class="top">{{ item.name }}</div>
              <div class="nums">
                <span class="wd num">{{ item.value }}</span>
                <span class="dw">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-title title="养殖指数" />
      <div class="yzzs">
        <img class="img_yuan" src="@/assets/image/qj/yuan.png" alt="" />
        <img class="img_di" src="@/assets/image/qj/di.png" alt="" />
        <div class="img_title">
          <div class="num value">80.56%</div>
          <div>养殖指数</div>
        </div>
        <img class="zhong" src="@/assets/image/qj/zhong.png" alt="" />
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { weatherNewData } from '@/api/breed';
import { onMounted, reactive } from 'vue';

const state = reactive({
  qxjc: [
    {
      icon: 'wd',
      name: '温度',
      value: 29.5,
      unit: '℃',
      k: [
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
    {
      icon: 'sd',
      name: '湿度',
      value: 64.5,
      unit: '%',
      k: [
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
    {
      icon: 'yl',
      name: '雨量',
      value: 150,
      unit: 'mm',
      k: [
        {
          flag: true,
        },
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
    {
      icon: 'fs',
      name: '风速',
      value: 29.5,
      unit: 'm/s',
      k: [
        {
          flag: true,
        },
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
    {
      icon: 'gz',
      name: '光照',
      value: 64.5,
      unit: 'lux',
      k: [
        {
          flag: true,
        },
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
    {
      icon: 'fx',
      name: '风向',
      value: '北',
      unit: '',
      k: [
        {
          flag: true,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
        {
          flag: false,
        },
      ],
    },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  weatherNewData({ plantWlwId: '40236136' }).then((res: any) => {
    state.qxjc[0].value = res.content.temp;
    state.qxjc[1].value = res.content.humi;
    state.qxjc[2].value = res.content.rain;
    state.qxjc[3].value = res.content.speed;
    state.qxjc[4].value = res.content.raid;
    state.qxjc[5].value = res.content.windDirection;
  });
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.qxjc {
  width: 100%;
  height: calc(100% - 470px);
  .yjdj {
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    font-size: 16px;
  }
  .xian_all {
    width: 100%;
    height: 5px;
    position: relative;
    margin-top: 12px;
    .dian {
      width: 15px;
      height: 15px;
      background-color: rgb(104, 214, 78);
      position: absolute;
      border-radius: 50%;
      top: -5px;
      left: 12%;
      z-index: 5;
      box-shadow: 0 0 15px 10px rgba(104, 214, 78.5, 0.5);
    }
    .xian {
      width: 100%;
      height: 5px;
      margin-left: 8px;
      z-index: 2;
      background: linear-gradient(
        90deg,
        rgb(104, 214, 78) 0%,
        rgb(104, 214, 78) 16.66%,
        rgb(242, 215, 65) 0,
        rgb(242, 215, 65) 32.833%,
        rgb(254, 139, 62) 0,
        rgb(254, 139, 62) 49.4987%,
        rgb(230, 81, 48) 0,
        rgb(230, 81, 48) 66.15867%,
        rgb(196, 44, 37) 0,
        rgb(196, 44, 37) 82.825267%,
        rgb(175, 8, 0) 0,
        rgb(175, 8, 0) 100%
      );
    }
  }
  .qxz {
    width: 100%;
    margin-top: 12px;
    height: calc(100% - 90px);
    display: flex;
    flex-wrap: wrap;
    .qxz_all {
      width: calc(50% - 25px);
      height: 33%;
      display: flex;
      align-items: center;
      // justify-content: center;
      padding-left: 25px;
      .sex {
        width: 11px;
        .k {
          width: 11px;
          height: 4px;
          margin-bottom: 4px;
          background: rgba(0, 0, 0, 0.7);
        }

        .o1 {
          background: #68d64e;
        }
        .o2 {
          background: #f2d741;
        }
        .o3 {
          background: #fe8b3e;
        }
        .o4 {
          background: #e65130;
        }
        .o5 {
          background: #c42c25;
        }
        .o6 {
          background: #af0800;
        }
      }
      .img {
        margin-left: 12px;
      }
      .right {
        margin-left: 12px;
        .top {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
        }
        .nums {
          color: #70f3fc;

          font-weight: bold;
          .wd {
            font-size: 32px;
            margin-right: 4px;
            font-family: DIN;
          }
          .dw {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.yzzs {
  width: 100%;
  // height: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  // align-items: center;
  position: relative;
  padding-top: 20px;
  .img_yuan {
    height: 320px;
    animation: bounce_down1 3s linear infinite;
  }
  .img_di {
    width: 65%;
    position: absolute;
    bottom: 24px;
  }
  .zhong {
    position: absolute;
    height: 260px;
    left: 50%;
    top: 43%;
    transform: translate(-50%, -50%);
    animation: rotate 5s infinite linear;
  }
  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
  @keyframes bounce_down1 {
    25% {
      transform: translateY(-8px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(8px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .img_title {
    position: absolute;
    left: 50%;
    top: 43%;
    transform: translate(-50%, -50%);
    text-align: center;
    .value {
      color: #00f6ff;
      margin-bottom: 6px;
      font-size: 52px;
    }
  }
}
</style>

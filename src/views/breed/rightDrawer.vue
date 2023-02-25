<template>
  <v-drawer direction="right">
    <v-card :background="'rgba(17, 16, 45, 0.6)'">
      <v-title title="实时塘口" />
      <div class="video">
        <div class="video-container">
          <div class="video-name" v-if="hasPlayer">{{ state.videoData[state.chooseIndex].WlwName }}</div>
          <video-container v-if="hasPlayer" ref="videoEle" />
          <div class="flex" v-show="!hasPlayer" style="height: 100%">
            <div class="noVideo">
              <img src="@/assets/image/noVideo.png" />
              <div class="text">暂无视频</div>
            </div>
          </div>

          <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <img
            src="@/assets/image/arrow.png"
            class="swiper-button-prev"
            :class="state.chooseIndex === 0 ? 'noClick' : ''"
            @click="handleVideoClick(false)"
          />

          <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <img
            src="@/assets/image/arrow.png"
            class="swiper-button-next"
            :class="state.videoData.length === 0 || state.chooseIndex === state.videoData.length - 1 ? 'noClick' : ''"
            @click="handleVideoClick(true)"
          />
        </div>
      </div>
      <div class="yzjs">
        <v-title title="养殖品种" />
        <div class="card">
          <div class="content flex">
            <img :src="getImgUrl(state.breedList.img)" style="margin-right: 10px" />
            <div class="right">
              <div class="desc">{{ state.breedList.note }}</div>
            </div>
          </div>
        </div>
      </div>
      <v-title title="虾病预防" />
      <div class="xbyf">
        <div class="swiper-container breed-swiper-right">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(cItem, index) in state.new_List">
              <div class="tp-card">
                <div class="swiper-title">{{ cItem.name }}</div>
                <div class="flex-between">
                  <div style="width: 70%">
                    <div class="mb flex">
                      <span class="label">别名</span>
                      <div class="value values">{{ cItem.otherName }}</div>
                    </div>
                    <div class="mb flex">
                      <span class="label">发生月份</span>
                      <span class="value">{{ cItem.mouth }}月</span>
                    </div>
                    <div class="mb flex">
                      <span class="label">类型</span>
                      <span class="value">{{ cItem.type === 1 ? '虫害' : '病害' }}</span>
                    </div>
                  </div>
                  <div class="border-wrapper">
                    <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
                    <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
                    <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
                    <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
                    <img :src="getImgUrl(cItem.img)" class="img" />
                  </div>
                </div>
                <div class="line"></div>
                <div>
                  <div class="label" style="float: left">症状</div>
                  <span class="value textarea">{{ cItem.symptom }}</span>
                </div>
              </div>
            </div>
          </div>

          <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <img src="@/assets/image/arrow.png" class="swiper-button-prev breed-prev" />

          <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <img src="@/assets/image/arrow.png" class="swiper-button-next breed-next" />
        </div>
      </div>
      <v-title title="智能设备状态" />
      <div class="zdyz">
        <div class="zdyz_left">
          <div class="chart" ref="zdyz"></div>
        </div>
        <div class="zdyz_right">
          <div class="zdyz_zhongj">
            <div class="hang">
              <div class="dian dian1"></div>
              <div class="ww">正常</div>
              <div class="val val1">
                <span class="s1 num">5</span>
                <span class="s2">个</span>
              </div>
            </div>
            <div class="hang">
              <div class="dian dian2"></div>
              <div class="ww">报警</div>
              <div class="val val2">
                <span class="s1 num">1</span>
                <span class="s2">个</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { nextTick, onMounted, reactive, ref } from 'vue';
import { getRealTime } from '@/api/breed';
import { znyz } from './chart/znyz';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const hasPlayer = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);

let myChar_zdyz: echarts.ECharts;
let zdyz = ref<HTMLDivElement | null>(null);

const state = reactive({
  chooseIndex: 0,
  videoData: [] as any[],
  list: [] as any[],

  breedList: {
    breedName: '罗氏沼虾',
    img: 'lszx',
    note: '罗氏沼虾（学名：Macrobrachium rosenbergii）是长臂虾科、沼虾属动物。体大，最大雄性个体的体长可达400毫米，养殖1年通常可达到150～200毫米。',
  },
  new_List: [
    {
      name: '幼体综合征',
      otherName: '红尾病',
      mouth: '6',
      type: 2,
      img: 'hwb',
      symptom:
        '发病幼体的症状主要为摄食减少、反应迟钝、活力弱、身体挂脏、肢体发红、空肠、空胃等，并且出现蜕壳不遂而逐渐死亡的现象。',
    },
    {
      name: '幼体弧菌病',
      otherName: '哈维氏弧菌',
      mouth: '11',
      type: 2,
      img: 'hwshj',
      symptom: '发病幼体的症状主要为摄食减少、反应迟钝、活力弱、肌肉不透明或发白、趋光性降低等，严重时沉底并死亡。',
    },
    {
      name: '滴星病',
      otherName: '拉网综合症',
      mouth: '3',
      type: 2,
      img: 'dxb',
      symptom:
        '“滴星病”是养殖户对罗氏沼虾零星死亡的俗称，发病症状为虾体节断裂、软壳、腹部肌肉发白坏死，主要危害6厘米以上的成虾。',
    },
  ],
});

onMounted(() => {
  nextTick(() => {
    new Swiper('.breed-swiper-right', {
      navigation: {
        nextEl: '.breed-next',
        prevEl: '.breed-prev',
        hideOnClick: true,
      },
      autoplay: {
        delay: 4000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
    });
  });

  getData();
  myChar_zdyz = echarts.init(zdyz.value as HTMLDivElement);
  window.addEventListener('resize', () => {
    myChar_zdyz.resize();
  });
  znyz(myChar_zdyz);
});

const getData = () => {
  getRealTime().then((res: any) => {
    state.videoData = res.content;
    nextTick(() => {
      setVideo(state.videoData[state.chooseIndex]);
    });
  });
};

const setVideo = (item: any) => {
  hasPlayer.value = false;
  if (item.videoData) {
    hasPlayer.value = true;
    nextTick(() => {
      //@ts-ignore
      videoEle.value.getVideo(item.token, item.videoData.url, item.deviceSerial);
    });
  }
};

const handleVideoClick = (statu: boolean) => {
  if (statu && state.chooseIndex < state.videoData.length - 1) {
    state.chooseIndex++;
  } else if (!statu && state.chooseIndex > 0) {
    state.chooseIndex--;
  } else {
    console.log(state.chooseIndex);
    return;
  }
  setVideo(state.videoData[state.chooseIndex]);
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
}
.swiper-button-prev,
.swiper-button-next {
  width: 12px;
  height: auto;
}
.swiper-button-prev {
  left: 0;
  transform: rotate(180deg);
}

.swiper-button-next {
  right: 0;
}

.noClick {
  opacity: 0.35;
}

.video {
  width: 100%;
  height: 25%;
  .video-container {
    width: 100%;
    height: calc(100% - 8px);
    // padding: 0 25px 10px;
    padding: 0px 20px;
    padding-top: 8px;
    box-sizing: border-box;
    position: relative;
    .video-name {
      position: absolute;
      left: 25px;
      bottom: 10px;
      z-index: 9;
      font-size: 16px;
      padding: 6px 12px;
      background: rgba(17, 16, 45, 0.6);
    }

    .noVideo {
      width: 100%;
      img {
        width: 60%;
        margin: auto;
      }

      .text {
        color: #b9b9b9;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
.yzjs {
  height: 170px;
  margin-top: 8px;
  .content {
    height: 100%;
    padding: 5px 10px 0;
    box-sizing: border-box;

    img {
      width: 98px;
      height: 98px;
      flex-shrink: 0;
    }

    .desc {
      height: 98px;
      font-size: 13px;
      line-height: 1.3;
      letter-spacing: 2px;
      color: #fff;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #00ffcc;
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .right {
      width: calc(100% - 98px);
      padding-top: 20px;
      .titles {
        margin-bottom: 8px;
        font-size: 16px;
      }
    }
  }
}
.xbyf {
  width: 100%;
  height: 190px;
  margin-bottom: 16px;
  .swiper-container {
    height: 100%;
    margin-top: 8px;

    .swiper-slide {
      padding: 0 15px;
      box-sizing: border-box;
    }

    .tp-card {
      background-size: 100% 100%;
      height: 100%;
      font-size: 14px;
      color: #fff;
      padding: 20px 25px;
      box-sizing: border-box;
      cursor: pointer;
      width: 100%;
      background: url('@/assets/image/breed/pond_bg.png') center no-repeat;
      background-size: 100% 100%;
    }
    .swiper-title {
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .mb {
      width: 100%;
      margin-bottom: 12px;
    }
    .label {
      color: #b9b9b9;
      width: 60px;
      font-size: 14px;
      text-align-last: justify;
      margin-right: 15px;
    }

    .value {
      flex: 1;
      color: #fff;
      font-size: 14px;
    }
    .textarea {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /* 这里是超出几行省略 */
    }
    .border-wrapper {
      position: relative;
      padding: 5px;
      width: 80px;
      height: 80px;
      box-sizing: border-box;

      .top-left {
        position: absolute;
        top: 0;
        left: 0;
      }

      .top-right {
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(90deg);
      }

      .bottom-left {
        position: absolute;
        left: 0;
        bottom: 0;
        transform: rotate(270deg);
      }

      .bottom-right {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: rotate(180deg);
      }

      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.zdyz {
  width: 100%;
  height: calc(75% - 488px);
  display: flex;
  padding-top: 10px;
  .zdyz_left {
    width: 60%;
    height: 100%;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
  .zdyz_right {
    width: 40%;
    height: calc(100% - 12px);
    display: flex;
    align-items: center;
    .zdyz_zhongj {
      width: 100%;
      height: 50%;
      .hang {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        // justify-content: center;
        padding-left: 8px;
        font-size: 16px;
        .ww {
          width: 70px;
        }
        .val {
          // margin-left: 8px;
          .s1 {
            font-size: 24px;
            margin-right: 6px;
          }
        }
        .val1 {
          color: #70f3fc;
        }
        .val2 {
          color: #70f3fc;
        }
        .dian {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 16px;
        }
        .dian1 {
          background-color: #197dc7;
        }
        .dian2 {
          background-color: #c65e25;
        }
      }
    }
  }
}
</style>

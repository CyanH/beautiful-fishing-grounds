<template>
  <div class="middle">
    <div class="top">
      <card-view>
        <top-view></top-view>
      </card-view>
    </div>

    <div class="bottom">
      <card-view>
        <div style="height: 100%">
          <div class="flex">
            <div class="bar"></div>
            <div class="title">近期疫病防护</div>
          </div>

          <div class="swiper-container content bch">
            <div class="swiper-wrapper">
              <div class="swiper-slide flex-between" v-for="item in state.bchList">
                <div class="tp-card" @click="handleBchClick(cItem)" v-for="cItem in item">
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
                      <img :src="returnImgUrl(cItem.picList)" class="img" />
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
            <img src="@/assets/image/arrow.png" class="swiper-button-prev bch-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next bch-next" />
          </div>
        </div>
      </card-view>
    </div>

    <div class="big-card" v-if="bchShow">
      <card-view>
        <div class="flex-between" style="margin-bottom: 18px">
          <div class="swiper-title" style="margin-bottom: 0">{{ state.form.name }}</div>
          <el-button class="closeBtn" @click="bchShow = false" :icon="Close"></el-button>
        </div>
        <div class="flex-between">
          <div>
            <div class="mb flex">
              <span class="label">别名</span>
              <span class="value">{{ state.form.otherName }}</span>
            </div>
            <div class="mb flex">
              <span class="label">发生月份</span>
              <span class="value">{{ state.form.mouth }}月</span>
            </div>
            <div class="mb flex">
              <span class="label">类型</span>
              <span class="value">{{ state.form.type === 1 ? '虫害' : '病害' }}</span>
            </div>
          </div>
          <div class="border-wrapper">
            <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
            <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
            <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
            <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
            <img :src="returnImgUrl(state.form.picList)" class="img" />
          </div>
        </div>
        <div class="line"></div>
        <div>
          <div class="label" style="float: left">症状</div>
          <span class="value">{{ state.form.symptom }}</span>
        </div>
        <div style="margin-top: 15px">
          <div class="label" style="float: left">病因</div>
          <span class="value">{{ state.form.reason }}</span>
        </div>
        <div style="margin-top: 15px">
          <div class="label" style="float: left">治疗方案</div>
          <span class="value">{{ state.form.preventMethod }}</span>
        </div>
      </card-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import cardView from './card.vue';
import topView from './middle/top.vue';

import { onMounted, reactive, ref, nextTick } from 'vue';
import { pondEpidemicKnowledge } from '@/api/breed';
import { useBreedStore } from '@/store';
import { Close } from '@element-plus/icons-vue';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const breedStore = useBreedStore();
const bchShow = ref(false);
const state = reactive({
  bchList: [] as any[],
  form: {} as any,
});

onMounted(() => {
  getData();
});

const getData = () => {
  pondEpidemicKnowledge({ plantMassifId: breedStore.plantMassif.id }).then((res: any) => {
    state.bchList = splitArray(res, 2);

    nextTick(() => {
      new Swiper('.bch', {
        navigation: {
          nextEl: '.bch-next',
          prevEl: '.bch-prev',
          hideOnClick: true,
        },
        spaceBetween: 16,
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      });
    });
  });
};

//轮播图分组
const splitArray = (arr: any[], size: number) => {
  let data = [];
  for (let i = 0; i < arr.length; i += size) {
    data.push(arr.slice(i, i + size));
  }
  return data;
};

const handleBchClick = (item: any) => {
  state.form = item;
  bchShow.value = true;
};

const returnImgUrl = (item: any) => {
  if (item && item.length > 0) {
    return import.meta.env.VITE_APP_SERVE_API + '/file' + item[0].address;
  }
};
</script>

<style lang="scss" scoped>
.middle {
  width: 46%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;

  .top {
    height: 56%;
  }

  .bottom {
    height: 44%;
    padding-top: 15px;
    box-sizing: border-box;

    .bar {
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

    .content {
      margin-top: 15px;
      height: calc(100% - 36px);
    }

    .swiper-container {
      padding: 0 15px;

      .swiper-button-prev,
      .swiper-button-next {
        width: 12px;
        height: auto;
        transform: translateY(-50%);
      }
      .swiper-button-prev {
        left: 0;
        transform: rotate(180deg) translateY(50%);
      }

      .swiper-button-next {
        right: 0;
      }
    }

    .bch {
      .tp-card {
        background-size: 100% 100%;
        height: 100%;
        font-size: 14px;
        color: #fff;
        padding: 20px 25px;
        box-sizing: border-box;
        cursor: pointer;
        width: 48%;
        background: url('@/assets/image/breed/pond_bg.png') center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.big-card {
  position: absolute;
  z-index: 9;
  animation: extend 3s;
  left: 10px;
  right: 10px;
  top: 0;
  bottom: 0;
  overflow: hidden;
  font-size: 14px;
}

@keyframes extend {
  0% {
    left: 100%;
  }

  100% {
    left: 10px;
  }
}

.closeBtn {
  padding: 0;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 24px;

  &:hover {
    background: transparent;
    color: #fff;
  }
}

.swiper-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 18px;
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
.values{
  // width: calc(100% - 180px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.line {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0,
    rgba(0, 255, 159, 0.08) 5%,
    rgba(0, 255, 159, 0.08) 95%,
    transparent 100%
  );
  margin: 15px 0;
}

.textarea {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
}

.value {
  letter-spacing: 2px;
}
</style>

<template>
  <div class="right">
    <div class="top">
      <card-view>
        <div class="flex">
          <div class="bar"></div>
          <div class="title">塘口实况</div>
        </div>

        <div class="container">
          <div id="massif-container" ref="videoEle" style="height: 100%" v-show="hasPlayer" />
          <div v-show="!hasPlayer" class="noVideo">
            <img src="@/assets/image/noVideo.png" />
            <div class="text">暂无视频</div>
          </div>
        </div>
      </card-view>
    </div>

    <div class="middle">
      <card-view>
        <div class="flex">
          <div class="bar"></div>
          <div class="title">塘口图册</div>
        </div>
        <div class="swiper-box">
          <div class="swiper-container img-swiper" v-if="state.picList.length > 0" style="height: 120px">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in state.picList">
                <div class="swiper-content flex">
                  <div class="border-wrapper" v-for="(cItem, indexs) in item">
                    <el-image
                      :src="cItem.imgUrl"
                      preview-teleported
                      :initial-index="clickIndex"
                      :preview-src-list="state.previewList"
                      @click="clickImage(index, indexs)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-prev img-prev" />

            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <img src="@/assets/image/arrow.png" class="swiper-button-next img-next" />
          </div>

          <img class="no_img" v-else src="@/assets/image/noImg.png" />
        </div>
      </card-view>
    </div>

    <div class="bottom">
      <card-view>
        <div class="flex">
          <div class="bar"></div>
          <div class="title">溯源批次</div>
        </div>
        <div class="content">
          <div class="head">
            <p>批次</p>
            <p>产品</p>
            <p>品种</p>
            <p>养殖塘口</p>
          </div>
          <vue3-seamless-scroll :list="state.list" class="seamless-warp" :step="0.2" :hover="true" :limitScrollNum="2">
            <div v-for="(item, index) in state.list" :key="index" class="body">
              <el-tooltip effect="dark" :content="item.batchNo" placement="top">
                <p>{{ item.batchNo }}</p>
              </el-tooltip>

              <p>小虾干</p>
              <p>罗氏沼虾</p>
              <p>{{ item.plantMassifName }}</p>
            </div>
          </vue3-seamless-scroll>
        </div>
      </card-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import EZUIKit from 'ezuikit-js';
import { nextTick, onMounted, reactive, ref } from 'vue';
import cardView from './card.vue';
import { pondVideo, pondSyBatch } from '@/api/breed';
import { useBreedStore } from '@/store';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const breedStore = useBreedStore();
let videoEle = ref<HTMLDivElement | null>(null);
const state = reactive({ picList: [] as any[], previewList: [] as any[], list: [] as any[] });
const hasPlayer = ref(true);
const clickIndex = ref(0);

onMounted(() => {
  getData();
});

const getData = () => {
  pondVideo({ plantMassifId: breedStore.plantMassif.id }).then((res: any) => {
    let data = res.videoInfo[0];
    let dom = videoEle.value as HTMLDivElement;

    if (data.address) {
      new EZUIKit.EZUIKitPlayer({
        id: 'massif-container', // 视频容器ID
        accessToken: data.address.token,
        url: data.address.url,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
      });
    } else {
      hasPlayer.value = false;
    }

    if (res.videoPicList) {
      res.videoPicList.map((it: any) => {
        it.imgUrl = returnImgUrl(it.address);
        state.previewList.push(it.imgUrl);
      });
      state.picList = splitArray(res.videoPicList, 3);
    }

    nextTick(() => {
      new Swiper('.img-swiper', {
        navigation: {
          nextEl: '.img-next',
          prevEl: '.img-prev',
          hideOnClick: true,
        },
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      });
    });
  });

  pondSyBatch({ plantMassifId: breedStore.plantMassif.id }).then((res: any) => {
    state.list = res.content;
  });
};

// 轮播图
const splitArray = (arr: any[], size: number) => {
  let data = [];
  for (let i = 0; i < arr.length; i += size) {
    data.push(arr.slice(i, i + size));
  }
  return data;
};

const clickImage = (index: number, indexs: number) => {
  clickIndex.value = index * 3 + indexs;
};

const returnImgUrl = (img: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + img;
};
</script>

<style lang="scss" scoped>
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

.right {
  width: 27%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}

.top {
  height: calc(38% - 15px);
  margin-bottom: 15px;
}

.container {
  margin-top: 10px;
  padding: 5px;
  box-sizing: border-box;
  height: calc(100% - 31px);
  position: relative;

  .noVideo {
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

.middle {
  height: calc(28% - 15px);
  margin-bottom: 15px;

  .swiper-box {
    height: calc(100% - 31px);
    margin-top: 10px;

    .swiper-content {
      padding: 0 30px;

      .border-wrapper {
        position: relative;
        padding: 5px;
        width: 120px;
        height: 120px;

        :deep(.el-image) {
          width: 100%;
          height: 100%;
        }

        :deep(.el-image__placeholder) {
          background: url('@/assets/image/sl_new.gif') center no-repeat;
          background-size: 100%;
        }
      }
    }

    .no_img {
      width: 200px;
      margin: 0 auto;
    }
  }

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

.bottom {
  height: 34%;

  .content {
    height: calc(100% - 31px);
    margin-top: 10px;
    .head {
      background: rgba(19, 39, 165, 0.5);
      display: flex;
    }
    .body {
      display: flex;
      width: 100%;
    }
    .head,
    .body {
      p {
        color: #fff;
        text-align: center;
        margin: 9px 0;
        width: 25%;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      p:nth-child(1) {
        width: 40%;
      }
      p:nth-child(2) {
        width: 20%;
      }
      p:nth-child(3) {
        width: 20%;
      }
      p:nth-child(4) {
        width: 20%;
      }
    }

    .seamless-warp {
      width: 100%;
      height: calc(100% - 34px);
      overflow: hidden;
      .body:nth-child(even) {
        background: rgba(19, 39, 165, 0.2);
      }
    }
  }
}
</style>

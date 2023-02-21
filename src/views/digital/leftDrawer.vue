<template>
  <v-drawer direction="left" hasArrow>
    <v-card>
      <div class="top">
        <v-title title="基地信息" />
        <div style="padding-top: 18px">
          <div class="mb flex">
            <span class="name">{{ props.form.plantBaseName }}</span>
          </div>
          <div class="mb flex">
            <span class="label">负责人</span>
            <span class="value">{{ props.form.dutyPersonName }}</span>
          </div>
          <div class="mb flex">
            <span class="label">基地简介</span>
            <span class="value">{{ props.form.baseShortinfo }}</span>
          </div>
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

        <div class="video-box">
          <video style="width: 100%; height: 100%" :src="state.videoSrc" controls autoplay></video>
        </div>
      </div>

      <div class="bottom">
        <v-title title="养殖品种"></v-title>
        <div class="swiper-container breed-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in state.list">
              <div class="card">
                <div class="title">
                  <span class="num">{{ index + 1 }}</span>
                  <span>{{ item.plantBreedName }}</span>
                </div>
                <div class="content flex">
                  <img :src="setImageUrl(item.by2)" style="margin-right: 10px" />
                  <canvas :id="'qrCode' + index" width="98" height="98" style="margin-right: 10px"></canvas>
                  <div class="desc">{{ item.note }}</div>
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
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { plantBreed, pondCyyVideo } from '@/api/digital';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
});
const clickIndex = ref(0);
const state = reactive({
  picList: [] as any[],
  previewList: [] as any[],
  list: [] as any[],
  videoSrc: '',
});

watch(
  () => props.form,
  () => {
    plantBreed({ plantBaseId: props.form.id }).then((res: any) => {
      state.list = res.content;

      nextTick(() => {
        state.list.map((it: any, index: number) => {
          createQrCode(it.id, index);
        });

        new Swiper('.breed-swiper', {
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
    });

    props.form.pidList.map((it: any) => {
      it.imgUrl = setImageUrl(it.address);
      state.previewList.push(it.imgUrl);
    });

    state.picList = splitArray(props.form.pidList, 3);

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
  }
);

onMounted(() => {
  pondCyyVideo().then((res: any) => {
    state.videoSrc = setImageUrl(res.content[0].address);
  });
});

const createQrCode = (id: string, index: number) => {
  let dom = document.getElementById('qrCode' + index) as HTMLCanvasElement;
  let text = 'https://www.gd-jintu.com/lfscservice/lfsc/scan?syjlDetailId=' + id;
  QRCode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    width: 98,
  }).then((url: string) => {
    const ctx = dom.getContext('2d') as CanvasRenderingContext2D;
    const image = new Image();
    image.src = url;
    setTimeout(() => {
      ctx.drawImage(image, 0, 0, 98, 98);
    }, 100);
  });
};

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

const setImageUrl = (name: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + name;
};
</script>

<style lang="scss" scoped>
.top {
  height: 72%;
  padding-bottom: 15px;
  box-sizing: border-box;
  .mb {
    margin-bottom: 10px;
  }

  .name {
    font-size: 20px;
  }

  .label {
    color: #b9b9b9;
    width: 70px;
    font-size: 16px;
    text-align-last: justify;
    margin-right: 15px;
  }

  .value {
    flex: 1;
    color: #fff;
    font-size: 16px;
  }
  .swiper-box {
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

  .video-box {
    height: calc(100% - 280px);
    margin-top: 14px;
  }
}

.bottom {
  height: 28%;

  .swiper-container {
    height: calc(100% - 53px);
    margin-top: 15px;

    .swiper-slide {
      padding: 0 15px;
      box-sizing: border-box;
    }

    .card {
      height: 100%;
      background: url('@/assets/image/digital/bg.png') center no-repeat;
      background-size: 100% 100%;

      .title {
        position: relative;
        top: 5px;
        left: 20px;
        font-size: 16px;
        .num {
          font-size: 18px;
          margin-right: 8px;
        }
      }

      .content {
        height: calc(100% - 21px);
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
      }
    }
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
</style>

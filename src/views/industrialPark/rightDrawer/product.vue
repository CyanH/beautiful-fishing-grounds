<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in state.list">
        <div class="card">
          <div class="title flex">
            <div class="box" style="margin-right: 3px">
              <img src="@/assets/image/industrialPark/product_num.png" />
              <span class="index">{{ index + 1 }}</span>
            </div>
            <div class="box">
              <img src="@/assets/image/industrialPark/product_name.png" class="name-img" />
              <span style="padding: 0 8px">{{ item.productName }}</span>
            </div>
          </div>
          <div class="content flex">
            <img :src="returnImgUrl(item)" style="margin-right: 10px" />
            <canvas :id="'qrCode' + index" width="98" height="98" style="margin-right: 10px"></canvas>
            <div class="desc">{{ item.productInfo }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <img src="@/assets/image/arrow.png" class="swiper-button-prev" />

    <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <img src="@/assets/image/arrow.png" class="swiper-button-next" />
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode';
import { onMounted, reactive, nextTick } from 'vue';
import { getBrandProduct } from '@/api/industrial';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const state = reactive({
  list: [] as any[],
});

onMounted(() => {
  getData();
});

const getData = () => {
  getBrandProduct().then((res: any) => {
    state.list = res.content;
    nextTick(() => {
      state.list.map((it: any, index: number) => {
        createQrCode(it.syjlDetail, index);
      });
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
};

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
    }, 0);
  });
};

const returnImgUrl = (item: any) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file/' + item.picList[0];
};
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;

  .swiper-slide {
    padding: 15px 15px 0;
    box-sizing: border-box;
  }

  .card {
    height: 100%;
    background-color: rgba(187, 255, 187, 0.07);
    border-radius: 5px;

    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);

      .box {
        position: relative;
        font-size: 14px;
        color: #fff;

        .index {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        .name-img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          width: 100%;
          height: 28px;
        }
      }
    }

    .content {
      height: 100%;
      padding: 0 10px;

      img {
        width: 98px;
        height: 98px;
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

  .swiper-pagination {
    bottom: 3px;
    :deep(.swiper-pagination-bullet) {
      width: 6px;
      height: 6px;
      border-radius: 0;
      background: #fff;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 12px;
    height: auto;
  }
  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
    transform: rotate(180deg);
  }
}
</style>

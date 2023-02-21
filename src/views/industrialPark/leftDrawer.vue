<template>
  <v-drawer direction="left">
    <v-card>
      <div class="top">
        <v-title title="养殖企业" />
        <div class="content">
          肇庆市高要区伟铭养殖专业合作社于2019年4月成立。社员包括陈伟强等17位养殖户，养殖面积1000多亩。合作社位于高要区白土镇六塑，周边交通便利，环境优越。合作社推行标准化养殖，推广科学健康养殖模式，养殖设施完普。
        </div>
        <div class="swiper-box">
          <div class="swiper-container img-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in state.picList">
                <div class="swiper-content flex-between">
                  <div class="border-wrapper" v-for="(cItem, indexs) in item">
                    <el-image
                      :src="cItem"
                      preview-teleported
                      :initial-index="state.clickIndex"
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
        </div>
      </div>

      <div class="middle">
        <v-title title="养殖面积" />
        <div class="flex-around" style="padding-top: 8px">
          <div class="box">
            <img src="@/assets/image/industrialPark/pie.png" class="pie" />
            <div class="box-content">
              <div class="num">9960</div>
              <div>总面积</div>
            </div>
          </div>
          <div>
            <div class="flex" style="margin-bottom: 15px">
              <span class="icon" style="background-color: #30d8fb" />

              <div class="name">白土镇</div>
              <div class="value"><span class="num">7185</span><span style="margin-left: 3px">亩</span></div>
            </div>
            <div class="flex" style="margin-bottom: 15px">
              <span class="icon" style="background-color: #1ae496" />

              <div class="name">莲塘镇</div>
              <div class="value"><span class="num">1425</span><span style="margin-left: 3px">亩</span></div>
            </div>
            <div class="flex">
              <span class="icon" style="background-color: #ff5e6a" />
              <div class="name">蛟塘镇</div>
              <div class="value"><span class="num">1350</span><span style="margin-left: 3px">亩</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <v-title title="养殖品种" />
        <div class="swiper-container breed-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in state.breedList">
              <div class="card">
                <div class="title">
                  <span class="num">{{ index + 1 }}</span>
                  <span>{{ item.breedName }}</span>
                </div>
                <div class="content flex">
                  <img :src="item.img" style="margin-right: 10px" />
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
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { nextTick, onMounted, reactive } from 'vue';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}.png`, import.meta.url).href;
};

const state = reactive({
  clickIndex: 0,
  picList: [[getImgUrl('qy_1'), getImgUrl('qy_2'), getImgUrl('qy_3')]],
  previewList: [getImgUrl('qy_1'), getImgUrl('qy_2'), getImgUrl('qy_3')],
  breedList: [
    {
      breedName: '罗氏沼虾',
      img: getImgUrl(''),
      note: '罗氏沼虾（学名：Macrobrachium rosenbergii）是长臂虾科、沼虾属动物。体大，最大雄性个体的体长可达400毫米，养殖1年通常可达到150～200毫米。',
    },
  ],
});

onMounted(() => {
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

const clickImage = (index: number, indexs: number) => {
  state.clickIndex = index * 3 + indexs;
};
</script>

<style lang="scss" scoped>
.top {
  margin-bottom: 15px;
  .content {
    padding-top: 12px;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 18px;
    text-indent: 2em;
  }
}

.middle {
  .box {
    position: relative;
    .pie {
      width: 182px;
    }

    .box-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #00f6ff;
      font-size: 12px;

      .num {
        font-size: 24px;
      }
    }
  }

  .icon {
    width: 8px;
    height: 8px;
    margin-right: 10px;
  }

  .name {
    font-size: 14px;
    margin-right: 12px;
  }

  .value {
    color: #00f6ff;
    font-size: 12px;

    .num {
      font-size: 22px;
    }
  }
}

.swiper-box {
  margin-top: 12px;

  .swiper-content {
    padding: 0 30px;

    .border-wrapper {
      position: relative;
      width: 110px;
      height: 110px;
      border: 1px solid #a0d8ff;

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

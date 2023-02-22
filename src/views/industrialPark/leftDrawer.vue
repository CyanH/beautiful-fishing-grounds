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
        <div class="esc">
          <div class="esc_con">
            <img src="@/assets/image/industrialPark/esc.png" alt="" />
            <div class="one1">产值 <span class="num">16.2</span> (亿元)</div>
            <div class="one2 one2_all">
              <div class="b_5">加工产量(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one3 one2_all">
              <div class="b_5">水产冷库(个)</div>
              <div class="xian"></div>
              <div>
                <span class="num">4</span>
              </div>
            </div>
            <div class="one4 one2_all">
              <div class="b_5">年加工能力(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one5 one2_all">
              <div class="b_5">仓储能力(吨/次)</div>
              <div class="xian"></div>
              <div>
                <span class="num">3.56</span>
              </div>
            </div>
            <div class="title">二三产</div>
          </div>
        </div>
      </div>

      <div class="bottom_all">
        <div class="middle">
          <v-title title="养殖面积" />
          <div class="flex-around nr">
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
              <div class="swiper-slide" v-for="item in state.breedList">
                <div class="card">
                  <div class="content flex">
                    <img :src="item.img" style="margin-right: 10px" />
                    <div class="right">
                      <div class="titles">{{ item.breedName }}</div>
                      <div class="desc">{{ item.note }}</div>
                    </div>
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
      img: getImgUrl('lszx'),
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
  margin-bottom: 8px;
  height: 455px;
  .content {
    padding-top: 12px;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 18px;
    text-indent: 2em;
  }
  .esc {
    // height: calc(100% - 250px);
    height: 200px;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    .esc_con {
      width: 50%;
      // height: 100%;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 80%;
      }
      .one1 {
        position: absolute;
        top: -8px;
        font-size: 16px;
        .num {
          color: #ffb400;
          font-size: 20px;
        }
      }
      .one2_all {
        position: absolute;
        .b_5 {
          margin-bottom: 5px;
        }
        .xian {
          width: 100%;
          height: 4px;
          background-color: aqua;
          border-radius: 4px;
        }
        .num {
          color: #ffb400;
          font-size: 20px;
        }
      }
      .one2 {
        font-size: 16px;
        left: -90px;
        top: 29%;
        text-align: right;
      }
      .one3 {
        font-size: 16px;
        top: 29%;
        right: -79px;
      }
      .one4 {
        font-size: 16px;
        left: -110px;
        bottom: 6.5%;
        text-align: right;
      }
      .one5 {
        font-size: 16px;
        right: -100px;
        bottom: 6.5%;
      }
      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: #70f3fc;
        font-weight: bold;
      }
    }
  }
}
.bottom {
  height: 170px;
  margin-top: 8px;
  .swiper-container {
    height: calc(100% - 53px);
    margin-top: 8px;

    .swiper-slide {
      padding: 0 15px;
      box-sizing: border-box;
    }

    .card {
      height: 100%;
      // background: url('@/assets/image/digital/bg.png') center no-repeat;
      // background-size: 100% 100%;

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
        height: calc(100%);
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
  }
}
.bottom_all {
  width: 100%;
  height: calc(100% - 455px);
}

.middle {
  height: calc(100% - 180px);
  .nr {
    padding-top: 8px;
    height: calc(100% - 40px);
    width: 100%;
  }
  .box {
    position: relative;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .pie {
      // width: 180px;
      // width: 60%;
      height: 90%;
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
        // font-size: 24px;
        font-size: 20px;
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

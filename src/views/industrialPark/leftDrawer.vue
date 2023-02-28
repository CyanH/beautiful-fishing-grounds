<template>
  <v-drawer direction="left">
    <v-card>
      <div class="top">
        <v-title title="养殖企业" />
        <div class="swiper-box">
          <div class="swiper-container img-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in state.content">
                <div class="content">{{ item.desc }}</div>
                <div class="swiper-content flex-between">
                  <div class="border-wrapper" v-for="(cItem, indexs) in item.picList">
                    <el-image
                      :src="getImgUrl(cItem)"
                      preview-teleported
                      :preview-src-list="[getImgUrl(cItem)]"
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
            <img src="@/assets/image/industrialPark/r_esc.png" alt="" />
            <div class="one1 one2_all">
              <div class="b_5">产值(亿元)</div>
              <div class="xian"></div>
              <div>
                <span class="num">8.3</span>
              </div>
            </div>
            <div class="one2 one2_all">
              <div class="b_5">养殖产量(万吨)</div>
              <div class="xian"></div>
              <div>
                <span class="num">2.13</span>
              </div>
            </div>
            <div class="one3 one2_all">
              <div class="b_5">苗种场(家)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one4 one2_all">
              <div class="b_5">养殖厂家(家)</div>
              <div class="xian"></div>
              <div>
                <span class="num">4</span>
              </div>
            </div>
            <div class="one5 one2_all">
              <div class="b_5">示范基地(个)</div>
              <div class="xian"></div>
              <div>
                <span class="num">5</span>
              </div>
            </div>
            <div class="one6 one2_all">
              <div class="b_5">养殖面积(亩)</div>
              <div class="xian"></div>
              <div>
                <span class="num">9960</span>
              </div>
            </div>
            <div class="title">一产</div>
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
            <div class="swiper-slide" v-for="item in state.breedList">
              <div class="card">
                <div class="content flex">
                  <img :src="getImgUrl(item.img)" style="margin-right: 10px" />
                  <div class="right">
                    <div class="titles">{{ item.breedName }}</div>
                    <div class="desc">{{ item.note }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-drawer>

  <div class="legend animate__animated animate__fadeInRight">
    <el-checkbox v-model="checked" label="智慧物联" size="large" @change="handleChange" />
    <div class="flex row" v-for="item in state.list">
      <img :src="getImgUrl(item.icon)" class="icon" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/eventbus';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { nextTick, onMounted, reactive, ref } from 'vue';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const checked = ref(false);
const state = reactive({
  clickIndex: 0,
  content: [
    {
      desc: '肇庆市高要区伟铭养殖专业合作社于2019年4月成立。社员包括陈伟强等17位养殖户，养殖面积1000多亩。合作社位于高要区白土镇六塱，周边交通便利，环境优越。',
      picList: ['qy_1', 'qy_2', 'qy_3'],
    },
    {
      desc: '肇庆市伟之铭农业科技有限公司是一家致力于打造罗氏沼虾养殖一体化服务平台的科技企业，专业从事水产动保产品的研发、生产、销售及生态、健康、高效水产养殖技术的推广。由多名资深罗氏沼虾养殖专业出身的人才组成市场服务团队，将围绕对罗氏沼虾品种的水质调节、底质改良、病害防控、促生长保健、品质改善等养殖环节提供专业化服务，为肇庆市高要罗氏沼虾产业养殖健康可持续发展贡献力量。',
      picList: ['qy_4', 'qy_5', 'qy_6'],
    },
  ],
  list: [
    {
      icon: 'ico_qxz',
      name: '气象设备(1)',
    },
    {
      icon: 'ico_sz',
      name: '水质设备(2)',
    },
    {
      icon: 'ico_sxt',
      name: '摄像头(5)',
    },
  ],
  breedList: [
    {
      breedName: '罗氏沼虾',
      img: 'lszx',
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

const handleChange = (val: boolean) => {
  emitter.emit('chooseEquip', val);
};

const clickImage = (index: number, indexs: number) => {
  state.clickIndex = index * 3 + indexs;
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/industrialPark/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.top {
  padding-bottom: 8px;
  .content {
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 18px;
    text-indent: 2em;
    height: 80px;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 0 30px;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #324686;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .esc {
    height: 200px;
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
        left: -70px;
        top: 14px;
        text-align: right;
      }
      .one2 {
        right: -105px;
        top: 13px;
      }
      .one3 {
        left: -70px;
        top: 38%;
        text-align: right;
      }
      .one4 {
        right: -90px;
        top: 37.5%;
      }
      .one5 {
        left: -85px;
        bottom: 13px;
        text-align: right;
      }
      .one6 {
        right: -105px;
        bottom: 13px;
      }
      .one2_all {
        position: absolute;
        font-size: 14px;
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
  height: 150px;
  margin-top: 8px;
  .swiper-container {
    height: calc(100% - 37px);
    margin-top: 8px;

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
          height: 72px;
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
            background: #324686;
          }
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
          }
        }
        .right {
          width: calc(100% - 98px);

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
  height: calc(100% - 439px);
}

.middle {
  height: calc(100% - 158px);
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
    margin-top: 8px;
    padding: 0 30px;

    .border-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
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

.legend {
  position: absolute;
  padding: 15px;
  background-color: rgba(17, 16, 45, 0.7);
  border-radius: 2px;
  right: 27%;
  bottom: 15px;
  color: #fff;
  font-size: 14px;
  z-index: 7;

  :deep(.el-checkbox__input) {
    padding-left: 8px;
    .el-checkbox__inner {
      width: 18px;
      height: 18px;

      &::after {
        border-width: 2px;
        width: 5px;
        height: 10px;
        left: 5px;
        top: 1px;
      }
    }
  }

  :deep(.el-checkbox__label) {
    color: #fff;
    padding-left: 21px;
  }

  .icon {
    width: 32px;
    margin-right: 15px;
  }
}
</style>

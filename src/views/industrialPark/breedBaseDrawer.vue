<template>
  <v-drawer direction="right">
    <div style="height: 100%">
      <v-card>
        <v-title :title="title" :hasClose="true" />
        <div class="container">
          <div class="o1">
            <div class="mb flex" v-for="item in _list._one">
              <span class="label">{{ item.title }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
          <!-- 轮播图 -->
          <div class="o2">
            <div class="swiper-container o_swiper-container" v-if="_list._two.length > 0" style="height: 120px">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in _list._two">
                  <div class="content flex-between">
                    <div class="border-wrapper" v-for="(cItem, indexs) in item">
                      <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
                      <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
                      <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
                      <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
                      <el-image
                        :src="cItem.n_img"
                        preview-teleported
                        :initial-index="clickIndex"
                        :preview-src-list="_list._img_new_two"
                        @click="cl_img(index, indexs)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
              <img src="@/assets/image/arrow.png" class="swiper-button-prev swiper-button-prev1" />

              <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
              <img src="@/assets/image/arrow.png" class="swiper-button-next swiper-button-next2" />
            </div>
            <div v-else class="o2_no">
              <img class="no_img" src="@/assets/image/noImg.png" alt="" />
            </div>
          </div>
          <!-- 种植品种 -->
          <div class="o3">
            <div class="swiper-container one_swiper-container" style="height: 100px">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in _list._there">
                  <div class="o3_t flex">
                    <div class="o3_img">
                      <img :src="returnImgUrl(item.by2)" class="img" />
                    </div>
                    <div class="o3_con">
                      <div class="name">{{ item.plantBreedName }}</div>
                      <div class="desc">种植时间：{{ _Time(item.plantDate) }}</div>
                      <div class="jduan">{{ item.by1 }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
              <img src="@/assets/image/arrow.png" class="swiper-button-prev swiper-button-prev_o1" />

              <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
              <img src="@/assets/image/arrow.png" class="swiper-button-next swiper-button-next_o2" />
            </div>
          </div>

          <div class="o4">
            <div class="nav flex">
              <div @click.stop="_active('1')" :class="[_num === '1' ? '_active' : '']">
                基地环境
                <img v-if="_num === '1'" src="@/assets/image/guang.png" alt="" />
              </div>
              <!-- <div @click.stop="_active('2')" :class="[_num === '2' ? '_active' : '']">气象站环境</div> -->
              <div @click.stop="_active('3')" :class="[_num === '3' ? '_active' : '']">
                视频监控
                <img v-if="_num === '3'" src="@/assets/image/guang.png" alt="" />
              </div>
            </div>
            <div class="con">
              <div class="con_1" v-if="_num === '1'">
                <div class="con_1_1">
                  <div class="tubiao flex">
                    <span class="line-bar"></span>
                    <span>基地环境</span>
                  </div>
                  <div class="nr flex">
                    <div v-for="item in _list._foru.weatherData" class="bar">
                      <div class="flex" style="justify-content: center">
                        <svg-icon :name="item.svgname"></svg-icon>
                        <div class="name">{{ item.name }}</div>
                      </div>
                      <div style="padding-top: 6px">
                        <span class="num">{{ item.value }}</span>
                        <span class="unit">{{ item.unit }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="con_1_2">
                  <div class="tubiao flex">
                    <span class="line-bar"></span>
                    <span>气象站环境</span>
                  </div>
                  <div class="nr1 flex-between">
                    <div class="bar" v-for="item in _list._foru.sqData">
                      <div class="box">
                        <div class="value">
                          <span class="num">{{ item.value }}</span>
                          <span>{{ item.unit }}</span>
                        </div>
                      </div>
                      <div class="name">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="con_3" v-if="_num === '3'">
                <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
                <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
                <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
                <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />

                <video-container v-show="_list._foru.videoData[0].videoData != undefined" ref="videoEle" />

                <div v-show="_list._foru.videoData[0].videoData == undefined" class="noVideo">
                  <img src="@/assets/image/noVideo.png" />
                  <div class="text">暂无视频</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, computed, nextTick } from 'vue';
import { useParkStore } from '@/store';

// 时间
import { parseTime } from '@/utils/parseTime';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { getPlantBaseInfo } from '@/api/industrial';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const parkStore = useParkStore();

// 标题
const title = computed(() => {
  return parkStore.param.name;
});
// 种植基地的id
let _id = ref(parkStore.param.id);
const videoEle = ref(null);

watch(
  () => parkStore.param.id,
  (_new, _old) => {
    _id.value = _new;
    _Model();
  }
);

let _num = ref('1');
// 轮播图起始
let clickIndex = ref(0);
const _list = reactive({
  _one: [
    {
      title: '名称',
      value: '暂无名称',
    },
    {
      title: '所属企业',
      value: '暂无所属企业',
    },
    {
      title: '基地面积',
      value: '暂无基地面积',
    },
    {
      title: '负责人',
      value: '暂无负责人',
    },
    {
      title: '联系电话',
      value: '暂无联系电话',
    },
  ],
  _two: [] as any[],
  _img_two: [] as any,
  _img_new_two: [] as any,
  _there: [] as any[],
  _foru: {
    weatherData: [
      {
        svgname: 'wd',
        name: '平均温度',
        value: 0,
        unit: '℃',
      },
      {
        svgname: 'sd',
        name: '平均湿度',
        value: 0,
        unit: '%',
      },
      {
        svgname: 'jy',
        name: '平均雨量',
        value: 0,
        unit: 'mm',
      },
      {
        svgname: 'fs',
        name: '风速',
        value: 0,
        unit: 'm/s',
      },
      {
        svgname: 'gz',
        name: '光照',
        value: 0,
        unit: 'lux',
      },
      {
        svgname: 'fx',
        name: '风向',
        value: '北',
        unit: '',
      },
    ],
    sqData: [
      {
        name: '气象站温度',
        value: 0,
        unit: '℃',
      },
      {
        name: '气象站湿度',
        value: 0,
        unit: '%',
      },
      {
        name: '气象站EC值',
        value: 0,
        unit: 'us/cm',
      },
    ],
    videoData: [] as any[],
  },
});
onMounted(() => {
  _Model();
});

const lb_1 = () => {
  new Swiper('.o_swiper-containe', {
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev1',
      hideOnClick: true,
    },
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  });
};

const lb_2 = () => {
  new Swiper('.one_swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next_o2',
      prevEl: '.swiper-button-prev_o1',
      hideOnClick: true,
    },
    autoplay: {
      delay: 4000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  });
};

const _Model = async () => {
  _num.value = '1';
  await getPlantBaseInfo({
    id: _id.value,
  }).then((res: any) => {
    _list._one[0].value = res.plantBaseInfo.plantBaseName ? res.plantBaseInfo.plantBaseName : '暂无名称';
    _list._one[1].value = res.plantBaseInfo.cyyImplementationsName
      ? res.plantBaseInfo.cyyImplementationsName
      : '暂无所属企业';
    _list._one[2].value = res.plantBaseInfo.plantBaseArea ? res.plantBaseInfo.plantBaseArea : '暂无基地面积';
    _list._one[3].value = res.plantBaseInfo.dutyPersonName ? res.plantBaseInfo.dutyPersonName : '暂无负责人';
    _list._one[4].value = res.plantBaseInfo.dutyPersonPhone ? res.plantBaseInfo.dutyPersonPhone : '暂无联系电话';
    // 种植品种
    _list._there = res.content;
    nextTick(() => {
      lb_2();
    });
    // 气象指标
    _list._foru.weatherData[0].value = res.weatherData ? res.weatherData.temp : 0;
    _list._foru.weatherData[1].value = res.weatherData ? res.weatherData.humi : 0;
    _list._foru.weatherData[2].value = res.weatherData ? res.weatherData.rain : 0;
    _list._foru.weatherData[3].value = res.weatherData ? res.weatherData.speed : 0;
    _list._foru.weatherData[4].value = res.weatherData ? res.weatherData.raid : 0;
    _list._foru.weatherData[5].value = res.weatherData ? res.weatherData.direction : 0;
    // 气象站环境
    _list._foru.sqData[0].value = res.sqData ? res.sqData.temp : 0;
    _list._foru.sqData[1].value = res.sqData ? res.sqData.humi : 0;
    _list._foru.sqData[2].value = res.sqData ? res.sqData.edc : 0;
    // 监控
    console.log('监控', res.videoData);

    _list._foru.videoData = res.videoData;
    // 基地详情图
    if (res.plantBaseInfo.pidList) {
      let _array = [];
      for (let index = 0; index < res.plantBaseInfo.pidList.length; index++) {
        let n_img = returnImgUrl(res.plantBaseInfo.pidList[index]);
        let o_img = res.plantBaseInfo.pidList[index];
        _array.push({
          n_img,
          o_img,
        });
        _list._img_two.push({
          n_img,
          o_img,
        });
        _list._img_new_two.push(n_img);
      }
      let b: any[] = [];
      _list._two = group(b, _array);
    } else {
      _list._two = [];
    }
    nextTick(() => {
      lb_1();
    });
  });
};

// 时间
const _Time = (times: string) => {
  return parseTime(times, '{y}-{m}-{d}');
};
// 拼接图片
const returnImgUrl = (src: string) => {
  return import.meta.env.VITE_APP_SERVE_API + '/file' + src;
};
// 轮播图
const group = (newArr: any, arr: any) => {
  if (arr.length > 0) {
    if (arr.length > 3) {
      //arr 的长度大于 分组数
      newArr.push(arr.splice(0, 3)); //分组
      group(newArr, arr); //递归
    } else {
      //如果长度不够分为一组，就直接把剩余的分为一组
      newArr.push(arr.splice(0, arr.length));
    }
  }
  return newArr;
};

const _active = (num: string) => {
  _num.value = num;
  if (num === '3' && _list._foru.videoData[0].videoData !== undefined) {
    setTimeout(() => {
      //@ts-ignore
      videoEle.value.getVideo(
        _list._foru.videoData[0].token,
        _list._foru.videoData[0].videoData.url,
        _list._foru.videoData[0].deviceSerial
      );
    }, 300);
  }
};

const cl_img = (f: number, z: number) => {
  let _d = _list._img_two;
  for (let index = 0; index < _d.length; index++) {
    if (_d[index].o_img === _list._two[f][z].o_img) {
      clickIndex.value = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100% - 38px);
}

.o1 {
  width: 100%;
  padding: 16px 8px 0;
  height: 150px;

  .flex {
    align-items: baseline;
  }

  .mb {
    // margin-bottom: 20px;
    height: 32px;
    line-height: 32px;
  }

  .label {
    color: #b9b9b9;
    width: 70px;
    font-size: 14px;
    text-align-last: justify;
    margin-right: 24px;
  }

  .value {
    flex: 1;
    color: #fff;
    font-size: 14px;
  }
}

.o2 {
  width: 100%;
  margin-top: 24px;
  height: 110px;

  .o2_no {
    width: 100%;
    height: 100%;
    text-align: center;

    .no_img {
      width: 150px;
      margin: 0 auto;
      // height: 100%;
    }
  }

  .content {
    padding: 0 30px;

    .border-wrapper {
      position: relative;
      padding: 5px;
      width: 110px;
      height: 100px;

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

// 种植品种
.o3 {
  margin-top: 16px;
  overflow: hidden;
  height: 100px;
  padding: 0px 8px;
  margin-bottom: 8px;

  .o3_t {
    width: 100%;
    padding: 0 30px;
    height: 100%;

    .o3_img {
      flex: 1;

      .img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
    }

    .o3_con {
      flex: 4;

      .name {
        font-size: 16px;
        color: #fff;
        margin-bottom: 8px;
      }

      .desc {
        // color: #b9b9b9;
        color: #fff;
        line-height: 1.5;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .jduan {
        color: #00f6ff;
        opacity: 0.7;
      }
    }
  }
}

.o4 {
  width: 100%;
  height: calc(100% - 428px);
  overflow: hidden;
  padding-top: 8px;

  .nav {
    text-align: center;
    margin-bottom: 10px;

    div {
      flex: 1;
      color: white;
      font-size: 15px;
      padding-bottom: 10px;
      cursor: pointer;
      text-align: center;
      position: relative;

      img {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
        bottom: -4px;
      }
    }

    ._active {
      // border-bottom: 1px #00f6ff solid;
      color: #00f6ff;
    }
  }

  .con {
    width: 100%;
    height: calc(100% - 40px);
    overflow-x: auto;

    .con_1 {
      width: calc(100% - 30px);
      margin: 0 auto;
      height: 100%;
      text-align: center;

      .con_1_1 {
        width: 100%;
        height: calc(100% - 130px);

        .nr {
          width: 100%;
          height: calc(100% - 24px);
          box-sizing: border-box;
          flex-wrap: wrap;
          padding-top: 5px;

          .bar {
            width: 33.33%;

            .svg-icon {
              color: #fff;
              width: 20px;
              height: 20px;
            }

            .name {
              font-size: 16px;
              color: #fff;
            }

            .num {
              color: #00f6ff;
              font-size: 24px;
            }

            .unit {
              font-size: 14px;
              color: #00f6ff;
              padding-left: 5px;
            }
          }
        }
      }

      .con_1_2 {
        width: 100%;
        height: 130px;

        .nr1 {
          // flex-wrap: wrap;
          width: 100%;
          padding-top: 5px;

          .bar {
            width: 33.33%;

            .name {
              text-align: center;
              color: #b9b9b9;
              font-size: 14px;
              margin-top: 5px;
            }

            .box {
              position: relative;

              .img {
                width: 100px;
                margin: auto;
              }

              .value {
                color: #fff;
                font-size: 14px;

                .num {
                  font-size: 28px;
                }

                .svg-icon {
                  width: 18px;
                  height: 18px;
                }
              }
            }
          }
        }
      }

      .tubiao {
        height: 24px;
        .line-bar {
          background: linear-gradient(to bottom, transparent, #a0d8ff);
          width: 4px;
          height: 19px;
          margin-right: 15px;
        }

        span {
          font-size: 18px;
          color: white;
        }
      }
    }

    .con_3 {
      // width: 100%;
      height: 100%;
      position: relative;

      #video-container {
        width: 100%;
        height: 100%;
      }

      .con_3_new {
        img {
          width: 332px;
          margin: auto;
        }

        .text {
          color: #b9b9b9;
          text-align: center;
          font-size: 14px;
        }
      }

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

      .noVideo {
        img {
          width: 332px;
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

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.con::-webkit-scrollbar {
  width: 2px;
  // background-color: #00f6ff;
}

/*定义滑块 内阴影+圆角*/
.con::-webkit-scrollbar-thumb {
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 255, 204, 0.3);
}

/*定义滚动条轨道 内阴影+圆角*/
.con::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  // background-color: rgba(255, 255, 255, 0.8);
}
</style>

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
            <img :src="getImgUrl(state.form.img)" class="img" />
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
          <div class="label" style="float: left">防控措施</div>
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
import { Close } from '@element-plus/icons-vue';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

const bchShow = ref(false);
const state = reactive({
  bchList: [
    [
      {
        name: '幼体综合征',
        otherName: '红尾病',
        mouth: '6',
        type: 2,
        img: 'hwb',
        symptom:
          '发病幼体的症状主要为摄食减少、反应迟钝、活力弱、身体挂脏、肢体发红、空肠、空胃等，并且出现蜕壳不遂而逐渐死亡的现象。',
        reason: '肠杆菌属和弧菌属等细菌感染引起。',
        preventMethod:
          '由于肠杆菌属及弧菌属细菌容易产生耐药性，育苗生产过程应避免滥用药物的现象发生，防止滥用药物导致细菌的耐药性增强，应通过药敏试验筛选药物，科学用药，避免出现耐药菌株。此外，还可以通过泼洒益生菌以及抗菌中草药制剂等抗生素替代品进行防控。',
      },
      {
        name: '幼体弧菌病',
        otherName: '哈维氏弧菌',
        mouth: '11',
        type: 2,
        img: 'hwshj',
        symptom: '发病幼体的症状主要为摄食减少、反应迟钝、活力弱、肌肉不透明或发白、趋光性降低等，严重时沉底并死亡。',
        reason: '哈氏弧菌、溶藻弧菌、副溶血弧菌、非O1霍乱弧菌、创伤弧菌等弧菌属种类感染引起。',
        preventMethod:
          '①育苗前用100～200毫克/升的漂白粉彻底消毒育苗池；②密度控制在10万～15万尾/米3 水体，不宜过高；③投喂优质饵料；④育苗期间加强换水，并通过全池泼洒芽孢杆菌、乳酸菌、硝化细菌等益生菌调节水质，控制微生物的含量。',
      },
    ],
    [
      {
        name: '滴星病',
        otherName: '拉网综合症',
        mouth: '3',
        type: 2,
        img: 'dxb',
        symptom:
          '“滴星病”是养殖户对罗氏沼虾零星死亡的俗称，发病症状为虾体节断裂、软壳、腹部肌肉发白坏死，主要危害6厘米以上的成虾。',
        reason:
          '气单胞菌属的嗜水气单胞菌及维氏气单胞菌等病原感染引起，导致罗氏沼虾体质下降、免疫能力差，并造成散发性死亡。此外，连续阴雨、暴雨、天气闷热、昼夜温差大等气候境恶变引起罗氏沼虾应激，以及养殖塘口底质和恶化等因素，导致病原细菌滋生，从而引发罗氏沼虾散发性死亡。',
        preventMethod:
          '①干塘后要清除淤泥，注重晒塘，放苗前使用150千克/亩的生石灰彻底清塘；②选择经过严格检疫且无特定病原的优质虾苗；③罗氏沼虾放苗控制在6万～7万尾/亩；④投喂优质饲料，且蛋白质水平不宜过高；⑤在养殖过程中，定期在饲料中添加中草药制剂、益生菌、抗应激制剂及免疫多糖等，提高罗氏沼虾免疫力与抗病力；⑥交替使用碘制剂、氯制剂等消毒剂；⑦定期使用微生态制剂调节水质，并改善底质；⑧养殖后期可定期使用肥水制剂来保持水体肥、活、嫩、爽；⑨养殖环境发生变化，如恶劣天气，应及时使用抗应激药、消毒剂等。',
      },
      {
        name: '甲壳溃疡病',
        otherName: '褐斑病',
        mouth: '8',
        type: 2,
        img: 'hbb',
        symptom:
          '病虾体表甲壳有斑点状黑褐色的溃疡，溃疡的中部凹陷，边缘呈白色，褐斑大小不定，在虾体的各个部位都可发生，在头胸甲和腹部前三节的背面发生较多，有时触角、尾扇和其他附肢也会出现褐斑和烂断，在断痕处也呈褐斑，同时患病虾游泳和摄食能力下降，严重影响虾的生长蜕壳。',
        reason:
          '主要是非O1霍乱弧菌、嗜水气单胞菌、维氏气单胞菌、铜绿假单胞菌、恶臭假单胞菌等具有分解几丁质能力的细菌感染引起。',
        preventMethod: '①投喂优质饵料以保证营养；②交替使用碘制剂、氯制剂等进行消毒；③全池泼洒维生素C，避免虾出现应激。',
      },
    ],
  ],
  form: {} as any,
});

onMounted(() => {
  getData();
});

const getData = () => {
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
};

const handleBchClick = (item: any) => {
  state.form = item;
  bchShow.value = true;
};

const getImgUrl = (url: string) => {
  return new URL(`../../../assets/image/breed/${url}.png`, import.meta.url).href;
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
.values {
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

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
        name: '幼体弧菌病',
        otherName: '哈维氏弧菌',
        mouth: '4',
        type: 2,
        img: 'hwshj',
        symptom: '发病幼体的症状主要为摄食减少、反应迟钝、活力弱、肌肉不透明或发白、趋光性降低等，严重时沉底并死亡。',
        reason: '哈氏弧菌、溶藻弧菌、副溶血弧菌、非O1霍乱弧菌、创伤弧菌等弧菌属种类感染引起。',
        preventMethod:
          '①育苗前用100～200毫克/升的漂白粉彻底消毒育苗池；②密度控制在10万～15万尾/米3 水体，不宜过高；③投喂优质饵料；④育苗期间加强换水，并通过全池泼洒芽孢杆菌、乳酸菌、硝化细菌等益生菌调节水质，控制微生物的含量。',
      },
      {
        name: '黑鳃病',
        otherName: '镰刀菌病',
        mouth: '7~9',
        type: 2,
        img: 'hwb',
        symptom: '病虾沿池边缓慢游动，摄食率下降，病虾的鳃部颜色由红棕色变成黑色，虾因呼吸困难而死亡。',
        reason: '由弧菌、假单胞菌和产气单胞菌等感染引起。',
        preventMethod:
          '放苗前尽可能清除池底淤泥等污物，并使用 150 千克/亩的生石灰进行彻底清塘；选择经过严格检疫，且无特定病原的优质虾苗；定期使用碘制剂和氯制剂消毒；定期使用微生态制剂改善水质和底质；发病时使用 0.4～0.8毫克/升的漂白精全池泼洒，同时按1%～2%的比例在饲料中添加大蒜素等抗菌中草药，连续投喂3～5天。',
      },
    ],
    [
      {
        name: '黑壳病',
        otherName: '乌壳病',
        mouth: '4~6',
        type: 2,
        img: 'dxb',
        symptom:
          '病虾虾壳发黑，尤以头胸甲、附肢、尾扇等处更为明显。一般是先褐后黑、先少后多、先轻后重，严重时大部份虾均呈黑色。',
        reason: '确切病原尚不清楚。',
        preventMethod:
          '2004年我们在虾苗厂选16个育苗池开展常用鱼药对罗氏沼虾黑壳病防治效果的试验。结果表明：黑壳虾放入清水池饲养后，不管用不用药，蜕壳后均不再发黑;而在原病虾池蜕壳几天后继续发黑，可见该病主要由环境造成。实践也表明，同类虾池，淤泥多，水质差;氨氮、亚硝酸盐、硫化氢含量高，浮游植物少的虾池发病多、发病重。为此预防工作主要是修复虾池环境和培肥水质，减少、减轻病害发生;彻底有效的防治办法还有待进一步研究探索。',
      },
      {
        name: '纤毛虫病',
        otherName: '白体病',
        mouth: '7',
        type: 2,
        img: 'xmcb',
        symptom:
          '纤毛虫主要通过附着在罗氏沼虾的鳃丝、附肢等表面进行感染，造成罗氏沼虾行动迟缓、活动减弱、抗应激能力下降。',
        reason: '聚缩虫、单缩虫、累枝虫和钟形虫等感染引起。',
        preventMethod:
          '放苗前清除底部淤泥并晒塘，使用漂白粉或生石灰进行彻底消毒；定期使用微生态制剂调节水质、改善底质，避免养殖水体和池塘底部有机质含量过高；投喂优质饵料，保证营养；虾发病时，可以增加换水频率和换水量，促进蜕壳；合理使用杀虫剂。',
      },
    ],
    [
      {
        name: '软壳病',
        otherName: '软壳病',
        mouth: '4~5',
        type: 2,
        img: 'hbb',
        symptom: '病虾甲壳明显变软，体形消瘦,活动减弱,生长缓慢,并有死亡现象。',
        reason: '由池塘水质老化,有机质过多或放养密度过大,值低及营养长期不足，水质恶化等原因引起。',
        preventMethod: '大量换新水以改善水质;在投喂的饲料中拌维生素、抗生素等药物增加抗病能力。',
      },
      {
        name: '虾苗白浊病',
        otherName: '肌肉坏死病',
        mouth: '4~6',
        type: 2,
        img: 'xmbzb',
        symptom:
          '罗氏沼虾肌肉白浊病的主要症状为虾体腹节肌肉呈现乳白色的混浊状。疾病早期通常先在第四腹节背部肌肉呈现一米粒状乳白色混浊斑点；随着病情加重，混浊斑点先向虾体后段扩展至尾节基部，然后再逐渐向第三、二、一腹节扩展，直至病虾除头胸部和尾节外，腹节的肌肉全呈乳白色混浊状。患病个体活力明显减弱，在池塘中多呆滞栖息于池边浅水区的草丛上，摄食减少直至停食死亡。在溞状幼体阶段，健康幼体在水中通常集群作旋转状游动。患病初期则作不集群的分散沉浮游动，随后食欲减退，体色无光泽，逐渐变黑，最后沉卧池底而死。',
        reason:
          '罗氏沼虾肌肉白浊病的病原为诺达病毒。该病毒颗粒为球形，直径24纳米，无囊膜，对氯仿抵抗，病毒核酸对核糖核酸核酸酶敏感、对脱氧核糖核酸核酸酶抵抗、对单链特异性SI核酸酶敏感，为单链核糖核酸病毒；病毒核酸由2个片段组成，分别为3.0kb和3.1kb。',
        preventMethod:
          '选择没有罗氏沼虾肌肉白浊病病史的养殖地区的罗氏沼虾作为亲虾，进行培育，可以控制该疾病的发生。对引进留种的虾苗，在结合病毒检测的同时，对虾苗进行15～30天的隔离暂养，如检测呈阴性同时未发现白浊病的症状，则可留作培养种虾。在疾病流行严重的地区，育苗车间的所有用具都应严格消毒。 完全淡化后的仔虾肥水下塘，定期泼“养殖保”等益生菌。 仔虾培育池，先将水变肥，透明度在30～40厘米时，再外泼一种复方消毒药，每立方米水体放药0.5～1毫克，同时内服药饲（虾健康1号或强克99），并在饲料中添加维生素C，可取得较好的治疗效果。',
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

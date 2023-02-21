<template>
  <div class="footer">
    <div
      class="choose-bar"
      :class="chooseIndex === index ? 'isChoose' : ''"
      v-for="(item, index) in chooseList"
      :key="index"
      @click="handleChoose(item, index)"
    >
      <div class="img-box">
        <img :src="getImgUrl(item.icon)" class="icon" />
        <span class="name">{{ item.name }}</span>
      </div>
      <img :src="chooseIndex === index ? getImgUrl(item.chooseBg) : getImgUrl(item.bg)" class="bg" />
    </div>

    <img src="@/assets/image/common/footer.png" class="footer-img" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  chooseList.map((it, index) => {
    if (route.path === it.url) {
      chooseIndex.value = index;
    }
  });
});

onBeforeRouteUpdate((to) => {
  if (to.path === '/index') {
    chooseIndex.value = 0;
  }
});

const chooseList = [
  {
    icon: 'cyyq',
    name: '产业园区',
    url: '/index',
    bg: 'cyyq_not',
    chooseBg: 'cyyq_c',
  },
  {
    icon: 'zhyz',
    name: '智慧养殖',
    url: '/breed',
    bg: 'zhyz_not',
    chooseBg: 'zhyz_c',
  },
  {
    icon: 'scpp',
    name: '市场品牌',
    url: '/market',
    bg: 'scpp_not',
    chooseBg: 'scpp_c',
  },
  {
    icon: 'szsw',
    name: '数字塘口',
    url: '/digital',
    bg: 'szsw_not',
    chooseBg: 'szsw_c',
  },
];

let chooseIndex = ref(0);

const handleChoose = (item: any, index: number) => {
  chooseIndex.value = index;
  router.push(item.url);
};

const getImgUrl = (url: string) => {
  return new URL(`../assets/image/common/${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 542px;

  .choose-bar {
    font-size: 16px;
    color: rgba(254, 255, 255, 0.8);
    cursor: pointer;
    position: absolute;
    text-align: center;
    white-space: nowrap;
    z-index: 5;
    transform: translateX(-50%);

    &:nth-of-type(1) {
      left: 9%;
      bottom: 0;
    }
    &:nth-of-type(2) {
      left: 36.5%;
      bottom: 26px;
    }
    &:nth-of-type(3) {
      left: 63.7%;
      bottom: 26px;
    }
    &:nth-of-type(4) {
      left: 91%;
      bottom: 3px;
    }

    .img-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .icon {
      width: 37px;
      margin: 0 auto 14px;
    }

    .bg {
      width: 140px;
    }
  }

  .isChoose {
    font-size: 18px;
    font-weight: 800;
    color: #feffff;

    .icon {
      width: 53px;
    }
  }
}

.footer-img {
  width: 100%;
}
</style>

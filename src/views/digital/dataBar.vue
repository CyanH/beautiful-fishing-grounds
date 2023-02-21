<template>
  <div class="data-bar flex-between animate__animated animate__fadeInDown">
    <div v-for="item in state.list" class="flex">
      <div class="box">
        <img src="@/assets/image/industrialPark/out_circle.png" class="out" />
        <img src="@/assets/image/industrialPark/inner_circle.png" class="inner" />
        <img :src="getImgUrl(item.icon)" class="icon" />
      </div>
      <div>
        <div class="name">{{ item.name }}</div>
        <div>
          <span class="num value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { pondPageHome } from '@/api/digital';

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
});

const state = reactive({
  list: [
    {
      icon: 'yzmj',
      name: '塘口面积',
      value: 10,
      unit: '亩',
    },
    {
      icon: 'tkdn',
      name: '塘口档案',
      value: 5,
      unit: '个',
    },

    {
      icon: 'ncl',
      name: '年产量',
      value: 2,
      unit: '吨',
    },
    {
      icon: 'ncz',
      name: '年产值',
      value: 6031,
      unit: '万元',
    },
  ],
});

watch(
  () => props.form,
  () => {
    pondPageHome({ plantBaseId: props.form.id }).then((res: any) => {
      state.list[0].value = res.baseArea;
      state.list[1].value = res.massifSize;
      state.list[2].value = res.sumAmount;
      state.list[3].value = res.sumPrice;
    });
  }
);

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/digital/icon_${url}.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.data-bar {
  position: absolute;
  top: 15px;
  background: linear-gradient(
    to right,
    transparent 0,
    rgba(17, 16, 45, 0.4) 1%,
    rgba(17, 16, 45, 0.6) 10%,
    rgba(17, 16, 45, 0.6) 90%,
    rgba(17, 16, 45, 0.4) 99%,
    transparent 100%
  );
  padding: 15px 20px;
  left: 27%;
  right: 27%;
  z-index: 9;

  .box {
    position: relative;
    margin-right: 10px;

    .out {
      width: 56px;
      animation: rotation 5s infinite linear;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 32px;
      animation: inrotation 5s infinite linear;
    }

    @keyframes inrotation {
      0% {
        transform: translate(-50%, -50%) rotate(360deg);
      }

      100% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 21px;
      height: 21px;
    }
  }

  .name {
    font-size: 14px;
    color: #b9b9b9;
  }

  .value {
    font-size: 28px;
    color: #00f6ff;
  }

  .unit {
    font-size: 12px;
    color: rgba(0, 246, 255, 0.64);
    padding-left: 5px;
  }
}
</style>

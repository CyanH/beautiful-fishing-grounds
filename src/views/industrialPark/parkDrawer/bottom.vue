<template>
  <div>
    <div class="title">主导产业产品销售额</div>
    <div class="flex progress">
      <div style="flex: 1" class="box">
        <div v-for="(item, index) in state.list" class="flex" style="margin-bottom: 5px">
          <span class="label">{{ item.title }}</span>

          <div class="progress-bar">
            <div class="el-progress-bar__outer">
              <div
                class="el-progress-bar__inner"
                style=""
                :style="{
                  width: item.bl + 'px',
                  background: `linear-gradient(to right, rgba(219, 255, 248, 0.12), ${item.color}`,
                }"
              ></div>
            </div>
          </div>
          <div class="value">
            <span class="num">{{ item.money }}</span
            ><span>万元</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="right">
        <div>
          <span class="num">{{ mainCyProductMoney }}</span
          ><span class="unit">万元</span>
        </div>
        <div class="name">销售总额</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getCyyXsManagement } from '@/api/industrial';

let offlineMoney = ref(0);
let onlineMoney = ref(0);
let mainCyProductMoney = ref(1);

const state = reactive({
  list: [
    {
      title: '线上销售额',
      money: 0,
      bl: 0,
      color: '#5782FF',
    },
    {
      title: '线下销售额',
      money: 0,
      bl: 0,
      color: '#FFB852',
    },
  ] as any,
});

onMounted(() => {
  getData();
});

const getData = () => {
  getCyyXsManagement({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    offlineMoney.value = data.offlineMoney;
    onlineMoney.value = data.onlineMoney;
    mainCyProductMoney.value = data.mainCyProductMoney;
    state.list[0].money = data.offlineMoney;
    state.list[0].bl = (data.offlineMoney / data.mainCyProductMoney) * 100;
    state.list[1].money = data.onlineMoney;
    state.list[1].bl = (data.onlineMoney / data.mainCyProductMoney) * 100;
  });
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  color: #fff;
}

.box {
  width: 100%;
  .progress-bar {
    width: 50%;

    .el-progress-bar__outer {
      height: 10px;
      border-radius: 5px;
      background-color: rgba(219, 255, 248, 0.12);

      .el-progress-bar__inner {
        border-radius: 25px;
        top: 50%;
        transform: translateY(-50%);

        &::after {
          position: absolute;
          border-radius: 25px;
          width: 100%;
          left: -100%;
          background: inherit;
          animation: progress-bar-stripes 3s linear 2s infinite;
        }

        @keyframes progress-bar-stripes {
          0% {
            left: -100%;
          }
          to {
            left: 0;
          }
        }
      }
    }
  }
}
.progress {
  margin-top: 10px;
  .label {
    color: #fff;
    font-size: 14px;
    padding-right: 15px;
  }

  .value {
    color: #b5b5b5;
    font-size: 12px;
    padding-left: 15px;

    .num {
      font-size: 20px;
      color: #fff;
      padding-right: 5px;
    }
  }
  .split {
    width: 2px;
    height: 56px;
    background: linear-gradient(
      to bottom,
      transparent 0,
      rgba(0, 255, 159, 0.3) 45%,
      rgba(0, 255, 159, 0.3) 55%,
      transparent 100%
    );
    margin: 0 20px;
  }
  .right {
    .num {
      font-size: 26px;
      color: #00f6ff;
      padding-right: 5px;
    }

    .unit {
      color: #57b7a4;
    }

    .name {
      color: #fff;
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div class="flex">
    <div style="flex: 1">
      <div>
        <div class="name">园内农民人均可支配收入</div>
        <div style="margin-top: 5px">
          <span class="num">{{ avgIncome }}</span>
          <span class="unit">元</span>
        </div>
      </div>
      <div style="margin-top: 12px">
        <div class="name">园所在县农民人均可支配收入</div>
        <div style="margin-top: 5px">
          <span class="num">{{ countyAvgIncome }}</span>
          <span class="unit">元</span>
        </div>
      </div>
    </div>
    <div class="radar">
      <img src="@/assets/image/industrialPark/bottom.png" class="radar-img" />
      <img src="@/assets/image/industrialPark/circle_b.png" class="circle" />
      <img src="@/assets/image/industrialPark/circle_b.png" class="circle delay" />

      <img src="@/assets/image/industrialPark/line_b.png" class="line line1" />
      <img src="@/assets/image/industrialPark/line_b.png" class="line line2" />
      <img src="@/assets/image/industrialPark/line_s.png" class="line line3" />
      <img src="@/assets/image/industrialPark/line_s.png" class="line line4" />
      <img src="@/assets/image/industrialPark/line_b.png" class="line line5" />
      <div class="num">{{ percent }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLndnManagement } from '@/api/industrial';
import { onMounted, ref } from 'vue';

let avgIncome = ref(23300);
let countyAvgIncome = ref(19832);
let percent = ref('100%');

onMounted(() => {
  getLndnManagement({ year: new Date().getFullYear() }).then((res: any) => {
    let data = res.content[0];
    avgIncome.value = data.avgIncome;
    countyAvgIncome.value = data.countyAvgIncome;
    percent.value = data.percent;
  });
});
</script>

<style lang="scss" scoped>
.name {
  font-size: 17px;
  color: #fff;
}
.num {
  font-size: 26px;
  color: #00f6ff;
}

.unit {
  color: #57b7a4;
}

.radar {
  position: relative;
  width: 160px;

  .radar-img {
    width: 100%;
  }

  .num {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    font-family: 'DIN';
  }

  .circle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 179px;
    animation: rise 5s infinite linear;

    @keyframes rise {
      0% {
        top: 60%;
        width: 50%;
      }

      100% {
        top: 0;
        width: 100%;
      }
    }
  }

  .delay {
    animation-delay: 2.5s;
  }

  .line {
    position: absolute;
    transform: translateX(-50%);
  }
  .line1 {
    left: 20%;
    animation: fly1 5s infinite linear;

    @keyframes fly1 {
      0% {
        top: 55%;
      }

      100% {
        top: 15%;
        opacity: 0.2;
      }
    }
  }
  .line2 {
    left: 50%;
    animation: fly2 4s infinite linear;

    @keyframes fly2 {
      0% {
        top: 40%;
      }

      100% {
        top: 15%;
        opacity: 0.2;
      }
    }
  }

  .line3 {
    left: 35%;
    animation: fly3 6s infinite linear;

    @keyframes fly3 {
      0% {
        top: 55%;
      }

      100% {
        top: 5%;
        opacity: 0.5;
      }
    }
  }
  .line4 {
    left: 65%;
    animation: fly4 5s infinite linear;

    @keyframes fly4 {
      0% {
        top: 55%;
      }

      100% {
        top: 8%;
        opacity: 0.5;
      }
    }
  }
  .line5 {
    left: 80%;
    animation: fly5 4s infinite linear;

    @keyframes fly5 {
      0% {
        top: 50%;
      }

      100% {
        top: 12%;
        opacity: 0.3;
      }
    }
  }
}
</style>

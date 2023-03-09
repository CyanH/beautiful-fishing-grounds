<template>
  <!-- 池塘 -->
  <div class="canvas-box" id="canvasBox">
    <canvas id="myCanvas" ref="myCanvas"> </canvas>
  </div>

  <div class="pond" v-for="item in state.pondList" :style="{ left: item.left, bottom: item.bottom }">
    <div class="title">{{ item.name }}</div>
    <div style="margin-bottom: 8px">面积：{{ item.area }}亩</div>
    <div>预估产量：{{ item.num }}公斤</div>
  </div>

  <!-- 气象站 -->
  <div
    v-for="item in state.qxzList"
    class="container"
    :style="{ left: item.left, bottom: item.bottom }"
    @mouseover="setIndex(item.id, true)"
    @mouseout="setIndex(item.id, false)"
  >
    <div class="card qxz" :id="item.id">
      <el-button class="closeBtn" @click="handleClose(item.id)" :icon="CircleCloseFilled"></el-button>
      <div class="title">{{ item.name }}</div>
      <div>
        <span style="color: #b9b9b9; padding-right: 10px">更新时间</span>
        <span>{{ item.date }}</span>
      </div>
      <div class="flex" style="flex-wrap: wrap">
        <div v-for="cItem in item.weatherData" class="bar">
          <div class="flex">
            <svg-icon :name="cItem.svgname"></svg-icon>
            <div class="name">{{ cItem.name }}</div>
          </div>
          <div style="padding-top: 6px">
            <span class="num">{{ cItem.value }}</span>
            <span class="unit">{{ cItem.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <img src="@/assets/image/breed/ico_qxz.svg" class="icon" @click="handleClick(item)" />
  </div>
  <!-- 水质 -->
  <div
    v-for="item in state.szList"
    class="container"
    :style="{ left: item.left, top: item.top }"
    @mouseover="setIndex(item.id, true)"
    @mouseout="setIndex(item.id, false)"
  >
    <div class="card sz" :id="item.id">
      <el-button class="closeBtn" @click="handleClose(item.id)" :icon="CircleCloseFilled"></el-button>
      <div class="title">{{ item.name }}</div>
      <div>
        <span style="color: #b9b9b9; padding-right: 10px">更新时间</span>
        <span>{{ item.date }}</span>
      </div>
      <div class="flex" style="flex-wrap: wrap">
        <div v-for="cItem in item.data" class="bar water">
          <div class="flex">
            <svg-icon :name="cItem.svgname"></svg-icon>
            <div class="name">{{ cItem.name }}</div>
          </div>
          <div style="padding-top: 6px">
            <span class="num">{{ cItem.value }}</span>
            <span class="unit">{{ cItem.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <img src="@/assets/image/breed/ico_sz.svg" class="icon" @click="handleClick(item)" />
  </div>

  <!-- 摄像头 -->
  <!-- <div v-for="item in state.sxtList" class="container" :style="{ left: item.left, top: item.top }">
    <img src="@/assets/image/breed/ico_sxt.svg" class="icon sxt" @click="handleClick(item)" />
  </div> -->
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import { useBreedStore } from '@/store';
import emitter from '@/utils/eventbus';
import axios from 'axios';
import { waterNewData, weatherNewData } from '@/api/breed';
const breedStore = useBreedStore();

const flag = ref(false);
const totalRect = ref<any>([]); //画的所有的矩形坐标长度数据存储在数组中
const ctx = ref();
const canvas = ref(null);
const myCanvas = ref<HTMLCanvasElement | null>(null);
const state = reactive({
  pondList: [
    {
      name: '塘口一',
      area: 6.2,
      num: 580,
      left: '70%',
      bottom: '20%',
    },
    {
      name: '塘口二',
      area: 4.7,
      num: 470,
      left: '70%',
      bottom: '50%',
    },
    {
      name: '塘口三',
      area: 4.7,
      num: 470,
      left: '60%',
      bottom: '55%',
    },
    {
      name: '塘口四',
      area: 4.7,
      num: 470,
      left: '20%',
      bottom: '28%',
    },
    {
      name: '塘口五',
      area: 4.7,
      num: 470,
      left: '25%',
      bottom: '50%',
    },
  ],
  qxzList: [
    {
      id: '40236136',
      name: '美丽虾场气象站',
      date: '2023-03-27 09:08:56',
      left: '42%',
      bottom: '28%',
      type: 'qxz',
      weatherData: [
        {
          svgname: 'wd',
          name: '温度',
          value: 18.4,
          unit: '℃',
        },
        {
          svgname: 'sd',
          name: '湿度',
          value: 75,
          unit: '%',
        },
        {
          svgname: 'jy',
          name: '雨量',
          value: 0.5,
          unit: 'mm',
        },
        {
          svgname: 'fs',
          name: '风速',
          value: 8,
          unit: 'm/s',
        },
        {
          svgname: 'gz',
          name: '光照',
          value: 58,
          unit: 'lux',
        },
        {
          svgname: 'fx',
          name: '风向',
          value: '北',
          unit: '',
        },
      ],
    },
  ],
  szList: [
    {
      id: '40241986',
      name: '水质监测',
      date: '2023-03-27 09:08:56',
      left: '50%',
      top: '39%',
      type: 'sz',
      data: [
        {
          svgname: 'wd',
          name: '水温',
          value: 18.4,
          unit: '℃',
        },
        {
          svgname: 'ph',
          name: 'pH值',
          value: 75,
          unit: '',
        },
        {
          svgname: 'rjy',
          name: '溶解氧',
          value: 0.5,
          unit: 'mg/L',
        },
        {
          svgname: 'ddl',
          name: '电导率',
          value: 8,
          unit: 'ms/cm',
        },
        {
          svgname: 'zd',
          name: '浊度',
          value: 58,
          unit: 'NTU',
        },
        {
          svgname: 'zjd',
          name: '总碱度',
          value: 8.1,
          unit: 'mmol/L',
        },
        {
          svgname: 'yd',
          name: '硬度',
          value: 58,
          unit: 'mg/L',
        },
      ],
    },
  ],
  sxtList: [
    {
      id: 'lkjs6f32710840c1a1ac1121bb5aac22',
      name: '美丽虾场摄像头二',
      left: '52%',
      top: '39%',
      type: 'sxt',
    },
    {
      id: 'lkjs6f32710840c1a1ac1121bb5aac41',
      name: '美丽虾场摄像头三',
      left: '43%',
      top: '65%',
      type: 'sxt',
    },
  ],
});

onMounted(() => {
  if (myCanvas.value) ctx.value = myCanvas.value.getContext('2d');
  let dom = document.getElementById('canvasBox') as HTMLElement;
  myCanvas.value?.setAttribute('width', dom?.offsetWidth.toString());
  myCanvas.value?.setAttribute('height', dom?.offsetHeight.toString());
  drawPondLine();

  getData();
});

const getData = () => {
  weatherNewData({ plantWlwId: '40236136' }).then((res: any) => {
    state.qxzList[0].weatherData[0].value = res.content.temp;
    state.qxzList[0].weatherData[1].value = res.content.humi;
    state.qxzList[0].weatherData[2].value = res.content.rain;
    state.qxzList[0].weatherData[3].value = res.content.speed;
    state.qxzList[0].weatherData[4].value = res.content.raid;
    state.qxzList[0].weatherData[5].value = res.content.windDirection;
  });

  waterNewData({ plantWlwId: '40241986' }).then((res: any) => {
    state.szList[0].data[0].value = res.content.temp;
    state.szList[0].data[1].value = res.content.ph;
    state.szList[0].data[2].value = res.content.oxy;
    state.szList[0].data[3].value = res.content.ddl;
    state.szList[0].data[4].value = res.content.zd;
  });
};

const drawPondLine = () => {
  axios.get('data/pondLine.json').then((res) => {
    // 线条颜色颜色
    ctx.value.strokeStyle = '#66ccff';
    // 线宽设置，必须放在绘制之前
    ctx.value.lineWidth = 2;
    ctx.value.beginPath();
    res.data.map((item: { start: any; path: any }) => {
      let start = item.start;
      let path = item.path;
      ctx.value.moveTo(start.x, start.y);
      path.map((it: { x: number; y: number }) => {
        ctx.value.lineTo(it.x, it.y);
        ctx.value.stroke();
      });
    });
  });
};

// 鼠标落下
const mousedown = (e: Event | any) => {
  console.log('鼠标落下');
  flag.value = true;
  // 线条颜色颜色
  ctx.value.strokeStyle = '#66ccff';
  // 线宽设置，必须放在绘制之前
  ctx.value.lineWidth = 2;
  ctx.value.beginPath();
  console.log('开始位置', e.offsetX, e.offsetY);
  ctx.value.moveTo(e.offsetX, e.offsetY);
  totalRect.value.push({ x: e.offsetX, y: e.offsetY });
  mousemove(e);
};
// 抬起鼠标
const mouseup = (e: Event | any) => {
  console.log('画完');
  flag.value = false;
  console.log(JSON.stringify(totalRect.value));
};
// 移动鼠标
const mousemove = (e: Event | any) => {
  if (flag.value) {
    ctx.value.lineTo(e.offsetX, e.offsetY);
    totalRect.value.push({ x: e.offsetX, y: e.offsetY });

    ctx.value.stroke();
  }
};

const setIndex = (id: string, statu: boolean) => {
  if (statu) {
    document.getElementById(id)!.style.zIndex = '9';
  } else {
    document.getElementById(id)!.style.zIndex = '8';
  }
};

const handleClick = (item: { id: string; name: string; type: string }) => {
  breedStore.setEquipId(item.id);
  breedStore.setEquipName(item.name);
  emitter.emit('setRightDrawer', item.type);
  if (document.getElementById(item.id)) document.getElementById(item.id)!.style.display = 'block';
};

const handleClose = (id: string) => {
  document.getElementById(id)!.style.display = 'none';
};
</script>

<style lang="scss" scoped>
.canvas-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 7;
}

.container {
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 8;

  .icon {
    position: relative;
    left: 47%;
    transform: translateX(-50%);
    width: 35px;
    cursor: pointer;
  }

  .sxt {
    width: 26px;
  }

  .card {
    position: absolute;
    bottom: 100%;
    transform: translateX(50%);
    right: 35%;
    padding: 15px 20px 25px;
    background: url('@/assets/image/digital/card.png') center no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 14px;
    font-family: PingFangSC;

    .closeBtn {
      position: absolute;
      right: 10px;
      top: 8px;
      padding: 0;
      background: transparent;
      border: 0;
      color: #ddfff7;
      font-size: 24px;
      z-index: 9;
      cursor: pointer;

      &:hover {
        background: transparent;
        color: #ddfff7;
      }
    }

    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .bar {
      margin-top: 1.5vh;

      .svg-icon {
        color: #fff;
        width: 20px;
        height: 20px;
      }

      .num {
        color: #00ffcc;
        font-size: 24px;
      }

      .unit {
        font-size: 14px;
        color: #00ffcc;
        padding-left: 5px;
      }
    }
  }

  .qxz {
    width: 260px;

    .bar:not(:nth-of-type(3n)) {
      width: 98px;
    }
  }

  .sz {
    width: 380px;

    .bar:not(:nth-of-type(4n)) {
      width: 98px;
    }
  }
}

.pond {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 12px 15px 20px;
  background: url('@/assets/image/digital/card.png') center no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC;
  z-index: 8;

  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>

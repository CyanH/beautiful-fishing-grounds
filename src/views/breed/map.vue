<template>
  <div class="legend" v-show="legendShow">
    <div
      v-for="(item, index) in state.legend"
      class="flex bar"
      :style="{ color: chooseIndex === index ? '#00f6ff' : '' }"
      @click="handleClick(index)"
    >
      <img :src="getImgUrl(item.icon)" class="icon" />
      <div>
        <span>{{ item.name }}</span>
        <span v-if="item.value">({{ item.value }})</span>
      </div>
    </div>
    <div style="text-align: center">
      <el-icon style="cursor: pointer" @click="legendShow = false"><ArrowUp /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useBreedStore, useCommonStore } from '@/store';
import emitter from '@/utils/eventbus';
import qxzImg from '@/assets/image/breed/ico_qxz.svg';
import szImg from '@/assets/image/breed/ico_sz.svg';
import sxtImg from '@/assets/image/breed/ico_sxt.svg';
import cfImg from '@/assets/image/breed/store.png';
import { ArrowUp } from '@element-plus/icons-vue';
const baseLayer = new mars3d.layer.GraphicLayer();
const pondLayer = new mars3d.layer.GraphicLayer();
const equipLayer = new mars3d.layer.GraphicLayer();
const quanLayer = new mars3d.layer.GraphicLayer();
const commonStore = useCommonStore();
const breedStore = useBreedStore();

const legendShow = ref(true);
const chooseIndex = ref(0);
const state = reactive({
  she_b: [
    {
      name: '气象站一',
      lng: 112.610074,
      lat: 23.010876,
      img: qxzImg,
      type: 'qxz',
      id: '40214754',
    },
    {
      name: '气象站二',
      lng: 112.609087,
      lat: 23.002071,
      img: qxzImg,
      type: 'qxz',
      id: '40214755',
    },
    {
      name: '气象站三',
      lng: 112.602989,
      lat: 23.013243,
      img: qxzImg,
      type: 'qxz',
      id: '40236129',
    },
    {
      name: '水质一',
      lng: 112.605874,
      lat: 23.010711,
      img: szImg,
      type: 'sz',
      id: '21048579',
    },
    {
      name: '水质二',
      lng: 112.600226,
      lat: 22.997402,
      img: szImg,
      type: 'sz',
      id: '21048581',
    },
    {
      name: '摄像头二',
      lng: 112.609981,
      lat: 23.005686,
      img: sxtImg,
      type: 'sxt',
      id: '6ba781c68c87465cbc82852ca4fff7b7',
    },
    {
      name: '摄像头一',
      lng: 112.595893,
      lat: 23.000239,
      img: sxtImg,
      type: 'sxt',
      id: '9df56f32710840c1a1ac1121bb5aac48',
    },
  ],
  legend: [
    {
      icon: 'ico_all.png',
      name: '全部',
    },
    {
      icon: 'ico_qxz.png',
      name: '气象设备',
      value: 3,
    },
    {
      icon: 'ico_sz.png',
      name: '水质监测',
      value: 2,
    },
    {
      icon: 'ico_sxt.png',
      name: '视频监控',
      value: 2,
    },
  ],
});

onMounted(() => {
  mars3d.Util.fetchJson({ url: 'config/breedConfig.json' }).then((data: any) => {
    commonStore.map?.setOptions(data.map3d);
    commonStore.map!.basemap = 2021;
    createLayer();
  });
});

//初始化地图
const createLayer = () => {
  //基地
  commonStore.map?.addLayer(baseLayer);
  axios.get('data/base.json').then((res) => {
    res.data.map((it: { positions: any[]; name: string }) => {
      const graphic = new mars3d.graphic.PolygonEntity({
        positions: it.positions,
        style: {
          color: '#4a8df8',
          opacity: 0,
          outline: true,
          outlineWidth: 2,
          outlineColor: '#00f6ff',
          label: {
            text: it.name,
            font_size: 36,
            font_family: '楷体',
            color: '#f00',
            outline: true,
            outlineColor: '#fff',
            outlineWidth: 1,
            scaleByDistance: true,
            scaleByDistance_far: 30000,
            scaleByDistance_near: 1,
          },
        },
      });
      baseLayer.addGraphic(graphic);
    });
  });
  const cfGraphic = new mars3d.graphic.BillboardEntity({
    position: new mars3d.LngLatPoint(112.601342, 23.001034, 0), // 经纬度
    style: {
      image: cfImg,
      scale: 0.4,
      clampToGround: true,
      scaleByDistance: true,
      scaleByDistance_far: 1000000,
      scaleByDistance_near: 1,
    },
  });
  baseLayer.addGraphic(cfGraphic);

  //池塘
  commonStore.map?.addLayer(pondLayer);
  axios.get('data/pond.json').then((res) => {
    res.data.map((it: { positions: any[]; name: string }) => {
      const graphic = new mars3d.graphic.PolygonEntity({
        positions: it.positions,
        style: {
          color: '#3891ff',
          opacity: 0.2,
          outline: true,
          outlineWidth: 2,
          outlineColor: '#3891ff',
          outlineOpacity: 0.5,
        },
      });
      pondLayer.addGraphic(graphic);
    });
  });

  // 设备&圈
  commonStore.map?.addLayer(equipLayer);
  commonStore.map?.addLayer(quanLayer);
  state.she_b.map((it) => {
    let pixe = [] as any;
    if (it.type == 'qxz') {
      pixe = [-4, -25];
    } else if (it.type == 'sz') {
      pixe = [0, -15];
    } else if (it.type == 'sxt') {
      pixe = [5, -25];
    }
    // 添加图标
    let graphic = new mars3d.graphic.BillboardEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat, 0), // 经纬度
      attr: it, // 这个图标的信息
      style: {
        image: it.img,
        scale: 0.5,
        clampToGround: true,
        scaleByDistance: true,
        scaleByDistance_far: 1000000,
        scaleByDistance_near: 1,
        pixelOffset: pixe, // [] 负左 正右 负上正下
        tooltip: it.name,
        highlight: {
          type: mars3d.EventType.click,
          // color: "#ffff00",
          scale: 0.7,
        },
      },
    });
    // 圆 CircleEntity
    const circle = new mars3d.graphic.CircleEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat, 0),
      attr: it, // 这个图标的信息
      style: {
        radius: 80.0, // 大小
        materialType: mars3d.MaterialType.CircleWave, // 类型：圆形: 波纹扩散
        materialOptions: {
          color: 'rgb(0,255,255)',
          count: 2, // 单个圆圈
          speed: 8, // 速度，越大越快
        },
      },
    });
    quanLayer.addGraphic(circle);
    equipLayer.addGraphic(graphic);
  });

  //塘口点击
  pondLayer.on(mars3d.EventType.click, (event) => {
    emitter.emit('setRightDrawer', 'pond');
  });

  //设备点击
  equipLayer.on(mars3d.EventType.click, (event) => {
    const attr = event.graphic.attr;
    breedStore.setEquipId(attr.id);
    breedStore.setEquipName(attr.name);
    emitter.emit('setRightDrawer', attr.type);
  });

  // 鼠标移入信息窗
  equipLayer.bindTooltip(
    (event) => {
      const attr = event.graphic.attr;
      return attr.name;
    },
    {
      offsetY: -40,
    }
  );
};

//图例选择过滤
const handleClick = (index: number) => {
  chooseIndex.value = index;
  const graphicArr = equipLayer.getGraphics();
  graphicArr.map((entity) => {
    entity.show = false;
    if (index === 0) {
      entity.show = true;
    } else if (index === 1 && entity.attr.type === 'qxz') {
      entity.show = true;
    } else if (index === 2 && entity.attr.type === 'sz') {
      entity.show = true;
    } else if (index === 3 && entity.attr.type === 'sxt') {
      entity.show = true;
    }
  });

  const circleArr = quanLayer.getGraphics();
  circleArr.map((entity) => {
    entity.show = false;
    if (index === 0) {
      entity.show = true;
    } else if (index === 1 && entity.attr.type === 'qxz') {
      entity.show = true;
    } else if (index === 2 && entity.attr.type === 'sz') {
      entity.show = true;
    } else if (index === 3 && entity.attr.type === 'sxt') {
      entity.show = true;
    }
  });
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}`, import.meta.url).href;
};

onUnmounted(() => {
  commonStore.map?.removeLayer(baseLayer);
  commonStore.map?.removeLayer(pondLayer);
  commonStore.map?.removeLayer(equipLayer);
  commonStore.map?.removeLayer(quanLayer);
});
</script>

<style lang="scss" scoped>
.legend {
  position: absolute;
  right: 27%;
  top: 10px;
  font-size: 16px;
  background-color: rgba(17, 16, 45, 0.6);
  border-radius: 2px;
  padding: 20px 20px 10px;
  z-index: 9;
  .bar {
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .icon {
    width: 20px;
    margin-right: 12px;
  }
}
</style>

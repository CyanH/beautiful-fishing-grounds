<template></template>

<script setup lang="ts">
import { useBreedStore, useCommonStore } from '@/store';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted, reactive } from 'vue';
import emitter from '@/utils/eventbus';
import mapImg from '@/assets/image/industrialPark/map.png';
import qxzImg from '@/assets/image/breed/ico_qxz.svg';
import szImg from '@/assets/image/breed/ico_sz.svg';
import sxtImg from '@/assets/image/breed/ico_sxt.svg';
const commonStore = useCommonStore();
const breedStore = useBreedStore();
const graphicLayer = new mars3d.layer.GraphicLayer();
const equipLayer = new mars3d.layer.GraphicLayer();
const quanLayer = new mars3d.layer.GraphicLayer();
let wall: mars3d.layer.GeoJsonLayer;
let lineLayer: mars3d.layer.GeoJsonLayer;

const state = reactive({
  equip: [
    {
      name: '气象站一',
      lng: 112.483902,
      lat: 22.98053,
      img: qxzImg,
      type: 'qxz',
      id: '40214754',
    },
    {
      name: '气象站二',
      lng: 112.54415,
      lat: 23.013984,
      img: qxzImg,
      type: 'qxz',
      id: '40214755',
    },
    {
      name: '气象站三',
      lng: 112.608403,
      lat: 22.997669,
      img: qxzImg,
      type: 'qxz',
      id: '40236129',
    },
    {
      name: '水质一',
      lng: 112.573806,
      lat: 22.940526,
      img: szImg,
      type: 'sz',
      id: '21048579',
    },
    {
      name: '水质二',
      lng: 112.52251,
      lat: 22.94918,
      img: szImg,
      type: 'sz',
      id: '21048581',
    },
    {
      name: '摄像头二',
      lng: 112.54036,
      lat: 22.986232,
      img: sxtImg,
      type: 'sxt',
      id: '6ba781c68c87465cbc82852ca4fff7b7',
    },
    {
      name: '摄像头一',
      lng: 112.595962,
      lat: 23.001834,
      img: sxtImg,
      type: 'sxt',
      id: '9df56f32710840c1a1ac1121bb5aac48',
    },
  ],
});

onMounted(() => {
  mars3d.Util.fetchJson({ url: 'config/config.json' }).then((data: any) => {
    commonStore.map?.setOptions(data.map3d);
    commonStore.map!.fixedLight = false;

    createLayer();
  });
});

//初始化地图
const createLayer = () => {
  // 添加对象
  addMap();
  createEquip();
};

const diffHeight = -2000;
const addMap = () => {
  // 安徽省卫星底图
  const imageGraphic = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [112.18035, 22.77240718],
      [112.82898324999999, 23.43693033],
    ],
    style: {
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: mapImg,
        opacity: 0.9,
      },
    },
  });
  graphicLayer.addGraphic(imageGraphic);
  commonStore.map?.addLayer(graphicLayer);

  wall = new mars3d.layer.GeoJsonLayer({
    name: '边界墙',
    url: 'data/441283.json',
    symbol: {
      type: 'wallP',
      styleOptions: {
        diffHeight: diffHeight, // 墙高
        materialType: mars3d.MaterialType.ODLine,
        materialOptions: {
          speed: 2,
        },
      },
    },
  });
  commonStore.map?.addLayer(wall);

  lineLayer = new mars3d.layer.GeoJsonLayer({
    name: '高要区边界线',
    url: 'data/cityName.json',
    zIndex: 9,
    symbol: {
      type: 'polyline',
      styleOptions: {
        color: 'white',
        width: 1,
      },
      styleField: 'name',
    },
  });
  commonStore.map?.addLayer(lineLayer);
};

const createEquip = () => {
  commonStore.map?.addLayer(equipLayer);
  commonStore.map?.addLayer(quanLayer);
  state.equip.map((it) => {
    let pixe = [] as any;
    if (it.type == 'qxz') {
      pixe = [-4, -25];
    } else if (it.type == 'sz') {
      pixe = [0, -15];
    } else if (it.type == 'sxt') {
      pixe = [5, -25];
    }
    // 添加图标
    const graphic = new mars3d.graphic.BillboardEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat, 0), // 经纬度
      attr: it, // 这个图标的信息
      style: {
        image: it.img,
        scale: 0.7,

        scaleByDistance: true,
        scaleByDistance_far: 1000000,
        scaleByDistance_near: 1,
        pixelOffset: pixe, // [] 负左 正右 负上正下
        tooltip: it.name,
        highlight: {
          type: mars3d.EventType.click,
          // color: "#ffff00",
          scale: 1,
        },
      },
    });
    // 圆 CircleEntity
    const circle = new mars3d.graphic.CircleEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat, 0),
      attr: it, // 这个图标的信息
      style: {
        radius: 900.0, // 大小
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

onUnmounted(() => {
  commonStore.map?.removeLayer(graphicLayer);
  commonStore.map?.removeLayer(equipLayer);
  commonStore.map?.removeLayer(quanLayer);
  commonStore.map?.removeLayer(wall);
  commonStore.map?.removeLayer(lineLayer);
});
</script>

<style lang="scss" scoped></style>

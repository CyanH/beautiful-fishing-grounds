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
const equipLayer = new mars3d.layer.GraphicLayer({ show: false });
let wall: mars3d.layer.GeoJsonLayer;
let lineLayer: mars3d.layer.GeoJsonLayer;
let chooseGraphic: mars3d.graphic.BillboardPrimitive;

const state = reactive({
  equip: [
    {
      name: '美丽虾场气象站',
      lng: 112.450172,
      lat: 22.918249,
      img: qxzImg,
      type: 'qxz',
      id: '40236136',
    },
    {
      name: '水质一',
      lng: 112.4456,
      lat: 22.900304,
      img: szImg,
      type: 'sz',
      id: '40241986',
    },
    {
      name: '水质二',
      lng: 112.470937,
      lat: 22.914863,
      img: szImg,
      type: 'sz',
      id: '40241976',
    },
    {
      name: '高要虾场三',
      lng: 112.532983,
      lat: 22.974357,
      img: sxtImg,
      type: 'sxt',
      id: 'lkjs6f32710840c1a1ac1121bb5aac48',
    },
    {
      name: '高要虾场二',
      lng: 112.492601,
      lat: 22.974309,
      img: sxtImg,
      type: 'sxt',
      id: 'lkjs6f32710840c1a1ac1121bb5aac22',
    },
    {
      name: '高要虾场一',
      lng: 112.419324,
      lat: 22.916169,
      img: sxtImg,
      type: 'sxt',
      id: 'lkjs6f32710840c1a1ac1121bb5aac41',
    },
    {
      name: '双摄海螺摄像机',
      lng: 112.472578,
      lat: 22.952487,
      img: sxtImg,
      type: 'sxt',
      id: 'lkjs6f32710840c1a1ac1121bb5aac41',
    },
    {
      name: '入口球机',
      lng: 112.54144,
      lat: 22.931336,
      img: sxtImg,
      type: 'sxt',
      id: 'lkjs6f32710840c1a1ac1121bb5aac41',
    },
  ],
});

onMounted(() => {
  mars3d.Util.fetchJson({ url: 'config/config.json' }).then((data: any) => {
    commonStore.map?.setOptions(data.map3d);
    commonStore.map!.fixedLight = false;
    commonStore.map!.scene.light = new mars3d.Cesium.DirectionalLight({
      //固定光源，不用太阳光
      direction: new mars3d.Cesium.Cartesian3(112.595962, 23.001834, 3080),
      intensity: 0.8,
    });

    createLayer();
  });

  emitter.on('setRightDrawer', (val) => {
    if (val === '' && chooseGraphic) {
      chooseGraphic.closeHighlight();
    }
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
      [112.18985, 22.76940718],
      [112.82898324999999, 23.43623033],
    ],
    style: {
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: mapImg,
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
        addHeight: 1000,
        diffHeight: diffHeight, // 墙高
        materialType: mars3d.MaterialType.ODLine,
        materialOptions: {
          color: '#70f3fc',
          bgColor: 'rgba(112, 243, 252, 0.3)',
          speed: 2,
        },
      },
    },
  });
  commonStore.map?.addLayer(wall);
};

const createEquip = () => {
  commonStore.map?.addLayer(equipLayer);
  state.equip.map((it) => {
    // 添加图标
    const graphic = new mars3d.graphic.BillboardEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat, 0), // 经纬度
      attr: it, // 这个图标的信息

      style: {
        image: it.img,
        scale: 0.8,
        verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: true,
        scaleByDistance_far: 1000000,
        scaleByDistance_near: 1,

        tooltip: it.name,
        highlight: {
          type: mars3d.EventType.click,
          // color: "#ffff00",
          scale: 1.1,
        },
      },
    });

    equipLayer.addGraphic(graphic);
  });

  //设备点击
  equipLayer.on(mars3d.EventType.click, (event) => {
    const attr = event.graphic.attr;
    breedStore.setEquipId(attr.id);
    breedStore.setEquipName(attr.name);
    emitter.emit('setRightDrawer', attr.type);
    chooseGraphic = event.graphic;
  });

  // 鼠标移入信息窗
  equipLayer.bindTooltip(
    (event) => {
      const attr = event.graphic.attr;
      return attr.name;
    },
    {
      offsetY: -65,
    }
  );
};

emitter.on('chooseEquip', (val) => {
  if (val) {
    equipLayer.show = true;
  } else {
    equipLayer.show = false;
  }
});

onUnmounted(() => {
  commonStore.map?.removeLayer(graphicLayer);
  commonStore.map?.removeLayer(equipLayer);
  commonStore.map?.removeLayer(wall);
  commonStore.map?.removeLayer(lineLayer);
});
</script>

<style lang="scss" scoped></style>

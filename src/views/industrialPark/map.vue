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

const state = reactive({
  equip: [
    {
      name: '美丽渔场气象站',
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
      id: '21048579',
    },
    {
      name: '水质二',
      lng: 112.470937,
      lat: 22.914863,
      img: szImg,
      type: 'sz',
      id: '21048581',
    },
    {
      name: '摄像头二',
      lng: 112.429333,
      lat: 22.909255,
      img: sxtImg,
      type: 'sxt',
      id: '6ba781c68c87465cbc82852ca4fff7b7',
    },
    {
      name: '摄像头一',
      lng: 112.472793,
      lat: 22.874393,
      img: sxtImg,
      type: 'sxt',
      id: '9df56f32710840c1a1ac1121bb5aac48',
    },
    {
      name: '摄像头三',
      lng: 112.493056,
      lat: 22.962187,
      img: sxtImg,
      type: 'sxt',
      id: '05c149b797194dc4b0248e6d12a89b2b',
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
        scale: 0.8,
        verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: true,
        scaleByDistance_far: 1000000,
        scaleByDistance_near: 1,
        pixelOffset: pixe, // [] 负左 正右 负上正下
        tooltip: it.name,
        highlight: {
          type: mars3d.EventType.click,
          // color: "#ffff00",
          // scale: 1.5,
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
  });

  // 鼠标移入信息窗
  equipLayer.bindTooltip(
    (event) => {
      const attr = event.graphic.attr;
      return attr.name;
    },
    {
      offsetY: -70,
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

<template></template>

<script setup lang="ts">
import { useCommonStore } from '@/store';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted } from 'vue';
import mapImg from '@/assets/image/industrialPark/map.png';

const commonStore = useCommonStore();

onMounted(() => {
  createLayer();
});

//初始化地图
const createLayer = () => {
  //基地

  // 添加对象
  addAnhui();
};

onUnmounted(() => {
  //   commonStore.map?.removeLayer(graphicLayer);
});

const diffHeight = 2000;
function addAnhui() {
  const graphicLayer = new mars3d.layer.GraphicLayer({
    zIndex: 1,
  });
  // 安徽省卫星底图
  const anhuiImg = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [112.18035, 22.77240718],
      [112.82898324999999, 23.43693033],
    ],
    style: {
      height: diffHeight,
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: mapImg,
      },
    },
  });
  graphicLayer.addGraphic(anhuiImg);
  commonStore.map?.addLayer(graphicLayer);

  const anhuiWall = new mars3d.layer.GeoJsonLayer({
    name: '安徽省边界墙',
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
  commonStore.map?.addLayer(anhuiWall);

  const shiLayer = new mars3d.layer.GeoJsonLayer({
    name: '高要区边界线',
    url: 'data/cityName.json',
    zIndex: 9,
    symbol: {
      type: 'polyline',
      styleOptions: {
        color: 'white',
        setHeight: diffHeight,
        width: 1,
        label: {
          text: '{name}',
          position: 'center',
          font_size: 18,
          color: 'black',
          font_family: '楷体',
          outline: true,
          outlineColor: '#f1f3f4',
          outlineWidth: 3,
          // 视距的设置
          scaleByDistance: true,
          scaleByDistance_far: 20000000,
          scaleByDistance_farValue: 0.1,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
        },
      },
      styleField: 'name',
    },
  });
  commonStore.map?.addLayer(shiLayer);
}
</script>

<style lang="scss" scoped></style>

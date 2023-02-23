<template></template>

<script setup lang="ts">
import { useCommonStore } from '@/store';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted } from 'vue';
import mapImg from '@/assets/image/industrialPark/map.png';

const commonStore = useCommonStore();
const graphicLayer = new mars3d.layer.GraphicLayer();
let wall: mars3d.layer.GeoJsonLayer;
let lineLayer: mars3d.layer.GeoJsonLayer;

onMounted(() => {
  mars3d.Util.fetchJson({ url: 'config/config.json' }).then((data: any) => {
    commonStore.map?.setOptions(data.map3d);
    createLayer();
  });
});

//初始化地图
const createLayer = () => {
  // 添加对象
  addAnhui();
};

onUnmounted(() => {
  commonStore.map?.removeLayer(graphicLayer);
  commonStore.map?.removeLayer(wall);
  commonStore.map?.removeLayer(lineLayer);
});

const diffHeight = 2000;
function addAnhui() {
  // 安徽省卫星底图
  const imageGraphic = new mars3d.graphic.RectanglePrimitive({
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
        setHeight: diffHeight,
        width: 1,
      },
      styleField: 'name',
    },
  });
  commonStore.map?.addLayer(lineLayer);
}
</script>

<style lang="scss" scoped></style>

<template></template>

<script setup lang="ts">
import axios from 'axios';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted } from 'vue';
import { useCommonStore } from '@/store';
import emitter from '@/utils/eventbus';

const baseLayer = new mars3d.layer.GraphicLayer();
const pondLayer = new mars3d.layer.GraphicLayer();
const commonStore = useCommonStore();

onMounted(() => {
  mars3d.Util.fetchJson({ url: 'config/breedConfig.json' }).then((data: any) => {
    commonStore.map?.setOptions(data.map3d);
    commonStore.map!.basemap;
    window.map = commonStore.map;
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

  pondLayer.on(mars3d.EventType.click, (event) => {
    emitter.emit('setRightDrawer', 'pond');
  });
};

onUnmounted(() => {
  commonStore.map?.removeLayer(baseLayer);
  commonStore.map?.removeLayer(pondLayer);
});
</script>

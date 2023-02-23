<template></template>

<script setup lang="ts">
import axios from 'axios';
import * as Cesium from 'mars3d-cesium';
import * as mars3d from 'mars3d';
import { onMounted, onUnmounted,reactive } from 'vue';
import { useCommonStore } from '@/store';
import emitter from '@/utils/eventbus';
import qxzImg from '@/assets/image/breed/ico_qxz.svg';
import szImg from '@/assets/image/breed/ico_sz.svg';
import sxtImg from '@/assets/image/breed/ico_sxt.svg';
import img_s from '@/assets/image/ditu_quan.png'
const baseLayer = new mars3d.layer.GraphicLayer();
const quanLayer = new mars3d.layer.GraphicLayer();
const pondLayer = new mars3d.layer.GraphicLayer();
const commonStore = useCommonStore();

const states = reactive({
  she_b: [
    {
      name: '气象站一',
      lng: 112.602086,
      lat: 23.019025,
      img: qxzImg,
      type: 'qxz',
      id: '40214754'
    },
    {
      name: '气象站二',
      lng: 112.617088,
      lat: 23.012054,
      img: qxzImg,
      type: 'qxz',
      id: '40214755'
    },
    {
      name: '气象站三',
      lng: 112.608403,
      lat: 23.997669,
      img: qxzImg,
      type: 'qxz',
      id: '40236129'
    },
    {
      name: '水质一',
      lng: 112.599027,
      lat: 23.009809,
      img: szImg,
      type: 'sz',
      id: '21048579'
    },
    {
      name: '水质二',
      lng: 112.606053,
      lat: 23.006188,
      img: szImg,
      type: 'sz',
      id: '21048581'
    },
    {
      name: '摄像头二',
      lng: 112.609981,
      lat: 23.005686,
      img: sxtImg,
      type: 'sxt',
      id: '6ba781c68c87465cbc82852ca4fff7b7'
    },
    {
      name: '摄像头一',
      lng: 112.595962,
      lat: 23.001834,
      img: sxtImg,
      type: 'sxt',
      id: '9df56f32710840c1a1ac1121bb5aac48'
    }
  ]
})

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

  // 圈
  commonStore.map?.addLayer(quanLayer);
  states.she_b.map((it) => {
    let pixe = [] as any
    if(it.type == 'qxz'){
      pixe = [-4,-25]
    }else if(it.type == 'sz'){
      pixe = [0,-15]
    }else if(it.type == 'sxt'){
      pixe = [5,-25]
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
        pixelOffset: pixe,// [] 负左 正右 负上正下
        highlight: {
          type: mars3d.EventType.click,
          // color: "#ffff00",
          scale: 0.6,
        },
      }
    });
    // 圆 CircleEntity
    const circle = new mars3d.graphic.CircleEntity({
      position: new mars3d.LngLatPoint(it.lng, it.lat,0),
      style: {
        radius: 80.0, // 大小
        materialType: mars3d.MaterialType.CircleWave, // 类型：圆形: 波纹扩散
        materialOptions: {
          color: "rgb(0,255,255)",
          count: 2, // 单个圆圈
          speed: 8, // 速度，越大越快
          // color: "#70eafc",
          // count: 2, // 单个圆圈
          // speed: 8,
          // materialOptions: {
          //   image: img_s,
          //   color: '#ff0000',
          //   opacity: 1.0
          // },
          // color: new Cesium.CallbackProperty(function () {
          //   return Cesium.Color.BLUE
          // }, false),
        },
      },
  })
    quanLayer.addGraphic(circle);
    baseLayer.addGraphic(graphic);
  });

  // 两种图标的点击
  baseLayer.on(mars3d.EventType.click, (event) => {
    console.log(event.graphic.attr);
    
    // emitter.emit('setRightDrawer', 'pond');
  });

  // 图标的点击弹出框 - 默认的
  baseLayer.bindPopup((e:any) => {
    const item = e.graphic.attr
    console.log(item);
    
    const html = `<div style="padding: 20px;">名字：${item.name}<br/>
                id：${item.id}<br/></div>`
    return html
  })

  pondLayer.on(mars3d.EventType.click, (event) => {
    emitter.emit('setRightDrawer', 'pond');
  });
};



onUnmounted(() => {
  commonStore.map?.removeLayer(baseLayer);
  commonStore.map?.removeLayer(pondLayer);
});
</script>

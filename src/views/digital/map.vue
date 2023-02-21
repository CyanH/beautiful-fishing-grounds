<template>
  <div id="cesiumBox" class="model">
    <div class="legend" v-show="legendShow">
      <div
        v-for="(item, index) in state.legend"
        class="flex bar"
        :style="{ color: chooseIndex === index ? '#00f6ff' : '' }"
        @click="handleClick(index)"
      >
        <img :src="item.icon" class="icon" />
        <div>
          <span>{{ item.name }}</span>
          <span v-if="item.value">({{ item.value }})</span>
        </div>
      </div>
      <div style="text-align: center">
        <el-icon style="cursor: pointer" @click="legendShow = false"><ArrowUp /></el-icon>
      </div>
    </div>
    <div class="mini" v-show="!legendShow" @click="legendShow = true">
      <img src="@/assets/icons/tl.svg" />
      <div>图例</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import GlobeTooltip from '@/utils/globeTooltip';
import { plantBaseAllWlw } from '@/api/breed';
import { useBreedStore } from '@/store';
import emitter from '@/utils/eventbus';

let viewer: any;
let toolTip: GlobeTooltip;
let oldEntity: any;
let circleEntity: any;
let entityArr = [] as Cesium.Entity[];
const breedStore = useBreedStore();
const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
});
const legendShow = ref(true);
const chooseIndex = ref(0);

watch(
  () => props.form,
  () => {
    createPond();
    createEquip();
  }
);

onMounted(() => {
  initMap();
});

//初始化地图
const initMap = () => {
  let div = document.createElement('div');
  div.id = 'cesiumContainer';
  div.className = 'model';
  let box = document.getElementById('cesiumBox');
  box?.appendChild(div);

  const tdt_tk = '11160a2dd1bfffbf4740d1f44d920aff';
  viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    timeline: false,
    navigationHelpButton: false,
    selectionIndicator: false,
    scene3DOnly: true,
    sceneModePicker: false,
    navigationInstructionsInitiallyVisible: false,
    targetFrameRate: 60,
    skyBox: false,
    skyAtmosphere: false,
    terrainShadows: Cesium.ShadowMode.DISABLED,

    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      url:
        'http://t{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' +
        tdt_tk,
      layer: '天地图影像',
      style: 'default',
      format: 'image/jpeg',
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      tileMatrixSetID: 'GoogleMapsCompatible',
    }),
  });
  // 中文地名注记
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url:
        'http://t{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        tdt_tk,
      layer: '天地图中文注记',
      style: 'default',
      format: 'image/jpeg',
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      tileMatrixSetID: 'GoogleMapsCompatible',
    })
  );
  let cont = viewer.cesiumWidget.creditContainer as HTMLElement;
  cont.style.display = 'none';
  toolTip = new GlobeTooltip(viewer.container as HTMLElement);
  toolTip.setVisible(false);
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  addUtil();
  add3DTiles();
};

const addUtil = () => {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((event: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
    const fea = viewer.scene.pick(event.position);
    if (fea) {
      if (fea.id.name === 'base') {
        breedStore.setBaseName(fea.id.params.info);
      } else if (fea.id.name === 'pond') {
        //一塘一码
        let params = fea.id.params;
        breedStore.setPlantMassif(params);
        emitter.emit('setRightDrawer', fea.id.name);
      } else if (fea.id.name !== 'circle') {
        //设备点
        let params = fea.id.properties.params._value;
        emitter.emit('setRightDrawer', fea.id.name);
        breedStore.setEquipId(params.id);
        breedStore.setEquipName(params.name);

        setChoose(fea);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  //鼠标移动
  handler.setInputAction((movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
    const fea = viewer.scene.pick(movement.endPosition);
    let container = viewer.container as HTMLElement;
    if (fea && fea.id) {
      if (fea.id.name === 'pond') {
        container.style.cursor = 'pointer'; //塘口，只显示手型
      } else if (fea && fea.id.name !== 'circle') {
        //设备点，显示名字及手型
        container.style.cursor = 'pointer';
        let param = fea.id.properties.params._value;
        toolTip.showAt(movement.endPosition, param.name);
      }
    } else {
      container.style.cursor = 'default';
      toolTip.setVisible(false);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};

//3dTiles所在位置点
const add3DTiles = () => {
  let destination = { x: -2553091.938799002, y: 5294419.774696773, z: 2470133.368060673 };
  let direction = { x: 0.61923988378209, y: -0.6457754368706231, z: 0.446672196882792 };
  let up = { x: -0.028598727828560155, y: 0.5499362690695472, z: 0.8347168458396264 };
  viewer.camera.setView({
    destination: new Cesium.Cartesian3(destination.x, destination.y, destination.z),
    orientation: {
      direction: new Cesium.Cartesian3(direction.x, direction.y, direction.z),
      up: new Cesium.Cartesian3(up.x, up.y, up.z),
    },
  });

  let url = import.meta.env.VITE_APP_SERVE_API + '/assets/cesium3D/tileset.json';
  viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url,
      skipLevelOfDetail: true,
      dynamicScreenSpaceErrorDensity: 0.1,
      maximumScreenSpaceError: 256, // 数值加大，能让最终成像变模糊
      maximumMemoryUsage: 128, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
      preloadWhenHidden: true,
      preferLeaves: true,
      dynamicScreenSpaceError: true, //全屏加载完后再清晰化房屋
    })
  );
};

//创建塘口
const createPond = () => {
  props.form.plantMassifList.map((it: any) => {
    let data = JSON.parse(it.config);
    let color = Cesium.Color.fromCssColorString('#3891FF');
    let entity = viewer.entities.add({
      name: 'pond',
      params: it,
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(data),
        material: color.withAlpha(0.3),
        outlineColor: color,
        show: true,
      },
      polyline: {
        positions: data,
        clampToGround: true,
        material: color,
        width: 3,
      },
    });

    let pyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
    let pCenter = Cesium.BoundingSphere.fromPoints(pyPositions).center;
    viewer.entities.add({
      name: 'pond',
      params: it,
      position: pCenter,
      label: {
        text: it.plantMassifName,
        font: '800 16px Source Han Sans CN',
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
    });
  });
};

const createEquip = () => {
  //设备
  plantBaseAllWlw({ plantBaseId: props.form.id }).then((res: any) => {
    let weatherNum = 0,
      waterNum = 0,
      tljNum = 0,
      sxtNum = 0,
      entity: Cesium.Entity;

    res.content.map((item: any) => {
      let params: any,
        name = '',
        image = '';
      if (item.type === 'plant_water') {
        waterNum++;
        params = item.waterData;
        name = 'sz';
        image = getImgUrl('ico_sz.svg');
      } else if (item.type === 'plant_qxz') {
        weatherNum++;
        params = item.qxzData;
        name = 'qxz';
        image = getImgUrl('ico_qxz.svg');
      } else if (item.type === 'plant_tej') {
        tljNum++;
        params = item.baitData;
        name = 'tlj';
        image = getImgUrl('ico_tlj.svg');
      } else if (item.type === 'plant_video') {
        sxtNum++;
        params = item.jkData;
        name = 'sxt';
        image = getImgUrl('ico_sxt.svg');
      }

      entity = viewer.entities.add({
        name,
        position: Cesium.Cartesian3.fromDegrees(params.longitude, params.latitude),
        properties: { params },
        billboard: {
          image, //图标
          scale: 0.5,
          scaleByDistance: new Cesium.NearFarScalar(1e2, 1, 8e5, 0.3),
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      entityArr.push(entity);
    });

    state.legend[1].value = weatherNum;
    state.legend[2].value = waterNum;
    state.legend[3].value = tljNum;
    state.legend[4].value = sxtNum;
  });
};

const setChoose = (fea: any) => {
  if (oldEntity) {
    oldEntity.billboard.scale = 0.5;
    viewer.entities.remove(circleEntity);
  }
  fea.id.billboard.scale = 0.8;
  oldEntity = fea.id;
  let param = fea.id.properties.params._value;

  let majR = 40;
  let minR = 40; //最小半径
  let maxR = 200; // 最大半径
  let deviationR = 2; // 每次增加的大小
  function changeMAj() {
    majR = majR + deviationR; //deviationR为每次圆增加的大小
    if (majR >= maxR) {
      majR = 40;
    }
    return majR;
  }
  function changeMin() {
    minR = minR + deviationR; //deviationR为每次圆增加的大小
    if (minR >= maxR) {
      minR = 40;
    }
    return minR;
  }
  function color() {
    let x = 1 - minR / maxR;
    return Cesium.Color.WHITE.withAlpha(x);
  }

  circleEntity = viewer.entities.add({
    name: 'circle',
    position: Cesium.Cartesian3.fromDegrees(param.longitude, param.latitude),
    ellipse: {
      semiMajorAxis: new Cesium.CallbackProperty(changeMAj, false),
      semiMinorAxis: new Cesium.CallbackProperty(changeMin, false),

      material: new Cesium.ImageMaterialProperty({
        image: getImgUrl('entity.png'),
        repeat: new Cesium.Cartesian2(1.0, 1.0),
        transparent: true,
        color: new Cesium.CallbackProperty(color, false),
      }),
      outlineColor: Cesium.Color.RED,
    },
  });
};

//图例选择过滤
const handleClick = (index: number) => {
  chooseIndex.value = index;
  entityArr.map((entity) => {
    entity.show = false;
    if (index === 0) {
      entity.show = true;
    } else if (index === 1 && entity.name === 'qxz') {
      entity.show = true;
    } else if (index === 2 && entity.name === 'sz') {
      entity.show = true;
    } else if (index === 3 && entity.name === 'tlj') {
      entity.show = true;
    } else if (index === 4 && entity.name === 'sxt') {
      entity.show = true;
    }
  });
};

const getImgUrl = (url: string) => {
  return new URL(`../../assets/image/breed/${url}`, import.meta.url).href;
};

const state = reactive({
  legend: [
    {
      icon: getImgUrl('ico_all.png'),
      name: '全部',
    },
    {
      icon: getImgUrl('ico_qxz.png'),
      name: '气象设备',
      value: 1,
    },
    {
      icon: getImgUrl('ico_sz.png'),
      name: '水质监测',
      value: 1,
    },

    {
      icon: getImgUrl('ico_tlj.png'),
      name: '投料机',
      value: 1,
    },
    {
      icon: getImgUrl('ico_sxt.png'),
      name: '视频监控',
      value: 1,
    },
  ],
});

onUnmounted(() => {
  viewer.entities.removeAll();
  viewer.destroy();
  viewer = null;
});
</script>

<style lang="scss" scoped></style>

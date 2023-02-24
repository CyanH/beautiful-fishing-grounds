<template>
  <div class="side animate__animated animate__fadeInLeftBig">
    <div class="card">
      <img src="@/assets/image/industrialPark/horn.png" class="top-left" />
      <img src="@/assets/image/industrialPark/horn.png" class="top-right" />
      <img src="@/assets/image/industrialPark/horn.png" class="bottom-left" />
      <img src="@/assets/image/industrialPark/horn.png" class="bottom-right" />
      <div class="title-bar flex-between">
        <div>
          <img src="@/assets/image/breed/title.png" />
          <span class="title"
            >{{ breedStore.plantMassif.plantMassifName }}({{ breedStore.plantMassif.plantMassifCode }})</span
          >
        </div>
        <el-button class="closeBtn" @click="handleClose" :icon="Close"></el-button>
      </div>
      <div class="content flex">
        <left-view></left-view>
        <middle-view></middle-view>
        <right-view></right-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import leftView from './pondDrawer/left.vue';
import middleView from './pondDrawer/middle.vue';
import rightView from './pondDrawer/right.vue';
import emitter from '@/utils/eventbus';
import { useBreedStore } from '@/store';
import { Close } from '@element-plus/icons-vue';

const breedStore = useBreedStore();

const handleClose = () => {
  emitter.emit('setRightDrawer', '');
};
</script>

<style lang="scss" scoped>
.side {
  position: absolute;
  bottom: 15px;
  top: 15px;
  left: 15px;
  right: 15px;
  z-index: 9;
}

.card {
  background: rgba(17, 16, 45, 0.86);
  border-radius: 2px;
  height: 100%;
  position: relative;
  padding: 20px 20px 15px;
  box-sizing: border-box;

  .title-bar {
    position: relative;

    img {
      width: 1800px;
    }

    .title {
      font-size: 20px;
      font-weight: 800;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 30px;
    }
  }

  .top-left {
    position: absolute;
    top: 0;
    left: 0;
  }
  .top-right {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg);
  }
  .bottom-left {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: rotate(270deg);
  }
  .bottom-right {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: rotate(180deg);
  }
  .content {
    height: calc(100% - 48px);
    padding-top: 13px;
    box-sizing: border-box;
    position: relative;
  }
}

.closeBtn {
  padding: 0;
  background: transparent;
  border: 0;
  color: #fff;
  font-size: 24px;

  &:hover {
    background: transparent;
    color: #fff;
  }
}
</style>

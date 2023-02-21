<template>
  <div class="flex-between">
    <div class="title-bar">
      <img src="@/assets/image/common/title.png" />
      <span class="title">{{ title }}</span>
    </div>
    <el-button v-if="hasClose" class="closeBtn" @click="handleClose" :icon="CircleCloseFilled"></el-button>
    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons-vue';
import emitter from '@/utils/eventbus';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  hasClose: {
    type: Boolean,
    default: false,
  },
});

const handleClose = () => {
  emitter.emit('setRightDrawer', '');
};
</script>

<style lang="scss" scoped>
.flex-between {
  position: relative;
}

.title-bar {
  position: relative;
  flex: 1;

  img {
    width: 299px;
  }

  .title {
    color: #e6eeff;
    font-size: 18px;
    font-weight: 800;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5%;
  }
}

.closeBtn {
  padding: 0;
  background: transparent;
  border: 0;
  color: #ddfff7;
  font-size: 24px;
  z-index: 9;
  cursor: pointer;

  &:hover {
    background: transparent;
    color: #ddfff7;
  }
}
</style>

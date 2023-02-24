<template>
  <div id="videoBox" class="videoBox">
    <div id="video-container" ref="videoEle" style="height: 100%" />
    <img v-show="!imgFlag" @click="fullScreenClick(true)" class="img_right" src="@/assets/image/fangda.png" />
    <img v-show="imgFlag" @click="fullScreenClick(false)" class="img_sx" src="@/assets/icons/sx.svg" />
    <div class="ptz">
      <div class="outer-ring">
        <!-- 上 -->
        <svg
          @mousedown="ptzController(0)"
          @mouseup="up_ptzController(0)"
          class="caret-up"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M512 320 192 704h639.936z"></path>
        </svg>
        <!-- 下 -->
        <svg
          @mousedown="ptzController(1)"
          @mouseup="up_ptzController(1)"
          class="caret-down"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="m192 384 320 384 320-384z"></path>
        </svg>
        <!-- 左 -->
        <svg
          @mousedown="ptzController(2)"
          @mouseup="up_ptzController(2)"
          class="caret-left"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M672 192 288 511.936 672 832z"></path>
        </svg>
        <!-- 右 -->
        <svg
          @mousedown="ptzController(3)"
          @mouseup="up_ptzController(3)"
          class="caret-right"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
        </svg>
        <div class="inner-ring">
          <!-- + -->
          <svg
            @mousedown="ptzController(8)"
            @mouseup="up_ptzController(8)"
            class="plus"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
            ></path>
          </svg>
          <div class="line"></div>
          <!-- - -->
          <svg
            @mousedown="ptzController(9)"
            @mouseup="up_ptzController(9)"
            class="minus"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EZUIKit from 'ezuikit-js';
import { onUnmounted, ref } from 'vue';
import { controlCamera, stopCamera } from '@/api/video/index';

let offset = {
  width: 0,
  height: 0,
};
let query = {
  deviceSerial: '',
  speed: 1,
  channelNo: 1,
  direction: 0,
};
let player: any;
const imgFlag = ref(false);
const videoEle = ref<HTMLDivElement | null>(null);
const deviceSerial = ref('');

const getVideo = (token: string, url: string, code: string) => {
  let dom = videoEle.value as HTMLDivElement;

  deviceSerial.value = code;
  if (dom) {
    player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken: token,
      url: url,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
    });
  }
};

const fullScreenClick = (flag: boolean) => {
  const dom = document.getElementById('videoBox') as any;
  imgFlag.value = flag;
  if (flag) {
    if (dom) {
      if (dom.requestFullscreen) {
        dom.requestFullscreen();
      } else if (dom.webkitRequestFullScreen) {
        dom.webkitRequestFullScreen();
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
      } else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen();
      }
    }
    _do(dom, 'fixed');
  } else {
    // 不全屏
    let de = document.documentElement as any;
    let _de = document as any;

    if (_de.exitFullscreen) {
      _de.exitFullscreen();
    } else if (_de.webkitCancelFullScreen) {
      _de.webkitCancelFullScreen();
    } else if (_de.mozCancelFullScreen) {
      _de.mozCancelFullScreen();
    } else if (_de.msExitFullscreen) {
      _de.msExitFullscreen();
    }

    _do(de, 'relative');
  }
};

const _do = (de: any, position_type: string) => {
  const all = document.getElementById('videoBox');
  const video_c = document.getElementById('video-container') as any;
  // 下面两个是获取canvas
  const video_container = document.getElementById('video-containercanvas0') as any;
  const video = document.getElementById('video-containercanvas_draw0') as any;
  if (all) {
    all.style.top = '0';
    all.style.left = '0';
    all.style.position = position_type;
  }
  if (position_type === 'fixed') {
    setTimeout(() => {
      video_c.style.width = de.clientWidth + 'px';
      video_c.style.height = document.documentElement.clientHeight + 'px';
      video_container.width = de.clientWidth;
      video_container.height = document.documentElement.clientHeight;
      video.width = de.clientWidth;
      video.height = document.documentElement.clientHeight;
    }, 100);
  } else {
    setTimeout(() => {
      video_c.style.width = offset.width + 'px';
      video_c.style.height = offset.height + 'px';
      video_container.width = offset.width;
      video_container.height = offset.height;
      video.width = offset.width;
      video.height = offset.height;
    }, 100);
  }
};

//开始控制
const ptzController = (num: number) => {
  console.log('当前为哪个监控', deviceSerial.value);
  console.log('num', num);
  query.deviceSerial = deviceSerial.value;
  query.direction = num;
  controlCamera(query).then((res) => {
    console.log(res);
  });
};
// 停止控制
const up_ptzController = (num: number) => {
  query.deviceSerial = deviceSerial.value;
  query.direction = num;
  console.log('松开了');
  stopCamera(query).then((res) => {
    console.log(res);
    query.deviceSerial = '';
    query.direction = 0;
  });
};

defineExpose({ getVideo });

onUnmounted(() => {
  if (player) {
    player.stop();
    player.destroy();
    player = null;
  }
});
</script>

<style lang="scss" scoped>
.videoBox {
  position: relative;
  height: 100%;

  .img_right {
    width: 24px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .img_sx {
    width: 28px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .ptz {
    z-index: 2;
    position: absolute;
    right: 10px;
    bottom: 10px;

    .outer-ring {
      position: relative;
      width: 120px;
      height: 120px;
      // background-color: rgba(255,255,255,0.3);
      background-color: #fff;
      border-radius: 50%;
      box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9, 0 2px 3px #333;

      svg {
        color: #333;
        cursor: pointer;
        width: 20px;
        height: 20px;

        &:hover {
          color: #2fddff;
        }
      }

      .caret-up {
        position: absolute;
        top: 5px;
        left: 62px;
        margin-left: -10px;
      }

      .caret-down {
        position: absolute;
        bottom: 6px;
        left: 62px;
        margin-left: -10px;
      }

      .caret-left {
        position: absolute;
        left: 6px;
        top: 60px;
        margin-top: -10px;
      }

      .caret-right {
        position: absolute;
        right: 6px;
        top: 60px;
        margin-top: -10px;
      }

      .ob-caret-left {
        transform: rotate(45deg);
        position: absolute;
        top: 24px;
        left: 24px;
      }

      .ob-caret-up {
        transform: rotate(45deg);
        position: absolute;
        top: 24px;
        right: 24px;
      }

      .ob-caret-right {
        transform: rotate(45deg);
        position: absolute;
        bottom: 24px;
        right: 24px;
      }

      .ob-caret-down {
        transform: rotate(45deg);
        position: absolute;
        bottom: 24px;
        left: 24px;
      }

      .inner-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #ddd;

        .plus {
          position: absolute;
          top: 6px;
          left: 32px;
          margin-left: -10px;
        }

        .line {
          height: 1px;
          width: 100%;
          background-color: #ddd;
          position: absolute;
          top: 31px;
          left: 0;
        }

        .minus {
          position: absolute;
          bottom: 6px;
          left: 32px;
          margin-left: -10px;
        }
      }
    }
  }
}
</style>

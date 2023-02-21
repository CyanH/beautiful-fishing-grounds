<template>
  <div class="project-content">
    <div class="pyramid-box">
      <img src="@/assets/image/industrialPark/pyramid.png" class="pyramid" />
      <div v-for="(item, index) in state.list" :key="index" class="pyramid-detail">
        <div :class="index % 2 === 0 ? 'right-bar' : 'left-bar'">
          <span class="num">{{ item.amount }}</span>
          <span style="color: #b5b5b5">项</span>
        </div>

        <div class="flex" v-if="index % 2 === 0">
          <img src="@/assets/image/industrialPark/line.png" />
          <span class="name">{{ item.type }}</span>
        </div>

        <div class="flex" v-else>
          <span class="name">{{ item.type }}</span>
          <img src="@/assets/image/industrialPark/line.png" class="mirror" />
        </div>
      </div>
    </div>
    <div class="progress">
      <!-- <div class="flex" style="margin-bottom: 5px">
        <span class="label">开工率</span>
        <el-progress :percentage="state.kgl" color="#00D4E7" :stroke-width="10" :show-text="false" />
        <div class="value">
          <span class="num">{{ state.kgl }}</span
          ><span>%</span>
        </div>
      </div>
      <div class="flex" style="margin-bottom: 5px">
        <span class="label">完工率</span>
        <el-progress :percentage="state.wgl" color="#00D4E7" :stroke-width="10" :show-text="false" />
        <div class="value">
          <span class="num">{{ state.wgl }}</span
          ><span>%</span>
        </div>
      </div>
      <div class="flex">
        <span class="label">总进度</span>
        <el-progress :percentage="state.zjd" color="#00D4E7" :stroke-width="10" :show-text="false" />
        <div class="value">
          <span class="num">{{ state.zjd }}</span
          ><span>%</span>
        </div>
      </div> -->
      <div v-for="item,index in state.all_jd" class="flex" style="margin-bottom: 5px">
        <span class="label">{{item.title}}</span>
        <div class="pai_hang_o_bottom">
          <div class="pai_hang_o_1"></div>
          <div :class="['pai_hang_o_2', 'xm_2_' + index]" :style="{ width: item.num + '%' }"></div>
          <div :class="['pai_hang_o_3', 'xm_3_' + index]" :style="{ width: item.num + '%' }"></div>
        </div>
        <div class="value">
          <span class="num">{{ item.num }}</span
          ><span>%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getProjectType, getCompletionRate } from '@/api/industrial';

const state = reactive({
  list: [
    {
      type: '贷款贴息',
      amount: 0,
    },
    {
      type: '土地流转',
      amount: 0,
    },
    {
      type: '农业品牌',
      amount: 0,
    },
    {
      type: '科技研发与信息支撑',
      amount: 0,
    },
    {
      type: '农业设施',
      amount: 0,
    },
    {
      type: '产业融合',
      amount: 0,
    },
  ],
  kgl: 0,
  wgl: 0,
  zjd: 0,
  all_jd: [
    {
      title: '开工率',
      num: 0
    },
    {
      title: '完工率',
      num: 0
    },
    {
      title: '总进度',
      num: 0
    }
  ]
});

onMounted(() => [
  getProjectType().then((res: any) => {
    state.list.map((it) => {
      it.amount = res[it.type];
    });
  }),
  getCompletionRate().then((res: any) => {
    state.kgl = Number(res.kgl);
    state.wgl = Number(res.wgl);
    state.zjd = Number(res.zjd);
    state.all_jd[0].num = Number(res.kgl)
    state.all_jd[1].num = Number(res.wgl)
    state.all_jd[2].num = Number(res.zjd)
    for (let i = 0; i < state.all_jd.length; i++) {
      console.log(state.all_jd[i]);
      document.styleSheets[0].insertRule(
        '@keyframes tbMove_xm' + i + '' + '{' + '0%{width: 0%;}' + '100%{width: ' +state.all_jd[i].num + '%;}' + '}'
      );
      document.styleSheets[0].insertRule(
        '.xm_2_' + i + '{' + 'animation: tbMove_xm' + i + ' 3s linear infinite;' + '}'
      );
      document.styleSheets[0].insertRule(
        '@keyframes tbMoves_xm' + i + '' + '{' + '0%{width: 0%;}' + '100%{width: ' + state.all_jd[i].num + '%;}' + '}'
      );
      document.styleSheets[0].insertRule('.xm_3_' + i + '{' + 'animation: tbMoves_xm' + i + ' 2s linear;' + '}');
    }
  }),
]);
</script>

<style lang="scss" scoped>
.project-content {
  //使用上下居中处理1920*1080与1920*937分辨率下美观性
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .pyramid-box {
    position: relative;

    .pyramid {
      width: 198px;
      margin: auto;
    }

    .pyramid-detail {
      position: absolute;
      color: #fff;

      &:nth-of-type(1) {
        top: -20px;
        left: 46%;
      }

      &:nth-of-type(2) {
        top: 12px;
        left: 12%;
      }
      &:nth-of-type(3) {
        top: 20px;
        left: 49%;
      }
      &:nth-of-type(4) {
        top: 55px;
        left: 0;
      }
      &:nth-of-type(5) {
        top: 75px;
        left: 55%;
      }
      &:nth-of-type(6) {
        top: 120px;
        left: 5%;
      }

      .right-bar {
        position: relative;
        top: 28px;
        left: 55px;
        display: inline-block;

        .name {
          padding-left: 5px;
        }
      }

      .left-bar {
        position: relative;
        top: 28px;
        left: 62%;
        transform: translateX(-50%);
        display: inline-block;

        .name {
          padding-right: 5px;
        }
      }

      .name {
        position: relative;
        top: 6px;
        font-size: 14px;
      }

      .num {
        font-size: 20px;
        padding-right: 5px;
      }

      .mirror {
        transform: rotateY(180deg);
      }
    }
  }

  .progress {
    margin-top: 10px;
    .pai_hang_o_bottom {
      width: calc(100% - 26%);
      height: 10px;
      position: relative;
      overflow: hidden;
      border-radius: 18px;
      div {
        height: 10px;
        position: absolute;
        border-radius: 18px;
        top: 0;
      }
      .pai_hang_o_1 {
        width: 100%;
        background: #dbfff8;
        opacity: 0.12;
      }
      .pai_hang_o_2 {
        background-image: linear-gradient(to right, rgba(52,75,250, 0.12), rgba(60,255,216, 1));
        z-index: 5;
      }
      .pai_hang_o_3 {
        background: linear-gradient(to right, rgba(0,105,160, 1), rgba(0,252,255, 1));
      }
    }
    .label {
      color: #fff;
      font-size: 14px;
      padding-right: 10px;
    }

    .el-progress {
      flex: 1;

      :deep(.el-progress-bar__outer) {
        background-color: rgba(219, 255, 248, 0.12);
      }
    }

    .value {
      color: #b5b5b5;
      font-size: 12px;
      padding-left: 10px;

      .num {
        font-size: 20px;
        color: #fff;
        padding-right: 5px;
      }
    }
  }
}
</style>

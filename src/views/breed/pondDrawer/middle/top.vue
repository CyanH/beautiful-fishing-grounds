<template>
  <div class="flex" style="height: 100%">
    <div class="left">
      <div class="flex">
        <div class="bar"></div>
        <div class="title">养殖档案</div>
      </div>

      <div class="content">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :name="index" v-for="(item, index) in state.list">
            <template #title>
              <span>{{ item.title }}</span>
              <div class="date num">{{ parseTime(item.date, '{y}-{m}-{d}') }}</div>
            </template>
            <div>
              <div class="mb flex">
                <span class="label">作业人</span>
                <span class="value">{{ item.worker }}</span>
              </div>
              <div class="mb flex">
                <span class="label">作业时间</span>
                <span class="value">{{ item.date }}</span>
              </div>
              <div class="mb flex">
                <span class="label">作业内容</span>
                <span class="value">{{ item.info }}</span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <div class="right">
      <div class="flex">
        <div class="bar"></div>
        <div class="title">塘口预警</div>
      </div>

      <div class="content">
        <vue3-seamless-scroll :list="state.warnList" :step="0.3" :hover="true" :limitScrollNum="5">
          <div v-for="(item, index) in state.warnList">
            <div class="flex">
              <img src="@/assets/image/breed/warn.png" class="tip" />
              <span class="desc">{{ item.desc }}</span>
            </div>
            <div class="line"></div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { parseTime } from '@/utils/parseTime';
import { onMounted, reactive, ref } from 'vue';
import { pondGetYzda, pondConfigRecords } from '@/api/breed';
import { useBreedStore } from '@/store';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const breedStore = useBreedStore();
const activeName = ref(0);
const state = reactive({
  list: [
    {
      img: 'sltw',
      worker: '李晓武',
      date: '2023-01-30 12:34:43',
      info: '人工投喂罗氏沼虾4小时',
      title: '饲料投放',
    },
    {
      img: 'xtql',
      worker: '吴波江',
      date: '2023-02-03 16:34:43',
      info: '人工清理虾塘垃圾',
      title: '虾塘清理',
    },
    {
      img: 'xbyy',
      worker: '王凡',
      date: '2023-02-05 08:23:43',
      info: '人工巡查虾塘用药',
      title: '虾病用药',
    },
    {
      img: 'jcsy',
      worker: '苏无衣',
      date: '2023-02-07 13:34:22',
      info: '人工巡查虾塘检查水源',
      title: '检查水源',
    },
  ],
  warnList: [
    { desc: '塘口21的水质监测四，当前电导率为9562.00us/cm，高于阀值9554.00us/cm, 请注意处理!' },
    { desc: '塘口3的美丽虾场气象站，当前空气湿度为86.10%, 高于阀值66.10%, 请注意处理!' },
    { desc: '塘口18的水质监测二，当前溶解氧为2.80mg/L，低于阀值3.00mg/L, 请注意处理!' },
    { desc: '塘口4的水质监测一，当前温度为16.20℃, 低于阀值18.20℃, 请注意处理!' },
    { desc: '塘口13的美丽虾场气象站，当前温度为18.60℃, 低于阀值23.40℃, 请注意处理!' },
    { desc: '塘口8的水质监测三，当前ph值为8.96，高于阀值8.6, 请注意处理!' },
    { desc: '塘口31的美丽虾场气象站，当前光照为28394.00lux, 高于阀值25000.00lux, 请注意处理!' },
  ],
});

onMounted(() => {
  getData();
});

const getData = () => {
  // pondGetYzda({ plantMassifId: breedStore.plantMassif.id }).then((res: any) => {
  //   state.list = res.sort(compare);
  // });
  // pondConfigRecords({ plantMassifId: breedStore.plantMassif.id, size: 50 }).then((res: any) => {
  //   state.warnList = res.content;
  // });
};

const compare = (obj1: any, obj2: any) => {
  if (obj1.date < obj2.date) {
    return -1;
  } else if (obj1.date > obj2.date) {
    return 1;
  } else {
    return 0;
  }
};
</script>

<style lang="scss" scoped>
.bar {
  display: inline-block;
  width: 4px;
  height: 20px;
  margin-right: 12px;
  background: linear-gradient(to bottom, transparent, #a0d8ff);
}

.title {
  font-weight: 800;
  font-size: 18px;
}

.left,
.right {
  height: 100%;
  width: 50%;

  .content {
    height: calc(100% - 40px);
    margin-top: 17px;
    overflow-y: hidden;

    .tip {
      width: 26px;
      margin-right: 15px;
    }

    .desc {
      font-size: 14px;
    }

    .line {
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0,
        rgba(160, 205, 255, 0.2) 5%,
        rgba(160, 205, 255, 0.2) 95%,
        transparent 100%
      );
      margin: 10px 0;
    }
  }
}

.left {
  padding-right: 8px;

  .el-collapse {
    border: 0;
    overflow-y: auto;
    height: 100%;

    .el-collapse-item {
      padding-left: 90px;
      position: relative;
      margin-bottom: 15px;

      &::before {
        position: absolute;
        content: '';
        height: 100%;
        border: 1px dashed rgb(4, 81, 64);
        left: 35px;
        top: 25px;
      }
    }

    :deep(.el-collapse-item__header) {
      color: #00f6ff;
      background-color: transparent;
      margin-right: 10px;
      border: 1px solid rgba(160, 216, 255, 0.4);
      padding: 5px;
      height: auto;
      line-height: 20px;
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 2px;
        height: 6px;
        border: solid 10px rgba(255, 255, 255, 0);
        border-bottom: solid 10px rgb(4, 30, 24);
        position: absolute;
        top: 3px;
        z-index: 1002;
        left: -23px;
        transform: rotate(-90deg);
      }

      &::after {
        content: '';
        display: block;
        width: 2px;
        height: 6px;
        border: solid 10px rgba(82, 209, 195, 0);
        border-bottom: solid 10px rgba(160, 216, 255, 0.4);
        position: absolute;
        top: 3px;
        z-index: 1001;
        left: -25px;
        transform: rotate(-90deg);
      }

      .date {
        background: url('@/assets/image/breed/date_bg.png') center no-repeat;
        background-size: 100% 100%;
        font-size: 14px;
        position: absolute;
        left: -91px;
        top: 0;
        font-weight: bold;
        padding: 6px 12px;
      }
    }

    :deep(.el-collapse-item__wrap) {
      margin-right: 10px;
      background-color: transparent;
      border: 0;

      .el-collapse-item__content {
        padding: 8px 12px;
        color: #fff;
        border: 1px solid rgba(160, 216, 255, 0.4);
        border-top: 0;

        .mb {
          margin-bottom: 5px;
        }
        .label {
          color: #b9b9b9;
          width: 60px;
          font-size: 14px;
          text-align-last: justify;
          margin-right: 15px;
        }

        .value {
          flex: 1;
          color: #fff;
          font-size: 14px;
        }

        .imgBox {
          width: 72px;
          height: 72px;
          border: 1px solid rgba(197, 255, 233, 0.5);
          margin-right: 15px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #1327a5;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

.right {
  padding-left: 8px;
}
</style>

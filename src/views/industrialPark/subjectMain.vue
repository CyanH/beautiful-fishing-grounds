<template>
  <div class="legend animate__animated animate__fadeInRight">
    <div class="flex row">
      <img src="@/assets/image/industrialPark/lg_qtqy.png" class="icon" />
      <span>牵头企业({{ state.qyValue[2] }})</span>
    </div>
    <div class="flex row">
      <img src="@/assets/image/industrialPark/lg_ltqy.png" class="icon" />
      <span>龙头企业({{ state.qyValue[0] }})</span>
    </div>
    <div class="flex row">
      <img src="@/assets/image/industrialPark/lg_qt.png" class="icon" />
      <span>其他({{ state.qyValue[3] }})</span>
    </div>
  </div>

  <v-drawer direction="right">
    <v-card>
      <v-title title="园内企业组成" />
      <div class="flex-around top">
        <img src="@/assets/image/industrialPark/pie.png" class="pie" />
        <div class="flex-column">
          <div class="flex">
            <img src="@/assets/image/industrialPark/ico_qtqy.png" class="icon" />
            <div>
              <div class="name">牵头企业</div>
              <div class="value">
                <span class="num">{{ state.qyValue[2] }}</span>
                家
              </div>
            </div>
          </div>
          <div class="flex">
            <img src="@/assets/image/industrialPark/ico_ltqy.png" class="icon" />
            <div>
              <div class="name">龙头企业</div>
              <div class="value">
                <span class="num">{{ state.qyValue[0] }}</span>
                家
              </div>
            </div>
          </div>
          <div class="flex">
            <img src="@/assets/image/industrialPark/ico_hzs.png" class="icon" />
            <div>
              <div class="name">其他</div>
              <div class="value">
                <span class="num">{{ state.qyValue[3] }}</span>
                家
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-title title="实施主体" />
      <div class="card-content">
        <vue3-seamless-scroll :list="state.list" :step="0.3" :hover="true" :limitScrollNum="4">
          <div class="card" v-for="item in state.list">
            <div class="flex">
              <div class="img-box">
                <img src="@/assets/image/qy.jpg" />
              </div>
              <div>
                <div class="name">{{ item.name }}</div>

                <div class="mb flex">
                  <span class="label">项目投资额</span>
                  <span class="value">{{ item.fundSum }}万元</span>
                </div>
                <div class="mb flex">
                  <span class="label">负责人</span>
                  <span class="value">{{ item.head }}</span>
                </div>
                <div class="mb flex">
                  <span class="label">联系方式</span>
                  <span class="value">{{ item.headphone }}</span>
                </div>
                <div class="flex">
                  <span class="label">企业地址</span>
                  <span class="value">{{ item.inProvince }}{{ item.inCity }}{{ item.inCounty }}</span>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="el-progress-bar">
                <div class="el-progress-bar__outer">
                  <div class="el-progress-bar__inner" :style="{ width: item.progressAvg + '%' }"></div>
                </div>
              </div>
              <div class="num">{{ item.progressAvg }}%</div>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { getCyyClassIfy, cyyImplementations } from '@/api/industrial';

const state = reactive({
  qyValue: {} as any,
  list: [] as any[],
});

onMounted(() => {
  getCyyClassIfy().then((res) => {
    state.qyValue = res;
  });
  cyyImplementations().then((res: any) => {
    res.content.map((it: any) => {
      it.progressAvg = Number(it.progressAvg).toFixed(2);
    });
    state.list = res.content;
  });
});
</script>

<style lang="scss" scoped>
.top {
  padding: 20px 0;

  .pie {
    width: 182px;
  }

  .flex-column {
    height: 182px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .icon {
    width: 36px;
    margin-right: 15px;
  }

  .name {
    font-size: 14px;
    margin-bottom: 3px;
  }

  .value {
    color: #00f6ff;
    font-size: 12px;

    .num {
      font-size: 24px;
      margin-right: 5px;
    }
  }
}

.card-content {
  height: calc(100% - 318px);
  margin-top: 20px;
  overflow-y: hidden;

  .card {
    margin-bottom: 20px;
    height: 190px;
    padding: 20px 15px;
    box-sizing: border-box;
    background: url('@/assets/image/industrialPark/card.png') center no-repeat;
    background-size: 100% 100%;

    .img-box {
      width: 114px;
      border: 1px solid #a0d8ff;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }

    .name {
      font-size: 18px;
      margin-bottom: 12px;
    }

    .mb {
      margin-bottom: 8px;
    }

    .label {
      color: #b9b9b9;
      width: 70px;
      font-size: 14px;
      text-align-last: justify;
      margin-right: 15px;
    }

    .value {
      flex: 1;
      color: #fff;
      font-size: 16px;
    }

    .el-progress-bar {
      .el-progress-bar__outer {
        height: 10px;
        border-radius: 5px;
        background-color: rgba(219, 255, 248, 0.12);

        .el-progress-bar__inner {
          border-radius: 5px;
          height: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(to right, #1c51ea, #11fffc);

          &::after {
            position: absolute;
            border-radius: 5px;
            width: 100%;
            left: -100%;
            background: inherit;
            animation: progress-bar-stripes 3s linear 2s infinite;
          }

          @keyframes progress-bar-stripes {
            0% {
              left: -100%;
            }
            to {
              left: 0;
            }
          }
        }
      }
    }

    .num {
      padding-left: 12px;
      font-size: 30px;
      color: #00f6ff;
    }
  }
}

.legend {
  position: absolute;
  padding: 15px;
  background-color: rgba(17, 16, 45, 0.7);
  border-radius: 2px;
  right: 27%;
  top: 110px;
  color: #fff;
  font-size: 14px;
  z-index: 7;

  .row:not(:last-child) {
    margin-bottom: 12px;
  }

  .icon {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
}
</style>

<template>
  <v-drawer direction="right">
    <v-card>
      <v-title title="园区大事记" :hasClose="true" />
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="全部" name="first">
          <ul class="el-timeline">
            <li class="el-timeline-item" v-for="item in state.allList">
              <div class="el-timeline-item__tail"></div>
              <div class="node__img"></div>
              <div class="el-timeline-item__wrapper">
                <div class="el-timeline-item__timestamp">{{ parseDate(item.date) }}</div>
                <div class="el-timeline-item__content">
                  <div class="flex" style="padding: 0px 10px 0px 5px; align-items: flex-start">
                    <div class="border-wrapper">
                      <img class="infoImg" :src="returnImgUrl(item)" lazy="loaded" />
                    </div>
                    <div class="msg">
                      {{ item.descript }}
                    </div>
                  </div>
                </div>
                <div class="el-timeline-item__timestamp is-bottom"></div>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane :label="nowYear" name="second">
          <ul class="el-timeline">
            <li class="el-timeline-item" v-for="item in state.nowList">
              <div class="el-timeline-item__tail"></div>
              <div class="node__img"></div>
              <div class="el-timeline-item__wrapper">
                <div class="el-timeline-item__timestamp is-top">{{ parseDate(item.date) }}</div>
                <div class="el-timeline-item__content">
                  <div class="flex" style="padding: 0px 10px 0px 5px; align-items: flex-start">
                    <div class="border-wrapper">
                      <img class="infoImg" :src="returnImgUrl(item)" lazy="loaded" />
                    </div>
                    <div class="msg">
                      {{ item.descript }}
                    </div>
                  </div>
                </div>
                <div class="el-timeline-item__timestamp is-bottom"></div>
              </div>
            </li></ul
        ></el-tab-pane>
        <el-tab-pane :label="lastYear" name="third">
          <ul class="el-timeline">
            <li class="el-timeline-item" v-for="item in state.lastList">
              <div class="el-timeline-item__tail"></div>
              <div class="node__img"></div>
              <div class="el-timeline-item__wrapper">
                <div class="el-timeline-item__timestamp is-top">{{ parseDate(item.date) }}</div>
                <div class="el-timeline-item__content">
                  <div class="flex" style="padding: 0px 10px 0px 5px; align-items: flex-start">
                    <div class="border-wrapper">
                      <img class="infoImg" :src="returnImgUrl(item)" lazy="loaded" />
                    </div>
                    <div class="msg">
                      {{ item.descript }}
                    </div>
                  </div>
                </div>
                <div class="el-timeline-item__timestamp is-bottom"></div>
              </div>
            </li></ul
        ></el-tab-pane>
      </el-tabs>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { parseTime } from '@/utils/parseTime';
import { getCyyRecord } from '@/api/industrial';

let nowYear = new Date().getFullYear().toString();
let lastYear = (new Date().getFullYear() - 1).toString();

const activeName = ref('first');
const state = reactive({
  allList: [] as any[],
  nowList: [] as any[],
  lastList: [] as any[],
});

onMounted(() => {
  getCyyRecord().then((res: any) => {
    state.allList = res.content;
  });
  getCyyRecord({ date: nowYear }).then((res: any) => {
    state.nowList = res.content;
  });
  getCyyRecord({ date: lastYear }).then((res: any) => {
    state.lastList = res.content;
  });
});

const parseDate = (date: string) => {
  return parseTime(date, '{y}-{m}-{d}');
};

const returnImgUrl = (item: any) => {
  if (item.picList && item.picList.length > 0) {
    return import.meta.env.VITE_APP_SERVE_API + '/file' + item.picList[0].address;
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  height: calc(100% - 45px);
  margin-top: 7px;
  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
    color: #b9b9b9;
    width: 90px !important;
    text-align: center;
    padding: 0px 9px;
    margin: 0 20px;
  }

  :deep(.is-active) {
    color: #2fddff;
  }

  :deep(.el-tabs__active-bar) {
    background-color: transparent;
    background-image: url('@/assets/image/gx.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 5px;
    width: 80px !important;
  }

  :deep(.el-tabs__content) {
    height: calc(100% - 55px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #00f6ff;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}

.el-timeline {
  padding-left: 8px;
  :deep(.el-timeline-item__timestamp) {
    font-size: 18px;
    color: #fff;
    font-weight: 800;
    margin-bottom: 14px;
  }

  :deep(.el-timeline-item__tail) {
    border-left: 1px dashed rgba(0, 255, 204, 0.42);
    top: 8px;
  }

  .node__img {
    position: absolute;
    left: -5px;
    top: 0;

    width: 14px;
    height: 14px;
    background: #171a2f;
    border: 2px solid #30ddff;
    border-radius: 50%;
  }

  .border-wrapper {
    position: relative;
    border: 1px solid #a0d8ff;
  }

  .infoImg {
    width: 148px;
    height: 108px;
  }

  .msg {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1px;
    margin-left: 15px;
  }
}
</style>

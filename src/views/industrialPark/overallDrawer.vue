<template>
  <v-drawer direction="right">
    <v-card>
      <v-title :title="parkStore.param.name" :hasClose="true"></v-title>
      <div class="content">
        <img align="right" src="@/assets/image/qy.jpg" class="img" />
        <div class="con_one_l">{{ content }}</div>
      </div>
    </v-card>
  </v-drawer>
</template>

<script setup lang="ts">
import { useParkStore } from '@/store';
import { onMounted, ref, watch } from 'vue';
import { cyyPlanMaster } from '@/api/industrial';

const parkStore = useParkStore();
let content = ref('');

onMounted(() => {
  getData();
});

watch(
  () => parkStore.param,
  () => {
    getData();
  }
);

const getData = () => {
  cyyPlanMaster({ name: parkStore.param.name }).then((res: any) => {
    content.value = removeHtmlStyle(res[0].des);
  });
};

// 去除富文本的标签
const removeHtmlStyle = (html: any) => {
  let relStyle = /style\s*?=\s*?(['"])[\s\S]*?\1/g; //去除样式
  let relTag = /<.+?>/g; //去除标签
  let relClass = /class\s*?=\s*?(['"])[\s\S]*?\1/g; // 清除类名
  let newHtml = '';
  if (html) {
    newHtml = html.replace(relStyle, '');
    newHtml = newHtml.replace(relTag, '');
    newHtml = newHtml.replace(relClass, '');
    newHtml = newHtml.replaceAll('&nbsp;', '');
  }
  return newHtml;
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 17px;
  height: calc(100% - 55px);
  padding-right: 10px;
  overflow-y: auto;
  text-indent: 2em;
  line-height: 22px;
  letter-spacing: 2px;
  color: #fff !important;
  font-size: 14px;

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

  .img {
    width: 120px;
    height: 100px;
    border-radius: 10px;
    padding-left: 5px;
    display: inline-block;
  }
}
</style>

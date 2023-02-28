<template>
  <div class="top">
    <card-view>
      <div class="flex">
        <div class="bar"></div>
        <div class="title">基本信息</div>
      </div>
      <div class="flex" style="margin: 18px 0">
        <div style="width: 33%; text-align: center">
          <div class="name" style="margin-bottom: 5px">面积</div>
          <div class="value">
            <span class="num">6.8</span>
            <span style="margin-left: 5px">亩</span>
          </div>
        </div>
        <div class="line"></div>
        <div style="width: 33%; text-align: center">
          <div class="name" style="margin-bottom: 5px">预估产量</div>
          <div class="value">
            <span class="num">2.5</span>
            <span style="margin-left: 5px">吨</span>
          </div>
        </div>
        <div class="line"></div>
        <div style="width: 33%; text-align: center">
          <div class="name" style="margin-bottom: 5px">养殖品种</div>
          <div class="value">
            <span class="num">{{ state.form.plantBreedAmount }}</span>
            <span style="margin-left: 5px">种</span>
          </div>
        </div>
      </div>
      <div class="flex">
        <img src="@/assets/image/breed/tk_2.png" class="img" />
        <div class="desc">
          罗氏沼虾（学名：Macrobrachium
          rosenbergii）是长臂虾科、沼虾属动物。体大，最大雄性个体的体长可达400毫米，养殖1年通常可达到150～200毫米。
        </div>
      </div>
    </card-view>
  </div>
</template>

<script setup lang="ts">
import cardView from '../card.vue';
import { onMounted, reactive } from 'vue';
import { pondMassifInfo } from '@/api/breed';
import { useBreedStore } from '@/store';

const breedStore = useBreedStore();
const state = reactive({ form: {} as any });

onMounted(() => {
  getData();
});

const getData = () => {
  pondMassifInfo({ id: breedStore.plantMassif.id }).then((res: any) => {
    state.form = res.content[0];
  });
};
</script>

<style lang="scss" scoped>
.top {
  height: 32%;
}

.img {
  width: 76px;
  height: 76px;
}

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

.line {
  width: 2px;
  height: 45px;
  background: linear-gradient(
    to bottom,
    transparent 0,
    rgba(0, 255, 159, 0.15) 25%,
    rgba(0, 255, 159, 0.3) 50%,
    rgba(0, 255, 159, 0.15) 75%,
    transparent 100%
  );
}

.name {
  font-size: 14px;
  color: #fff;
}

.value {
  font-size: 12px;
  color: #00ffcc;

  .num {
    font-size: 28px;
  }
}

.desc {
  font-size: 14px;
  color: #fff;
  padding-left: 15px;
}
</style>

import { defineStore } from 'pinia';

export const useParkStore = defineStore('park', {
  state: () => ({
    chooseIndex: 0, //选中的下标
    param: {} as any, //点的数据
    projectChooseIndex: 0, //建设项目选中下标
  }),

  getters: {
    setting(state) {
      return { ...state };
    },
  },

  actions: {
    /**
     * @description 点击选中下标
     */
    choose(index: number) {
      this.chooseIndex = index;
    },
    /**
     * @description 存入模型上选中点的位置
     */
    setParam(data: any) {
      this.param = data;
    },
    /**
     * @description 建设项目图例选中
     */
    projectChoose(index: number) {
      this.projectChooseIndex = index;
    },
  },
});

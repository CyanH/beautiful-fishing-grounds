import { defineStore } from 'pinia';
import * as mars3d from 'mars3d';

export interface commonStore {
  hidden: boolean;
  map: mars3d.Map | null;
  mapVisible: boolean;
  mapComponent: string;
  model: mars3d.Map | null;
}

export const useCommonStore = defineStore('common', {
  state: (): commonStore => ({
    hidden: false, // 左右侧栏显示隐藏
    map: null,
    mapVisible: true,
    mapComponent: 'mapView',
    model: null,
  }),

  getters: {
    setting(state) {
      return { ...state };
    },
  },

  actions: {
    /**
     * @description 切换左右侧栏显示状态
     */
    toggle() {
      this.hidden = !this.hidden;
    },
    /**
     * @description 设置左右侧栏显示状态
     */
    set(active: boolean) {
      this.hidden = active;
    },
    setMap(map: mars3d.Map | null) {
      this.map = map;
    },
    setMapVisible(visible: boolean) {
      this.mapVisible = visible;
    },
    setMapComponent(name: string) {
      this.mapComponent = name;
    },
    setModel(model: mars3d.Map | null) {
      this.model = model;
    },
  },
});

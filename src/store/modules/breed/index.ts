import { defineStore } from 'pinia';

export const useBreedStore = defineStore('plant', {
  state: () => ({
    baseName: '',
    equipId: '', //选中展示的设备id
    equipName: '',
    plantMassif: {
      color: '#FABB38',
      config:
        '[{"x":-2552053.9545817096,"y":5293719.464658831,"z":2470436.1789876707},{"x":-2552066.7763194577,"y":5293704.166346363,"z":2470455.5843582493},{"x":-2552136.002874479,"y":5293601.479153869,"z":2470603.1077531166},{"x":-2552123.2296374375,"y":5293601.535220544,"z":2470616.094798482},{"x":-2552005.450054314,"y":5293687.435847482,"z":2470554.119847025},{"x":-2552003.7859189133,"y":5293697.495781752,"z":2470534.415993076},{"x":-2552034.2043662053,"y":5293721.801179437,"z":2470451.4717521532},{"x":-2552034.2043662053,"y":5293721.801179437,"z":2470451.4717521532},{"x":-2552053.9545817096,"y":5293719.464658831,"z":2470436.1789876707}]',
      createBy: 'yszh',
      createTime: '2022-11-22 09:38:08',
      id: '34ec254d02774d17aaef0a849a7435e8',
      isDelete: 0,
      ord: 4,
      plantBaseCode: 'ZZJD-202211-0008',
      plantBaseId: '8f7278b1dd28412fb0fdcc75cc3a5e5e',
      plantMassifArea: 1,
      plantMassifCode: 'ZZDK-202211-0011',
      plantMassifName: '塘口4',
      type: 'plant_massif_type2',
      updateBy: 'yszh',
      updateTime: '2022-11-22 09:38:08',
    } as any, //一塘一码
  }),

  getters: {
    setting(state) {
      return { ...state };
    },
  },

  actions: {
    setBaseName(name: string) {
      this.baseName = name;
    },
    setEquipId(id: string) {
      this.equipId = id;
    },
    setEquipName(name: string) {
      this.equipName = name;
    },
    setPlantMassif(params: any) {
      this.plantMassif = params;
    },
  },
});

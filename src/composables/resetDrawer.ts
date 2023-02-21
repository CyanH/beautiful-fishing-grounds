import emitter from '@/utils/eventbus';
import { useCommonStore } from '@/store';

const commonStore = useCommonStore();

export function resetDrawerShow() {
  commonStore.set(false);
  emitter.emit('setRightDrawer', '');
}

import { createPinia } from 'pinia';
import { useCommonStore } from './modules/common';
import { useBreedStore } from './modules/breed';
const pinia = createPinia();

export { useCommonStore, useBreedStore };
export default pinia;

import { createPinia } from 'pinia';
import { useCommonStore } from './modules/common';
import { useParkStore } from './modules/industrialPark';
import { useBreedStore } from './modules/breed';
const pinia = createPinia();

export { useCommonStore, useParkStore, useBreedStore };
export default pinia;

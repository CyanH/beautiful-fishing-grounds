import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vitePluginMars3d } from 'vite-plugin-mars3d';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('src'),
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mlyc/',
  plugins: [
    vue(),
    vitePluginMars3d(),
    createSvgIconsPlugin({
      //指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      //指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias,
  },
});

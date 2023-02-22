import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import 'normalize.css'; // css初始化
import 'amfe-flexible/index.js'; //可伸缩布局方案
import '@/assets/style/index.scss';
import 'animate.css/animate.min.css'; //动画库
import 'mars3d-cesium/Build/Cesium/Widgets/widgets.css';
import 'mars3d/dist/mars3d.css';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon.vue';
import DrawerView from './components/DrawerView.vue';
import CardView from './components/CardView.vue';
import CardTitle from './components/CardTitle.vue';
import VideoContainer from './components/VideoContainer.vue';

if (process.env.NODE_ENV === 'production') {
  document.oncontextmenu = (event) => {
    //阻止鼠标右键默认行为
    event.preventDefault();
  };
  document.onkeydown = (event) => {
    if (event.key === 'F12') {
      // 禁用F12
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.key === 'I') {
      // 禁用ctrl+shift+i,
      return false;
    } else if (event.shiftKey && event.key === 'F10') {
      // 屏蔽Shift+F10
      return false;
    }
  };
}

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale: zhCn });
app.component('svg-icon', SvgIcon);
app.component('v-drawer', DrawerView);
app.component('v-card', CardView);
app.component('v-title', CardTitle);
app.component('video-container', VideoContainer);
app.mount('#app');

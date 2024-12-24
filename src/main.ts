import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'

import 'view-ui-plus/dist/styles/viewuiplus.css'

router.beforeEach((to,from,next)=>{
  if(typeof(to.meta.title)=='string'){
    document.title = to.meta.title;
  }else{
    document.title = '技术支撑部项目管理';
  }
  ViewUIPlus.LoadingBar.start();
  next();
})

router.afterEach(route => {//页面加载完成后加载条关闭
  ViewUIPlus.LoadingBar.finish();
});
const app = createApp(App);
app.use(store)
app.use(router)
app.use(ViewUIPlus)
app.use(store)
app.mount('#app')
// createApp(App).use(store).use(router).use(ViewUIPlus).mount('#app')

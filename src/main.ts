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
    document.title = '泉州市数字云谷信息产业发展有限公司';
  }
  next();
})
createApp(App).use(store).use(router).use(ViewUIPlus).mount('#app')

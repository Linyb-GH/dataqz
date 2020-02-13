import Vue from 'vue'
import VueRouter from 'vue-router'

import page1 from '../views/page1'
import page2 from '../views/page2'
import home from '../components/content/home'
// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/page1',
    name:'page1',
    // components:{
    //   page1:page1,
    // },
    // meta:{
    //   keepAlive:true
    // }
    component: page1
  },
  {
    path: '/home',
    name:'home',
    component: home
  },
  {
    path: '/page2',
    name:'page2',
    component: page2
  },
//   {
//     path: '/profile',
//     component: Profile
//   }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to,from,next)=>{
  
  next()
})

// 3.导出router
export default router

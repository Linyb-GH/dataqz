import Vue from 'vue'
import VueRouter from 'vue-router'

import page2 from '../views/page2'

const accessories = ()=>import('../views/accessories')
const tasks = () => import('../views/tasks')
const report = () => import('../views/report')
const servers = () => import ('../views/servers')
const serversinfo = () => import ('../components/servers/info')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path:'/home',
    component:servers
  },
  {
    path:'/accessories',
    name:'accessories',
    component:accessories
  },
  {
    path: '/page2',
    name:'page2',
    component: page2
  },
  {
    path: '/servers',
    component: servers,
    childern:[
      {
        path:'/info',
        component:serversinfo
      }
    ]
  },
  {
    path: '/tasks',
    name:'tasks',
    component: tasks
  },
  {
    path: '/report',
    name:'report',
    component: report
  },
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

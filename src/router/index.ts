import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/home',
    meta:{title:'泉州市数字云谷信息产业发展有限公司',keepAlive:true}
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
    meta:{title:'泉州市数字云谷信息产业发展有限公司',keepAlive:true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/admin/views/login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../views/News.vue'),
    children: [
      {path: "content",name:'content',component: () => import('../components/news/Newscontent.vue')},
      {path: "preview",name:'preview',component: () => import('../components/news/Newspreview.vue')},
    ]
  },
  {
    path: '/QZJJ',
    name: '点击播放',
    component: () => import( '../views/QZJJ/Index.vue'),
    meta:{title:'点击播放',keepAlive:true}
  },
  
  {
    path: '/admin',
    name: 'Admin',
  
    //管理员权限鉴定
    beforeEnter: (to, from, next) => {
      store.dispatch('is_login').then((ret)=>{
        if(ret.is_login){next()}
        else {next({ name: 'Login' })}
      }).catch(
        ()=>{next({ name: 'Login' })}
      )
    },
    component:() => import('@/admin/Index.vue'),
    children: [
      {path: "",name:'首页',component: () => import( '@/admin/views/web/Workplace.vue')},//() => import( '@/admin/views/hello.vue')},
      {path: "workplace",name:'后台首页',component: () => import( '@/admin/views/web/Workplace.vue')},
      {path: "completion",name:'已办列表',component: () => import( '@/admin/views/web/Completion.vue')},
      {path: "homer",name:'轮播图',component: () => import( '@/admin/views/web/WebHomeR.vue')},
      {path: "homelist",name:'首页新闻',component: () => import( '@/admin/views/web/HomeList.vue')},
      {path: "webnews",name:'所有新闻',component: () => import( '@/admin/views/web/news/WebNews.vue')},
      {path: "webmynews",name:'我的发布',component: () => import( '@/admin/views/web/news/WebMyNews.vue')},
      // {path: "webmycheck",name:'流程审核',component: () => import( '@/admin/views/web/news/WebMyCheck.vue')},
      {path: "general",name:'编辑概况',component: () => import( '@/admin/views/web/news/WebGeneral.vue')},
      {path: "test",name:'测试',component: () => import( '@/admin/views/test.vue')},
    ]
  },
  
  {
    path:'/process',
    name:'process',
    //管理员权限鉴定
    beforeEnter: (to, from, next) => {
      store.dispatch('is_login').then((ret)=>{
        if(ret.is_login){next()}
        else {next({ name: 'Login' })}
      }).catch(
        ()=>{next({ name: 'Login' })}
      )
    },
    // component: () => import( '@/admin/process/web/General.vue'),
    children: [
      {path: "news",name:'news',component: () => import( '@/admin/process/web/News.vue')},
      {path: "general",name:'general',component: () => import( '@/admin/process/web/General.vue')},
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

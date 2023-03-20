import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/admin/views/login.vue')
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
      {path: "",name:'首页',component: () => import( '@/admin/views/home.vue')},//() => import( '@/admin/views/hello.vue')},
      {path: "hello",name:'你好',component: () => import( '@/admin/views/hello.vue')},
      {path: "test",name:'测试',component: () => import( '@/admin/views/test.vue')},
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

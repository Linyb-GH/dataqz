import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'



// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  // {
//     path: '',
//     redirect: '/home'
//   },
//   {
//     path: '/home',
//     component: Home
//   },
//   {
//     path: '/category',
//     component: Category
//   },
//   {
//     path: '/cart',
//     component: Cart
//   },
//   {
//     path: '/profile',
//     component: Profile
//   }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router

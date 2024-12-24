import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    //项目管理系统设置
    redirect:'/admin',
    meta:{title:'项目管理',keepAlive:true}
    //idc设置
    //name: 'IDC-Front',
    //component: () => import( '@/views/IDC/Index.vue')
    //官网设置
    // redirect:'/home',
    // meta:{title:'泉州市数字云谷信息产业发展有限公司',keepAlive:true}
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
      {path: "",name:'首页',component: () => import( '@/admin/views/prj/prjmylist.vue')},//import( '@/admin/views/web/Workplace.vue')},
      // {path: "",name:'我的项目',component: () => import( '@/admin/views/prj/prjmylist.vue')},
      {path: "workplace",name:'后台首页',component: () => import( '@/admin/views/web/Workplace.vue')},
      {path: "completion",name:'已办列表',component: () => import( '@/admin/views/web/Completion.vue')},
      {path: "homer",name:'轮播图',component: () => import( '@/admin/views/web/WebHomeR.vue')},
      {path: "homelist",name:'首页新闻',component: () => import( '@/admin/views/web/HomeList.vue')},
      {path: "webnews",name:'所有新闻',component: () => import( '@/admin/views/web/news/WebNews.vue')},
      {path: "webmynews",name:'我的发布',component: () => import( '@/admin/views/web/news/WebMyNews.vue')},
      // {path: "webmycheck",name:'流程审核',component: () => import( '@/admin/views/web/news/WebMyCheck.vue')},
      {path: "general",name:'编辑概况',component: () => import( '@/admin/views/web/news/WebGeneral.vue')},
      {path: "test",name:'测试',component: () => import( '@/admin/views/test.vue')},
      //idc运维部分
      {path: "devicesrepair",name:'设备报修',component: () => import( '@/admin/views/idc/devicesrepair.vue')},
      {path: "devicesmoved",name:'设备上下架',component: () => import( '@/admin/views/idc/devicesmoved.vue')},
      {path: "devicesrestart",name:'关机重启',component: () => import( '@/admin/views/idc/devicesrestart.vue')},
      {path: "deviceschange",name:'配置变更',component: () => import( '@/admin/views/idc/deviceschange.vue')},
      {path: "devicessystem",name:'系统安装',component: () => import( '@/admin/views/idc/devicessystem.vue')},
      {path: "netwiring",name:'设备布线',component: () => import( '@/admin/views/idc/netwiring.vue')},
      {path: "netwiringip",name:'IP地址变更',component: () => import( '@/admin/views/idc/netwiringIP.vue')},
      {path: "netwiringzx",name:'专线接入',component: () => import( '@/admin/views/idc/netwiringZX.vue')},
      {path: "cabinetaction",name:'机柜变更',component: () => import( '@/admin/views/idc/cabinetaction.vue')},
      {path: "cabinetinfo",name:'机柜统计',component: () => import( '@/admin/views/idc/cabinetinfo.vue')},
      {path: "infodev",name:'设备信息',component: () => import( '@/admin/views/idc/infodev.vue')},
      {path: "infoaccount",name:'资源用户',component: () => import( '@/admin/views/idc/infoaccount.vue')},
      {path: "infocontract",name:'IDC合同',component: () => import( '@/admin/views/idc/infocontract.vue')},
      //项目管理部分
      {path: "prjmylist",name:'我的项目',component: () => import( '@/admin/views/prj/prjmylist.vue')},
      {path: "prjmyclass",name:'项目分类',component: () => import( '@/admin/views/prj/prjmyclass.vue')},
      {path: "prjmytasks",name:'我的任务',component: () => import( '@/admin/views/prj/prjmytasks.vue')},
      {path: "prjweekly",name:'项目周报',component: () => import( '@/admin/views/prj/prjweekly.vue')},
      {path: "prjcontacts",name:'合同管理',component: () => import( '@/admin/views/prj/prjcontacts.vue')},
      {path: "prjstencil",name:'项目模板',component: () => import( '@/admin/views/prj/prjstencil.vue')},
      {path: "Rprjlist",name:'项目列表',component: () => import( '@/admin/views/prj/Rprjlist.vue')},
      {path: "Rprjtasks",name:'任务列表',component: () => import( '@/admin/views/prj/Rprjtasks.vue')},
      {path: "Rprjstatistic",name:'项目统计',component: () => import( '@/admin/views/prj/Rprjstatistic.vue')},
      {path: "Rprjdynamic",name:'项目动态',component: () => import( '@/admin/views/prj/Rprjdynamic.vue')},
      {path: "Reportlist",name:'我的周报',component: () => import( '@/admin/views/prj/reportlist.vue')},
      {path: "Reportmember",name:'成员周报',component: () => import( '@/admin/views/prj/reportmember.vue')},
      {path: "Reportreview",name:'我的审核',component: () => import( '@/admin/views/prj/reportreview.vue')},
      {path: "Reportsetting",name:'周报设置',component: () => import( '@/admin/views/prj/reportsetting.vue')},
      {path: "Reporttest",name:'测试',component: () => import( '@/admin/views/prj/reporttest.vue')},
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
  {
    path:'/IDC',
    name:'IDC',
    // component: () => import( '@/admin/process/web/General.vue'),
    children: [
      {path: "devices",name:'Devices',component: () => import( '@/views/IDC/Devices.vue')},
      {path: "limian",name:'Limian',component: () => import( '@/views/IDC/Limian.vue')},
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

// import axios from 'axios'
import Auth from './interface/Auth'
import WebFront from "./interface/WebFront"
import Web from "./interface/Web"
import User from "./interface/User"
import Process from "./interface/Process"
import Devices from './interface/Devices'
import Projects from './interface/Projects'
/* 调用例子
import {xx} from '/interface/xx'
  async getNews(){
    let x = new WebFront()
    let y = await x.GetHomeNews(1)
    if(y){
      this.listdata = y 
    }else{
      this.$Message.error('网络错误')
    }
  },
*/
export {Auth,WebFront,Web,User,Process,Devices,Projects}


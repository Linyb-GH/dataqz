// import axios from 'axios'
import store from '../store/index'

//import {NetRequest} from '@/router/request'
//const rq = new NetRequest()

import axios from "axios"
const ipAddr = '192.168.27.189' 
// const ipAddr = '61.131.57.36:8000'
const protocol='http' //http 或 https
// const ipAddr = 'www.dataquanzhou.com' 
// const protocol='https' //http 或 https
const dataurl = protocol+'://'+ipAddr+'/data/'

const intance = axios.create({
  baseURL:dataurl,
  timeout:5000
})
export class NetRequest{
  Netconfig={
    protocol: protocol,
    // frontIP: '61.131.57.36:8000',
    frontIP: 'localhost:8080',
    upload_web:'/uploads/web',
    upload_prj:'/uploads/prj',//项目上传文件路径
    UserFilePath:'/uploads/users',//个人用户上传的文件路径
    ipAddr: ipAddr,
    dataurl: dataurl,
    // Userfile:
  }
  

  user = {
    user_id:store.state.user.user_id,
    token:store.state.user.token,
  }
  getReq(request: string,params?:object){
    return intance({
      url:request,
      params:params
    }).then(res =>{
      return res.data
      // if(res.data.ret == 200){
      //   return res.data.data
      // }else{
      //   console.log(res.data.ret)
      // }
      
    }).catch(err => {
      console.log('net error,request.ts',err)
    })
  }

  postReq(url: string,data:object,params?:object){
    return intance({
      method:'post',
      url,
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(res =>{
      return res.data
      // if(res.data.ret == 200){
      //   return res.data.data
      // }else{
      //   return false
      // }
      
    }).catch(() => {
      console.log('net error')
      return false
    })
  }
  AdmingetReq(url: string,p?:{}){
    
    return intance({
      url,
      params:Object.assign(this.user,p)
    }).then(res =>{
      return res.data
    }).catch((err) => {
      console.log(err)
      return false
    })
  }
  AdminpostReq(url: string,data:object,params?:object){
    return intance({
      method:'post',
      url,
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
      data:Object.assign(this.user,data)
    }).then(res =>{
      return res.data
    }).catch((err) => {
      console.log(err)
      return false
    })
  }
 
  constructor() {
    
  }
}




// import axios from 'axios'
import store from '../store/index'
// let ipAddr = 'www.dataquanzhou.com';

//import {NetRequest} from '@/router/request'
//const rq = new NetRequest()

import axios from "axios"
const ipAddr = '192.168.27.189' 
const protocol='http' //http 或 https
// const ipAddr = 'www.dataquanzhou.com' 
// const protocol='https' //http 或 https
const dataurl = protocol+'://'+ipAddr+'/data/'

const upload_web_path = '/uploads/web'
const intance = axios.create({
  baseURL:dataurl,
  timeout:5000
})
export class NetRequest{
  ipAddr:string = ipAddr
  dataurl:string = dataurl
  path_web = upload_web_path
  user = {
    user_id:store.state.user.user_id,
    token:store.state.user.token,
  }
  getReq(request: string,params?:object){
    return intance({
      url:request,
      params:params
    }).then(res =>{
      if(res.data.ret == 200){
        return res.data.data
      }else{
        console.log(res.data.ret)
      }
      
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
      if(res.data.ret == 200){
        return res.data.data
      }else{
        return false
      }
      
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
      if(res.data.ret == 200){
        return res.data.data
      }else{
        return res
      }
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
      if(res.data.ret == 200){
        return res.data.data
      }else{
        return res
      }
    }).catch((err) => {
      console.log(err)
      return false
    })
  }

  constructor() {
    
  }
}


//   const instance = axios.create({
//     baseURL:urlAddr,

//     timeout:5000,
    
//   })

//   return instance(config) //因为instance就是promise函数。

// }


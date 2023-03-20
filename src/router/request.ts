// import axios from 'axios'
import store from '../store/index'
// let ipAddr = 'www.dataquanzhou.com';

import axios from "axios"
const intance = axios.create({
  baseURL:'http://192.168.27.189/',
  // baseURL:'http://127.0.0.1/',
  timeout:5000
})
export class NetRequest{

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
      console.log('net error',err)
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

  AdminpostReq(url: string,data:object,params?:object){
    return intance({
      method:'post',
      url,
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
      data:{
        user_id:store.state.user.user_id,
        token:store.state.user.token
      }
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

  constructor() {
    
  }
}


//   const instance = axios.create({
//     baseURL:urlAddr,

//     timeout:5000,
    
//   })

//   return instance(config) //因为instance就是promise函数。

// }


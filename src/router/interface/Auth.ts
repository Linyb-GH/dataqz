// import axios from 'axios'
import {NetRequest} from '../request'

export default class Auth{
  req = new NetRequest()
  GetPageAuth(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Auth.GetPageAuth'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  //系统初始化
  Initialization(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Auth.Initialization'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //获取首页的待办事项
  GetTodoList(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Auth.GetTodoList'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  

  GetRouteResource(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Auth.GetRouteResource'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

}

//export  {GetDeals,WebFront}
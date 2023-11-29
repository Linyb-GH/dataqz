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
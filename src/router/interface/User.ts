// import axios from 'axios'
import {NetRequest} from '../request'

export default class User{
  req = new NetRequest()

  UserLogin(loginData:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.User.Login',loginData
    ).then((data)=>{
      // console.log(data)
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  CheckSession(){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.CheckSession'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetUsers(){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.GetUsers'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }


  
}

//export  {GetDeals,WebFront}
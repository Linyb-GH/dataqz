// import axios from 'axios'
import {NetRequest} from '../request'

export default class User{
  req = new NetRequest()

  UserLogin(loginData:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.User.Login',loginData
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetUsersSelecttion(){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.GetUsersSelecttion'
    ).then((data)=>{
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

  ProFile(id:string,token:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.ProFile'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  Modifypsw(data:{username:string,oldpsw:string,newpsw:string}){
    return this.req.AdminpostReq(
      '?s=Dtqz.User.Modifypsw',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetUsers(department:string = ''){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.GetUsers',{department}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getClassUsers(userclass:string = ''){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.getClassUsers',{userclass}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  NewUserStore(data:{id?:string,key_value?:string,str1?:string,str2?:string,str_json?:string,str_arr?:string,txt?:string,remark?:string}){
    return this.req.AdminpostReq(
      '?s=Dtqz.User.NewUserStore',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  GetUserStore(key_value:string = 'default'){
    return this.req.AdmingetReq(
      '?s=Dtqz.User.GetUserStore',{key_value}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //个人用户上传文件的接口；
  //modal:文件上传后，在后台通过该字段进行分类写入数据库；
  UploadFile(modal:string){
    return{
        url:this.req.Netconfig.dataurl+'?s=Dtqz.User.UploadFile',
        uploaddata:{
          user_id:this.req.user.user_id,
          token:this.req.user.token,
          path:this.req.Netconfig.UserFilePath,
          ipaddr:this.req.Netconfig.ipAddr,
          modal
        }
      }
  }
  
}

//export  {GetDeals,WebFront}

import { User,Auth } from '@/router/interface'
import router from '@/router'

interface contextint{
  commit(mutation:string,data?:object):void
}

export default{

  async login (context:contextint,login:object) {
    let x = new User()
    let y = await x.UserLogin(login)
    if(y.is_login){
      context.commit('USER_LOGIN',y)
      router.push({name:'首页'})  
      return true
      // return y.is_login
    }else{}
    return false
    // return y.is_login
  },


  async is_login (context:contextint){
    let x = new User()
    let y = await x.CheckSession()
    context.commit('USER_SESSION')
    if(y){
      return {is_login:true} 
    }else{}
    return {is_login:false}
  },


  // get_page_data(context:contextint){
  //   const rq = new NetRequest()
  //   rq.AdminpostReq('?s=Dtqz.Auth.GetHeader',{}).then((ret)=>{
  //     context.commit('Init_Page_Data',ret)
    
  //   })
  // }

}

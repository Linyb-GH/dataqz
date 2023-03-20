
import {NetRequest} from '@/router/request'
import router from '@/router'
// import store from './index'
// import {StateData} from './interface_state'

interface contextint{
  commit(mutation:string,data?:object):void
}

export default{
  login (context:contextint,login:object) {
    const rq = new NetRequest()
    return rq.postReq('?s=Dtqz.User.Login',{},login).then(ret =>{
      if(ret.is_login){
        context.commit('USER_LOGIN',ret)
        router.push({name:'首页'})  
        // router.push('admin')
      }else{
        
      }
      return ret.is_login
    })
    // context.commit('USER_LOGIN',{user:{is_login:true}})
    // router.push('admin')
    // console.log('action')
  },
  is_login(context:contextint):Promise<object>{
    context.commit('USER_SESSION')
    const rq = new NetRequest()
    return rq.AdminpostReq('?s=Dtqz.User.CheckSession',{})
    // .then((ret)=>{
    //   console.log(ret.is_login)
    //   return ret.is_login
    // }).catch(()=>{
    //   return false
    // })
  }
}

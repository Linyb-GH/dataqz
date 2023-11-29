
import {tabdata,UserData,StateData} from './interface_state'
import router from '@/router';
export default {
  USER_LOGINOUT:(state:StateData) => {
    localStorage.setItem('Authorization_token','');
    state.user.is_login = false
    router.push({name:'Login'})  
    // console.log(state)
  },
  USER_SESSION:(state:StateData)=>{
    state.user.name = localStorage.getItem('Authorization_name') as string
    state.user.user_id = localStorage.getItem('Authorization_userid') as string
    state.user.token = localStorage.getItem('Authorization_token') as string
  },
  USER_LOGIN:(state:StateData,userinfo:UserData) => {
    state.user = userinfo
    localStorage.setItem('Authorization_userid',userinfo.user_id);
    localStorage.setItem('Authorization_token',userinfo.token);
    localStorage.setItem('Authorization_name',userinfo.name);
    state.user.is_login = true
    // localStorage.setItem('Authorization',JSON.stringify(userinfo));
    // console.log(state)
  },
  Tab_NewTab:(state:StateData,arg:tabdata) => {
    const isexist = state.tabs.tablists.filter((item) => {
      return item.label == arg.label
    })
    if(isexist.length == 0){
      state.tabs.tablists.push(arg)
    }
    state.tabs.tabcurrent = arg.label
  },
  Tab_DeleteTab:(state:StateData,tab:string) => {
    state.tabs.tablists = state.tabs.tablists.filter(ret =>ret.label != tab)
    state.tabs.tabcurrent = 'HomePane'
  },
  Tab_ClickTab:(state:StateData,tab:string) => {
    state.tabs.tabcurrent = tab 
  },

}


import {tabdata,UserData,StateData} from './interface_state'
import router from '@/router';
import {NetRequest} from '@/router/request'

export default {
  USER_LOGINOUT:(state:StateData) => {
    localStorage.setItem('Authorization_token','');
    state.user.is_login = false
    state.tabs={tabcurrent:'',tablists:[]}
    router.push({name:'Login'})  
    // console.log(state)
  },
  //用户登录后缓存在页面的信息
  USER_LOGIN:(state:StateData,userinfo:UserData) => {
    const rq = new NetRequest()
    userinfo.avatar = rq.Netconfig.protocol+'://'+rq.Netconfig.ipAddr+ userinfo.avatar
    state.user = userinfo
    localStorage.setItem('Authorization_userid',userinfo.user_id);
    localStorage.setItem('Authorization_avatar',userinfo.avatar);
    localStorage.setItem('Authorization_token',userinfo.token);
    localStorage.setItem('Authorization_name',userinfo.name);
    state.user.is_login = true
  },
  //更新用户头像 store.commit('USER_UPDATA_AVATAR','avatarurl')
  USER_UPDATA_AVATAR:(state:StateData,avatarurl:'')=>{
    state.user.avatar = avatarurl
    localStorage.setItem('Authorization_avatar',avatarurl);
  },
  USER_SESSION:(state:StateData)=>{
    state.user.name = localStorage.getItem('Authorization_name') as string
    state.user.avatar = localStorage.getItem('Authorization_avatar') as string
    state.user.user_id = localStorage.getItem('Authorization_userid') as string
    state.user.token = localStorage.getItem('Authorization_token') as string
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
  //store.commit('Tab_ClickTab','HomePane')
  Tab_ClickTab:(state:StateData,tab:string) => {
    state.tabs.tabcurrent = tab 
  },

}

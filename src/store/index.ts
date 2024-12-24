import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './action'
import {StateData} from './interface_state'


const state:StateData = {
  user:{
    is_login:false,
    user_id:'',
    token:'',
    name:'',
    avatar:''
  },
  tabs:{
    tabcurrent:'HomePane',
    tablists:[]
  },
  notices:{
    todoList:[{
      title:'',
      content:'',
      tag:'',
      tagProps:{color:''},
      read:0
    }]
  },

  page_data:[{
    manu:{},
    micon:{},
    sider:[{
      icon:'string',sidername:'string',sidermem:[{
        itemname:'string',url:'string'}]
    }]
  }],
  
  
}
export default createStore({
// const store = createStore({
  state,
  mutations,
  actions,
  modules: {
  }
  
})

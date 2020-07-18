import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        tatedata:'I am test data for store',
        taskdata:{},
        showcurrent:[],
        showtabs:['store1','store2'],
        showtabs:{
            ctab:'page2',
            tabs:['okok','abce'],
        }
    },
    mutations:{
        storetest(state,input){
            state.tatedata = input
        },
        showpg(state,show){
            let exist = state.showcurrent.indexOf(show)
            if(exist == -1) state.showcurrent.splice(state.showcurrent.length,0,show)
            console.log('store -show '+state.showcurrent)
        },
        newtab(state,name){
            
            // state.showtabs.ctab.splice(0,1,name)
            state.showtabs.tabs.push('push'+name)
            state.showtabs.ctab = 'push'+name
        },
        deletetab(state,label){
            // state.showtabs.tabs.remove(label)
            state.showtabs.tabs = state.showtabs.tabs.filter(ret =>ret != label)
            // console.log(x)
            // console.log(state.showtabs.tabs)
        }
    },
    actions:{
        storetest(context,arg){
            context.commit('storetest',arg)
        },
        taskgetlist(context){
            axios({
                method:'get',
                url:'http://localhost/ecserver/index.php/tasks',
                params:{action:'showtasks'},
                // data,
                timeout:1000
              }).then(res=>{
                // this.data5 = res.data.message;
                context.commit('taskgetlist',res)
                // console.log(this.data5);
              })

        }
    }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        tatedata:'I am test data for store',
        taskdata:{},
        showcurrent:[],
        showpage:[
            {label:'2-1测试页',tabname:'tab0',isshow:true},
            {label:'2-2测试页',tabname:'tab1',isshow:false},
            {label:'2-3测试页',tabname:'tab2',isshow:true}
        ]
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
        closepg(state,closelabel){
            state.showcurrent.splice(closelabel,1)
            console.log('store - close'+state.showcurrent)

        },
        taskgetlist(state,data){
            state.taskdata.tasklist = data
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

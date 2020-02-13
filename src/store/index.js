import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        tatedata:'I am test data for store',
        showcurrent:[],
        showpage:[
            {label:'2-1测试页',tabname:'tab0',isshow:true},
            {label:'2-2测试页',tabname:'tab1',isshow:false},
            {label:'2-3测试页',tabname:'tab2',isshow:true}
        ]
    },
    mutations:{
        showpg(state,show){
            
            
            // console.log(state.showcurrent)
            // let t = state.showcurrent.forEach(
            //     item => {item == show
            //             // state.showcurrent.splice(state.showcurrent.length,0,show)
            //     console.log('item:'+item+'--- show:'+show)}
            // )
            let exist = state.showcurrent.indexOf(show)
            if(exist == -1) state.showcurrent.splice(state.showcurrent.length,0,show)
            console.log('store -show '+state.showcurrent)
        },
        closepg(state,closelabel){
            state.showcurrent.splice(closelabel,1)
            console.log('store - close'+state.showcurrent)
            // state.showpage.forEach(
            //     item =>{
            //         if(item.tabname == closelabel){
            //             item.isshow = false
            //             console.log(item.tabname+'----'+item.isshow)
            //         }
            //     }
            // )
            // state.showpage[0].isshow = false
            // console.log(closelabel)
        }
    },
    actions:{

    }
})

export default store

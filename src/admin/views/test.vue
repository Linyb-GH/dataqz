<template>
  <div>test page</div>
  
  <Button @click="btntest">新标签页测试</Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import {NetRequest} from '@/router/request'
export default defineComponent({
  setup() {
    
  },
  methods:{
    btntest(){
      store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})
      console.log(store.state.user)
      // h(hello,{id: 'abc',innerHTML: 'hello'})
      const rq = new NetRequest()
      rq.getReq('?s=Dtqz.WebFront.GetHomeNews',{limit:10,page:1}).then(ret =>{
        console.log(ret)
      })
      // rq.postReq('?s=Dtqz.Auth.Posttest',{authtype:'第13次记录',checknum:12})
    }
  }
})
</script>


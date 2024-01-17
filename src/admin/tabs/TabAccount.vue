<template>
  <div class="body">
    姓名：{{ AccountInfo.username }} <br>
    部门：{{ AccountInfo.department }} <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {User} from '@/router/interface'
import store from '@/store'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      AccountInfo:{username:'',department:'',avatar:'',email:''}
    }
  },
  mounted(){
    this.getAccountInfo()
    console.log(store.state.user.name)
  },
  methods:{
    async getAccountInfo(){
      
      let x = new User()
      let y = await x.ProFile(store.state.user.user_id,store.state.user.token)
      if(y){
        this.AccountInfo = y.profile
      }else{
        this.$Message.error('网络错误')
      }
    }
  }
})
</script>

<style scoped>
.body{
  text-align: left;
}

</style>
<template>
  <Cascader :data="data" @on-change="selectaction" trigger="hover" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User } from '@/router/interface'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest',data:{}})
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      data: []
    }
  },
  mounted(){
    //GetUsersSelecttion
    this.getData()
  },
  methods:{
    async getData(){
      let x = new User()
      let y = await x.GetUsersSelecttion()
      if(y.data){
        this.data = y.data
        console.log(y)
      }else{

      }
    },
    //$emit('someEvent')
    selectaction(value:any,selectedData:[{label:'',value:''},{label:'',value:''}]){
      // console.log(value)
      // console.log(selectedData[1])
      // {value:'',label:''}
      let int={id:selectedData[1].value,name:selectedData[1].label}
      this.$emit('selectuser',int)
    }
  },
  emits: ['selectuser'],
  props:[
    "message"
  ],
})
</script>

<style scoped>

.bodysty{ 
  border: 1px solid black;
  width: auto;
}
</style>
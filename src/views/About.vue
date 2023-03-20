<template>
  <div >{{t}}</div>
  <AvatarList :list="list" />
  <Button @click="btnabout">About</Button>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';

export default defineComponent ({
  components:{
    
  },
  setup(){
    const t = ref('常量')
    const list=ref([
                    {
                      src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                      tip: '史蒂夫·乔布斯'
                    },
                    {
                      src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
                      tip: '斯蒂夫·沃兹尼亚克'
                    },
                    {
                      src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                      tip: '乔纳森·伊夫'
                    }
                ]) 
    const btnabout = (()=>{
      console.log(list)
      list.value.push({
                      src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                      tip: '乔纳森·伊夫'
                    })
    })
    return{
      t,list,btnabout
    }
    
  }
  
})
</script>

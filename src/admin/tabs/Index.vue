<template>
  <component :is="currentView"  ></component>
</template>

<script lang="ts">
import TabTest from './TabTest.vue'
import TabAccount from './TabAccount.vue'
import WebNews from './web/WebNews.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props) {
    // console.log(props)
    return{
      
    }
  },
  
  data(){
    return({
      currentView:'TabTest',
      // message:{} 
    })
  },
  components: {
    TabTest,WebNews,TabAccount
  },
  mounted(){
    let component = this.message.component
    this.currentView = component
  },
  props:["message"],
  
})
</script>


<style scoped>


</style>
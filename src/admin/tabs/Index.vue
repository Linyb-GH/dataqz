<template>
  <component :message="message.data" :is="currentView"  ></component>
</template>

<script lang="ts">
import TabTest from './TabTest.vue'
import TabAccount from './TabAccount.vue'
import WebNews from './web/WebNews.vue'
import TabDeviceWiring from './idc/TabDeviceWiring.vue'
import TabPrjInfo from './prj/TabPrjInfo.vue'
import TabRPrjInfo from './prj/TabRPrjInfo.vue'
import TabRPrjTask from './prj/TabRPrjTask.vue'
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
    TabTest,WebNews,TabAccount,TabDeviceWiring,TabPrjInfo,
    TabRPrjInfo,TabRPrjTask
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
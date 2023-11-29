<template>
  <div class="body">
    <div  class="contnetsyt" v-html="htmlContent" ></div>
  </div>
</template>

<script lang="ts">

import { defineComponent,ref } from 'vue'
import { WebFront } from '@/router/interface'
export default defineComponent({
  setup() {
    let htmlContent = ref('<p>This is some HTML content</p>');
    return{htmlContent}
  },
  mounted(){
    this.getContent('联系我们')
  },
  methods:{
    async getContent(mc:string){
      let x = new WebFront()
      let y = await x.GetGeneral(mc)
      if(y){
        this.htmlContent = y[0]['content']
        // console.log(y[0]['content'])
      }else{
        this.$Message.error('网络错误')
      }
    },
  }
})
</script>


<style scoped>
.contnetsyt{ 
  font-family:"Times New Roman",Georgia,Serif;
  font-size: 150%;
  line-height: 2.0; 
}

</style>

<template>
  <Button @click="btnfunc">测试</Button>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const btnfunc=(()=>{
      console.log('test vue')
      router.push({path:'/about'})
    })
    return {
      btnfunc
    }
  },
})
</script>


<style>

</style>

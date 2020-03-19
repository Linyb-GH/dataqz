<template>
  <Content :style="{
    height:'auto',margin:'10px', background: '#fff', minHeight: '600px'}">
      <!-- <Tabs ref="contents" type="card"  > -->
        
        <router-view></router-view>

  </Content>
</template>

<script>

export default {
  
  data(){
    return{
      i:0,
      current:[],
    }
  },
  computed:{


  },
  methods:{
    
  },
  watch:{
    tab0(newval){
      console.log(newval)
    },
    computed(newval){
      console.log(newval+'label1')
    }
  }
}
</script>
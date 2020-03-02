<template>
  <Content :style="{
    height:'auto',margin:'10px', background: '#fff', minHeight: '600px'}">
      <!-- <Tabs ref="contents" type="card"  > -->
        
        <router-view></router-view>

  </Content>
</template>

<script>
// import Pg from '../../views/page1'
// import Pgb from '../../views/page2'
export default {
  // components:{Pg,Pgb},
  data(){
    return{
      i:0,
      current:[],
    }
  },
  computed:{

    // showtabel(){
    //   return this.$store.state.showcurrent
    // }
  },
  methods:{
    //   handleTabRemove (name) {
    //     // let closetb = this.$store.state.showpage[name].tabname
    //     console.log('handleTabRemove---'+name)
    //   this.$store.commit('closepg',name)
    //   this['label' + name] = false;
    //   // console.log(this.$store.state.showpage)
    // },
 
    // clktb1(){
    //   this.tab0 = false
    // },
    // clktb2(){
    //   let t = this.$store.showcurrent
    //   console.log('content-computed-label0--'+t)
    //   return false
    // }
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
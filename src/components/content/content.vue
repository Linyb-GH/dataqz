<template>
  <Content :style="{
    height:'600px',margin:'10px', background: '#fff', minHeight: '260px'}">
      <!-- <Tabs ref="contents" type="card"  > -->
        
          <!-- <router-view v-for="tab in showtabel" :key="tab" name="tab" ></router-view> -->
          <!-- <router-view name="page1"></router-view> -->
          <!-- <router-view name="page1"></router-view> -->
          <!-- <router-view v-for="tab in showtabel" :key="tab" name="page1" ></router-view> -->
        <!-- <keep-alive><router-view></router-view></keep-alive> -->
        <router-view></router-view>
        <!-- <TabPane v-for="tab in showtabel" :key="tab" :label="tab">标签{{ tab }}</TabPane> -->

        <!-- <TabPane label="标签一" v-if="label0">标签一的内容 label0</TabPane>
        <TabPane label="标签二" v-if="label1"> label 1</TabPane>
        <TabPane label="标签三" v-if="label2"> hahah</TabPane> -->

          <!-- <button @click="clktb1">关闭标签1</button>
          <button @click="clktb2">打开标签1</button>
          <div>label1:{{$store.state.showpage[0].isshow}}---tab0:{{tab0}}</div> -->
      <!-- </Tabs> -->
  </Content>
</template>

<script>
import Pg from '../../views/page1'
import Pgb from '../../views/page2'
export default {
  components:{Pg,Pgb},
  data(){
    return{
      i:0,
      current:[],
    }
  },
  computed:{

    showtabel(){
      return this.$store.state.showcurrent
    }
  },
  methods:{
      handleTabRemove (name) {
        // let closetb = this.$store.state.showpage[name].tabname
        console.log('handleTabRemove---'+name)
      this.$store.commit('closepg',name)
      this['label' + name] = false;
      // console.log(this.$store.state.showpage)
    },
    // addlabel(){
    //   return this.$store.state.showpage.filter(
    //     item => item.isshow == true
    //   )
    // },
    clktb1(){
      this.tab0 = false
    },
    clktb2(){
      let t = this.$store.showcurrent
      console.log('content-computed-label0--'+t)
      return false
    }
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
<template>
<Tabs ref="contents" type="card" :value="tabs.clabel" @on-tab-remove="closelabel" >
  <TabPane label="page2" name = 'page2'>
    <p>this is page 2</p>
    <button @click="buttontest">axios测试</button>
    <br>
    {{axiosdata}}
    
  </TabPane>
  <TabPane label="page2-1" name = 'page2-1'>
    <p>this is page 2-1</p>
    <p>{{this.$store.state.tatedata}}</p>
    <button @click="storetest">store测试</button>
    <button @click="labeltest">label-test</button>
  </TabPane>
  <TabPane closable  v-for="(tab,index) in tabs.label" :name="tab"  :key=tab+index :label="tab">
    <p>{{tab}}</p>
  </TabPane>
</Tabs>
</template>

<script>
import axios from 'axios';
import Qs from 'qs'
export default {
  data () {
    return {
      tabs:{
        // clabel:'page2',
        // label:['abc','hahah']
      },
      axiosdata:{},
      // clabel:'page2',
      // arr:['haha','oo']
    }
  },
  mounted(){
    // this.tabs.clabel='page2'
    // this.tabs.label=['abc','hahah']
    this.tabs = {
      clabel:'page2',
      label:['abc','haha']
    }
  },
  methods: {
    storetest(){
      this.$store.dispatch('storetest','abcdefg')
    },
    labeltest(){
      let ran = String(Math.ceil((Math.random()*10000)))
      this.tabs.label.push('push'+ran)
      this.tabs.clabel = 'push'+ran

      // this.arr.push('push')
      // this.clabel = 'push'
      console.log(this.tabs)
    },
    buttontest(){
      // this.tabs.splice(this.tabs.length,0,"add")
    
      var data = Qs.stringify({"recdata":['abc','def']});
      
      axios({
      method:'get',
      url:'http://localhost/ecserver/index.php/tasks',
      params:{
        action:'continue',
        creat_time:'2020-03-05',
        id_random:8881,
        type:'tasks_server'
      },
      // data,
        timeout:1000
      }).then(res=>{

        console.log(res)
      })
      
    },
    closelabel(index){
      this.tabs.label.splice(index,1)
    }
  }
}
</script>
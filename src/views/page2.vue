<template>
<Tabs ref="contents" type="card" :value="tabs.clabel" @on-tab-remove="closelabel" >
  <TabPane label="page2" name = 'page2'>

    <Cascader :data="data4" :load-data="loadData"></Cascader>
    <button @click="buttontest">axios测试</button>
    <br>
    {{axiosdata}}
    <br><br><br><br><br><br><br><br><br>
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
// import axios from 'axios';
// import Qs from 'qs'
import {request} from '../network/request'
export default {
  data () {
    return {
      tabs:{
        // clabel:'page2',
        // label:['abc','hahah']
      },
      axiosdata:{},
      data4: 
      [
        {
          value: '3-2_A',
          label: '3-2_A列',
          children: [],
          loading: false
        },
        {
          value: '3-2_B',
          label: '3-2_B列',
          children: [],
          loading:false
        },
        {
          value: '1-2_A',
          label: '1-2_A列',
          children: [],
          loading:false
        },
      ]
    }
  },
  mounted(){
    // this.tabs.clabel='page2'
    // this.tabs.label=['abc','hahah']
    this.tabs = {
      clabel:'page2',
      label:['abc','haha'],
      testarr:[]
    }
  },
  methods: {
    storetest(){
      this.$store.dispatch('storetest','abcdefg')
    },
    loadData (item, callback) {
      item.loading = true;
      axios({
      method:'get',
      url:'http://localhost/ecserver/index.php/servers',
      params:{
        action:'getjilianinfo',
        column:item.value
      },
      // data,
        timeout:5000
      }).then(res=>{
        let jilian = res.data;
        item.children = jilian.message.children
        console.log(jilian)
        if(item.value == '3-2_A'){
          // item.children = jilian.message.children
        }else if(item.value == '3-2_B'){
          console.log('B lie')
        }
        item.loading = false;
        callback();
      })
      
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
      request({
        url:'/servers',
        params:{
          action:'showlist',
          page: 1
        }
      }).then(res=>{
        console.log(res)
      })
      // var data = Qs.stringify({"recdata":['abc','def']});
      
      // axios({
      // method:'get',
      // url:'http://localhost/ecserver/index.php/servers',
      // params:{
      //   action:'showlist',
      //   page: 1
      // },
      // // data,
      //   timeout:1000
      // }).then(res=>{
      //   this.testarr = res.data;
      //   console.log(this.testarr)
      // })
      
    },
    closelabel(index){
      this.tabs.label.splice(index,1)
    }
  }
}
</script>
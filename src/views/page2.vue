<template>
<Tabs ref="contents" type="card" :value="tabs.ctab" @on-tab-remove="closelabel" >
  <TabPane label="page2" name = 'page2'>

    <Cascader :data="data4" :load-data="loadData"></Cascader>
    <button @click="buttontest">axios测试</button>
    <button @click="panglu">旁路扫描</button>
    <br>
    <Upload
        multiple 
        action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline" class="topmargin">上传文件</Button>
    </Upload>
    <br>
    {{axiosdata}}
    <br><br><br><br><br><br><br><br><br>
    <!-- <page1></page1> -->
  </TabPane>
  
  <TabPane label="page2-1" name = 'page2-1'>
    <p>this is page 2-1</p>
    <p>{{this.$store.state.tatedata}}--{{this.$store.state.showtabs.ctab}}</p>
    <button @click="storetest">store测试</button>
    <button @click="labeltest">label-test</button>
  </TabPane>
  <TabPane closable  v-for="(tab,index) in tabs.tabs" :name="tab"  :key=tab+index :label="tab">
    <!-- <p>{{tab}}</p> -->
    <PubComponet></PubComponet>
  </TabPane>
</Tabs>
</template>

<script>
import axios from 'axios';
import Qs from 'qs'
import {request} from '../network/request'
import {IdcTools} from '../assets/JStools/idc'
import PubComponet from '../components/common/PubComponent'
// import page1 from './page1'
export default {
  components:{
    PubComponet
  },
  data () {
    return {
      tabs:{

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
  // components:{page1},
  mounted(){

    this.tabs = this.$store.state.showtabs
  },
  methods: {
    storetest(){
      this.$store.dispatch('storetest','abcdefg') //异步
      
    },
    loadData (item, callback) {
      item.loading = true;
      
    },
    labeltest(){
      let ran = String(Math.ceil((Math.random()*10000)))
      // this.tabs.label.push('push'+ran)
      // this.tabs.clabel = 'push'+ran
      this.$store.commit('newtab',ran)

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
      
      
    },
    panglu(){
      let iptable = 
      ['110.88.128.246','110.88.128.16','110.88.153.75','110.88.128.64','110.88.128.95',
      '110.88.129.60']
      function test(){
        for(let i=0;i<iptable.length;i++){
          axios({
          method:'get',
          url:'https://bird.ioliu.cn/v1?url=http://api.webscan.cc?action=query&ip='+iptable[i],
          timeout:1000
          }).then(res=>{
            if(res.data == null){console.log(iptable[i]+'  IP未解析任何域名') }else{
              console.log(iptable[i]+'------------------')
              for(let j=0;j<res.data.length;j++){
                console.log(res.data[j])
              }
            }
          }).catch(err =>{
            console.log(err)
          })
        }
        
      }
      test()
      
    },
    closelabel(label){
      // this.tabs.label.splice(index,1)
      // console.log(label)
      this.$store.commit('deletetab',label)
    }
  }
}
</script>
<style scoped>
  @import '../assets/css/common.css';
</style>
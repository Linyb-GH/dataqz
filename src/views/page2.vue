<template>
<Tabs ref="contents" type="card"  >
  <TabPane label="page2">
    <p>this is page 2</p>
    <button @click="buttontest">axios测试</button>
    <br>
    {{axiosdata}}
    
  </TabPane>
  <TabPane label="page2-1">
    <p>this is page 2-1</p>
    <button @click="buttontest">测试按钮</button>
  </TabPane>
  <TabPane v-for="tab in tabs" :key=tab :label="tab">
    <p>{{tab}}</p>
  </TabPane>
</Tabs>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      tabs:["abc","def"],
      axiosdata:{}
    }
  },
  // created:{

  // },
  methods: {
    buttontest(){
      // this.tabs.splice(this.tabs.length,0,"add")
      axios({
        // url:'http://123.207.32.32:8000/home/multidata',
        url:'http://localhost/ecserver/index.php/servers',
        params:{page:1,action:'haha'},
        method:'get'
      }).then(res=>{
        console.log(res);
      })
      // console.log(this.$store.state.showcurrent.indexOf("tab1")== -1)
      // console.log('run here button test')
    }
  }
}
</script>
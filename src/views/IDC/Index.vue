<template>
  <div class="homesty">
    <a :href="adminurl"><img src="@/assets/logo.png"></a>

    <!-- <h1 style="flex-wrap:wrap;width:100vw;">页面入口</h1> -->
    <ul style="width:100vw;">
      <li><a :href="limianurl" target="_blank">机柜立面图</a></li>
      <li><a :href="pingmianurl" target="_blank">机房平面图</a></li>
      <li><a :href="devices" target="_blank">设备列表</a></li>
      <li><a :href="maintence" target="_blank">近期运维</a></li>
    </ul>
    <Input @on-search="searchbyip"  v-model = "msgip" class="seachsyt" search enter-button placeholder="通过IP、名称、品牌、型号查找" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NetRequest } from '@/router/request';
// @ is an alias to /src

export default defineComponent ({
  data(){
    return({
      adminurl:'',
      limianurl:'',
      pingmianurl:'',
      devices:'',
      maintence:'',
      searchmsg:'',
      msgip:'',
      msgname:'',
    })
  },
  mounted(){
    let rq = new NetRequest()
    let baseurl = rq.Netconfig.protocol+'://'+rq.Netconfig.frontIP
    this.adminurl = baseurl+'/#/admin'
    this.limianurl = baseurl+'/#/IDC/limian'
    this.pingmianurl = baseurl+'/#/IDC/pingmian'
    this.devices = baseurl+'/#/IDC/devices'
    this.maintence = baseurl+'/#/IDC/maintenance'
  },
  components: {
  
  },
  methods:{
    onclick(){
      console.log('jjj')
      // console.log(this.searchmsg)
    },
    searchbyip(){

      this.$router.push({name:'Devices',query:{search:this.msgip}})
    },
    searchbyname(){
      this.$router.push({name:'Devices',query:{search:this.msgname}})
    }
  }

})

</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  font-size:1.2rem;;
  color: #42b983;
}
.homesty{
  margin-top: 100px;
  display: flex;
  justify-content:center; 
  flex-wrap:wrap;
  align-items:center;
  /* border: solid 1px black; */
}

.seachsyt{
  width:400px;
  margin-top: 15px;
}
</style>
<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">IP变更</Button>
      <Input v-model="devicenum" @on-enter="clicked" style="float:left;margin-left:10px;margin-top:20px;width:200px" placeholder="请输入设备编号"  />
    </div>
    <Table class="tablesty" :columns="columns" :data="devices">
      <template #name="{ row }" >
        <a :href= urlstr+row.number>{{ row.name }}</a>
      </template>
    </Table>
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import {NetRequest} from '@/router/request'
import {Devices} from '@/router/interface'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      urlstr:'',
      totalnum:1,
      devicenum:'',
      columns:[{title: '日期',key: 'date',width:'110px'},{title: '设备编号',key: 'number',width:'100px'},{title: '设备名称',slot: 'name',width:'200px'},{title: '网口编号',key:'netcard',width:'80px'},
        {title: 'IP地址',key: 'ipaddr',width:'200px'},{title: '登录账号',key: 'account',width:'280px'},{title: 'VLAN',key: 'vlan'},{title:'运维人员',key:'operator'}],
      devices:[],
      netdata:{}
    }
  },
  mounted(){
    this.getList(1)
  },
  methods:{
    async clicked(){
      let x = new Devices()
      let y = await x.GetDeviceBynum(this.devicenum)
      if(y){
        if(y.data){
          
        }else{
          this.devicenum = ''
          this.$Message.error('设备编号不存在')
        }
        
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getList(page:number){
      let x = new Devices()
      let y = await x.GetNetipList(page)
      if(y){
        this.devices = y.data.list
        this.totalnum = y.data.total
      }else{
        this.$Message.error('网络错误')
      }
    },

    modalcancel(){
      console.log('modalcancel')
    },
    tuenpage(p:number){
      
      this.getList(p)
    },

  }
})
</script>

<style scoped>
.bodysty{
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  margin-top: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
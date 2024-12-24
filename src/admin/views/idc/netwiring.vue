<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">网络操作</Button>
      <Input v-model="device"  style="float:left;margin-left:10px;margin-top:20px;width:200px" placeholder="请输入设备编号"  />
    </div>
    <Table class="tablesty" :columns="columns" :data="wiringtable">
      <template #name1="{ row }" >
        <a :href= urlstr+row.number>{{ row.name1 }}</a>
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
      device:'',
      totalnum:1,
      columns:[{title: '日期',key: 'date',width:'120px'},{title: '操作类型',key: 'action',width:'100px'},{title: '本端设备',slot: 'name1',width:'200px'},
              {title: '网口',key:'netcard1',width:'100px'},{title: '对端设备',key: 'name2',width:'200px'},{title: '对端网口',key: 'netcard2'},
              {title: '经办',key: 'operator'}],
      wiringtable:[],
    }
  },
  mounted(){
   
    this.getList(1)
  },
  methods:{
    async clicked(){
      console.log('here',this.device)
      let x = new Devices()
      let y = await x.GetDeviceBynum(this.device)
      if(y){
        if(y.data){
          this.wiringaction(y.data)
        }else{
          this.$Message.error('找不到对应设备！')
        }
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getList(page:number){
      let x = new Devices()
      let y = await x.GetNetActions(page)
      if(y){
        this.totalnum = y.data.total
        this.wiringtable = y.data.list
      }else{
        this.$Message.error('网络错误')
      }
    },
    async modalconfirm(){
      // let x = new Devices()
      // let y = await x.DeviceSystem(this.modaldata)
      // if(y){
      //   this.$Message.success('数据已更新！')
      //   this.getList(1)
      //   this.modal = false
      // }else{
      //   this.$Message.error('网络错误')
      // }
    },
    wiringaction(p:{name:'',number:''}){
      store.commit('Tab_NewTab',{id:'netwiring',label:p.name,component:'TabDeviceWiring',data:{name:p.name,number:p.number}})
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
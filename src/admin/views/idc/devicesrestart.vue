<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">重启设备</Button>
      <Input v-model="devicenum" @on-enter="clicked" style="float:left;margin-left:10px;margin-top:20px;width:200px" placeholder="请输入设备编号"  />
    </div>
    <Table class="tablesty" :columns="columns" :data="devices">
      <template #name="{ row }" >
        <a :href= urlstr+row.number>{{ row.name }}</a>
      </template>
    </Table>
    <Modal v-model="modal" width="560" @on-ok="modalconfirm"  @on-cancel="modalcancel" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>设备重启/关机操作</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaldata" :label-width="80">
          <FormItem label="设备名称">
            <Input v-model="modaldata.name" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="联系人员">
            <Input v-model="modaldata.contact"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="备注" >
            <Input v-model="modaldata.remark"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="操作类型">
            <RadioGroup v-model="modaldata.types">
              <Radio label="重启">重启</Radio>
              <Radio label="关机">关机</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <!-- <div slot="footer">
        <Button type="primary" :loading="modalstate" @click="modalconfirm">确定</Button>
        <Button type="primary" @click="modalcancel">取消</Button>
      </div> -->
    </Modal>
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
      columns:[{title: '日期',key: 'date',width:'110px'},{title: '设备编号',key: 'number',width:'100px'},{title: '设备名称',slot: 'name',width:'200px'},
              {title: '操作类型',key:'types',width:'100px'},{title: '联系人员',key: 'contact',width:'180px'},{title:'经办',key:'operator'},{title: '备注',key: 'remark'}],
      devices:[],
      modal:false,
      modalstate:false,
      modaldata:{number:'',name:'',contact:'',remark:'',types:''},
      netdata:{}
    }
  },
  mounted(){
    this.modaldata.types = '重启'
    this.getList(1)
  },
  methods:{
    async clicked(){
      
      let x = new Devices()
      let y = await x.GetDeviceBynum(this.devicenum)
      if(y){
        if(y.data){
          this.modaldata.number = this.devicenum
          this.modal = true
          this.modaldata.name = y.data.name
        }else{
          this.devicenum = ''
          this.$Message.error('设备编号不存在')
        }
        // console.log(y.data)
        
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getList(page:number){
      let x = new Devices()
      let y = await x.getRestartList(page)
      if(y){
        this.devices = y.data.list
        this.totalnum = y.data.total
      }else{
        this.$Message.error('网络错误')
      }
    },
    async modalconfirm(){
      let x = new Devices()
      let y = await x.DeviceRestart(this.modaldata)
      if(y){
        this.$Message.success('数据已更新！')
        this.getList(1)
        this.modal = false
      }else{
        this.$Message.error('网络错误')
      }
    },
    modalcancel(){
      console.log('modalcancel')
    },
    tuenpage(p:number){
      console.log(p)
      // this.getList(p)
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
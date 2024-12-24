<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">配置变更</Button>
      <Input v-model="devicenum" @on-enter="clicked" style="float:left;margin-left:10px;margin-top:20px;width:200px" placeholder="请输入设备编号"  />
    </div>
    <Table class="tablesty" :columns="columns" :data="devices">
      <template #name="{ row }" >
        <a :href= urlstr+row.number>{{ row.name }}</a>
      </template>
      <template #state="{ row,index }" >
        <Button type="warning" :disabled = "row.state == '已完成'" size="small" @click="statebtn(index)">{{row.state}}</Button>
      </template>
    </Table>
    <Modal v-model="modal" width="560" @on-ok="modalconfirm"  @on-cancel="modalcancel" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>设备重启/关机操作</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaldata" :label-width="80">
          <FormItem label="日期">
            <Input v-model="modaldata.date" type="date" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="设备名称">
            <Input v-model="modaldata.name" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="过程描述">
            <Input v-model="modaldata.process"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="配件存放位置">
            <Input v-model="modaldata.site" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="联系人员">
            <Input v-model="modaldata.contact"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="状态">
            <RadioGroup v-model="modaldata.state">
              <Radio label="待完成">待完成</Radio>
              <Radio label="已完成">已完成</Radio>
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
              {title: '过程描述',key:'process',width:'400px'},{title: '联系人员',key: 'contact',width:'180px'},
              {title:'经办',key:'operator'},{title: '状态',slot: 'state'}],
      devices:[],
      modal:false,
      modalstate:false,
      modaldata:{id:'',number:'',date:'',name:'',process:'',site:'',contact:'',state:''},
      netdata:{}
    }
  },
  mounted(){
    this.modaldata.date = this.$Date().format('YYYY-MM-DD')
    this.modaldata.state = '待完成'
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
      let y = await x.GetchangeList(page)
      if(y){
        console.log(y)
        this.devices = y.data.list
        this.totalnum = y.data.total
      }else{
        this.$Message.error('网络错误')
      }
    },
    async modalconfirm(){
      let x = new Devices()
      let y = await x.DeviceChange(this.modaldata)
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
    statebtn(i:number){
      this.modaldata = this.devices[i]
      this.modal = true
   
    }
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
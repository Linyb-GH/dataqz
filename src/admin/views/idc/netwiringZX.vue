<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">专线接入</Button>
      <Input v-model="devicenum" @on-enter="clicked" style="float:left;margin-left:10px;margin-top:20px;width:200px" placeholder="请输入设备编号"  />
    </div>
    <Table class="tablesty" :columns="columns" :data="devices">
      <template #name="{ row }" >
        <a :href= urlstr+row.number>{{ row.name }}</a>
      </template>
      <template #state="{ row,index }" >
        <Button type="warning" :disabled = "row.state == '已完成'" size="small" @click="statebtn(index)">修改</Button>
      </template>
    </Table>
    <Modal v-model="modal" width="560" @on-ok="modalconfirm" @on-cancel="modalcancel" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>运维信息编辑</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaldata" :label-width="80">
          <FormItem label="日期">
            <Input v-model="modaldata.date" type="date" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="设备名称">
            <Input v-model="modaldata.name" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="对端地址">
            <Input v-model="modaldata.towhere"  placeholder="机房地址，例如泉州市安溪县医院"></Input>
          </FormItem>
          
          <Row>
            <Col span="12">
              <FormItem label="ip地址">
                <Input v-model="modaldata.ipaddr"  placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="网口编号">
                <Input v-model="modaldata.netcard"  placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="联系人员">
            <Input v-model="modaldata.contact"  placeholder="运营商人员联系电话"></Input>
          </FormItem>
          <FormItem label="订单号">
            <Input v-model="modaldata.lineorder"  placeholder="运营商的订单号"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="modaldata.remark"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="运营商">
            <RadioGroup v-model="modaldata.lineoperator">
              <Radio label="电信">电信</Radio>
              <Radio label="移动">移动</Radio>
              <Radio label="联通">联通</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
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
      columns:[{title: '日期',key: 'date',width:'110px'},{title: '设备编号',key: 'number',width:'100px'},{title: '设备名称',slot: 'name',width:'200px'},{title: 'IP地址',key: 'ipaddr',width:'150px'},
              {title: '对端地址',key:'towhere',width:'250px'},{title: '联系人员',key: 'contact',width:'180px'},{title:'经办',key:'operator'},{title: '操作',slot: 'state'}],
      devices:[],
      modal:false,
      modalstate:false,
      modaldata:{id:'',number:'',date:'',name:'',towhere:'',ipaddr:'',netcard:'',contact:'',lineorder:'',remark:'',lineoperator:''},
      netdata:{}
    }
  },
  mounted(){
    this.modaldata.date = this.$Date().format('YYYY-MM-DD')
   
    this.getList(1)
  },
  methods:{
    async clicked(){
      this.modaldata.id = ''
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
      let y = await x.GetNetzxList(page)
      if(y){
        this.devices = y.data.list
        this.totalnum = y.data.total
      }else{
        this.$Message.error('网络错误')
      }
    },
    async modalconfirm(){
      console.log(this.modaldata)
      let x = new Devices()
      let y = await x.NetZX(this.modaldata)
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
      
      this.getList(p)
    },
    statebtn(index:number){
      this.modaldata = this.devices[index]
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
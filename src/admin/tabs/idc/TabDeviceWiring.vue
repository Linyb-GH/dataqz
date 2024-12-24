<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="clicked" style="float:left;margin-left:30px;margin-top:20px" type="primary">设备布线</Button>
      <Input v-model="devicenumber"  style="float:left;margin-left:30px;margin-top:20px;width:200px" placeholder="请输入对端设备编号"  />
    </div>

    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #port1="{ row }" >
        <strong>{{ row.port1 }}</strong>
      </template>
      <template #action="{index }" >
        <Button type="primary" size="small" style="margin-right: 5px" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <Modal v-model="ModalWiring" width="560" @on-ok="modalyes" @on-cancel="modalcancel"  >
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>新增布线编辑框</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaldata" :label-width="80">
          <FormItem label="设备1">
            <Input v-model="modaldata.name1" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="网口1">
            <Input v-model="modaldata.port1"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="设备2">
            <Input v-model="modaldata.name2" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="网口2">
            <Input v-model="modaldata.port2"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="modaldata.remark"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="网口类型">
            <RadioGroup v-model="modaldata.nettype">
              <Radio label="光口">光口</Radio>
              <Radio label="电口">电口</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {Devices} from '@/router/interface'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})
export default defineComponent({
  setup() {
    
  },
  props:[
    "message"
  ],
  data(){
    return{
      columns: [{title: '本端设备网口',slot: 'port1'},{title: '对端设备',key: 'name2'},{title: '对端网口',key: 'port2'},
        {title: '网口类型',key: 'type'},{title: '设备编号',key: 'id2'},{title: '备注',key: 'remark'},
        {title: '操作',slot: 'action',width: 150,align: 'center'}],
      tabledata: [{port1:'',port2:'',name2:'',type:'',remark:'',cardid:'',id2:''}],
      ModalWiring: false, //删除确认对话框
      modaldata:{name1:'',port1:'',name2:'',port2:'',remark:'',nettype:'',cardid:'',id2:''},
      buttonstate:false,
      devicenumber:'',
    }
  },
  mounted(){
    this.modaldata.nettype = '电口'
    this.getList()

  },
  methods:{
    async getList(){
      let x = new Devices()
      let y = await x.GetNetWiringBynum(this.message.number)
      if(y){
        if(y.data.length>0){
          this.tabledata = y.data
        }else{
          this.tabledata = []
        }
      }else{
        this.$Message.error('网络错误')
      }
    },
    async modalyes(){
      let postdata = {
        cardid:'',
        id1:this.message.number,
        id2:this.devicenumber,
        name1:this.message.name,
        nettype:this.modaldata.nettype,
        remark:this.modaldata.remark,
        name2:this.modaldata.name2,
        netcard1:this.modaldata.port1,
        netcard2:this.modaldata.port2,
      }
      postdata.cardid = this.modaldata.cardid
      postdata.id2 = this.modaldata.id2

      let x = new Devices()
      let y = await x.WiringAction(postdata)
      if(y){
        this.getList()
        this.$Message.success('变更完成！')
      }else{
        this.$Message.error('网络错误')
      }
     
    },
    modify(i:number){
      this.ModalWiring = true
      let x = this.tabledata[i]
      this.modaldata.name1 = this.message.name
      this.modaldata.port1 = x.port1
      this.modaldata.name2 = x.name2
      this.modaldata.port2 = x.port2
      this.modaldata.nettype = x.type
      this.modaldata.remark = x.remark
      this.modaldata.cardid = x.cardid
      this.modaldata.id2 = x.id2
    },
    remove(i:number){
      // console.log(this.tabledata[i]['cardid'])
      this.$Modal.confirm({
        title: '是否删除',
        content: this.message.name +this.tabledata[i].port1 +'的网线？',
        onOk: () => {
          this.deleteaction(parseInt(this.tabledata[i]['cardid']))
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel');
        }
      });
    },
    modalcancel(){

    },
    async deleteaction(id:number){
      let x = new Devices()
      let y = await x.WiringDelete({id})
      if(y){
        this.getList()
      }else{
        this.$Message.error('网络错误')
      }
    },
    async clicked(){
      let x = new Devices()
      let y = await x.GetDeviceBynum(this.devicenumber)
      if(y){
        if(y.data){
          this.ModalWiring = true
          this.modaldata.id2 = y.data.number
          this.modaldata.name1 = this.message.name
          this.modaldata.name2 = y.data.name
          // console.log(y.data)
        }else{
          this.$Message.error('请输入正确的编号！')
        }
      }else{
        this.$Message.error('网络错误')
      }
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

</style>
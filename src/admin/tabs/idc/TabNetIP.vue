<template>
  <div class="bodysty">

    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #port1="{ row }" >
        <strong>{{ row.port1 }}</strong>
      </template>
      <template #action="{index }" >
        <Button type="primary" size="small" style="margin-right: 5px" @click="modify(index)">修改</Button>
      </template>
    </Table>
    <Modal v-model="ModalWiring" width="560" @on-ok="modalyes" @on-cancel="modalcancel"  >
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>修改IP编辑框</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaldata" :label-width="80">
          <FormItem label="设备网口">
            <Input v-model="modaldata.port1" disabled placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="IP地址">
            <Input v-model="modaldata.ipaddr" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="登录地址">
            <Input v-model="modaldata.loginurl"  placeholder="https://x.x.x.x"></Input>
          </FormItem>
          <FormItem label="登录账号">
            <Input v-model="modaldata.account"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="VLAN">
            <Input v-model="modaldata.vlan"  placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="modaldata.remark"  placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import {request} from '../../router/request'
export default {
  data(){
    return({
      columns: [{title: '设备编号',key: 'id1'},{title: '设备网口',slot: 'port1'},{title: 'IP地址',key: 'ipaddr'},
        {title: '登录地址',key: 'loginurl'},{title: '登录账号',key: 'account'},{title: 'VLAN',key: 'vlan'},
        {title: '操作',slot: 'action',width: 80,align: 'center'}],
      tabledata: [],
      ModalWiring: false, //删除确认对话框
      modaldata:{port1:'',ipaddr:'',loginurl:'',account:'',vlan:'',remark:''},
      buttonstate:false,
      devicenumber:'',
      states:{}
    })
  },
 
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      request({
        url:'?s=Idc.AdminNet.GetNetWiringBynum',
        params: {user_id:this.$store.state.user.user_id,token:this.$store.state.user.token,number:this.message.data.number},
      }).then(res =>{
        let x = res.data
        if(x.ret == 200){
          if(x.data){
            if(x.data.length > 0){
              this.tabledata = x.data
            }else{
              this.tabledata=[]
            }
          }else{
            this.$Message.warning('请输入正确的编号');
          }
        }else{
          this.$Message.error(x.rt + '提交失败!');
        }
      }).catch(err=>{
        this.$Message.error(err+'发生错误');
      }) 

    },
    modify (index) {
      
      this.ModalWiring = true
      let x = this.tabledata[index]
      this.modaldata.ipaddr = x.ipaddr
      this.modaldata.account = x.account
      this.modaldata.loginurl = x.loginurl
      this.modaldata.remark = x.remark
      this.modaldata.vlan  = x.vlan
      this.modaldata.port1 = x.port1
      this.modaldata.cardid = x.cardid
      this.modaldata.id1 = x.id1
      this.modaldata.name = this.message.data.name
      
    },

    cancel(){
      
    },
    modalyes(){
      this.netAction('新增')
    },
    netAction(action){
      let fdata=new FormData();
      fdata.append('action',action);
      fdata.append('number',this.modaldata.id1);
      fdata.append('cardid',this.modaldata.cardid);
      fdata.append('netcard',this.modaldata.port1);
      fdata.append('name',this.modaldata.name);
      fdata.append('ipaddr',this.modaldata.ipaddr);
      fdata.append('account',this.modaldata.account);
      fdata.append('loginurl',this.modaldata.loginurl);      
      fdata.append('vlan',this.modaldata.vlan);
      fdata.append('remark',this.modaldata.remark);
  
      request({
        url:'?s=Idc.AdminNet.NetIP',
        method: 'post',
        data: fdata,
        params: {user_id:this.$store.state.user.user_id,token:this.$store.state.user.token},
      }).then(res =>{
        let x = res.data
        if(x.ret == 200){
          this.$Message.success('提交成功');
          this.getList()
          this.ModalWiring = false 
        }else{
          this.$Message.error(x.rt + '提交失败!');
        }
      }).catch(err=>{
        this.$Message.error('catch 错误'+err);
        this.loading = false
      }) 
    },
    modalcancel(){
      this.ModalWiring = false
    },
  },
  props:[
    "message"
  ],
  components: {
  }
}
</script>
<style scoped>

.bodysty{
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
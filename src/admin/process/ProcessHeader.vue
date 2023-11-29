<template>
  <div class="bodysty">
    <div class="btnsty"> 
      <img v-if ="processdata.ProcessStatus == '发布'" src="@/assets/images/finish.jpg">
      <img v-else-if="processdata.nodeuser != user_id" src="@/assets/images/finishnode.jpg">
      <div v-else>
        <Button type="primary" :disabled="message.submitbtn" v-if ="processdata.ProcessStatus == '创建'" @click = "fsave">保存</Button>
        <Button type="primary" :disabled="message.submitbtn"  v-if="processdata.ProcessStatus == '创建'" style="margin-left:5px;" @click = "submit">提交</Button>
        <Button type="warning" :disabled="message.submitbtn"  v-if="processdata.ProcessStatus == '审核'" style="margin-left:5px;" @click = "goback">退回</Button>
        <Button type="primary" :disabled="message.submitbtn"  v-if="processdata.ProcessStatus == '审核'" style="margin-left:5px;" @click = "verify">转办</Button>
        <Button type="primary" :disabled="message.submitbtn"  v-if="processdata.ProcessStatus == '审核'" style="margin-left:5px;" @click = "publish">发布</Button>
      </div>
    </div> 
    <Modal
      v-model="modal.show"
      title="办理意见"
      :loading="modal.loading"
      @on-ok="asyncOK">
      <Table @on-row-click="tabclick" :columns="modal.columns" :data="modal.data"></Table>
      <Input v-model="submitdata.opinions" type="textarea" :rows="4" placeholder="Enter something..." /> 
      <div style="margin-top: 10px;margin-bottom: 5px;" v-show="modaldom.nextuser">流程发送</div>
      <Select v-model="submitdata.nextnode" filterable v-show="modaldom.nextuser">
        <Option v-for="item in modal.users" :value="item.id" :key="item.username+item.department">{{ item.username }}-{{ item.department }}</Option>
      </Select>
    </Modal>
  </div>
</template>

<script lang="ts">

import { defineComponent,ref } from 'vue'
import { User ,Process} from '@/router/interface'
import store from '@/store'
export default defineComponent({
  setup(props) {
    const processdata = ref({
      submitbtn:false,ProcessStatus:'创建',nodeuser:''})
    const btntype = ref('fsave')
    const modaldom = ref({opinion:true,nextuser:true})
    return{
      processdata,btntype,modaldom
    }
  },
  data(){
    return({
      // processdata:store.state.process_data
      // message:{} 
      user_id:store.state.user.user_id,
      Nodedata:{},
      modal:{
        loading:true,show:false,
        users:[{id:0,username:'',department: ''}],
        columns: [{title: '常用意见',key: 'common'},],
        data:[{common: '网站内容编辑，请领导审批'},{common: '同意'}]
      },
      submitdata:{nextnode:0,opinions:'',},
    })
  },
  components: {
    
  },
  mounted(){
    this.GetUsers()
    this.getNodeData()
    this.processdata = this.message
  },
  // emits: ['fsave', 'submit','goback','verify','publish'],

  methods:{
    getNodeData(){
      let id = <string> this.$route.query.id 
      this.getProcessNodes(parseInt(id),<string>this.$route.name)
      console.log(this.message,'message',this.user_id)
    },
    async getProcessNodes(id:number,modal:string){
      let x = new Process()
      let y = await x.GetProcessNode(id,modal)
      if(y){
        this.Nodedata = y
      }else{
        this.$Message.error('getProcessNodes 发生错误！')
      }
    },
    asyncOK(){

      if(!this.isok()){return }
      this.$emit('processevent',{action:this.btntype,data:this.submitdata})
      this.modal.show = false
      console.log('asyncOK')
    },
    tabclick(item:any){
      this.submitdata.opinions = item.common
    },
    isok(){
      if(this.modaldom.nextuser){
        if(this.submitdata.nextnode == 0){
          this.$Message.warning('下一审核人不得为空,请重新提交。');
          this.modal.show = false
          return false
        }
      }
      if(this.submitdata.opinions == ''){
        this.$Message.warning('意见不能为空');
        this.modal.show = false
        return false
      }
      return true
    },
    
    fsave(){
      this.$emit('processevent',{action:'fsave'})
    },
    submit(){
      this.btntype = 'submit'
      this.modal.show = true
    },
    goback(){
      this.modaldom.nextuser = false
      this.btntype = 'goback'
      this.modal.show = true
    },
    verify(){
      this.btntype = 'verify'
      this.modal.show = true
    },

    publish(){
      this.modaldom.nextuser = false
      this.btntype = 'publish'
      this.modal.show = true
    },
    async GetUsers(){
      let x = new User()
      let y = await x.GetUsers()
      if(y){
        this.modal.users = y.filter((item:any)=>{
          return item.id != store.state.user.user_id
        })
      }else{
        this.$Message.error('网络错误')
      }
    },
  },
  props:["message"],
  
})
</script>


<style scoped>
.bodysty{ 
  /* border: 1px solid black; */
  width: auto;
}
.btnsty{ 
  margin: 10px -5px;
  text-align: right;
  width: 100%;
}

</style>
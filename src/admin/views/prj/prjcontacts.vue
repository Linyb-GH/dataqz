<template>
  <div class="bodysty">
    <div style="width:100vw;">
      <Input search  style="width:400px;margin-left:30px;margin:10px 10px" @click="getPrjContracts(1)" @on-enter="getPrjContracts(1)" v-model="search"  enter-button="查找" placeholder="通过合同名称查找" />
    </div>
    <Modal v-model="modal_status.isshow" title="合同信息编辑" width="800" @on-ok="modalyes" @on-cancel="modalcancel" >
      <Form :model="modal_data_edit" :label-width="80">
        <FormItem label="合同名称">
          <Input v-model="modal_data_edit.con_name" placeholder="合同名称"></Input>
        </FormItem>
        <FormItem label="服务摘要">
          <Input v-model="modal_data_edit.summary" placeholder="服务摘要"></Input>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="合同编号">
              <Input v-model="modal_data_edit.con_num" placeholder="合同编号"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="购销类型">
              <RadioGroup v-model="modal_data_edit.type">
                <Radio label="购">购</Radio>
                <Radio label="销">销</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="合同金额">
              <Input v-model="modal_data_edit.money" placeholder="合同金额"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="签订日期">
              <DatePicker type="date" placeholder="Select date" v-model="modal_data_edit.s_date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="截止日期">
              <DatePicker type="date" placeholder="Select date" v-model="modal_data_edit.deadline"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <div v-if="modal_data_edit.type == '购'">
          <FormItem label="乙方单位">
            <Input v-model="modal_data_edit.s_company" placeholder="乙方单位"></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="联系人">
                <Input v-model="modal_data_edit.s_name" placeholder="联系人"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话">
                <Input v-model="modal_data_edit.s_num" placeholder="联系电话"></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        <div v-else>
          <FormItem label="甲方单位">
            <Input v-model="modal_data_edit.f_company" placeholder="甲方单位"></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="联系人">
                <Input v-model="modal_data_edit.f_name" placeholder="联系人"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话">
                <Input v-model="modal_data_edit.f_num" placeholder="联系电话"></Input>
              </FormItem>
            </Col>
          </Row>
        </div>
        
      </Form>
    </Modal>
    <Table stripe :columns="init.columns" :data="pagedata">
      <template #action="{ row, index }">
        <Button :disabled="row.upload_userid != userinfo.user_id" type="primary" size="small" style="margin-right: 5px" @click="deletefunc(row)">删除</Button>
        <Button :disabled="row.upload_userid != userinfo.user_id"  type="primary" @click="editaction(row,index)" size="small" >编辑</Button>
      </template>
      <template #con_name="{ row, index }">
        <a target="_blank" :href="row.upload_url">{{ row.con_name }}</a>
      </template>
    </Table>
  </div>
  <div style="width:100%">
    <Page style="margin-top: 10px;margin-bottom: 20px;" @on-change="tuenpage" :total="totalnum" />
  </div>
</template>

<script lang="ts">
import { Modal } from 'view-ui-plus'
import { defineComponent } from 'vue'
import store from '@/store'
import Projects from '@/router/interface/Projects'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      init:{
        columns: [
          {
            title: '合同名称',
            slot: 'con_name',
            width:280
          },
          {
            title: '合同编号',
            key: 'con_num'
          },
          {
            title: '类型',
            key: 'type',
            width:80
          },
          {
            title: '所属项目',
            key: 'prjname'
          },
          {
            title: '签订单位',
            key: 'company'
          },
          {
            title: '签订日期',
            key: 's_date'
          },
          {
            title:'操作',
            slot:'action',
            width:150
          }
        ],
      },
      search:'',
      userinfo:{user_id:''},
      totalnum:1,
      pagedata: [
          {
            id:'',
            con_name: '',s_company:'',s_name:'',s_num:'',
            con_num: '',f_company:'',f_name:'',f_num:'',s_date:'',deadline:'',money:'',summary:'',remark:'',
            type: '',
            prjname:'',
            company:'',
          },
      ],
      modal_status:{isshow:false,id_contract:''},
      modal_data_edit:{con_name:'',con_num:'',type:'',s_company:'',s_name:'',s_num:'',
        f_company:'',f_name:'',f_num:'',s_date:'',deadline:'',money:'',summary:'',remark:''
      }
      
    }
  },
  mounted(){
    this.userinfo.user_id = store.state.user.user_id
    this.getPrjContracts(1)
    
  },
  methods:{
    async deleteContract(id:string){
      let x = new Projects()
      let y = await x.DeleteContract(id)
      if(y.data){
        this.getPrjContracts(1)
        this.$Message.success('已删除！')
      }else{
        this.$Message.error('删除出错，请重试！')
      }
    },
    deletefunc(row:{id:''}){
      this.$Modal.confirm({
        title: '是否删除',
        content: '<p>删除操作不可恢复，是否删除？</p>',
        loading: true,
        onOk: () => {
          this.$Modal.remove();
          this.deleteContract(row.id)
        }
      });
    },
    async getPrjContracts(page:number){
      let x = new Projects()
      let y = await x.getPrjContracts(page,this.search)
      if(y.data){
        this.pagedata = y.data.list
        this.totalnum = y.data.total
        // console.log(y.data)
      }
    },
    tuenpage(p:number){
      this.getPrjContracts(p)
    },
    download(i:number){

      console.log(i)
    },
    editaction(row:any,i:number){
      let x = this.pagedata[i]
      this.modal_status.id_contract = x.id
      this.modal_data_edit.con_name = x.con_name
      this.modal_data_edit.con_num = x.con_num
      this.modal_data_edit.s_company = x.s_company
      this.modal_data_edit.type = x.type
      this.modal_data_edit.s_name = x.s_name
      this.modal_data_edit.s_num = x.s_num
      this.modal_data_edit.f_company = x.f_company
      this.modal_data_edit.f_name = x.f_name
      this.modal_data_edit.f_num = x.f_num
      this.modal_data_edit.s_date = x.s_date
      this.modal_data_edit.deadline = x.deadline
      this.modal_data_edit.money = x.money
      this.modal_data_edit.summary = x.summary
      this.modal_data_edit.remark = x.remark
      this.modal_status.isshow = true

    },
    async modalyes(){
      let d = JSON.stringify(this.modal_data_edit)
      let x = new Projects()
      let y = await x.UpdateContract(this.modal_status.id_contract,d)
      if(y.data){
        this.getPrjContracts(1)
        this.$Message.success('完成更新')
      }else{
        this.$Message.error('更新发生错误')
      }
      // console.log(d,'ddd',this.modal_status.id_contract,'id')
    },
    modalcancel(x:any){
      console.log(x,'xxx')
      // this.modal_status.isshow = false
    }

  }
})
</script>

<style scoped>
.bodysty{
  margin-bottom: 5px;
  min-width: 900px;
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
<template>
  <div class="bodysty">
    <div style="width:100vw;text-align: left;">
      <Button target="_blank" to="/process/general" @click="clicked" style="margin: 10px 0px 10px 10px;" type="primary">编辑概况</Button>
    </div>
    
    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #m_class="{ row }" >
        <strong>{{ row.m_class }}</strong>
      </template>
      <template #action="{ row } ">
        <Button  type="primary" target="_blank" :to="'/process/general?id='+row.id" @click="checked(row)">明细</Button>
      </template>
    </Table>
    <Page style="padding: 15px 0;" @on-change="turnpage" :total="total" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Web } from '@/router/interface'
export default defineComponent({
  setup() {
    
  },
  data () {
    return {
      modal:{isshow:false,loading:true},
      total:0,
      formdata:{m_class:'',auditor:'',p_type:'',datetime:''},
      columns: [
        {
          title: '类型',
          slot: 'm_class'
        },
        {
          title: '发布时间',
          key: 'datetime'
        },
        {
          title: '审核人员',
          key: 'auditor'
        },
        {
          title: '状态',
          key: 'process_status'
        },
        {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
        }
      ],
      tabledata: []
    }
  },
  mounted(){
    this.getList(1)
  },
  methods:{
    async getList(page:number){
      let x = new Web()
      let y = await x.getMyGeneral(page,10)
      if(y){
        this.tabledata = y.list
        this.total = y.total
      }else{
        this.$Message.error('网络错误')
      }
    },
    turnpage(page:number){
      this.getList(page)
    },
    asyncOK(){
      console.log('here')
    },
    checked(row:object){
      console.log(row)
    },
    clicked(){
      // this.modal.isshow = true
    }
  }
})
</script>

<style scoped>
.bodysty{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 900px;
  /* border: #dcdee2 1px solid; */
}
.tablesty{
  
  width:100vw;
}

.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
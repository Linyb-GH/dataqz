<template>
  <div class="bodysty">
    <Modal v-model="modalstatus.isshow" title="邮件发送"  width="800" :loading="modalstatus.loading"  @on-ok="modalyes" @on-cancel="modalcancel"  >
      <iframe v-if="modalstatus.isshow" :onload="onload" width="100%" id="show-iframe"  frameborder=0 name="SendEmail" scrolling=auto src="http://192.168.20.217/data/?s=Dtqz.Auth.Test"></iframe>
    </Modal>
    
    <div style="width:100vw;min-width: 900px;">
      <Button @click="test" style="float:left;margin-left:20px;margin-top:20px" type="primary">测试</Button>
      <Button target="_blank" to="http://www.baidu.com" style="float:left;margin-left:20px;margin-top:20px" type="primary">链接</Button>
    </div>
    <Table class="tablesty" stripe :loading="initdata.tabloading" :columns="columns" :data="pagedata.prjlist">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #action="{ row, index }">
        <Button type="primary" size="small" @click="editorreport(index)">编辑</Button>
        <!-- <Button type="error" size="small" style="margin-left: 5px" @click="deleteprj(index)">删除</Button> -->
      </template>
      <template #status="{ row }" >
        <Text v-if="row.status == '已评审'" type="success">{{ row.status }}</Text>
        <Text v-else type="danger">{{ row.status }}</Text>
      </template>
    </Table>
    
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components:{},
  setup() {
    
  },
  data(){
    return {
      modalstatus:{isshow:false,loading:true},
      initdata:{tabloading:false},
      columns:[{title: '周报日期',key: 'DateRange',width:'200px'},
        {title: '提交时间',key:'HDate',width:'120px'},{title: '评审人',key: 'reviewer'},{title: '评审状态',slot: 'status'},{title: '评审内容',key: 'command'},{title:'操作',slot:'action'}],
      pagedata:{prjlist:[
        {DateRange:'2021-10-01 - 2021-10-07',HDate:'2021-10-07',reviewer:'郭琛',status:'未评审'}
      ],cc:[{id:'',name:''}]},
      totalnum:0,

    }
  },
  mounted(){
    this.pagedata.cc = []
  },
  methods:{
    test(){
      this.modalstatus.isshow = true
      this.modalstatus.loading = true
    },
    editorreport(i:number){
      console.log(i)
    },
    tuenpage(i:number){
      console.log(i)
    },

    onload(){
      this.modalstatus.loading = false
    },
    handleAdd(){
      // this.pagedata.cc.push({id:'2',name:'xiaoming'})
      console.log('handleAdd')
    },

    handleClose(){

    },
    userselected(user:{id:'',name:''}){
      // console.log(user.id,'hhh')
    },
    modalyes(){
      console.log('modalyes')
    },
    modalcancel(){
      console.log('modalcancel')
    }
  }
})
</script>

<style scoped>
.bodysty{
  min-height: 600px;
  min-width: 900px;
  margin-bottom: 5px;
  display: flex;
  justify-content: left;
  align-content: flex-start;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  min-width: 1100px;
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
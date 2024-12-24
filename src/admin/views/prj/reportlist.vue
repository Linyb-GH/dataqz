<template>
  <div class="bodysty">

    <Modal v-model="modalstatus.weekly" title="周报"  width="800" footer-hide  >
      <div v-html="modaldata.content"></div>
    </Modal>
    <WeeklyRPrj v-if="modalstatus.isshow" @actions="ModalActions"> </WeeklyRPrj>
    <div style="width:100vw;min-width: 900px;">
      <Button @click="newreport" style="float:left;margin-left:20px;margin-top:20px" type="primary">项目周报</Button>
    </div>
    <Table class="tablesty" stripe :loading="initdata.tabloading" :columns="columns" :data="pagedata.prjlist">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #action="{ row, index }">
        <Button type="primary" size="small" @click="editorreport(index)">查看</Button>
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
import MyEditor from '@/admin/common/Editor.vue'
import UserSelector from '@/admin/common/UserSelector.vue'
import  Projects  from '@/router/interface/Projects'
import WeeklyRPrj from '@/admin/views/prj/modal/weeklyRPrj.vue'
import store from '@/store'
export default defineComponent({
  components:{WeeklyRPrj,UserSelector},
  setup() {
    
  },
  data(){
    return {
      modalstatus:{isshow:false,weekly:false},
      initdata:{tabloading:false},
      columns:[{title: '主题',key: 'Subject',width:'400px'},
        {title: '提交时间',key:'datetime',width:'220px'},{title: '收件人',key: 'rec'},{title:'操作',slot:'action'}],
      pagedata:{prjlist:[
        {Subject:'周报-2021-10-07',datetime:'2021-10-07',rec:'郭琛',Body:''}
      ],cc:[{id:'',name:''}]},
      totalnum:0,
      modaldata:{
        content:'',
      },
      editordata:{id:0,content:'<p>hhhhh</p>'}
    }
  },
  mounted(){
    this.pagedata.cc = []
    this.WeeklyList()
  },
  methods:{
    async newreport(){
      let x = new Projects()
      let y = await x.getRPrjWeekly()
      if(y.data){
        this.modalstatus.isshow = true
      }else{
        this.$Message.error('获取参与项目周报出错，请重试！')
      }
      console.log(this.modalstatus)
      // this.modalstatus.isshow = true
    },
    async WeeklyList(){
      let x = new Projects()
      console.log(store.state.user.user_id,'store.state.user.user_id')
      let y = await x.PrjMailList(store.state.user.user_id,'1')
      if(y.data){
        this.pagedata.prjlist = y.data.list
        console.log(y)
      }else{
        this.$Message.error('获取参与项目周报出错，请重试！')
      }
    },
    
    editorreport(i:number){
      this.modaldata.content = this.pagedata.prjlist[i].Body
      this.modalstatus.weekly = true
    },

    tuenpage(i:number){
      console.log(i)
    },

    ModalActions(p:{action:string}){
      if(p.action == 'closed'){
        this.modalstatus.isshow = false
      }
      console.log(p)
    },


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
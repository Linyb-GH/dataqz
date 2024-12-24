<template>

  <TaskInfo @actions="NTactions" v-if="modalstatus.taskid != ''" :message="{id:modalstatus.taskid}"></TaskInfo>

  <div class="bodysty" style="margin-bottom: 5px;display: flex;justify-content: left;align-content: flex-start;flex-wrap: wrap;border: #dcdee2 1px solid;">
    <div style="width:100vw;min-width: 900px;">
      <RadioGroup @on-change="searchbtn"  style="float:left;margin-left:30px;margin-top:20px" v-model="select.schedule" type="button" button-style="solid">
        <Radio label="所有阶段"></Radio>
        <Radio label="已完成"></Radio>
        <Radio label="未完成"></Radio>
        <Radio label="已终止"></Radio>
      </RadioGroup>
      <RadioGroup @on-change="searchbtn" style="float:left;margin-left:30px;margin-top:20px" v-model="select.status" type="button" button-style="solid">
        <Radio label="所有状态"></Radio>
        <Radio label="逾期"></Radio>
        <Radio label="正常"></Radio>
      </RadioGroup>
      <Input search @click="searchbtn" style="width:300px;float:left;margin-left:30px;margin-top:20px"   v-model="select.name"  enter-button="查找" placeholder="通过任务名称查找" />
    </div>

    <Table class="tablesty" stripe :columns="columns" :data="tasklist">
      <template #prjname="{ row }" >
        <Link @click="Prjlink(row)">{{ row.prjname }}</Link>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #name="{ row, index }">
        <Link  @click="linkaction(index)">{{ row.name }}</Link>
      </template>
      <template #remainder="{ row }" >
        <Text v-if="row.remainder < 3" type="danger">{{ row.remainder }}</Text>
        <Text  v-else-if="row.remainder < 20"  type="warning">{{ row.remainder }}</Text>
        <Text v-else type="success">{{ row.remainder }}</Text>
      </template>
    </Table>

    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Projects from '@/router/interface/Projects'
import store from '@/store'
import TaskInfo from '@/admin/views/prj/modal/prjmytasks.vue'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      select:{schedule:'',name:'',status:'',page:1},
      totalnum:1,
      columns:[{title: '所属项目',slot: 'prjname',width:'300px'},{title: '任务名称',slot: 'name',width:'200px'},{title: '状态',key: 'status',width:'100px'},
              {title: '开始时间',key:'date_begin',width:'120px'},{title: '截止时间',key: 'date_plan',width:'120px'},{title: '历时/天',key: 'time_use',width:'100px'},{title: '剩余天数',slot: 'remainder'},
             ],
      tasklist:[{id:'',name:'',status:'',prjname:'',date_begin:'',date_plan:'',time_use:'',remainder:''}],
      modaldata:{},
      modalstatus:{taskid:''}
    }
  },
  components:{TaskInfo},
  mounted(){
    this.select.schedule = '所有阶段'
    this.select.status = '所有状态'
    this.getList(1)
  },
  methods:{
    linkaction(i:number){
      this.modalstatus.taskid = this.tasklist[i].id
      // store.commit('Tab_NewTab',{id:'',label:this.tasklist[i].name,component:'TabPrjTask',data:{id:this.tasklist[i].id,name:this.tasklist[i].name}})
    },
    Prjlink(row:{prjid:'',prjname:''}){
      store.commit('Tab_NewTab',{id:'',label:row.prjname,component:'TabPrjInfo',data:{id:row.prjid,name:row.prjname}})
      // console.log(row)
    },
    searchbtn(){
      this.getList(1)
      // console.log(this.select)
    },
    async getList(page:number){
      this.select.page = page
      let x = new Projects()
      let y = await x.GetTaskList(this.select)
      if(y.data.list){
        console.log(y.data,'getlist')
        this.tasklist = y.data.list
        this.totalnum = y.data.total
      }else{
        this.tasklist = []
      }
    },
    NTactions(emit:{action:string}){
      if(emit.action == 'closed'){
        this.modalstatus.taskid = ''
      }
    },
    modalcancel(){
      console.log('modalcancel')
    },
    tuenpage(p:number){
      this.getList(p)
    },
 
  }
})
</script>

<style scoped>
.bodysty{
  min-height: 600px;
  min-width: 900px;
  
}

.tablesty{
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
  min-width: 1100px;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
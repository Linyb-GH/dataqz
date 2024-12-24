<template>
  <div class="bodysty">
    <div style="width:100%;min-width: 900px;">
      <RadioGroup  @on-change="searchbtn" style="float:left;margin-left:30px;margin-top:20px" v-model="select.schedule" type="button" button-style="solid">
        <Radio label="所有阶段"></Radio>
        <Radio label="已完成"></Radio>
        <Radio label="未完成"></Radio>
        <Radio label="已终止"></Radio>
      </RadioGroup>
      <RadioGroup  @on-change="searchbtn" style="float:left;margin-left:30px;margin-top:20px" v-model="select.status" type="button" button-style="solid">
        <Radio label="所有状态"></Radio>
        <Radio label="逾期"></Radio>
        <Radio label="正常"></Radio>
      </RadioGroup>
      <Select v-model="select.creatorid"  @on-change="searchbtn" style="width:80px;float:left;margin-left:30px;margin-top:20px">
        <Option v-for="item in arrData" :value="item.value" :key="item.label">{{ item.label }}</Option>
      </Select>
      <Input search @click="searchbtn" style="width:300px;float:left;margin-left:30px;margin-top:20px"   v-model="select.name"  enter-button="查找" placeholder="通过任务名称查找" />
    </div>
    <Modal v-model="modalstatus.isshow" width="560" @on-ok="modalyes" @on-cancel="modalcancel"  >
      编辑任务
    </Modal>
    <Table class="tablesty" stripe :loading="spinShow" :columns="columns" :data="tasklist">
      <template #prjname="{ row }" >
        <span>{{ row.prjname }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #taskname="{ row, index }">
        <span @click="tablink(index)" class="tablink">{{ row.taskname }}</span>
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
import User from '@/router/interface/User'
import store from '@/store'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      select:{schedule:'',name:'',creatorid:'',status:'',page:1},
      arrData:[{value: '',label: '所有'},{value: '张三李四',label: '张三李四'},{value: '王销售',label: '王销售'}],
      totalnum:1,
      columns:[{title: '任务名称',slot: 'taskname',width:'200px'},{title:'负责人',key:'creator'},{title: '是否完成',key: 'schedule',width:'100px'},{title: '所属项目',slot: 'prjname',width:'300px'},
              {title: '开始时间',key:'date_begin',width:'120px'},{title: '截止时间',key: 'date_plan'},{title: '历时/天',key: 'time_use',width:'150px'},{title: '剩余天数',slot: 'remainder'}],
      spinShow:true,
      tasklist:[{taskname:'',taskid:''}],
      modalstatus:{isshow:false},
      modaldata:{}
    }
  },
  mounted(){
    this.select.schedule = '所有阶段'
    this.select.status = '所有状态'
    this.getList(1)
    this.getClassUsers('managers')
  },
  methods:{

    editorprj(i:number){
      this.modalstatus.isshow = true
    },
    modalyes(){
      console.log('modalyes')
    },
    async getList(page:number){
      this.spinShow = true
      this.select.page = page
      let x = new Projects()
      let y = await x.getRTaskList(this.select)
      if(y.data){
        this.tasklist = y.data.list
        this.spinShow = false
      }else{
        
      }
    },
    searchbtn(){
      this.getList(1)
    },
    modalcancel(){
      console.log('modalcancel')
    },
    tuenpage(p:number){
      this.getList(p)
    },
    tablink(i:number){
      //TabRPrjTask
      store.commit('Tab_NewTab',{id:'',label:this.tasklist[i].taskname,component:'TabRPrjTask',data:{id:this.tasklist[i].taskid,name:this.tasklist[i].taskname}})
      console.log(i)
    },
    async getClassUsers(userclass:string){
      this.spinShow = true
      let x = new User()
      let y = await x.getClassUsers(userclass)
      if(y.data){
        this.arrData = y.data
        this.arrData.push({value:'',label:'所有'})
        this.spinShow = false
      }else{
        this.$Message.error('获取项目经理下拉数据出错！')
      }
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
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
  min-width: 1100px;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
.tablink{ 
  cursor:pointer;
  font-size: medium;
  line-height:2em;
}
.tablink:hover{ 
  color:#3399ff;
}
</style>
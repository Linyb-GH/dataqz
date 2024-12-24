<template>
  <div class="bodysty">
    <div style="width:100vw;min-width: 1300px;">
      <RadioGroup @on-change="searchbtn" style="float:left;margin-left:30px;margin-top:20px" v-model="select.schedule" type="button" button-style="solid">
        <Radio label="所有阶段"></Radio>
        <Radio label="项目评审"></Radio>
        <Radio label="实施中"></Radio>
        <Radio label="维保期"></Radio>
        <Radio label="已完结"></Radio>
      </RadioGroup>
      <RadioGroup @on-change="searchbtn" style="float:left;margin-left:30px;margin-top:20px" v-model="select.status" type="button" button-style="solid">
        <Radio label="所有状态"></Radio>
        <Radio label="逾期"></Radio>
        <Radio label="风险"></Radio>
        <Radio label="正常"></Radio>
      </RadioGroup>
      <Select @on-change="searchbtn" v-model="select.manager" style="width:80px;float:left;margin-left:30px;margin-top:20px">
        <Option v-for="(item,index) in initdata.selections" :value="item.value" :key="index+item.label">{{ item.label }}</Option>
      </Select>
      <Input search @click="searchbtn"  @on-enter="searchbtn"  style="width:300px;float:left;margin-left:30px;margin-top:20px"   v-model="select.name_brief"  enter-button="查找" placeholder="通过项目名称查找" />
    </div>
    <Table class="tablesty" stripe :loading="spinShow" :columns="initdata.tabcolumns" :data="RprjList">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #prjname="{ row, index }">
        <!-- <Button type="text">{{ row.name_brief }}</Button> -->
        <span @click="tablink(index)" class="tablink">{{ row.prjname }}</span>
      </template>
      <template #status="{ row }" >
        <Text v-if="row.status == '逾期'" type="danger">{{ row.status }}</Text>
        <Text  v-else-if="row.status == '风险'"  type="warning">{{ row.status }}</Text>
        <Text v-else type="success">{{ row.status }}</Text>
      </template>
    </Table>

    <div style="width:100vw">
      <Page class="pagesty" @on-change="turnpage" :total="initdata.totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import Projects from '@/router/interface/Projects'
import User from '@/router/interface/User'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      select:{page:1,schedule:'',name_brief:'',manager:'',status:''},
      initdata:{selections:[{value: '',label: '所有'},{value: '王经理',label: '王经理'},{value: '张经理',label: '张经理'}],
        tabcolumns:[{title: '项目简称',slot: 'prjname',width:'200px'},{title: '项目经理',key: 'manager',width:'100px'},{title: '项目阶段',slot: 'schedule',width:'100px'},
        {title: '交接时间',key:'HDate',width:'120px'},{title: '交付截止时间',key: 'DDate'},{title: '当前任务',key: 'cur_task',width:'200px'},{title: '状态',slot: 'status'}],totalnum:1
      },
      RprjList:[{prjname:'',prjid:''}],
      spinShow:true
    }
  },
  mounted(){
    this.select.schedule = '所有阶段'
    this.select.status = '所有状态'
    this.getList(1)
    this.getClassUsers('managers')
  },
  methods:{
    async getList(page:number){
      this.spinShow = true
      this.select.page = page
      let x = new Projects()
      let y = await x.GetRPrjList(this.select)
      if(y.data){
        this.RprjList = y.data.list
        this.initdata.totalnum = y.data.total
        this.spinShow = false
        console.log(y.data)
      }
    },
    async getClassUsers(userclass:string){
      let x = new User()
      let y = await x.getClassUsers(userclass)
      if(y.data){
        this.initdata.selections = y.data
        this.initdata.selections.push({value:'',label:'所有'})
        this.spinShow = false
      }else{
        this.$Message.error('获取项目经理下拉数据出错！')
      }
    },
    searchbtn(){
      this.getList(1)
    },
    showinfo(i:number){
      console.log('showinfo')
    },

    turnpage(i:number){
      this.getList(i)
    },
    tablink(i:number){
      // console.log(this.RprjList[i].prjname)
      // console.log(this.RprjList[i].prjid)
      store.commit('Tab_NewTab',{id:'',label:this.RprjList[i].prjname,component:'TabRPrjInfo',data:{id:this.RprjList[i].prjid,name:this.RprjList[i].prjname}})
      // console.log(this.pagedata.prjlist[i].name_brief)
    }

  }
})
</script>

<style scoped>
.bodysty{
  width: 100%;
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
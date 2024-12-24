<template>
  <div v-if="inidata.initialization" class="bodysty">
    <Form :model="prjdata" :label-width="80">
      <Row>
        <Col span="16">
          <FormItem label="项目全称">
            <Input v-model="prjinfo.name_prj" placeholder="Enter something..."></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="项目简称">
            <Input  v-model="prjinfo.name_brief" placeholder="Enter something..."></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="交接时间">
            <DatePicker  type="date" v-model="prjinfo.HDate" placeholder="Select date" style="width: 150px" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="截止日期">
            <DatePicker  type="date" v-model="prjinfo.DDate" placeholder="Select date" style="width: 150px" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="项目阶段">
            <Select v-model="prjinfo.schedule" style="width:150px">
              <Option v-for="item in inidata.schedule" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态">
            <Select v-model="prjinfo.status" style="width:150px">
              <Option v-for="item in inidata.status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <!-- <Input v-model="prjdata.name_prj" placeholder="Enter something..."></Input> -->
            <!-- <DatePicker type="date" :model-value="prjdata.deadline" placeholder="Select date" style="width: 200px" /> -->
          </FormItem>
        </Col>
      </Row>
    </Form>
    
    <Tabs :name=message.name :animated="false">
      <TabPane label="项目描述">
        <Row>
          <Col span="12">
            <Space direction="vertical" size="large" type="flex">
              <Input v-model="prjinfo.prj_des" type="textarea" :rows="12" placeholder="描述项目基本情况" />    
            </Space>
          </Col>
          <Col span="12">
            <List style="text-align: left;margin-left: 10px; max-height: 500px;overflow-y: auto;">
              <ListItem v-for="(item,index) in prjlogs" :key="index">
                <ListItemMeta :avatar="item.log_avatar" :title="item.log_name" :description="item.log_des" />
                <template #action>
                  <li>
                    <span>{{ item.log_time }}</span>
                  </li>
                </template>
              </ListItem>
            </List>
          </Col>
        </Row>
        
      </TabPane>
      <TabPane label="任务列表">
        <!-- <Button @click="newtask" style="float:left;margin-right:30px;margin-top:20px" type="primary">新建任务</Button> -->
        <Table row-key="id"  :columns="inidata.taskcolumns" :data="prjdata.taskslist" border>
 
          <template #schedule="{ row }" >
            <Text v-if="row.schedule == '已完成'" type="success">{{ row.schedule }}</Text>
            <Text v-else >{{ row.schedule }}</Text>
          </template>
        </Table>
      </TabPane>
      <TabPane label="项目文件">
        <List class="liststy">
          <ListItem v-for="(value,index) in prjdata.filelist" :key="index">
            <ListItemMeta :avatar="value.avatar" :title="value.name_file" 
              :description="value.creator + ' 创建于 '+ value.datetime +' | ' +value.filesize" />
            <template #action>
              <li>
                <Button @click = "AddFileLink(value.fullpath,value.name_file)" icon ="ios-link" ></Button>
              </li>
              <li>
                <Button target="_blank" :to="value.fullpath" icon="ios-eye-outline"></Button>
              </li>
            </template>
          </ListItem>  
        </List>
      </TabPane>
      <TabPane label="详细信息">
        <div style="display: flex;flex-wrap: wrap;">
          <div style="width: 800px;margin-right: 10px;text-align: left;">
            <DescriptionList title='项目信息'>
              <Description v-for="(item,index) in prjdetailed.contractinfo" :key="index" :term="item.title">
                {{ item.info }}
              </Description>
            </DescriptionList>
          </div>
          <Timeline style="width: auto;text-align: left;margin-left: 10px;">
            <TimelineItem v-for="(item,index) in prjdetailed.milestone" :key="index" :color="item.color">
              <p class="time">{{ item.time }}</p>
              <p class="content">{{ item.content }}</p>
            </TimelineItem>
          </Timeline>
        </div>
        
      </TabPane>

    </Tabs>
  </div>
  <div v-else>
    加载中...
  </div>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import store from '@/store'
import  Projects  from '@/router/interface/Projects'
import UserSelector from '@/admin/common/UserSelector.vue'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest',data:{}})
export default defineComponent({
  components:{UserSelector},
  setup() {
   
  },
  data(){
    return {
      modalstatus:{task:false,adduser:false,tasklevel:[{
                        value: '',
                        label: ''
                    },
                   ]},
      modata_task:{name:'',	task_level:1,task_f:'',date_plan:'',target:'',prjid:''},
      prjinfo:{id:'',HDate:'',DDate:'',schedule:'',status:'',name_brief:'',name_prj:'',prj_des:'',},
      prjlogs:[
        {log_avatar:'http://192.168.27.189/uploads/users/1d39bae4be0eca26ec45c2a27d13.jpg',log_title:'log_title',log_des:'log_des',log_name:'log_name',log_time:'log_time'},
      ],
      prjdata:{consumption:null,deadline:null,
        filelist:[
          {id:0,name_file:'合同',datetime:'2024-03-02',filesize:'20M',creator:'小林',avatar:'',fullpath:''}
        ],
        taskslist:[{name:'',id:''}],
      },
      prjdetailed:{
        milestone:[{content:'',time:'',color:''}],
        contractinfo:[{title:'',info:''}],
        handover_userid:'',
        participantid:'',
        Partmember: [{name:'',id:''}],
      },
      inidata:{
        initialization:false,
        taskcolumns:[
        {title: '任务名称',key: 'name',tree: true},
        {title: '开始时间',key: 'date_begin'},
        {title: '计划完成时间',key: 'date_plan'},
        {title: '实际完成时间',key: 'date_finish'},
        {title: '完成情况',slot: 'schedule'},
        {title: '用时（天）',key: 'remainder'},
        // {title: '操作',width:150,slot: 'action'}
        ],
        schedule:[{value: '项目评审',label: '项目评审'},
          {value: '实施中',label: '实施中'},
          {value: '维保期',label: '维保期'},
          {value: '已完结',label: '已完结'},
        ],
        status:[
          {value: '逾期',label: '逾期'},
          {value: '风险',label: '风险'},
          {value: '正常',label: '正常'},
        ],
        
        tasklevel:[]
      }
    }
  },
  mounted(){
    
    this.init(this.message.id)
    this.getPrjInfo(this.message.id)
  },
  methods:{
    init(id:string){
      this.modata_task.prjid = id
      this.GetRPrjInfo(id)
      ///////////////////////////
      this.getPrjLogs(id)
      this.getTaskLevels(id)
      this.getPrjFiles(id)
      this.GetParticipant(id)
    },
    async getTaskLevels(id:string){
      let x = new Projects()
      let y = await x.getTaskLevels(id)
      if(y.data){
        this.inidata.tasklevel = y.data
      }else{
        this.$Message.error('获取任务级别下拉出错')
      }
    },
    async getPrjLogs(id:string){
      let x = new Projects()
      let y = await x.getPrjLogs(id)
      if(y.data){
        this.prjlogs = y.data
      }else{
        this.$Message.error('获取项目日志信息出错')
      }
    },
    AddFileLink(path:string,name:string){
      this.$Copy({text: path})
      
    },
    async getPrjFiles(id:string){
      let x = new Projects()
      let y = await x.GetPrjFiles('prj',id)
      if(y.data){
        this.prjdata.filelist = y.data
        // console.log(y.data,'getPrjFiles')
      }else{
        this.prjdata.filelist = []
      }
    },
    async getPrjInfo(id:string){
      let x = new Projects()
      let y = await x.getPrjInfo(id)
      if(y){
        if(y.data){
          this.inidata.initialization = true
          this.prjinfo = y.data
        }
      }else{
        this.$Message.error('网络错误')
      }
    },
    async GetRPrjInfo(prjid:string){
      let x = new Projects()
      let y = await x.GetRPrjInfo(prjid)
      if(y.data){
        this.prjdata.taskslist = y.data.tasks
        this.prjdetailed.milestone = y.data.detailed.milepost
        this.prjdetailed.contractinfo = y.data.detailed.contractinfo
      }else{
        this.$Message.warning('项目未创建任务')
      }
    },
    async modify(id:string,key:string,value:string){
      let x = new Projects()
      let y = await x.ModifyPrjInfo(id,key,value)
      if(y.data){
        this.getPrjLogs(id)
        this.$Message.success('已更新！')
      }else{
       
        this.$Message.warning('数据无更新')
      }
    },
    async getPrjTasks(id:string){
   
      let x = new Projects()
      let y = await x.GetPrjTasks(id)
      if(y.data){
        this.prjdata.taskslist = y.data
      }else{
        this.prjdata.taskslist = []
        console.log(y,'yyyy',id)
        this.$Message.warning('该项目无任务！')
      }
    },
    async GetPrjDetailed(id:string){
      let x = new Projects()
      let y = await x.GetPrjDetailed(id)
      if(y.data){
        console.log(y.data,'milestone')
        this.prjdetailed.milestone = y.data.milepost
        this.prjdetailed.contractinfo = y.data.contractinfo
      }else{
        this.prjdetailed.milestone = []
      }
    },
    async modalyes(){
      if(this.modata_task.date_plan ==''){
        this.$Message.error('任务截止日期不得为空！')
        return
      }else{
        this.modata_task.date_plan = this.$Date(this.modata_task.date_plan).format('YYYY-MM-DD')
      }
      if(this.modata_task.name == ''){this.$Message.error('任务名称不得为空！');return}
      if(this.modata_task.task_level == 1){
      }else{
        if(!this.modata_task.task_f){this.$Message.error('上级任务不得为空');return}
     
      }

    },

    async modaladduser(){
      let x = new Projects()
      let d = {id_participant:this.prjdetailed.participantid,id_prj:this.message.id}
      let y = await x.NewParticipant(d)
      if(y.data){
        this.GetParticipant(this.message.id)
      }
 
    },
    async GetParticipant(id:string){
      let x = new Projects()
      let y = await x.GetParticipant('prj',id)
      if(y.data){
        this.prjdetailed.Partmember = y.data
      }else{
        this.prjdetailed.Partmember = []
      }
    },
    modalcancel(){
      this.modalstatus.adduser = false
    },
    task_level_change(){
      this.modata_task.task_f=''
      this.modalstatus.tasklevel = this.inidata.tasklevel[this.modata_task.task_level-1]
    },

    async delete_tasks(id:string){
      
      let x = new Projects() 
      let y = await x.DeletePrjTasks(id)
      if(y.data){
        this.getPrjTasks(this.message.id)
        this.getTaskLevels(this.message.id)
        this.$Message.success('删除完成！')
      }else{
        this.$Message.error('任务删除时发生错误！')
      }
    },

    async handleClose(even:PointerEvent,i:string){
      let tmp = this.prjdetailed.Partmember
      let member = tmp.filter((item)=>{
        if(item.name == i){return item}
      })
      
      let x = new Projects()
      let y = await x.DeleteParticipant(member[0].id)
      if(y.data){
        this.$Message.success('删除完成！')
        this.GetParticipant(this.message.id)
        // this.inidata.page_loading = false
      }else{

      }

    },
    handleAdd(){
      this.modalstatus.adduser = true
    }
  },
  props:[
    "message"
  ],
})
</script>

<style scoped>
.bodysty{ 
  min-height: 600px;
  min-width: 900px;
}
.liststy{ 
  text-align: left;
  padding-left: 10px;
  height: auto;
}

</style>
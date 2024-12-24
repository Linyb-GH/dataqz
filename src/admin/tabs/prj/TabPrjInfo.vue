<template>
  <TaskInfo @actions="NTactions" v-if="modalstatus.taskid != ''" :message="{id:modalstatus.taskid}" ></TaskInfo>
  <div v-if="inidata.initialization" class="bodysty">
    <Modal v-model="modalstatus.task" width="560" @on-ok="modalyes" @on-cancel="modalcancel"  >
      <p slot="header" style="color:#f60;text-align:center;margin-bottom: 5px;">
          <Icon type="ios-information-circle"></Icon>
          <span >任务编辑</span>
      </p>
      <Form :model="modata_task" :label-width="80">
        <FormItem label="任务级别">
          <InputNumber :max="3" :min="1" @on-change="task_level_change" v-model="modata_task.task_level" />
          <Select v-if="modata_task.task_level >1" v-model="modata_task.task_f" placeholder="上级任务" style="width:200px;margin-left: 10px;">
            <Option v-for="item in modalstatus.tasklevel"  :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="截止日期">
          <DatePicker v-model="modata_task.date_plan" type="date" placeholder="任务计划完成的时间"  />
        </FormItem>
        <FormItem label="任务名称">
          <Input v-model="modata_task.name" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="目标">
          <Input v-model="modata_task.target" placeholder="任务目标"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modalstatus.handover" width="560" @on-ok="modalhandover" @on-cancel="modalcancel"  >
      <p slot="header" style="color:#f60;text-align:center;margin-bottom: 5px;">
          <Icon type="ios-information-circle"></Icon>
          <span >交接对象</span>
      </p>
      <UserSelector @selectuser="userselected"></UserSelector>
    </Modal>
    <Modal v-model="modalstatus.adduser"  title="用户选择" height="400" width="560" @on-ok="modaladduser" @on-cancel="modalcancel"  >
      <UserSelector @selectuser="userselected"></UserSelector>
    </Modal>
    <Form :model="prjdata" :label-width="80">
      <Row>
        <Col span="16">
          <FormItem label="项目全称">
            <Input @on-blur="modifyaction('name_prj')" v-model="prjinfo.name_prj" placeholder="Enter something..."></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="项目简称">
            <Input @on-blur="modifyaction('name_brief')" v-model="prjinfo.name_brief" placeholder="Enter something..."></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="交接时间">
            <DatePicker @on-change="modifyaction('HDate')" type="date" v-model="prjinfo.HDate" placeholder="Select date" style="width: 150px" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="截止日期">
            <DatePicker @on-change="modifyaction('DDate')" type="date" v-model="prjinfo.DDate" placeholder="Select date" style="width: 150px" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="项目阶段">
            <Select @on-change="modifyaction('schedule')" v-model="prjinfo.schedule" style="width:150px">
              <Option v-for="item in inidata.schedule" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="状态">
            <Select @on-change="modifyaction('status')" v-model="prjinfo.status" style="width:150px">
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
              <Input @on-blur="modifyaction('prj_des')" v-model="prjinfo.prj_des" type="textarea" :rows="12" placeholder="描述项目基本情况" />    
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
        <Button @click="newtask" style="float:left;margin-right:30px;margin-top:20px" type="primary">新建任务</Button>
        <Table row-key="id"  :columns="inidata.taskcolumns" :data="prjdata.taskslist" border>
          <template #action="{ row, index }">
            <Button type="primary" size="small" style="margin-right: 5px" @click="task_action(row)">详细</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="task_delete(row)">删除</Button>
          </template>
          <template #schedule="{ row }" >
            <Text v-if="row.schedule == '已完成'" type="success">{{ row.schedule }}</Text>
            <!-- <Text  v-else-if="row.status == '风险'"  type="warning">{{ row.status }}</Text> -->
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
                <Text>{{ item.info }}</Text>
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
      <TabPane style="text-align: left;" label="项目设置">
        <Button style="margin: 5px 5px;" type="primary" @click="handover">项目交接</Button>
        <!-- <Button type="error" @click="deleteprj">删除项目</Button> -->
        <div style="margin: 10px 10px;">
          <Tag v-for="item in prjdetailed.Partmember" :key="item.id" size="medium" :name="item.name" closable @on-close="handleClose">{{ item.name }}</Tag>
          <Button icon="ios-add" type="dashed"  @click="handleAdd">添加人员</Button>
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
import TaskInfo from '@/admin/views/prj/modal/prjmytasks.vue'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest',data:{}})
export default defineComponent({
  components:{UserSelector,TaskInfo},
  setup() {
   
  },
  data(){
    return {
      modalstatus:{taskid:'',task:false,handover:false,adduser:false,tasklevel:[{value: '',label: ''},]},
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
        Partmember: [{name:'',id:'',user_id:''}],
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
        {title: '操作',width:150,slot: 'action'}
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
      this.getPrjLogs(id)
      this.getTaskLevels(id)
      this.getPrjTasks(id)
      this.GetPrjDetailed(id)
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
        this.$Message.warning('该项目无任务！')
      }
    },
    async GetPrjDetailed(id:string){
      let x = new Projects()
      let y = await x.GetPrjDetailed(id)
      if(y.data){
        this.prjdetailed.milestone = y.data.milepost
        this.prjdetailed.contractinfo = y.data.contractinfo
      }else{
        this.prjdetailed.milestone = []
      }
    },
    modifyaction(p:string){
      // console.log(p,'pppp',this.prjinfo.HDate)
      if(p == 'name_prj'){
        this.modify(this.prjinfo.id,p,this.prjinfo.name_prj)
      }
      if(p == 'name_brief'){
        this.modify(this.prjinfo.id,p,this.prjinfo.name_brief)
      }
      if(p == 'prj_des'){
        this.modify(this.prjinfo.id,p,this.prjinfo.prj_des)
      }
      if(p == 'HDate'){
        this.prjinfo.HDate = this.$Date(this.prjinfo.HDate).format('YYYY-MM-DD')
        this.modify(this.prjinfo.id,p,this.prjinfo.HDate)
      }
      if(p == 'DDate'){
        this.prjinfo.DDate = this.$Date(this.prjinfo.DDate).format('YYYY-MM-DD')
        this.modify(this.prjinfo.id,p,this.prjinfo.DDate)
      }
      if(p == 'schedule'){this.modify(this.prjinfo.id,p,this.prjinfo.schedule)}
      if(p == 'status'){this.modify(this.prjinfo.id,p,this.prjinfo.status)}

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
      let x = new Projects()
      let y = await x.NewTask(this.modata_task)
      if(y.data){
        this.getPrjTasks(this.message.id)
        this.getTaskLevels(this.message.id)
        this.$Message.success('创建新任务！')
      }else{
        this.$Message.error('新增任务出错！')
      }
    
    },
    NTactions(emit:{action:string,id:string,key:string,}){
      if(emit.action == 'closed'){
        this.modalstatus.taskid = ''
      }
      if(emit.action == 'update'){
        this.getPrjTasks(this.message.id)
      }
    },
    userselected(user:{id:string,name:string}){
      this.prjdetailed.handover_userid = user.id
      this.prjdetailed.participantid = user.id
    },
    async modalhandover(){
      let x = new Projects()
      let y = await x.PrjHandover(this.message.id,this.prjdetailed.handover_userid)
      if(y.data){
        this.$Message.success('交接完成，请手动刷新页面')
        store.commit('Tab_DeleteTab',this.message.name)
      }else{
        this.$Message.error('交接出错，请重试！')
      }
    },
    async modaladduser(){
      let x = new Projects()
      let d = {id_participant:this.prjdetailed.participantid,id_prj:this.message.id}
      let y = await x.NewParticipant(d)
      if(y.data){
        this.GetParticipant(this.message.id)
      }
      if(y.ret == '400'){
        this.$Message.error(y.msg)
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
      this.modalstatus.handover = false
      this.modalstatus.adduser = false
      this.modalstatus.taskid = ''
    },
    task_level_change(){
      this.modata_task.task_f=''
      this.modalstatus.tasklevel = this.inidata.tasklevel[this.modata_task.task_level-1]
    },

    newtask(){
      this.modalstatus.task = true
      // this.getPrjTasks(this.message.id)
    },
    handover(){
      this.modalstatus.handover = true
    },
    async DeletePrjTasks(id:string){
      let x = new Projects()
      let y = await x.DeletePrjTasks(id)
      if(y.data){
        this.$Message.success('已删除！')
        this.getPrjTasks(this.message.id)
      }else{
        this.$Message.error('删除失败！')
      }
    },
    task_delete(obj:{id:string}){ 
      this.$Modal.confirm({
        title: '是否删除',
        content: '<p>本次删除操作不可恢复，是否删除？</p>',
        loading: true,
        onOk: () => {
          this.$Modal.remove();
          this.DeletePrjTasks(obj.id);
        }
      });
    },

    task_action(d:{name:'',id:''}){
      this.modalstatus.taskid = d.id
      // store.commit('Tab_NewTab',{id:'',label:d.name,component:'TabPrjTask',data:{id:d.id,name:d.name}})
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
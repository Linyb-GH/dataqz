<template>
  <div v-if="inidata.page_loading" >
    加载中...
  </div>
  <div v-else class="bodysty">
    <Form :model="taskdata" :label-width="80">
      <Row>
        <Col span="12">
          <FormItem label="任务名称">
            <Input v-model="taskinfo.name" @on-blur="modifyaction('name')" placeholder="任务名称"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem  label="项目名称">
            <!-- <Text > {{ taskinfo.prjname }}</Text> -->
            <Input disabled v-model="taskinfo.prjname"  style="width:100%;"  placeholder="任务名称"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="任务目标">
            <Input v-model="taskinfo.target" @on-blur="modifyaction('target')" style="width:100%;"  placeholder="任务名称"></Input>
          </FormItem>
        </Col >
      </Row>
      <Row>
        <FormItem label="截止时间">
          <!-- <Text > {{ taskinfo.date_plan }}</Text> -->
          <DatePicker disabled type="date"  v-model="taskinfo.date_plan" placeholder="截止时间" style="width: 150px" />
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" v-model="taskinfo.date_begin" @on-change="DatePickerb"  placeholder="任务开始时间" style="width: 150px" />
        </FormItem>
        <FormItem label="完成时间">
          <DatePicker type="date" v-model="taskinfo.date_finish" @on-change="DatePickerf"  placeholder="任务完成时间" style="width: 150px" />
        </FormItem>
        <FormItem label="完成情况">
          <RadioGroup @on-change="modifyaction('schedule')" v-model="taskinfo.schedule">
            <Radio label="已完成"></Radio>
            <Radio label="未完成"></Radio>
            <Radio label="已终止"></Radio>
          </RadioGroup>
        </FormItem>
      </Row>
    </Form>
    <Tabs :name=message.name :animated="false">
      <TabPane style="text-align: left;" label="任务描述">
        <div style="display:flex;max-height:500px;overflow-y:auto;">
          <div style="width: 45%;">
            <div style="margin-bottom: 5px;">{{ inidata.taskinfo }}</div>
            <Space direction="vertical" size="large" type="flex">
              <Input v-model="taskdata.taskdes" @on-enter="taskaction" type="textarea" :rows="4" placeholder="描述任务当前完成情况" />    
              <Button type="primary" v-show="inidata.todo_btn" :disabled="inidata.todo_loading"  @click="taskdeal">办理</Button>
            </Space>
          </div>
          <List style="width:45%;margin-left: 10px;">
            <ListItem v-for="(value,index) in taskschedule" :key="index">
              <ListItemMeta :avatar="value.avatar" :title="value.title" :description="value.content" />
              <template #action>
                <li>
                  <span>{{ value.doingtime }}</span>
                </li>
              </template>
            </ListItem>
          </List>
        </div>
      </TabPane>
      <TabPane label="文件上传">
        <div style="display: flex;" >
          <div >
            <!-- <Button >上传文件</Button> -->
            <Upload 
              ref="upload"
              :show-upload-list="false"
            
              :on-success="handleSuccess"
              :max-size="1024000"
              :on-format-error="handleFormatError"
              :before-upload="handleBeforeUpload"
              :on-exceeded-size="handleMaxSize"
              :action="fileupload.url" name="file" 
              :data="fileupload.uploaddata">
              <Button @click="uploadfile" style="float:left;margin-right: 20px;margin-top:20px" type="primary" icon="ios-cloud-upload-outline">文件上传</Button>
            </Upload>
            <Button @click="uploadcontact" style="float:left;margin-right: 20px;margin-top:20px" type="primary" icon="ios-cloud-upload-outline">上传合同</Button>
          </div>
          
          <List class="liststy">
            <ListItem v-for="(value,index) in taskdata.filelist" :key="index">
              <ListItemMeta :avatar="value.avatar" :title="value.name_file" 
                :description="value.creator + ' 创建于 '+ value.datetime +' | ' +value.filesize" />
              <template #action>
                <li>
                  <Button  @click = "RenameFile(index)"  icon="ios-create-outline"></Button>
                </li>
                <li>
                  <Button v-if="getsuffix(value.name_file)" target="_blank"  :to="value.fullpath" icon="ios-download-outline"></Button>
                  <Button v-else target="_blank" :disabled="getsuffix(value.name_file)" :to="value.fullpath" icon="ios-eye-outline"></Button>
                </li>
                <li>
                  <Button  @click = "DeleteFile(value.id)" icon="ios-trash-outline"></Button>
                </li>
              </template>
            </ListItem>  
            <Spin size="large" fix :show="modalstatus.loading_upload"></Spin>
          </List>
        </div>
        
      </TabPane>
      <!-- <TabPane style="text-align: left;" label="任务设置">
        <Button type="primary" style="margin-bottom: 10px;" @click="tasksetting">任务交接</Button>
        <CheckboxGroup @on-change="todochange" v-model="taskdata.set.note">
          提醒周期：
          <Checkbox label="每周提醒"></Checkbox>
          <Checkbox label="每月提醒"></Checkbox>
        </CheckboxGroup>
        <div style="margin: 10px 10px;">
          <Tag v-for="item in taskdata.member" :key="item" size="medium" :name="item.name" closable @on-close="handleClose">{{ item.name }}</Tag>
          <Button icon="ios-add" type="dashed"  @click="handleAdd">添加人员</Button>
        </div>
      </TabPane> -->
    </Tabs>
    <Modal v-model="modalstatus.isFileRename"
        title="文件重命名"
        @on-ok="renameok"
        @on-cancel="modalcancel">
      <Form :model="modata_file" :label-width="80">
        <FormItem label="名称">
          <Input v-model="modata_file.name"  placeholder="文件名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modalstatus.isUpContract"  width="800"
        title="上传合同"
        @on-ok="upcontract"
        @on-cancel="modalcancel">
      <div v-if="modata_contract.upload_url == ''">
        <Upload 
          ref="upload"
          :show-upload-list="false"
          :on-success="UpcontractSuccess"
          :max-size="102400"
          :on-format-error="handleFormatError"
          :before-upload="handleBeforeUpload"
          :on-exceeded-size="handleMaxSize"
          :action="fileupload.url" name="file" 
          :data="fileupload.uploaddata">
          <Button @click="uploadfile('contract')" :loading="modalstatus.loading_upload" style="float:left;margin-right:30px;margin-top:20px" type="primary" icon="ios-cloud-upload-outline">合同上传</Button>
        </Upload>
      </div>
      <Form :model="modata_file" :label-width="80" v-else>
        <FormItem label="合同名称">
          <Input v-model="modata_contract.con_name"  placeholder="合同名称"></Input>
        </FormItem>
        <FormItem label="服务摘要">
          <Input v-model="modata_contract.summary"  placeholder="服务摘要"></Input>
        </FormItem>
        <Row>
          <FormItem label="合同编号">
            <Input v-model="modata_contract.con_num"  placeholder="合同编号"></Input>
          </FormItem>
          <FormItem label="合同总额">
            <Input v-model="modata_contract.money"  placeholder="合同总额（元）"></Input>
          </FormItem>
          <FormItem label="购销类型">
            <RadioGroup v-model="modata_contract.type">
              <Radio label="购"></Radio>
              <Radio label="销"></Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="签订时间">
            <DatePicker v-model="modata_contract.s_date" type="date" placeholder="合同签订时间"  />
          </FormItem>
          <FormItem label="交付期限">
            <DatePicker v-model="modata_contract.deadline" type="date" placeholder="截止日期"  />
          </FormItem>
        </Row>
        
        <Row v-if="modata_contract.type == '销'">
          <FormItem label="甲方单位">
            <Input v-model="modata_contract.f_company"  placeholder="甲方单位全称"></Input>
          </FormItem>
          <FormItem label="联系人">
            <Input v-model="modata_contract.f_name"  placeholder="甲方单位联系人"></Input>
          </FormItem>
          <FormItem label="电话">
            <Input v-model="modata_contract.f_num"  placeholder="联系人电话"></Input>
          </FormItem>
        </Row>
        <Row v-else>
          <FormItem label="乙方单位">
            <Input v-model="modata_contract.s_company"  placeholder="乙方单位全称"></Input>
          </FormItem>
          <FormItem label="联系人">
            <Input v-model="modata_contract.s_name"  placeholder="乙方单位联系人"></Input>
          </FormItem>
          <FormItem label="电话">
            <Input v-model="modata_contract.s_num"  placeholder="联系人电话"></Input>
          </FormItem>
        </Row>
      </Form>
    </Modal>
    <!-- <Modal v-model="modalstatus.adduser"  title="用户选择" height="400" width="560" @on-ok="modalyes" @on-cancel="modalcancel"  >
      <UserSelector @selectuser="userselected"></UserSelector>
    </Modal> -->
  </div>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue'
import  Projects  from '@/router/interface/Projects'
import UserSelector from '@/admin/common/UserSelector.vue'
import { Input } from 'view-ui-plus';

//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest',data:{}})
export default defineComponent({
  components:{UserSelector},
  setup() {
    let filemes = ref({
      isshow:false,
      id:''
    })
    return{filemes}
  },
  data(){
    return {
      prjinfo:{id:''},
      taskinfo:{prjname:'',name:'',date_plan:'',date_begin:'',date_finish:'',target:'',schedule:''},
      taskdata:{filelist:[{id:'',name_file:'合同',datetime:'2024-03-02',filesize:'20M',creator:'小林',avatar:'',fullpath:''}],
        taskdes:''},
      modalstatus:{loading_upload:false,isFileRename:false,isUpContract:false},
      modata_task:{participantid:''},
      modata_file:{id:'',name:'',ex:''},
      modata_contract:{con_name:'',con_num:'',money:'',s_date:'',deadline:'',summary:'',f_company:'',
        f_name:'',f_num:'',s_company:'',s_name:'',s_num:'',type:'购',upload_url:'',id_prj:'',id_task:''
      },
      taskschedule:[{avatar:'',title:'',content:'',doingtime:''}],
      inidata:{taskinfo:'',todo_loading:false,todo_btn:false,page_loading:false,
        taskcolumns:[
          {
            title: '任务名称',
            key: 'name',
            tree: true
          },
          {
            title: '开始时间',
            key: 'date_begin'
          },
          {
            title: '计划完成时间',
            key: 'date_finish'
          },
          {
            title: '完成情况',
            key: 'schedule'
          },
          {
            title: '操作',
            width:150,
            slot: 'action'
          }
        ]
      },
      fileupload:{
        url:'',
        uploaddata:{id_task:'',id_prj:'',user_id:'',token:'',path:'',ipaddr:'',modal:''}
      },
    }
  },
  mounted(){
    if(this.message.id_todo){this.inidata.todo_btn = true}
    // this.taskdata.set.note = ['截止期前90天','截止期前30天','截止期前10天']
    this.getTaskInfo(this.message.id)
    this.getDoingList(this.message.id)
    this.GetPrjFiles(this.message.id)
    // this.inidata.taskinfo = '任务已用时 0 天，超出原计划XX天。'
  },
  methods:{
    
    async getTaskInfo(id:string){
      let x = new Projects()
      let y = await x.getTaskInfo(id)
      if(y.data){
        let tmp = y.data
        if(tmp.date_begin == '0000-00-00'){tmp.date_begin = ''}
        if(tmp.date_finish == '0000-00-00'){tmp.date_finish = ''}
        // console.log(tmp,'getTaskInfo')
        this.taskinfo = y.data
        this.prjinfo.id = y.data.prjid
      }else{
        this.$Message.error('获取任务信息时出错！')
      }
    },
    async GetPrjFiles(id:string){
      let x = new Projects()
      let y = await x.GetPrjFiles('task',id)
      if(y.data){
        this.taskdata.filelist = y.data
      }else{
        this.taskdata.filelist = []
        console.log('error')
      }
    },
    uploadfile(type='file'){
      let x = new Projects()
      this.fileupload = x.UploadFile(this.prjinfo.id,this.message.id,type)
      this.fileupload.uploaddata.path=this.fileupload.uploaddata.path+'/'+this.prjinfo.id
    },
    async datachange(key:string,date:string){
      let x = new Projects()
      let id = this.message.id
      let y = await x.ModifyTaskInfo(id,key,date)
      if(y.data){
        this.$Message.success('数据更新！')
      }else{
        this.$Message.warning('无数据更新！')
      }
    },
    DatePickerb(d:string){
      this.datachange('date_begin',d)
    },
    DatePickerf(d:string){
      this.datachange('date_finish',d)
    },
    async modifyaction(key:string){
      let x = new Projects()
      let id = this.message.id
      let value =''
      if(key == 'name'){value = this.taskinfo.name}
      if(key == 'target'){value = this.taskinfo.target}
      // if(key == 'date_begin'){value = this.$Date(this.taskinfo.date_begin).format('YYYY-MM-DD')}
      // if(key == 'date_finish'){value = this.$Date(this.taskinfo.date_finish).format('YYYY-MM-DD')}
      if(key == 'schedule'){value = this.taskinfo.schedule}
      if(value != ''){
        let y = await x.ModifyTaskInfo(id,key,value)
        if(y.data){
          this.$Message.success('数据更新！')
        }else{
          this.$Message.warning('无数据更新！')
        }
      }
      
      //
    },
    uploadcontact(){
      this.modalstatus.isUpContract = true
    },
    RenameFile(i:number){
      this.modalstatus.isFileRename = true
      let x = this.taskdata.filelist[i].name_file
      let y = x.split('.')
      this.modata_file.id = this.taskdata.filelist[i].id
      this.modata_file.ex = y[1]
      this.modata_file.name = y[0]

    },
    async upcontract(){
      if(this.modata_contract.con_name == '' || this.modata_contract.con_num == ''){
        this.$Message.error('上传失败，请完善合同内容！')
        return
      }
      this.modata_contract.id_prj = this.prjinfo.id
      this.modata_contract.id_task = this.message.id
      // this.modata_contract.s_date = this.$Date(this.taskinfo.date_begin).format('YYYY-MM-DD')
      let x = new Projects()
      let y = await x.NewContract(this.modata_contract)
      if(y.data){
        this.GetPrjFiles(this.message.id)
        this.$Message.success('更新完成！')
      }else{
        this.$Message.error('合同上传出错')
      }
      // console.log(this.modata_contract)
      // console.log('upcontract')
    },
    async renameok(){
      if(this.modata_file.ex == ''|| this.modata_file.name == ''){
        this.$Message.error('文件名不得为空')
        return
      }
      let x = new Projects()
      let y = await x.FileRename(this.modata_file.id,this.modata_file.name+'.'+this.modata_file.ex)
      if(y.data){
        this.GetPrjFiles(this.message.id)
        this.$Message.success('完成修改')
      }else{
        this.$Message.error('重命名出错')
      }
      //FileRename
    },
    UpcontractSuccess(ret:{data:{fileurl:'',filename:''}}){

      console.log(ret)
      this.modata_contract.upload_url = ret.data.fileurl
      this.modata_contract.con_name = ret.data.filename
      this.modalstatus.loading_upload = false
    },
    handleSuccess(){
      this.GetPrjFiles(this.message.id)
      this.modalstatus.loading_upload = false
      this.$Message.success('上传成功')
    },
    handleMaxSize(){
      this.modalstatus.loading_upload = false
      this.$Message.error('文件过大！')
    },
    handleBeforeUpload(){
      this.modalstatus.loading_upload = true
    },
    handleFormatError(){
      this.modalstatus.loading_upload = false
      this.$Message.error('上传出错！')
    },

    // async modalyes(){
    //   let x = new Projects()
    //   let d = {id_participant:this.modata_task.participantid,id_task:this.message.id}
    //   let y = await x.NewParticipant(d)
    //   if(y.data){
    //     this.GetParticipant(this.message.id)
    //   }
    // },
    // async GetParticipant(id:string){
    //   let x = new Projects()
    //   let y = await x.GetParticipant('task',id)
    //   if(y.data){
    //     this.taskdata.member = y.data

    //   }
    // },
    // async getTaskSetting(id:string){
    //   let x = new Projects()
    //   let y = await x.getTaskSetting(id)
    //   if(y.data['todolist']){
    //     this.taskdata.set.note = y.data['todolist']
    //   }else{
    //     console.log('todo,error')
    //   }
    // },
    modalcancel(){
      this.modalstatus.isFileRename = false
      this.modalstatus.isUpContract = false
    },
    async taskdeal(){
      let x = new Projects()
      let y = await x.DealTodo(this.message.id_todo)
      if(y.data){
        this.$Message.success('办理完成')
        this.inidata.todo_loading = true
      }else{
        this.$Message.error('DealTodo接口请求出错！')
      }
    },
    async ModifyTaskSetTodo(id:string,setting:string){
      let x = new Projects()
      let y = await x.ModifyTaskSetTodo(id,setting)
      if(y.ret == '200'){
        this.$Message.success('设置完成')
      }else{
        this.$Message.error('ModifyTaskSetTodo请求出错')
      }

    },
    
    // todochange(l:Array<string>){
    //   let json = JSON.stringify(l);
    //   this.ModifyTaskSetTodo(this.message.id,json)
    // },
    task_level_change(){
      console.log('task_level_change')
    },
    async DeleteFile(id:string){
      let x = new Projects()
      let y = await x.DeletePrjFiles(id)
      if(y.data){
        this.GetPrjFiles(this.message.id)
        this.$Message.success('已删除')
      }else{
        this.$Message.error('已删除出错，请刷新页面重试')
      }
    },

    async taskaction(){//NewTaskDoing
      if(this.taskdata.taskdes == ''){return}
      let data = {id_task:this.message.id,id_prj:this.prjinfo.id,content:this.taskdata.taskdes}
      let x = new Projects()
      let y = await x.NewTaskDoing(data)
      if(y.data){
        this.getDoingList(this.message.id)
      }else{
        this.$Message.error('NewTaskDoing接口请求出错')
      }
      this.taskdata.taskdes = ''
    },
    async getDoingList(id:string){
      let x = new Projects()
      let y = await x.getTaskDoing(id)
      if(y.data){
        this.taskschedule = y.data
      }else{

      }
      
    },
    // async handleClose(even:PointerEvent,i:string){
    //   let tmp = this.taskdata.member
    //   let member = tmp.filter((item)=>{
    //     if(item.name == i){return item}
    //   })
      
    //   let x = new Projects()
    //   let y = await x.DeleteParticipant(member[0].id)
    //   if(y.data){
    //     this.$Message.success('删除完成！')
    //     this.GetParticipant(this.message.id)
    //   }else{

    //   }
    // },
    userselected(id:string){
      this.modata_task.participantid = id
    },
    // handleAdd(){
    //   this.modalstatus.adduser = true
    // },
    getsuffix(str:string){
      let s = str
      let suffix = s.substring(s.lastIndexOf('.')+1)
      if(suffix == 'png' || suffix == 'jpg') {return false}
      if(suffix == 'pdf' || suffix == 'jpeg') {return false}
      return true
    }

  },
  computed:{

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
  min-width: 900px;
  height: auto;
}

</style>
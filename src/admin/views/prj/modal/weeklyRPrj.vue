<template>
  
  <Modal v-model="modalstatus.isshow" width="900" footer-hide  @on-visible-change="IsShowTask" >
    <Form :model="modaldata" :label-width="80">
      <Row>
        <Col span="16">
          <FormItem label="收件人">
            <Select v-model="pagedata.addAddress.id" filterable>
              <Option v-for="item in userlist" :value="item.id" :key="item.id">{{ item.username }}</Option>
            </Select>
            <!-- <div>{{ pagedata.addAddress.name }}</div> -->
          </FormItem>
        </Col>
        <Col span="8">
          <Button style="margin-left: 20px;"  @click="MailSend()" > 发送邮件</Button>
        </Col>
      </Row>
      <FormItem label="抄送">
        <div style="margin: 0px 10px;">
          <Tag v-for="item in pagedata.cc" :key="item.id"  :name="item.name" closable @on-close="handleClose">{{ item.name }}</Tag>
          <Button icon="ios-add" size="small" type="dashed"  @click="handleAdd">添加人员</Button>
        </div>
      </FormItem>
      <div style="border: 1px solid #ccc;width: auto;">
        <Toolbar
          style="border-bottom: 1px solid #ccc;"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 300px; overflow-y: hidden; "
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange = "onChange"
        />
      </div>
      <UploadFiles :message="UploadFiles" @uploaded = "UploadSuccess"  style="margin-top: 10px;"></UploadFiles>
    </Form>
  </Modal>
  <Modal v-model="modalstatus.adduser"  title="用户选择" height="400" width="560" @on-ok="modaladduser" @on-cancel="modalcancel"  >
    <UserSelector @selectuser="userselected"></UserSelector>
  </Modal>
  <Modal v-model="modalSendEmail.isshow" title="邮件发送"  width="800" :loading="modalSendEmail.loading"  @on-ok="modalyes" @on-cancel="modalcancel"  >
    <iframe v-if="modalSendEmail.isshow" :onload="onload" width="100%" id="show-iframe"  frameborder=0 name="SendEmail" scrolling=auto :src=MailURL></iframe>
  </Modal>
</template>

<script lang="ts">
import { defineComponent ,ref,onBeforeUnmount, shallowRef, onMounted} from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import  Projects  from '@/router/interface/Projects'
import {NetRequest} from '@/router/request'
import UserSelector from '@/admin/common/UserSelector.vue'
import UploadFiles from '@/admin/common/UploadFiles.vue'
import { Web,User } from '@/router/interface'
import store from '@/store'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig,IToolbarConfig } from '@wangeditor/editor'

export default defineComponent({
  props:["message"],
  emits:['actions'],
  components: { Editor, Toolbar,UserSelector,UploadFiles},
  setup() {
    const editorRef = shallowRef()
    const valueHtml = ref('')
    onMounted(async () => {
      let x = new Projects()
      let y = await x.getRPrjWeekly()
      if(y.data){
        valueHtml.value = y.data
      }else{
        
      }
    })
    const toolbarConfig: Partial<IToolbarConfig> = {
      excludeKeys:['fullScreen','codeBlock','insertVideo']
    }
    const editorConfig: Partial<IEditorConfig> = {  // TS 语法
      MENU_CONF:{},
    }
    const rq = new Web()
    let upload = rq.EditorUploadImage()
    editorConfig.MENU_CONF = {
      ['uploadImage']: upload,
    }
    onBeforeUnmount(() => {
        const editor = editorRef.value
    
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor:any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'default'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  },
  data(){
    return {
      modalstatus:{isshow:true,adduser:false},
      modaldata:{},
      pagedata:{
        addAddress:{id:'',name:''},
        cc:[{id:'',name:''}]
      },
      UploadFiles:{id:0,modal:'weeklyRPrj',path:'/weeklyRPrj'},
      tmp:{json_user:'',attachment:Array(),mail_id:0},
      userstore:{id:''},
      userlist:[{username:'abc',id:'hhh'}],
      modalSendEmail:{isshow:false,loading:true},
      MailURL:''
    }
  },
  mounted(){
    this.pagedata.cc = []
    this.getUserData()
  },
  methods:{
    handleClose(even:PointerEvent,name:string){
      let tmp = this.pagedata.cc
      let arr = tmp.filter((item)=>{
        if(item.name != name){return item}
      })
      let arr_json = JSON.stringify(arr);
      this.UpdateUserStore(arr_json)
    },
    handleAdd(){
      this.modalstatus.adduser = true
    },
    onChange(){},
    modalyes(){},
    modalcancel(){},
    modaladduser(){
      this.UpdateUserStore(this.tmp.json_user)
    },
    async UpdateUserStore(jsonstr:string){
      let x = new User()
      let y = await x.NewUserStore({
        id:this.userstore.id,
        str_json:jsonstr
      })

      if(y.data){
        this.getUserData()
      }
    },
    userselected(user:{id:string,name:string}){
      let tmp = this.pagedata.cc
      if(tmp[0]){
        let n = tmp.filter((item)=>{
          if(item.id == user.id){return item.id}
        })
        if(n.length == 0){
          tmp.push(user)
          this.tmp.json_user = JSON.stringify(tmp);
        }else{
          this.$Message.warning('人员已存在')
        }
      }else{//第一个成员
        let arr = [user]
        this.tmp.json_user = JSON.stringify(arr);
      }
    },
    async getUserData(){
      let x = new User()
      let y = await x.GetUserStore('RPrjWeekly_Mail_cc')
      if(y.data){
        this.userstore.id = y.data.data['id']
        if(y.data.json){
          this.pagedata.cc = y.data.json
        }else{
          this.pagedata.cc = []
        }
      }
      let z = await x.GetUsers()
      if(z.data){
        this.userlist = z.data
      }
    },
    onload(){
      this.modalSendEmail.loading = false
    },
    async MailSend(){
      let rq = new NetRequest()
      let mail_id
      let postdata = {addAddress:this.pagedata.addAddress.id,addCC:'',addAttachment:'',Subject:'',Body:''}
      if(this.pagedata.cc){
        let tmpstr = ''
        this.pagedata.cc.forEach(element => {
          tmpstr = element.id+','+tmpstr
        });
        postdata['addCC'] =  tmpstr.slice(0, -1);
      }else{
        postdata['addCC'] = '';
      }
   
      postdata['addAttachment'] = this.tmp.attachment.join(',')
      postdata['Subject'] =  '交付中心项目统计报表与重点项目周报'+this.$Date().format('YYYY-MM-DD');
      postdata['Body'] = this.valueHtml

      let x = new Projects()
      if(this.tmp.mail_id){//判断邮件是否重复发送
        
      }else{
        let y = await x.NewPrjMail(postdata)
        if(y.data>0){
          mail_id = y.data
          this.tmp.mail_id = mail_id
          console.log(mail_id,'mail_id')
        }
      }
      
      
      
      this.MailURL = rq.Netconfig.dataurl+'/?s=Dtqz.Tools.SendEmail'
      this.MailURL = this.MailURL+'&user_id='+store.state.user.user_id
      this.MailURL = this.MailURL+'&token='+store.state.user.token
      this.MailURL = this.MailURL+'&mail_id='+mail_id
      this.modalSendEmail.isshow = true
      this.modalSendEmail.loading = true
      
    },
    UploadSuccess(ret:[{id:'',filename:'',fileurl:''}]){
      // this.tmp.attachment.push(ret.data.fileurl)
      let t = ret.map((item)=>{
        return item.id
      })
      this.tmp.attachment = t
    },
    IsShowTask(isshow:boolean){
      if(isshow){
      }else{
        let int={action:'closed',data:''}
        this.$emit('actions',int)
      }
    },
  },
  computed:{
  },
})
</script>

<style scoped>
.bodysty{ 
  min-height: 600px;
  min-width: 900px;
}


</style>
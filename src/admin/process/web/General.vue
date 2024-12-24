<template >
  <div class="bodysty">
    <ProHeader @processevent="actions" :message = pagestatus></ProHeader>
    <Form :model="tabdata" label-position="left" :label-width="100">
      <FormItem label="编辑类型" style="margin-right: 20px;">
        <RadioGroup v-model="tabdata.m_class">
          <Radio label="概况"></Radio>
          <Radio label="组织结构"></Radio>
          <Radio label="荣誉资质"></Radio>
          <Radio label="联系我们"></Radio>
          <Radio label="招贤纳士"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="uploadlist">
      <div class="listbtn"> 
        <span style="margin-left:10px;">共 {{ filelist.length }} 个附件</span>
        <span v-if="uploaddisable && pagestatus.ProcessStatus=='创建'"> 请先保存后再上传附件</span>
        <Upload 
          multiple
          :action="fileupload.url" name="file" 
          :data="fileupload.uploaddata"
          :on-success="uploadsuccess"
          :on-error = "uploaderror">
          <Button :disabled="uploaddisable" style="margin-right:15px;" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
      <List class="liststy">
        <ListItem v-for="(value,index) in filelist" :key="index">
          <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" :title="value.name_file" 
            :description="value.creator + ' 创建于 '+ value.datetime +' | ' +value.filesize" />
          <template #action>
            <li>
              <Button :disabled="uploaddisable" @click = "AddFileLink(value.fullpath,value.name_file)" icon ="ios-link" ></Button>
            </li>
            <li>
              <Button target="_blank" :to="value.fullpath" icon="ios-eye-outline"></Button>
            </li>
            <li>
              <Button :disabled="uploaddisable"  @click = "DeleteFile(value.id)" icon="ios-trash-outline"></Button>
            </li>
          </template>
        </ListItem>  
      </List>
    </div>
    <ProList></ProList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig,IToolbarConfig } from '@wangeditor/editor'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})
import { Web,Process } from '@/router/interface'
import ProHeader from '../ProcessHeader.vue'
import ProList from '../ProcessList.vue'
import store from '@/store'

interface upreturn {
  data:{
    filename:string
    fileurl:string
  }
}
export default defineComponent({
  components: { ProList,ProHeader,Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const pagestatus = ref({
      submitbtn:false,ProcessStatus:'创建',nodeuser:0})
    const uploaddisable = ref(false)
    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      // const editor = editorRef.value
      // Editor.getMenuConfig('uploadImage')
      // const curToolbarConfig = toolbar.getConfig() 
      // console.log( toolbar ) // 当前菜单排序和分组
        // setTimeout(() => {
        //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        // }, 1500)
      
    })
    const toolbarConfig: Partial<IToolbarConfig> = {  // TS 语法
    // const toolbarConfig = {                        // JS 语法
        /* 工具栏配置 */
        excludeKeys:['fullScreen','codeBlock','insertVideo']
    }
    const editorConfig: Partial<IEditorConfig> = {  // TS 语法
      MENU_CONF:{},
    }
    const rq = new Web()
    let upload = rq.EditorUploadImage()
    editorConfig.MENU_CONF = {
      ['uploadImage']: upload
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor:any) => {
      // console.log(editor.getAllMenuKeys())
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      pagestatus,uploaddisable,
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
      tabdata:{
        id_auditor:0,m_class:'',process_status:'',id:0,content:'',datatime:this.$Date().format('YYYY-MM-DD HH:mm:ss')
      },
      fileupload:{
        url:'',
        uploaddata:{user_id:'',token:'',id_table:0,path:'',ipaddr:'',modal:''}
      },
      filelist:[{id:0,name_file:'',datetime:'',filesize:'',creator:'',fullpath:''}],
      modal:{loading:true,show:false,
        opinions:'',
        users:[{id:0,username:'',department: ''}],
        nextnode:0,
        columns: [{title: '常用意见',key: 'common'},],
        data:[{common: '发布新闻，请领导审批'},{common: '发布公告，请领导审批'},{common: '同意'}]
      },

    }
  },
  // emits:{
  //   fsavefunc(){
  //     console.log('general fsave')
  //   }
  // },
  mounted(){
    this.DataInit()
    this.getPageData()
  },
  
  methods:{
    DataInit(){
      this.filelist = []
      this.modal.users = []
      this.tabdata.content = this.valueHtml

    },
    btnstatus(status:string){
      if(status == '创建'){
        this.pagestatus.ProcessStatus = '创建'
        if(!this.$route.query.id){
          this.uploaddisable = true
          this.tabdata.process_status = '创建'
          this.pagestatus.nodeuser = parseInt(store.state.user.user_id)
        }else{
          this.uploaddisable = false
        }
      }else{
        this.uploaddisable = true
      }
    },
    async getTableID(id:number){
      let x = new Web()
      this.tabdata.id = id
      this.fileupload.uploaddata.id_table = id
      this.fileupload = await x.UploadFile(id,'general')
    },
    async getPageData(){
      let id = <string> this.$route.query.id 
      if(!this.$route.query.id){ this.btnstatus('创建'); return} 
   
      let x = new Web()
      let y = await x.getGeneralInfo(id)
      if(y.ret == 200 ){
        this.btnstatus(y.data.process_status)
        this.pagestatus.nodeuser = y.data.id_auditor
        this.pagestatus.ProcessStatus = y.data.process_status
        this.tabdata = y.data
        this.valueHtml = this.tabdata.content
      }else{
        this.$Message.error(y.msg)
      }
     
      this.getTableID(parseInt(id))
      this.getModalFiles(this.tabdata.id)
    },

    AddFileLink(fullpath:string,filename:string){
      this.valueHtml +='<p><a href='+fullpath+' target=_blank> '+filename+'</a></p>'
      this.$Message.success('文件连接已添加到编辑框内')
    },
    async DeleteFile(id_file:number){
      let x = new Web()
      let y = await x.DeleteFile(id_file)
      if(y){
        this.$Message.success('删除成功！')
      }else{
        this.$Message.error('网络错误')
      }
      this.getModalFiles(this.tabdata.id)
    },
    async getModalFiles(id_table:number){
      let x = new Web()
      let y = await x.getModalFiles(id_table,'general')
      if(y.ret == 200 ){
        this.filelist = y.data
      }else{
        this.$Message.error(y.msg)
      }
    },
    actions(emitdata:{action:string,data:{nextnode:number,opinions:string}}){
      if(emitdata.action == 'fsave'){
        this.fsave()
      }
      if(emitdata.action == 'submit'){
        this.submit(emitdata.data)
      }
      if(emitdata.action == 'goback'){
        this.goback(emitdata.data)
      }
      if(emitdata.action == 'verify'){
        this.verify(emitdata.data)
      }
      if(emitdata.action == 'publish'){
        this.publish(emitdata.data)
      }
    },
    async fsave(){
      this.tabdata.id_auditor = parseInt(store.state.user.user_id)
      this.tabdata.content = this.valueHtml
      let x = new Web()
      let y = await x.newGeneral(this.tabdata)
      if(y.ret == 200 ){
        this.uploaddisable = false
        this.getTableID(y)
        if(!this.$route.query.id){
          this.$router.replace(this.$route.fullPath+'?id='+y.data)
        }    
        this.$Message.success('操作完成！')
      }else{
        this.$Message.error(y.msg)
      }
     
    },
    async submit(modaldata:{nextnode:number,opinions:string}){
      await this.fsave()
      let processdata = {
        id_table:this.tabdata.id,
        id_nextuser:modaldata.nextnode,
        title:this.tabdata.m_class+'-内容编辑',
        process_type:'网页编辑',
        modal:'general',
        nodeaction:'审核',
        position:'编辑',
        opinion:modaldata.opinions
      }
      let x = new Process()
      let y = await x.NewNodeProcess(processdata)
      if(y){
        this.pagestatus.submitbtn = true
        this.uploaddisable = true
      }else{
        this.$Message.error('网络错误-submit')
      }
      
    },
    
    async goback(modaldata:{nextnode:number,opinions:string}){
      let x = new Process()
      let y = await x.BackNode({id_table:this.tabdata.id,modal:'general',position:'审核',opinion:modaldata.opinions})
      if(y){
        this.pagestatus.submitbtn = true
      }else{
        this.$Message.error('网络错误')
      }
      // console.log(modaldata,'goback')
    },
    async publish(modaldata:{nextnode:number,opinions:string}){
      let processdata = {
        id_table:this.tabdata.id,
        position:'审核发布',
        modal:'general',
        opinion:modaldata.opinions
      }
      let x = new Web()
      let y = await x.PublishGeneral(processdata)
      if(y){
        this.pagestatus.submitbtn = true
      }else{
        this.$Message.error('网络错误')
      }
    },
 
    async verify(modaldata:{nextnode:number,opinions:string}){
      let processdata = {
        id_table:this.$route.query.id,
        id_nextuser:modaldata.nextnode,
        title:this.tabdata.m_class,
        process_type:'网站编辑',
        modal:'general',
        nodeaction:'审核',
        position:'审核',
        opinion:modaldata.opinions
      }
      let x = new Process()
      let y = await x.NewNodeProcess(processdata)
      if(y){
        this.pagestatus.submitbtn = true
      }else{
        this.$Message.error('发生错误-verify')
      }
    },

    uploadsuccess(ret:upreturn){
      console.log(ret)
      this.getModalFiles(this.tabdata.id)
    },
    uploadcover(ret:upreturn){
      console.log(ret)
    },
    uploaderror(){
      console.log('error')
    },
 
  }
})
</script>

<style scoped>
.bodysty{
  width:900px;
  margin: auto;
  /* border: 1px black solid; */
}

.liststy{ 
  padding-left: 10px;
}

.uploadlist{ 
  margin-top: 5px;
  border: 1px #e8eaec solid;
  text-align: left;
  min-height: auto;
  margin-bottom: 20px;
}
.listbtn{ 
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}

</style>
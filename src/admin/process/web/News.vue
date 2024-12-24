<template>
  <div class="bodysty">
    <ProHeader @processevent="actions" :message = pagestatus></ProHeader>
    <Form :model="article" label-position="left" :label-width="100">
      <FormItem label="文章标题">
        <Input v-model="article.title"  placeholder="请输入文章标题" />
      </FormItem>
      <Row> 
        <Col span="12">
          <FormItem label="发布类型" style="margin-right: 20px;">
            <RadioGroup v-model="article.p_type">
              <Radio label="新闻"></Radio>
              <Radio label="公告"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="发布日期" style="margin-left: 20px;">
            <DatePicker  type="datetime"  placeholder="Select date" v-model="article.p_date"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="article.p_type == '新闻'" class="imgsty" :gutter="24">
        <Col>
          <Upload 
            multiple
            :action="fileupload.url" name="file" 
            :data="fileupload.uploaddata"
            :format="['jpg','jpeg','png']"
            :on-success="uploadcover"
            :on-error = "uploaderror">
            <Button  style="margin-right:15px;" icon="ios-cloud-upload-outline">新闻封面</Button>
          </Upload>
        </Col>
        <Col flex="1">
          <Image :src="article.cover" width="500px" height="300px">
            <template #error>
              <Icon type="ios-image-outline" size="24" color="#ccc" />
            </template>
          </Image>  
        </Col>
      </Row>
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
import { Web,Process } from '@/router/interface'
import store from '@/store'
import ProHeader from '../ProcessHeader.vue'
import ProList from '../ProcessList.vue'

interface upreturn {
  data:{
    filename:string
    fileurl:string
  }
}
export default defineComponent({
  components: { Editor, Toolbar,ProHeader,ProList},
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const pagestatus = ref({
      submitbtn:false,ProcessStatus:'',nodeuser:0})
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
      ['uploadImage']:upload
      //  {   
      //   // upload,
      //   server: upload.server,
      //   meta: upload.meta,

      //   // onSuccess(file: File, res: any) {  // TS 语法
      //   //   onSuccess(file, res) {          // JS 语法
      //   //   console.log(`${file.name} 上传成功`, res)
      //   // },
      //   onFailed(file: File, res: any) {   // TS 语法
      //     // onFailed(file, res) {           // JS 语法
      //     console.log(`${file.name} 上传失败`, res)
      //   },
      //   customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
      
      //     let dt = res.data
      //     console.log(dt)
      //       // 从 res 中找到 url alt href ，然后插入图片
      //       insertFn(dt.url, dt.alt, dt.href)
      //       // console.log(res)
      //   },
      // },
      
      // fieldName: 'custom-field-name'
      // 继续写其他配置...
      
      //【注意】不需要修改的不用写，wangEditor 会去 merge 当前其他配置
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
      pagestatus,
      uploaddisable,
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'default'
      toolbarConfig,
      editorConfig,
      handleCreated
    };

  },
  
  data(){
    return({
      article:{
        title:'',cover:'',istop:'0',id:0,
        article_id:0,content:'',p_type:'',p_date:this.$Date().format('YYYY-MM-DD HH:mm:ss')
      },
      fileupload:{
        url:'',
        uploaddata:{user_id:'',token:'',id_table:0,path:'',ipaddr:'',modal:''}
      },
      filelist:[{id:0,name_file:'',datetime:'',filesize:'',creator:'',fullpath:''}],
    })
  },
 
  mounted(){
    this.filelist = []
    this.getPageData()
    // this.btnstatus('创建')
    this.article.content = this.valueHtml
    this.article.cover = ''//"http://192.168.27.189/uploads/web/4ad9274907bb4282a28c1bb2d67326a4.png"
    // let component = this.message.component
    // this.currentView = component
    
  },
  methods:{
    btnstatus(status:string){
      if(status == '创建'){
        this.pagestatus.ProcessStatus = '创建'
        if(!this.$route.query.id){
          this.uploaddisable = true
          this.pagestatus.nodeuser = parseInt(store.state.user.user_id)
        }else{
          this.uploaddisable = false
        }
      }else{
        this.uploaddisable = true
      }
    },
    uploadcover(ret:upreturn){
      this.article.p_type = ''//用于刷新组件
      let e = ret.data
      this.article.cover = e.fileurl
      setTimeout(() => {
        this.article.p_type = '新闻'
      }, 100);
    },
    uploaderror(){
      this.$Message.error('上传发生错误！请先保存后再次尝试。')
    },
    async getPageByID(id:number){
      let x = new Web()
      this.fileupload = await x.UploadFile(id,'news')
      this.article.id = id
      this.article.article_id = id
      this.fileupload.uploaddata.id_table = id
      this.getModalFiles(id)
      console.log(this.fileupload,'fileupload')
    },
    async getPageData(){
      let id = <string> this.$route.query.id 
      if(!this.$route.query.id){ this.btnstatus('创建'); return} 
      let x = new Web()
      let y = await x.getNewsbyID(id)
      if(y.ret == 200 ){
        this.article = y.data
        this.pagestatus.ProcessStatus = y.data.process_status
        this.pagestatus.nodeuser = y.data.review
        this.btnstatus(y.data.process_status)
        this.valueHtml = this.article.content
      }else{
        this.$Message.error(y.msg)
      }
 
      this.getPageByID(parseInt(id))
    },
    uploadsuccess(ret:upreturn){
      this.getModalFiles(this.article.id)
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
      this.getModalFiles(this.article.id)
    },
    async getModalFiles(id_article:number){
      let x = new Web()
      let y = await x.getModalFiles(id_article,'news')
      if(y.ret == 200 ){
        this.filelist = y.data
      }else{
        this.$Message.error(y.msg)
      }
    },
    DataCheck(){
      if(this.article.title == '') {this.$Message.warning('文章标题不能为空') ; return false}
      if(this.article.p_type == '') {this.$Message.warning('新闻类型不能为空') ; return false}
      return true
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
      if(!this.DataCheck()) return 
      this.article.p_date = this.$Date(this.article.p_date).format('YYYY-MM-DD HH:mm:ss')
      this.article.content = this.valueHtml
      let x = new Web()
      let y = await x.NewArticle(this.article)
      if(y.ret == 200 ){
        this.uploaddisable = false
        this.getPageByID(y.data)
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
        id_table:this.article.id,
        id_nextuser:modaldata.nextnode,
        title:this.article.title,
        process_type:'新闻发布',
        modal:'news',
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
        this.$Message.error('网络错误')
      }
    },
    async goback(modaldata:{nextnode:number,opinions:string}){
      let x = new Process()
      let y = await x.BackNode({id_table:this.article.id,modal:'news',position:'审核',opinion:modaldata.opinions})
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
        title:this.article.title,
        process_type:'新闻发布',
        modal:'news',
        nodeaction:'审核',
        position:'审核',
        opinion:modaldata.opinions
      }
      let x = new Process()
      let y = await x.NewNodeProcess(processdata)
      if(y){
        this.pagestatus.submitbtn = true
        
      }else{
        this.$Message.error('网络错误')
      }
      // this.modal.loading = false
    },
    async publish(modaldata:{nextnode:number,opinions:string}){
      let processdata = {
        id_table:this.article.id,
        position:'审核发布',
        modal:'news',
        opinion:modaldata.opinions
      }
      // console.log(processdata)
      let x = new Web()
      let y = await x.PublishArticle(processdata)
      if(y){
        this.pagestatus.submitbtn = true
      }else{
        this.$Message.error('网络错误')
      }
    },

  }
  
})
</script>


<style scoped>
.bodysty{ 
  padding-bottom: 30px;
  width:900px;
  margin: auto;
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
.liststy{ 
  padding-left: 10px;
  height: auto;
}
.imgsty {
  margin-bottom: 20px;
}

</style>
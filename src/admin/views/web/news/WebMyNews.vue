<template>
  <div class="bodysty">
    <div style="width:100vw;text-align: left;">
      <Button target="_blank" to="/process/news" @click="clicked" style="margin: 10px 0px 10px 10px;" type="primary">新增发布</Button>
    </div>
    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #title="{ row }" >
        <a target="_blank" :href="'/#/process/news?id='+row.id" >{{ row.title }} </a>
        <!-- <strong>{{ row.title }}</strong> -->
      </template>
      <template #action="{row, index }">
        <Button  type="primary" size="small"  @click="preview(row)" style="margin-right: 5px">预览</Button>
        <Button v-if="tabledata[index]['is_publish'] == 1 " :disabled ="tabledata[index]['is_checked'] == 0" type="primary" size="small" @click="open(row)">关闭</Button>
        <Button v-else type="success" :disabled ="tabledata[index]['is_checked'] == 0" size="small"  @click="open(row)">开启</Button>
      </template>
    </Table>
    <div style="text-align: center;">
      <Page class="pagesty" @on-change="turnpage" :total="listnum" />
    </div>
  </div>
</template>


<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { defineComponent,onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig,IToolbarConfig } from '@wangeditor/editor'
import {Web,User} from '@/router/interface'
import {NetRequest} from '@/router/request'
import { Modal } from 'view-ui-plus'
import router from '@/router'
type InsertFnType = (url: string, alt: string, href: string) => void
export default defineComponent({
  components: { Editor, Toolbar, Modal },
  setup() {
    const editorRef = shallowRef()
    const valueHtml = ref('<p>hellddddo</p>')
    onMounted(() => {
      setTimeout(() => {
          valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })
    const toolbarConfig: Partial<IToolbarConfig> = {  // TS 语法
        excludeKeys:['fullScreen','codeBlock','insertVideo']
    }
    const editorConfig: Partial<IEditorConfig> = {  // TS 语法
      MENU_CONF:{},
    }
    const rq = new NetRequest()
    editorConfig.MENU_CONF = {
      ['uploadImage']: {
        server: rq.Netconfig.dataurl+'?s=Webserver.Editor.Uploadjpg',
        meta: {
          path:'/uploads/web'
        },
        onFailed(file: File, res: any) {   // TS 语法
          console.log(`${file.name} 上传失败`, res)
        },
        customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
          let dt = res.data.data
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(dt.url, dt.alt, dt.href)
            // console.log(res)
        },
      },
    }
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
      uploadurl:'',
      listnum:0,//列表总数，用于翻页
      uploaddata:{
        path:'',
        ipaddr:'',
      },
      formdata:{title:'',review:1,p_date:'',istop:'0',
      p_type:'新闻',content:''},
      userlist:[{id:'',username:''}],
      columns: [
        {
          title: '标题',
          slot: 'title'
        },
        {
          title: '发布时间',
          key: 'p_date'
        },
        {
          title: '发布类型',
          key: 'p_type'
        },
        {
          title: '审核校验',
          key: 'review_name'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tabledata:[]
    }

  },
  mounted(){
    this.getList(1)
  },
  methods:{
    async asyncOK(){
      this.formdata.content = this.valueHtml
      let n = new Web()
      let n2 = await n.NewArticle(this.formdata)
      if(n2){
        console.log(n2)
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getList(page:number){
      let w = new Web()
      let w2 = await w.GetMyNews(page)
      if(w2.ret == 200 ){
        this.listnum = w2.data.total
        this.tabledata = w2.data.list
      }else{
        this.$Message.error(w2.msg)
      }
    
      let u = new User()
      let u2 = await u.GetUsers()
      if(u2.ret == 200 ){
        this.userlist = u2.data
      }else{
        this.$Message.error(u2.msg)
      }
     
    },
    coverupload(){
      console.log('coverupload')
    },
    uploadsuccess(){
      console.log('uploadsuccess')
    },
    uploaderror(){
      console.log('uploaderror')
    },
    clicked(){
      console.log('views/web/news/WebMyNews clicked')
      // store.commit('Tab_NewTab',{id:'',label:'编辑新闻',component:'WebNews'})
    },

    preview(row:{id:number}){
      router.push({path:'/news/preview',query:{id:row.id}})
    },
    async open(row:{id:0,is_publish:number}){
      let is_publish = 1
      if(row.is_publish == 1){
        is_publish = 0
      }
      let x = new Web()
      let y = await x.UpdateNews(row.id,'is_publish',is_publish)
      if(y){
        this.$Message.success('success');
        this.getList(1)
      }else{
        this.$Message.error('网络错误')
      }
  
    },
    turnpage(page:number){
      this.getList(page)
    }
  }
})
</script>

<style scoped>
.bodysty{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 900px;
  /* border: #dcdee2 1px solid; */
}
.tablesty{
  
  width:100vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
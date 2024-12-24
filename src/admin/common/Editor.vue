<template >
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {NetRequest} from '@/router/request'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig,IToolbarConfig } from '@wangeditor/editor'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})

type InsertFnType = (url: string, alt: string, href: string) => void
export default defineComponent({
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    
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
    let rq = new NetRequest()
    editorConfig.MENU_CONF = {
      ['uploadImage']: {
        server: rq.Netconfig.dataurl +'?s=Dtqz.Web.EditorUploadImage',//'?s=Webserver.Editor.Uploadjpg',
        meta: {
          path:rq.Netconfig.upload_web//'/uploads/web'
        },
        // onSuccess(file: File, res: any) {  // TS 语法
        //   onSuccess(file, res) {          // JS 语法
        //   console.log(`${file.name} 上传成功`, res)
        // },
        onFailed(file: File, res: any) {   // TS 语法
          // onFailed(file, res) {           // JS 语法
          console.log(`${file.name} 上传失败`, res)
        },
        customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
      
          let dt = res.data.data
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(dt.url, dt.alt, dt.href)
            // console.log(res)
        },
      },
      
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
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'default'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  },
  data(){
    return {}
  },

  mounted(){
    
    console.log(this.message,'message')
  },
  emits: ['getEditContent'],
  props:["message"],
  methods:{
    onChange(){
      let int={id:this.message.id,content:this.valueHtml}
      this.$emit('getEditContent',int)
    }
  }
})
</script>

<style scoped>
.btns{ 
  width: 100%;
  text-align: left;
}
.btns .stybtn1{ 
  margin: 5px 5px;
}
</style>
<template>
  <Upload 
    multiple
    :action="fileupload.url" name="file" 
    :data="fileupload.uploaddata"
    :on-success="uploadsuccess"
    :on-preview = "clickeduploads"
    :on-remove = "removeuploads"
    :on-exceeded-size = "ExceedSize"
    :max-size="51200"
    :on-error = "uploaderror">
    <Button  style="margin-left: 20px;" >上传文件</Button>
  </Upload>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Web } from '@/router/interface'

interface upreturn {
  data:{
    id:''
    filename:string
    fileurl:string
  }
}
interface Intfile{
  name:''
  size:0
  response:upreturn
}

export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      fileupload:{
        url:'',
        uploaddata:{user_id:'',token:'',id_table:0,path:'',ipaddr:'',modal:''}
      },
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){

      let x = new Web()
      let p = x.UploadFile(this.message.id,this.message.modal)
      if(this.message.path){
        p.uploaddata.path = p.uploaddata.path+this.message.path
      }
      this.fileupload = p
    },
    uploadsuccess(response:upreturn,file:Intfile,fileList:Array<Intfile>){
      let ret = fileList.map((item)=>{
        return item.response.data
      })
      this.$emit('uploaded',ret)
    },
    uploaderror(){
      this.$Message.error('文件上传出错！')
    },
    ExceedSize(){
      this.$Message.error('文件不得超过50M！')
    },
    clickeduploads(file:Intfile){//点击上传成功后的链接
      window.open(file.response.data.fileurl, '_blank');
      
    },

    removeuploads(file:Intfile,list:Array<Intfile>){
      this.DeleteFile(parseInt(file.response.data.id))
    },
    async DeleteFile(id_file:number){
   
      let x = new Web()
      let y = await x.DeleteFile(id_file)
      if(y.data){
        console.log(y,'文件删除成功！')
      }else{
        console.log(y.data)
      }
    },
    //$emit('uploaded')
  },
  emits: ['uploaded'],
  props:[
    "message"
  ],
})
</script>

<style scoped>

.bodysty{ 
  border: 1px solid black;
  width: auto;
}
</style>
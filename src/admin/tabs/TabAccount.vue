<template>
  <div class="body">
    姓名：{{ AccountInfo.username }} <br>
    部门：{{ AccountInfo.department }} <br>
    更换头像：
    <div style="margin: 10px;">
      <Upload
      ref="upload"
      :show-upload-list="false"
     
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="fileupload.url" name="file" 
      :data="fileupload.uploaddata"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    </div>
    <Image :src=avatar fit="fit" width="100px" height="100px" alt="fit" />
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import {User} from '@/router/interface'
import store from '@/store'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest'})
export default defineComponent({
  setup() {
    const avatar = ref('')
    return {
      avatar
    }
  },
  data(){
    return {
      fileupload:{
        url:'',
        uploaddata:{user_id:'',token:'',path:'',ipaddr:'',modal:''}
      },

      imgName: '',
      visible: false,
      uploadList: [],
      AccountInfo:{username:'',department:'',avatar:'',email:''}
    }
  },
  mounted(){
    this.getAccountInfo()
    this.getuploadurl()
    this.avatar = store.state.user.avatar
  },
  methods:{
    handleBeforeUpload(){
      console.log('handleBeforeUpload')
    },
    async getuploadurl(){
      let x = new User()
      this.fileupload = await x.UploadFile('avatar')
    },
    handleMaxSize(){
      this.$Message.error('头像上传失败，文件不能大于200M')
      console.log('handleMaxSize')
    },
    handleFormatError(){
      this.$Message.error('头像上传发生错误。')
    },
    handleSuccess(res:{data:{filename:'',fileurl:''}}){
      store.commit('USER_UPDATA_AVATAR',res.data.fileurl)
      this.avatar = res.data.fileurl
      this.$Message.success( '头像上传成功')

    },
    async getAccountInfo(){
      
      let x = new User()
      let y = await x.ProFile(store.state.user.user_id,store.state.user.token)
      if(y.ret == 200 ){
        this.AccountInfo = y.data.profile
      }else{
        this.$Message.error(y.msg)
      }
    }
  }
})
</script>

<style scoped>
.body{
  text-align: left;
}

</style>
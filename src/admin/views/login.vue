<template >
  <div class="login-background">
    <div class="loginarea">
      <Form ref="formInline" class="formcss" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input suffix="ios-person-outline" type="text" v-model="formInline.user" placeholder="Username" style="width: auto" />
        </FormItem>
        <FormItem prop="password">
          <Input suffix="ios-lock-outline" @on-enter="handleSubmit('formInline')" type="password" v-model="formInline.password" placeholder="Password" style="width: auto" />
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading"  @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import {defineComponent} from 'vue'
// import router from '@/router'
export default defineComponent({
  name: 'Login',
  data () {
    return {
      loading:false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码应不小于六位数', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    // console.log(this.formInline)
    
  },
  methods: {
    
    handleSubmit(name:string) {
      // console.log(this.$refs[name])
      // console.log(store.state.user)
      // const islogin = store.dispatch('is_login').then((ret)=>{
      //   console.log(ret)
      //   console.log('handleSubmit')
      // })
      const login = store.dispatch('login',{username:this.formInline.user,password:this.formInline.password})
      login.then((ret)=>{
        if(ret){
          this.$Message.success('登录成功')
        }else{
          this.$Message.error('登录失败！')
        }
      }).catch(()=>{
        this.$Message.error('网络异常，登录失败！')
      })
    }
  }
})
</script>

<style scoped>
.login-background{
  width: 100%;
  height: 100vh;
  background: url(../../assets/login.gif);
  background-size: cover;
}
.loginarea{
  display: flex;
  position: relative;
  top: 200px;
  left: 65vw;
  width:300px;
  height: 300px;
  /* border: solid rgb(101,120,233) 1px; */
  
}
.formcss{
  padding-top: 30px;
  padding-left: 40px;
  border: solid rgb(3, 11, 54) 1px;
}
</style>

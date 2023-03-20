<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/admin">Admin</router-link>
  </div>
  <div  class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>{{ msg }}{{ vmodel.name }}</div>
    <Input v-model="vmodel.name" />
    <Button @click="mes">测试按钮</Button>
    <HelloWorld :msg=msg />
  </div>
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
// export default{

//   components:{
//     HelloWorld
//   },
// }
// import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { defineComponent,ref ,watchEffect} from 'vue';
export default defineComponent({
  components:{
    HelloWorld
  },
  methods:{
    btn(){
      console.log('btn hhh')
      
    }
  },
  setup(){
    const msg = ref('ref value')
    const vmodel = ref({
      name:'小明',
      age:12
    })
    const mes = ()=>{
      msg.value += 'abc'
      console.log(msg.value)
      console.log('mes func')
    }
    watchEffect(()=>{
      // msg.value = vmodel.value.name
    })
    return {
      msg,vmodel,mes,
    }
  }
})
// @Options({
  
//   components: {
//     HelloWorld,
//   },

// })
// export default class Home extends Vue {

// }
</script>

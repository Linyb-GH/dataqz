<template>
  <div>
    <NewServer v-if="this.message == '设备上架'"></NewServer>
    <Wiring v-if="this.message == '布线'"></Wiring>
  </div>

</template>

<script>
import NewServer from './newserver'
import Wiring from './newwiring'
export default {
  components:{
    NewServer,
    Wiring
  },
  props:[
    "message"
  ],
  data(){
    return{
      taskList:['newserver']
    }
  },
  methods:{
    showtask(taskname){
      console.log(taskname)
      return true
    }
  }
}

</script>

<style scoped>

</style>

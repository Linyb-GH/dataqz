<template>
  <div>
    <NewServer v-if="showtask('tasks_server')" :message = this.message></NewServer>
    <Wiring v-if="showtask('tasks_wiring')"></Wiring>
    <!-- <div >{{message}}</div> -->
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
  created(){
    // console.log(this.message)
  },
  methods:{
    showtask(taskname){
      if(this.message.type == taskname){
        return true
      }
      return false
    }
  }
}

</script>

<style scoped>

</style>

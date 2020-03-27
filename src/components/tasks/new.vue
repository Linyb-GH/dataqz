<template>
  <div>
    <NewServer v-if="showtask('tasks_server')" :message = this.message></NewServer>
    <Wiring v-if="showtask('tasks_wiring')" :message = this.message></Wiring>
    <Inspecting v-if="showtask('tasks_inspecting')" :message = this.message></Inspecting>
    <!-- <div >{{message}}</div> -->
  </div>

</template>

<script>
import NewServer from './newserver'
import Wiring from './newwiring'
import Inspecting from './newinspect'
export default {
  components:{
    NewServer,
    Wiring,
    Inspecting
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

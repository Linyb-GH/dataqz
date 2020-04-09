<template>
  <div>
    <NewServer v-if="showtask('tasks_server')" :message = this.message></NewServer>
    <Wiring v-if="showtask('tasks_wiring')" :message = this.message></Wiring>
    <Inspecting v-if="showtask('tasks_inspecting')" :message = this.message></Inspecting>
    <Moving v-if="showtask('tasks_moving')" :message = this.message></Moving>
    <Maintain v-if="showtask('tasks_maintain')" :message = this.message></Maintain>
    <Accessory v-if="showtask('tasks_accessory')" :message = this.message></Accessory>
    <!-- <div >{{message}}</div> -->
  </div>

</template>

<script>
import NewServer from './newserver'
import Wiring from './newwiring'
import Inspecting from './newinspect'
import Moving from './newmoving'
import Maintain from './newmaintain'
import Accessory from './newaccessory'
export default {
  components:{
    NewServer,
    Wiring,
    Inspecting,
    Moving,
    Maintain,
    Accessory
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

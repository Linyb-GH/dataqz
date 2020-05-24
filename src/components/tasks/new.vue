<template>
  <div>
    <NewServer v-if="showtask('tasks_server')" :message = this.message></NewServer>
    <Wiring v-if="showtask('tasks_wiring')" :message = this.message></Wiring>
    <Inspecting v-if="showtask('tasks_inspecting')" :message = this.message></Inspecting>
    <Moving v-if="showtask('tasks_moving')" :message = this.message></Moving>
    <Maintain v-if="showtask('tasks_maintain')" :message = this.message></Maintain>
    <Accessory v-if="showtask('tasks_accessory')" :message = this.message></Accessory>
    <MoveOut v-if="showtask('tasks_moveout')" :message = this.message></MoveOut>
    <AssetNum v-if="showtask('tasks_assetnum')" :message = this.message></AssetNum>
    <Modify v-if="showtask('tasks_modify')" :message = this.message></Modify>
    <!-- <div >{{message}}</div> -->
  </div>

</template>

<script>
import NewServer from './newserver'
import Wiring from './newwiring'
import Inspecting from './newinspect'
import Moving from './newmoving'
import MoveOut from './newmoveout'
import Maintain from './newmaintain'
import Accessory from './newaccessory'
import AssetNum from './newassetnum'
import Modify from './newmodify'
export default {
  components:{
    NewServer,
    Wiring,
    Inspecting,
    Moving,
    Maintain,
    Accessory,
    MoveOut,
    AssetNum,
    Modify
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

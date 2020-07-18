<template>
  <div>
    <component :is="currentView" :message = this.message></component>
    <!-- <NewServer v-if="showtask('tasks_server')" :message = this.message></NewServer>
    <Wiring v-if="showtask('tasks_wiring')" :message = this.message></Wiring>
    <Inspecting v-if="showtask('tasks_inspecting')" :message = this.message></Inspecting>
    <Moving v-if="showtask('tasks_moving')" :message = this.message></Moving>
    <Maintain v-if="showtask('tasks_maintain')" :message = this.message></Maintain>
    <Accessory v-if="showtask('tasks_accessory')" :message = this.message></Accessory>
    <MoveOut v-if="showtask('tasks_moveout')" :message = this.message></MoveOut>
    <AssetNum v-if="showtask('tasks_assetnum')" :message = this.message></AssetNum>
    <Modify v-if="showtask('tasks_modify')" :message = this.message></Modify> -->
    <!-- <div >{{message}}</div> -->
  </div>

</template>

<script>
import tasks_server from './newserver'
import tasks_wiring from './newwiring'
import tasks_inspecting from './newinspect'
import tasks_moving from './newmoving'
import tasks_moveout from './newmoveout'
import tasks_maintain from './newmaintain'
import tasks_accessory from './newaccessory'
import tasks_assetnum from './newassetnum'
import tasks_modify from './newmodify'
export default {
  components:{
    tasks_server,
    tasks_wiring,
    tasks_inspecting,
    tasks_moving,
    tasks_maintain,
    tasks_accessory,
    tasks_moveout,
    tasks_assetnum,
    tasks_modify
  },
  props:[
    "message"
  ],
  data(){
    return{
      currentView:''
    }
  },
  created(){
    //console.log(this.message)
    this.currentView = this.message.type
  },
  // methods:{
  //   showtask(taskname){
  //     if(this.message.type == taskname){
  //       return true
  //     }
  //     return false
  //   }
  // }
}

</script>

<style scoped>

</style>

<template>
  <div>
    <!-- <component :is="currentView" :message = this.message></component> -->
    this is pubcomponent
  </div>

</template>

<script>
// import tasks_server from './newserver'

export default {
  components:{
    // tasks_server,
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
    // this.currentView = this.message.type
  },
  // methods:{

  // }
}

</script>

<style scoped>

</style>

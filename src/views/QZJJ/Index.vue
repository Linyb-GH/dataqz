<template>
  <div>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>点击播放</title>
    </head>
    
    <!-- <video  src="http://192.168.27.189/audios/01.mp3" controls></video> -->
    
    <All v-if="$route.query.p == '23'"></All>
    <PAGES v-else></PAGES>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ is an alias to /src
import All from './all.vue'
import PAGES from './pages.vue'
export default defineComponent ({
  data(){
    return({
    })
  },
  mounted(){
    // console.log(this.$route.query.p)
  },
  components: {
    All,PAGES
  },
  methods:{
    
  }

})

</script>
<style scoped>

</style>
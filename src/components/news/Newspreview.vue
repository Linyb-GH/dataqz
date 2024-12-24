<template>
  <div class="body">
    <br>
    <h1 class="titlesty">{{pagecontent.title}}</h1>
    <p class="fbtsyt">
      <span style="margin:0 10px;">发布时间：{{pagecontent.p_date}} </span> 
      <span style="margin:0 10px;">作者:{{pagecontent.author_name}}  </span> 
      <span style="margin:0 10px;">审核：{{pagecontent.review_name}} </span> 
    </p>
    <Divider></Divider>
    <div class="contnetsyt" v-html= "newscon"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Web } from '@/router/interface'
export default defineComponent({
  setup() {

  },
  data(){
    return{
      pagecontent:{title:'',p_date:'',author_name:'',review_name:''},
      newscon:''
    }
  },
  mounted(){
    this.getNews(String(this.$route.query.id))
  },
  methods:{
    async getNews(id:string){
      let x = new Web()
      let y = await x.getNewsbyID(id)
      if(y.ret == 200 ){
        this.pagecontent = y.data
        this.newscon = y.data.content
      }else{
        this.$Message.error(y.msg)
      }
      
    },
  }
})
</script>


<style scoped>

.fbtsyt{
  margin: 5px 0;
  color: #cccccc;
  text-align: center;
}
.contnetsyt{ 
  font-family:"Times New Roman",Georgia,Serif;
  font-size: 150%;
  line-height: 2.0; 
}
</style>

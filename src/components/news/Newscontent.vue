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
    <div class="contnetsyt"  v-html= "newscon"></div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { WebFront } from '@/router/interface'
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
    // settimeout(() => {
    //   console.log('hhh');
    // },20)
  
    this.getNews(Number(this.$route.query.id))
  },
  methods:{
    async getNews(id:number){
      let x = new WebFront()
      let y = await x.GetNewsInfo(id)
      if(y){
        this.pagecontent = y 
        this.newscon = y.content
        console.log(y)
      }else{
        this.$Message.error('网络错误')
      }
    },
  }
})
</script>


<style scoped>
.titlesty{
  text-align: center;
}
.fbtsyt{
  margin: 5px 0;
  color: #cccccc;
  text-align: center;
}
.contnetsyt{ 
  /* https://blog.csdn.net/lance666/article/details/112428805 */
  font-family:"Times New Roman",Georgia,Serif;
  font-size: 150%;
  line-height: 2.0; 
}
</style>

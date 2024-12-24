<template>
  <div class="body">
    <!-- {{this.listT}} -->
    <div v-for="(tab) in listdata"  :key="tab.id">
      <router-link :to="{path:'/news/content',query:{'id':tab.id,'class':tab.class}}" 
        class="listsyt">{{tab.title}}</router-link>
      <p class="psyt">时间：{{tab.p_date}}</p>
      <Divider />
    </div>
    <div style="text-align: center;">
      <Page style="padding: 15px 0;" @on-change="turnpage" :total="listnum" />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import {WebFront} from '@/router/interface'
export default defineComponent({
  setup() {

  },
  data(){
    return{
      listnum:0,
      listdata:[{title:'',p_date:'',id:'',class:''}],
    }
  },

  mounted(){
    this.getList(1)
  },
  methods:{
    async getList(page:number){
      let x = new WebFront()
      let y = await x.GetNewsList(page,'新闻')
      if(y.ret == 200 ){
        this.listdata = y.data.list
        this.listnum = y.data.total
      }else{
        this.$Message.error(y.msg)
      }
 
    },
    turnpage(page:number){
      this.getList(page)
    }
  }
})
</script>


<style scoped>
.body{
  width: auto;
  height: 900px;
  text-align: left;
}
.listsyt{
  font-weight: bold;
  color:black;
}
.psyt{ 
  margin-top: 5px;
}
</style>

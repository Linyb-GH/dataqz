<template>
  <div class="bodysty"> 
    <div class="card"> 
      <Card class="cardsty" v-for="(item,index) in processtable" :key="index">
        <p class="card-ld">{{ item.position }}</p>
        <p class="card-ct">{{ item.opinion }}</p>
        <p class="card-sig">签署：{{ item.signature }}</p>
        <p class="card-dt">{{ item.datetime }}</p>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent ,ref} from 'vue'
import { Process } from '@/router/interface'
export default defineComponent({
  setup(props) {
    let processtable=ref([{position:'',opinion:'',signature:'',datetime:''}])
    return{
      processtable
    }
  },
  
  data(){
    return({
      // message:{} 
    })
  },
  components: {
    
  },
  mounted(){
    this.processtable = []
    this.getPageData()

  },
  methods:{
    async getProcessNodes(id:number,modal:string){
      let x = new Process()
      let y = await x.GetProcessNode(id,modal)
      if(y.ret == 200 ){
        this.processtable = y.data
      }else{
        this.$Message.error(y.msg)
      }
    
    },
    getPageData(){

      if(!this.$route.query.id){
        return 
      }else{
        let id = <string> this.$route.query.id 
        this.getProcessNodes(parseInt(id),<string>this.$route.name)
      }
    }
  },
  props:["message"],
  
})
</script>


<style scoped>

.bodysty{ 
  padding-bottom: 30px;
}
.card{ 
  margin: 5px 0;
  display: flex;
  flex-wrap: wrap;
}
.cardsty{ 
  min-height: 200px;
  width: 300px;
  /* text-align: left; */
  /* border:solid 1px black; */
}
.card-ld { 
  text-align: left;
  font-weight:bold;
  font-size:large;
}
.card-ct{ 
  text-align: left;
  word-wrap:break-word;
  text-indent: 2em;
}
.card-sig{ 
  text-align: right;
}
.card-dt{ 
  text-align: right;
}

</style>
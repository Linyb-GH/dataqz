<template>
  <!-- <div class="hello">home page</div> -->
  <div class="bodysty">
    <!-- <Button @click="testfunc">测试</Button> -->
    <Card class="cardA">
      <template #title>
        <div style="text-align: left;">
          <Icon color="#fe10e0" size="20" type="ios-briefcase-outline"></Icon>
          <span style="font-size:15px;">待办事项</span>
        </div>
      </template>
      <template #extra>
        <!-- <a href="#">
          <Icon type="ios-loop-strong"></Icon>
          <span style="font-size:15px;text-align: center;">更多</span>
        </a> -->
      </template>
      <p class="ratedemo" v-for="(item,index) in dealdata" :key="index">
        <a target="_blank" :href="'/#/process/'+item.modal+'?id='+item.id_table"><Ellipsis class="cardlist"  :text="item.m_content" :lines="1"  tooltip /></a>
        <span style="margin-left: 2em;">{{ item.c_time }}</span>
      </p>
    </Card>
    <Card class="cardB">
      <template #title>
        <div style="text-align: left;">
          <Icon color="#10fee0" size="20" type="ios-briefcase-outline"></Icon>
          <span style="font-size:15px;">已办事项</span>
        </div>
      </template>
      <template #extra>
        <!-- <a href="#">
          <Icon type="ios-loop-strong"></Icon>
          <span style="font-size:15px;text-align: center;">更多</span>
        </a> -->
      </template>
      <div class="ratedemo" v-for="(item,index) in HistoryProcess" :key="index">
        <Ellipsis class="cardlist" @click="c1(index)" :text="'【'+item.process_type +'】 '+ item.title" :lines="1"  :transfer="true" tooltip />         
        <span style="margin-left: 2em;">【{{ item.nodeuser }}-{{item.status}}】</span>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Process } from '@/router/interface'
export default defineComponent({
  data(){
    return{
      HistoryProcess:[{
        id_table:0,
        nodeuser:'',
        status:'',
        modal:'',
        title:'',
        process_type:'',
        datetime:''
      }],
      dealdata:[{id_table:0,modal:'',m_content:'',c_time:''}],

    }
  },
  components:{

  },
  setup() {
    
  },
  mounted(){
    this.getDealing();
    this.getMyProcess();
  },
  methods:{
    async getDealing () {
      let x = new Process()
      let y = await x.GetPendingNode({limit:12})
      if(y){
        let dealdata = y.map((item:any)=>{
          return {
            id_table:item.id_table,
            modal:item.modal,
            m_content:'【'+item.process_type+'】'+item.title,
            c_time:item.datetime}
        })
        this.dealdata = dealdata
        // console.log(dealdata)
      }else{
        this.$Message.error('网络错误')
      }

    },
    async getMyProcess(){
      let x = new Process()
      let y = await x.GetMyProcess(1,12,'')
      if(y){
        this.HistoryProcess = y.list
      }else{
        this.$Message.error('网络错误')
      }
  
      // let req = new NetRequest()
      // req.AdminpostReq(
      //   '?s=Dtqz.Web.GetUserlogs',
      //   {},{num:12}
      // ).then((data)=>{
      //   this.HistoryProcess = data
      //   console.log(data)
      // }).catch(()=>{
      //   this.$Message.error('请求发生错误!');
      // })
    },
    c1(index:number){
      let x = this.HistoryProcess[index]
      console.log(this.HistoryProcess[index])
      // console.log(this.$route,'route')
      this.$router.push('/process/'+x.modal+'?id='+x.id_table)
      // store.commit('Tab_NewTab',{id:'',label:this.HistoryProcess[index].title,component:'WebNews'})
      console.log(index)
    },
    testfunc(){
      console.log('run here')
      this.getDealing();
    }
  }
})
</script>

<style scoped>

.bodysty{
  min-height: 500px;
  display: flex;
  /* flex-wrap:nowrap; */
  /* overflow-x:auto; */
  /* border: #dcdee2 1px solid; */
}

.ratedemo {
  display: flex;
  justify-content: space-between;
  align-items: center;   
}

.cardA{ 
  min-width: 480px;
  height: 480px;
  margin: 10px 10px;
}

.cardB{
  width: 100%;
  min-width:600px;
  /* min-width: 550px; */
  height:480px;
  margin: 10px 10px;
}

.cardlist{ 
  cursor:pointer;
  font-size: medium;
  line-height:2em;
}
.cardlist:hover{ 
  color:#3399ff;
}
</style>
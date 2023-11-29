<template>
  <div class="bodysty">
    <div class="headform"> 
      <Form :model="InputData" :label-width="80">
        <FormItem label="标题搜索" style="width: 400px;">
          <Input v-model="InputData.search"  placeholder="输入查询..."></Input>
        </FormItem>
      </Form>
      
      <Button type="primary" @click="search" style="margin-right: 10px;" icon="ios-search">查找</Button>
      <Button @click="reset" style="margin-right: 10px;" icon="md-refresh">重置</Button>
    </div>
    <Table border class="tabsty" :columns="tabcolumns" :data="TabData.list">
      <template #title="{ row }">
        <a target="_blank" :href="'/#/process/'+row.modal+'?id='+row.id_table"><Ellipsis :text="row.title" :lines="1"  transfer  tooltip  /></a>
      </template>
    </Table>
    <div style="text-align: center;">
      <Page class="pagesty" @on-change="turnpage" :total="TabData.total" />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Process } from '@/router/interface'
export default defineComponent({
  data(){
    return{
      InputData:{search:''},
      TabData:{
        total:0,
        list:[{
          id_table: 0,
          modal: "news",
          creator: "黄培德",
          datetime: "2023-07-27 00:02:37",
          title: "云谷2",
          process_type: "新闻发布",
          nodeaction: "审核",
          nodeuser: "陈娟",
          status: "审核新闻发布"
        }]
      },
      tabcolumns: [
                    {
                        title: '标题',
                        slot: 'title'
                    },
                    {
                        title: '分类',
                        key: 'process_type'
                    },
                    {
                        title: '经办',
                        key: 'creator'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'datetime'
                    },
                ],
    }
  },
  components:{

  },
  setup() {
    
  },
  mounted(){
    this.getPageData(1,'')
  },
  methods:{
    async getPageData(page:number,title:string){
      let x = new Process()
      let y = await x.GetMyProcess(page,10,title)
      if(y){
        this.TabData.list = y.list
        this.TabData.total = y.total
        // this.HistoryProcess = y
      }else{
        this.$Message.error('网络错误')
      }
    },
    search(){
      this.getPageData(1,this.InputData.search)
      console.log(this.InputData.search)
    },
    reset(){
      this.InputData.search = ''
      this.getPageData(1,'')
    },
    turnpage(index:number){
      this.getPageData(index,this.InputData.search)
      console.log(index)
    }
  }
 
})
</script>

<style scoped>

.bodysty{
  min-width: 900px;
}
.headform{ 
  width:100%;
  text-align: left;
}
.tabsty{ 
  margin: 10px 0px;
}


</style>
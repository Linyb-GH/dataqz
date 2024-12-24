<template>
  <div class="bodysty">
    <Table class="tablesty" border :columns="columns" :data="tabledata">

    <template #title="{ row }" >
      <strong>{{ row.title }}</strong>
    </template>
    </Table>
    <div style="text-align: center;">
      <Page class="pagesty" @on-change="turnpage" :total="listnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Web } from '@/router/interface'
export default defineComponent({
  setup() {
    
  },
  data () {
    return {
      listnum:0,
      columns: [
        {
          title: '标题',
          slot: 'title',
          width:500,
        },
        {
          title: '编辑',
          key: 'author_name',
        },
        {
          title: '审核',
          key: 'review_name',
        },
        {
          title: '发布时间',
          key: 'p_date',
        },
        {
          title: '发布类型',
          key: 'p_type',
        },
        {
          title: '访问次数',
          key: 'visit_count',
          width:100
        },
      ],
        tabledata:[]
    }
  },
  mounted(){
    this.getList(1)
  },
  methods:{
    turnpage(page:number){
      this.getList(page)
    },
    async getList(page:number){
      let x = new Web()
      let y = await x.GetArticleList(page)
      if(y.ret == 200 ){
        this.tabledata = y.data['list']
        this.listnum = y.data['total']
      }else{
        this.$Message.error(y.msg)
      }
    
    },
  }
})
</script>

<style scoped>
.bodysty{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 900px;
  /* border: #dcdee2 1px solid; */
}
.tablesty{ 
  width: 100vw;
}
.pagesty{
  margin: 5px 5px;
}
</style>
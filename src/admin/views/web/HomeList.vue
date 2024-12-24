<template>
  <div class="bodysty">
    <Table class="tablesty" border :columns="columns" :data="tabledata">
        <template #title="{ row }">
            <strong>{{ row.title }}</strong>
        </template>
        <template #action="{ row }">
          <Button type="primary" size="small" @click="topaction(row)">置顶</Button>
        </template>
    </Table>
    <div style="text-align: center;">
      <Page style="margin: 10px 0;" @on-change="turnpage" :total="total" />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Web,WebFront } from '@/router/interface'
export default defineComponent({
  data(){
    return{
      total:0,
      columns: [
        {
          title: '标题',
          slot: 'title',
          width:500,
        },
        {
          title: '发布时间',
          key: 'p_date'
        },
        {
          title: '编辑',
          key: 'author_name'
        },
        {
          title: '审核',
          key: 'review_name'
        },
        {
            title: '操作',
            slot: 'action',
            width: 90,
            align: 'center'
        }
      ],
      tabledata: [
        {
          name: '城安八期项目',
          prjdate: 18,
          prjmanager: '张经理',
          prjclass:'过单',
        },
        {
          name: '安溪自然资源局',
          prjdate: 18,
          prjmanager: '林经理',
          prjclass:'安全',
        }
      ]
    }
  },
  components:{

  },
  setup() {
    
  },
  mounted(){
    this.getList(1)
  },
  methods:{
    async getList(page:number){
      let x = new WebFront()
      let y = await x.GetHomeNews('all',page)
      if(y.ret == 200 ){
        this.tabledata = y.data.list
        this.total = y.data.total
      }else{
        this.$Message.error(y.msg)
      }
     
    },
    async topaction(row:{id:number}){
      let x = new Web()
      let y = await x.SetTop(row.id)
      if(y){
        this.getList(1)
      }else{
        this.$Message.error('网络错误')
      }
    },
    turnpage(page:number){
      this.getList(page)
    }
  }
})
</script>

<style scoped>

.bodysty{
  min-height: 500px;
  min-width: 900px;
}

</style>
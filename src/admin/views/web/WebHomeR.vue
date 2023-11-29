<template>
  <div class="bodysty">
    <Modal
      v-model="modal"
      title="表单编辑框"
      :loading="loading"
      @on-ok="asyncOK">
      <Table border :columns="rotatecolumns" :data="rotatelist">
        <template #action ="{row}">
          <Button type="primary" size="small" style="margin-right: 5px" @click="selected(row)">选择替换</Button>
            <!-- <Button type="primary" size="small" @click="cover(index)">封面</Button> -->
        </template>
      </Table>
    </Modal>
    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #title="{ row }">
        <a target="_blank" :href="'https://www.dataquanzhou.com/#/news/content?id='+row.id"><Ellipsis :text="row.title" :lines="1" transfer  tooltip  /></a>
          <!-- <strong>{{ row.title }}</strong> -->
      </template>
      <template #cover="{ row }">
        <a target="_blank" :href="row.cover"><Ellipsis :text="row.cover" :lines="1" /></a>
      </template>
      <template #action="{row}">
        <Button type="primary"  style="margin-right: 5px" @click="change(row)">设置</Button>
      </template>
    </Table>
    <div style="text-align: center;margin: 10px 0;">
      <Page @on-change="turnpage" :total="pagenum" />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { Web } from '@/router/interface'
export default defineComponent({
  data(){
    return{
      modal:false,
      loading: true,
      id_association:0,
      pagenum:0,
      tabledata: [],
      rotatelist:[],
      rotatecolumns:[
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '发布时间',
          key: 'p_date',
          width:120
        },
        {
          title: '操作',
          slot: 'action',
          width: 120,
          align: 'center'
        }
      ],
      columns: [
        {
          title: '标题',
          slot: 'title'
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
          title: '封面',
          slot: 'cover'
        },
        {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
        }
      ],
    }
  },
  components:{

  },
  setup() {
    
  },
  mounted(){
    this.getChangeList()
    this.getCoverNews(1,10)
  },
  methods:{
    async getChangeList(){
      let x = new Web()
      let y = await x.getWebLBT()
      if(y){
        this.rotatelist = y
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getCoverNews(page:number,limit:number){
      let x = new Web()
      let y = await x.GetWebCovers(page,limit)
      if(y){
        this.tabledata = y.list
        this.pagenum = y.total
      }else{
        this.$Message.error('网络错误')
      }
    },
    turnpage(index:number){
      this.getCoverNews(index,10)
    },
    asyncOK(){
      this.modal = false
    },
    async selected(obj:{s_id:0}){
      let x = new Web()
      let y = await x.ChangeCovers(obj.s_id,this.id_association)
      if(y){
        this.$Message.success('替换成功！')
        this.getChangeList()
      }else{
        this.$Message.error('发生错误')
      }
      this.modal = false
    },
    change(obj:{id:number}){
      this.modal = true
      this.id_association = obj.id
    }
  }
})
</script>

<style scoped>

.bodysty{
  min-height: 500px;
  /* display: flex; */
  /* flex-wrap:nowrap; */
  /* overflow-x:auto; */
  /* border: #dcdee2 1px solid; */
}

</style>
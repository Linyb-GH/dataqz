<template>
  <div class="bodysty">
    <Modal
      v-model="modal.isshow"
      title="发布编辑框"
      :loading="modal.loading"
      @on-ok="asyncOK"
      ok-text="审核发布"
      width="800" 
      >
      
      <Form :model="formdata" :label-width="80">
        <FormItem label="标题">
          <Input v-model="formdata.title"  maxlength="64" show-word-limit placeholder="Enter something..."></Input>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="发布类型">
              <RadioGroup v-model="formdata.p_type">
                <Radio label="新闻">新闻</Radio>
                <Radio label="公告">公告</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="发布日期">
              <Input type="date" v-model="formdata.p_date"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      
    </Modal>
    
    <Table class="tablesty" border :columns="columns" :data="tabledata">
      <template #title="{ row }" >
        <strong>{{ row.title }}</strong>
      </template>
      <template #action="{ row } ">
        
        <Button  type="primary" size="small" style="margin-right: 5px" @click="checked(row)">审核</Button>
        <Button v-if="row['is_publish'] == 1 " :disabled ="row['is_checked'] == 0" type="primary" size="small" @click="open(row)">关闭</Button>
        <Button v-else type="success" :disabled ="row['is_checked'] == 0" size="small"  @click="open(row)">开启</Button>
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
      modal:{isshow:false,loading:true},
      formdata:{title:'',p_type:'',p_date:''},
      listnum:0,
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
          title: '发布类型',
          key: 'p_type'
        },
        {
          title: '编辑',
          key: 'author_name'
        },
        {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
        }
      ],
      tabledata: []
    }
  },
  mounted(){
    this.getList(1)
  },
  methods:{
    async getList(page:number){
      let x = new Web()
      let y = await x.GetMyChecked(page)
      if(y){
        this.listnum = y.total
        this.tabledata = y.list
      }else{
        this.$Message.error('网络错误')
      }
    },
    asyncOK(){
      console.log('here')
    },
    checked(row:object){
      console.log(row)
    },
    open(row:object){
      console.log(row)
    },
    turnpage(page:number){
      this.getList(page)
    }

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
  
  width:100vw;
}

.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
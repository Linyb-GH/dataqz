<template>
  <div class="bodysty">
    <Modal v-model="modalstatus.isshow" title='周报-待评审'  width="800" :loading="modalstatus.loading"  @on-ok="modalyes" @on-cancel="modalcancel"  >
      <Form :model="modaldata" :label-width="80">
        <Row>
          <Col span="12">
            <FormItem label="汇报人">
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="汇报时间">
            </FormItem>
          </Col>
        </Row>
        <div v-for="(item,index) in modaldata.ques" :key="index" style="margin: 10px 10px;">
          <div style="margin: 10px 10px;">
            {{ index+1 }}、
            <Text style="margin-right: 10px;">
              {{ item.ques }}
            </Text>
          </div>
        </div>
        <Input v-model="modaldata.remark" placeholder="周报评审"></Input>
      </Form>
    </Modal>
    <Table class="tablesty" stripe :loading="initdata.tabloading" :columns="columns" :data="pagedata.prjlist">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #action="{ row, index }">
        <Button type="primary" @click="editorreport(index)">评审</Button>
        <!-- <Button type="error" size="small" style="margin-left: 5px" @click="deleteprj(index)">删除</Button> -->
      </template>
      <template #status="{ row }" >
        <Text v-if="row.status == '已评审'" type="success">{{ row.status }}</Text>
        <Text v-else type="danger">{{ row.status }}</Text>
      </template>
    </Table>
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Input } from 'view-ui-plus'
export default defineComponent({
  components:{},
  setup() {
    
  },
  data(){
    return {
      modalstatus:{isshow:false,loading:false},
      initdata:{tabloading:false},
      columns:[{title: '周报日期',key: 'DateRange',width:'200px'},
        {title: '提交时间',key:'HDate',width:'120px'},{title: '汇报人',key: 'report'},{title: '评审状态',slot: 'status'},{title: '评审内容',key: 'command'},{title:'操作',slot:'action'}],
      pagedata:{prjlist:[
        {DateRange:'2021-10-01 - 2021-10-07',HDate:'2021-10-07',report:'林毓斌',status:'未评审'}
      ]},
      totalnum:0,
      modaldata:{
        ques:[{ques:'本周你完成了哪些工作？哪些项目状态有变更？',isshow:false,html:''},
          {ques:'下周你计划做什么？要完成什么目标？',isshow:false,html:''}],
        remark:''
      },
    }
  },
  mounted(){

  },
  methods:{

    editorreport(i:number){
      this.modalstatus.isshow = true
    },
    tuenpage(i:number){
      console.log(i)
    },
    modalyes(){
      this.$Message.success('评审完成')
      console.log(this.modaldata)
      console.log('modalyes')
    },

    handleRender () {
      this.$Modal.confirm({
        render: (h:any) => {
          return h(Input, {
            size: "large",
            modelValue: this.modaldata.remark,
            autofocus: true,
            placeholder: '周报评审内容编辑',
            'onInput': (event:any) => {
              this.modaldata.remark = event.target.value;
            },
          })
        }
      })
    },

    modalcancel(){
      console.log('modalcancel')
    }
  }
})
</script>

<style scoped>
.bodysty{
  min-height: 600px;
  min-width: 900px;
  margin-bottom: 5px;
  display: flex;
  justify-content: left;
  align-content: flex-start;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  min-width: 1100px;
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
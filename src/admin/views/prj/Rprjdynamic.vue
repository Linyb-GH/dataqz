<template>
  <div class="bodysty">
    <Table class="tablesty" stripe :columns="init.columns" :data="messagedata">
      <!-- <template #action="{ row, index }">
        <Button type="primary" size="small" style="margin-right: 5px" @click="showinfo(index)">详细</Button>
        <Button type="primary" size="small" @click="editorprj(index)">编辑</Button>
      </template> -->
    </Table>
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Projects from '@/router/interface/Projects'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      totalnum:1,
      messagedata:[
        {name_brief:'XX单位三级等保测评项目',log_name:'张三',log_title:'创建项目',log_des:'张三创建了新项目',log_time:'2023-09-01',cur_task:'初验',status:'正常'},
        {name_brief:'晋江公卫国密改造项目',log_name:'郑斌强',log_title:'交接项目',log_des:'项目经理张三交接给李四',log_time:'2022-03-15',cur_task:'备案阶段',status:'风险'},
        {name_brief:'安溪住建局等保测评项目',log_name:'陈颖',log_title:'状态变更',log_des:'状态由正常变为风险',log_time:'2023-12-05',cur_task:'高危漏洞整改',status:'逾期'},
        {name_brief:'台商公安局硬件采购项目',log_name:'朱莉',log_title:'参与人员变更',log_des:'项目参与人员新增了张三',log_time:'2024-03-21',cur_task:'最终验收',status:'风险'},
      ],
      init:{columns:[
        {title: '项目',key: 'name_brief'},{title: '人员',key: 'log_name'},{title: '类型',key: 'log_title'},
        {title: '动态描述',key:'log_des'},{title: '时间',key: 'log_time'},
      ]}
    }
  },
  mounted(){
    this.GetRPrjLogs(1)
  },
  methods:{
    tuenpage(i:number){
      this.GetRPrjLogs(i)
    },
    async GetRPrjLogs(page:number){
      let x = new Projects()
      let y = await x.GetRPrjLogs(page)
      if(y.data){
        console.log(y.data)
        this.messagedata = y.data.list
        this.totalnum = y.data.total
      }
    }
  }
})
</script>

<style scoped>
.bodysty{
  margin-bottom: 5px;
  min-width: 900px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  min-width: 900px;
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
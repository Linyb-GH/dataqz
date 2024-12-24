<template>
  <div class="bodysty">
    <div style="width:100vw;min-width: 900px;">
      <Button @click="clicked" style="float:left;margin-left:20px;margin-top:20px" type="primary">新建项目</Button>
      <RadioGroup @on-change="searchbtn" style="float:left;margin-left:20px;margin-top:20px" v-model="select.schedule" type="button" button-style="solid">
        <Radio label="所有阶段"></Radio>
        <Radio label="项目评审"></Radio>
        <Radio label="实施中"></Radio>
        <Radio label="维保期"></Radio>
        <Radio label="已完结"></Radio>
      </RadioGroup>
      <RadioGroup  @on-change="searchbtn"  style="float:left;margin-left:20px;margin-top:20px" v-model="select.status" type="button" button-style="solid">
        <Radio label="所有状态"></Radio>
        <Radio label="逾期"></Radio>
        <Radio label="风险"></Radio>
        <Radio label="正常"></Radio>
      </RadioGroup>
      <Select v-model="select.saleid" @on-change="searchbtn"  style="width:80px;float:left;margin-left:20px;margin-top:20px">
        <Option v-for="item in arrData" :value="item.saleid" :key="item.saleid">{{ item.salename }}</Option>
      </Select>
      <Input search @click="searchbtn" @on-enter="searchbtn"  style="width:300px;float:left;margin-left:20px;margin-top:20px"  v-model="select.name_brief"  enter-button="查找" placeholder="通过项目名称查找" />
    </div>
    <Modal v-model="modalstatus.isshow" title="项目编辑框" width="800" @on-ok="modalyes" @on-cancel="modalcancel"  >
      <Form :model="modaldata" :label-width="80">
        <FormItem label="项目简称">
          <Input v-model="modaldata.name_brief" placeholder="项目简称"></Input>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="销售">
              <Select v-model="modaldata.saleid"   filterable>
                <Option v-for="item in modalstatus.sales" :value="item.id" :key="item.id">{{ item.username }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="阶段">
              <Select v-model="modaldata.schedule" filterable>
                <Option  value="项目评审" >项目评审</Option>
                <Option  value="实施中" >实施中</Option>
                <Option  value="维保期" >维保期</Option>
                <Option  value="已完结" >已完结</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="交接时间">
              <DatePicker type="date" :clearable="false" v-model="modaldata.HDate" placeholder="交接时间" style="width: 200px" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="截止时间">
              <DatePicker type="date" :clearable="false" v-model="modaldata.DDate"  placeholder="截止时间" style="width: 200px" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="状态">
              <Select v-model="modaldata.status" filterable>
                <Option  value="正常" >正常</Option>
                <Option  value="风险" >风险</Option>
                <Option  value="逾期" >逾期</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="项目分类">
              <Select v-model="modaldata.class" filterable>
                <Option  value="集成" >集成</Option>
                <Option  value="过单" >过单</Option>
                <Option  value="国密改造" >国密改造</Option>
                <Option  value="等保测评" >等保测评</Option>
                <Option  value="其它" >其它</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        
      </Form>
    </Modal>
    <Table class="tablesty" stripe :loading="initdata.tabloading" :columns="columns" :data="pagedata.prjlist">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #name_brief="{ row,index }" >
        <a @click="linkaction(index)">{{ row.name_brief }}</a>
      </template>
      <template #action="{ row, index }">
        <Button type="primary" size="small" @click="editorprj(index)">编辑</Button>
        <Button type="error" size="small" style="margin-left: 5px" @click="deleteprj(index)">删除</Button>
      </template>
      <template #status="{ row }" >
        <Text v-if="row.status == '逾期'" type="danger">{{ row.status }}</Text>
        <Text  v-else-if="row.status == '风险'"  type="warning">{{ row.status }}</Text>
        <Text v-else type="success">{{ row.status }}</Text>
      </template>
    </Table>
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import Projects from '@/router/interface/Projects'
import { User } from '@/router/interface'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      select:{page:1,schedule:'',name_brief:'',saleid:'',status:''},
      arrData:[{salename:'',saleid:''}],
      totalnum:1,
      columns:[{title: '项目简称',slot: 'name_brief',width:'200px'},{title: '销售',key: 'salename',width:'100px'},{title: '项目阶段',slot: 'schedule',width:'100px'},
              {title: '交接时间',key:'HDate',width:'120px'},{title: '交付截止时间',key: 'DDate'},{title: '当前任务',key: 'cur_task',width:'200px'},{title: '状态',slot: 'status'},
              {title:'操作',slot:'action'}],
      initdata:{tabloading:true},
      pagedata:{prjlist:[
        {id:'',name_brief:'XX单位三级等保测评项目',saleid:'',salename:'张三',schedule:'维保期',HDate:'2024-03-10',DDate:'2023-09-01',cur_task:'初验',status:'正常',class:''},
      ]},
      modalstatus:{isshow:false,sales:[{username:'郑斌强',id:'3'}]},
      modaldata:{id:'',name_brief:'',saleid:'',schedule:'',HDate:'',DDate:'',status:'',class:''},
    }
  },
  mounted(){
    this.select.schedule = '所有阶段'
    this.select.status = '所有状态'
    this.init()
    this.getList(1)
  },
  methods:{
    async init(){
      this.getUsers()
      let x = new Projects()
      let y = await x.getPrjSales()
      if(y){
        this.arrData = y.data
        this.arrData.push({saleid:'',salename:'所有销售'})
      }else{
        this.$Message.error('getPrjSales 接口请求出错')
      }
    },
    async getUsers(){
      let x = new User()
      let y = await x.GetUsers('销售部')
      if(y){
        this.modalstatus.sales = y.data
        this.getList(1)
      }else{
        this.$Message.error('网络错误')
      }
    },
    editorprj(i:number){
    
      this.modaldata.name_brief = this.pagedata.prjlist[i].name_brief
      this.modaldata.saleid = this.pagedata.prjlist[i].saleid
      this.modaldata.schedule = this.pagedata.prjlist[i].schedule
      this.modaldata.HDate = this.pagedata.prjlist[i].HDate
      if(this.pagedata.prjlist[i].DDate){this.modaldata.DDate = this.pagedata.prjlist[i].DDate}
      
      this.modaldata.status = this.pagedata.prjlist[i].status
      this.modaldata.class = this.pagedata.prjlist[i].class
      this.modaldata.id = this.pagedata.prjlist[i].id
      this.modalstatus.isshow = true

    },
    async deleteprj_ac(id:string){
      let x = new Projects() 
      let y = await x.PrjDelete(id)
      if(y.data){
        this.getList(1)
        this.$Message.success('删除完成！')
      }else{
        this.$Message.error('项目删除时发生错误！')
      }
    },
    deleteprj(i:number){
      this.$Modal.confirm({
        title: '项目删除',
        content: '<p>该操作将删除项目及相关的所有任务，包括上传的文件，确认是否进行删除？</p>',
        onOk: () => {
          this.deleteprj_ac(this.pagedata.prjlist[i].id)
        }
      });
    },
    async clicked(){//新建项目
      this.modaldata = {id:'',name_brief:'',saleid:'',schedule:'',HDate:this.$Date().format('YYYY-MM-DD')
        ,DDate:'',status:'正常',class:''}
      // store.commit('Tab_NewTab',{id:'',label:'任务',component:'TabPrjTask',data:{id:'task'}})
      this.modalstatus.isshow = true
    },
    searchbtn(){
      this.getList(1)
    },
    linkaction(i:number){
      store.commit('Tab_NewTab',{id:'',label:this.pagedata.prjlist[i].name_brief,component:'TabPrjInfo',data:{id:this.pagedata.prjlist[i].id,name:this.pagedata.prjlist[i].name_brief}})
      // console.log(id)
    },
    async modalyes(){
      if(this.modaldata.name_brief == ''){
        this.$Message.error('项目简称不能为空');return 
      }
      if(this.modaldata.schedule == ''){
        this.$Message.error('项目阶段不能为空');return 
      }
      if(this.modaldata.DDate != ''){
        this.modaldata.DDate = this.$Date(this.modaldata.DDate).format('YYYY-MM-DD')
      }
      if(this.modaldata.HDate != ''){
        this.modaldata.HDate = this.$Date(this.modaldata.HDate).format('YYYY-MM-DD')
      }
      let x = new Projects()
      let y = await x.NewPrj(this.modaldata)
      if(y){
        this.getList(1)
      }else{
        this.$Message.error('网络错误')
      }
    },
    async getList(page:number){
      this.initdata.tabloading = true
      this.select.page = page
      let x = new Projects()
      let y = await x.getPrjList(this.select)
      if(y){
        this.totalnum = y.data.count
        this.pagedata.prjlist = y.data.list
        this.initdata.tabloading = false
      }else{
        this.$Message.error('网络错误')
      }
      
    },

    modalcancel(){
      console.log('modalcancel')
    },
    tuenpage(p:number){
      this.getList(p)
    },
 
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
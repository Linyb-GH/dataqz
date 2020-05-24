<template>
<Tabs ref="report" type="card" :value="tabs.clabel"  @on-click="tabclick" @on-tab-remove="closelabel" >
  <TabPane label="近期任务" key="近期任务" >
    <Table :columns="columns" :data="Tasklish" ref="table" >
      <template slot-scope="{ row, index }"  slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="GetInfo(index)">详细</Button>
      </template>
    </Table>
  </TabPane>
  <TabPane label="Excel导出" key="ExcelDC" >
    <div class="center">
      <!-- 服务器数量分类统计
      配件不足提醒
      近阶段（七天）任务完成量，分类统计
      生成月报（上个月） -->
      EXCEL导出；
    </div>
    <Button type="primary" @click="exportData"><Icon type="ios-download-outline"></Icon>导出测试数据</Button>
  </TabPane>
  <TabPane closable v-for="(tab,index) in tabs.labels" :name="tab.label" :key=tab.label+index :label="tab.label">
    <NewTask :message = tab.data></NewTask>
  </TabPane>
  
</Tabs>
</template>

<script>
import NewTask from '../components/tasks/new'
import {request} from '../network/request'
export default {
  data () {
    return {
      tabs:{
        clabel:'',
        labels:[],
      },
      columns: [
        {
          title: '创建时间',
          key: 'cdate'
        },
        {
            title: '任务ID',
            key: 'randomid'
        },
        {
          title: '任务类型',
          key: 'showtype',
          filters: [
              {
                  label: '设备上架',
                  value: '设备上架'
              },
              {
                  label: '布线',
                  value: '布线'
              },
              {
                  label: '其它',
                  value: '其它'
              }
            ],
          filterMethod (value, row) {
              return row.showtype.indexOf(value) > -1;
          }
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '详细',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      Tasklish:[],
    }
  },
  components:{
    NewTask,
  },
  mounted(){
    request({
      url:'/tasks',
      params:{action:'finishtasks'}
    }).then(res =>{
      console.log(res)
      this.Tasklish = res.data.message;
    })
  },
  methods: {
    closelabel(index){
      this.tabs.labels = this.tabs.labels.filter((item)=>item.label != index)
    },
    GetInfo(index){
      let x = this.tabs.labels.filter(ret => ret.label == String(this.Tasklish[index].randomid))
      // console.log(x)
      if(x.length == 0){
        let lab = String(this.Tasklish[index].randomid)
        let stp = this.Tasklish[index].showtype
        let id = this.Tasklish[index].randomid
        let ct = this.Tasklish[index].cdate
        let gtp = this.Tasklish[index].gettype
        this.tabs.labels.push({label:lab,data:{randomid:id,cdate:ct,type:gtp}})
        this.tabs.clabel = lab

      }else{
        this.tabs.clabel = String(this.Tasklish[index].randomid)
      }

      // let info = this.Tasklish[index].cdate
      // console.log(info)

      // this.tabs.labels.push({label:name+ran,data:{randomid:ran,type:tp}})
      // this.tabs.clabel = name+ran
    },
    tabclick(index){
      //console.log(index)
    },
    exportData(){
      this.$refs.table.exportCsv({
        filename: 'testdata',
        //callback
      });
      //window.open('http://localhost/api/')
    }
  },
  
}
</script>

<style scoped>
  .center{
    text-align: center
  }
</style>
<template>
<Tabs ref="tasks" type="card" :value="tabs.clabel"  @on-click="tabclick" @on-tab-remove="closelabel">
  <!-- <router-view></router-view> -->
  <TabPane label="任务列表" key="任务列表" name='home'>
    <Table :columns="columns" :data="data5" >
      <template slot-scope="{ row, index }"  slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="Continue(index)">继续</Button>
        <!-- <Button type="error" size="small" style="margin-right: 5px" @click="Delete(index)">删除</Button> -->
        <Poptip placement="left-end"
          title="确定要删除么？"
          confirm
          @on-ok="Delete(index)"
          @on-cancel="Cancel">
          <Button type="error" size="small" style="margin-right: 5px">删除</Button>
        </Poptip>
      </template>
    </Table>
  </TabPane>
  <TabPane label="新建任务" key="新建任务" name='new'>

    <!-- <Button type="primary" @click="newTask('tasks_inspecting')" v-for="(item,index) in NameMap"
    :key="item+index"  class="rightspace">{{NameMap[0]}}</Button> -->
    <Button type="primary" @click="newTask('tasks_inspecting')" class="rightspace">每天巡检</Button>
    <Button type="primary" @click="newTask('tasks_maintain')" class="rightspace">日常运维</Button>
    <Button type="primary" @click="newTask('tasks_moving')" class="rightspace">设备迁移</Button>
    <Button type="primary" @click="newTask('tasks_server')" class="rightspace">设备上架</Button> 
    <Button type="primary" @click="newTask('tasks_moveout')" class="rightspace">下架迁出</Button>
    <Button type="primary" @click="newTask('tasks_assetnum')" class="rightspace">固资编号</Button>
    <Button type="primary" @click="newTask('tasks_wiring')" class="rightspace">布线</Button>
    <Button type="primary" @click="newTask('tasks_accessory')" class="rightspace">配件变更</Button>
    <Button type="primary" @click="newTask('tasks_modify')" class="rightspace">信息变更</Button>
    
  </TabPane>

  <TabPane closable v-for="(tab,index) in tabs.labels" :name="tab.label" :key=tab.label+index :label="tab.label">
    <NewTask :message = tab.data></NewTask>
  </TabPane>
</Tabs>
</template>

<script>
import NewTask from '../components/tasks/new'
import {request} from '../network/request'
// import axios from 'axios'

export default {
  components:{
    NewTask
  },
  data () {
    return {
      NameMap:[],
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
              label: '固资编号',
              value: '固资编号'
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
          title: '当前进度',
          key: 'currentstp'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
    data5: [],
    }
  },
  created(){
    this.NameMap['tasks_inspecting'] = '每天巡检'
    this.NameMap['tasks_maintain'] = '日常运维'
    this.NameMap['tasks_moving'] = '设备迁移'
    this.NameMap['tasks_server'] = '设备上架'
    this.NameMap['tasks_moveout'] = '下架迁出'
    this.NameMap['tasks_assetnum'] = '固资编号'
    this.NameMap['tasks_wiring'] = '布线'
    this.NameMap['tasks_accessory'] = '配件变更'
    this.NameMap['tasks_modify'] = '信息变更'

  },
  mounted(){
    
    request({
      url:'/tasks',
      params:{action:'showtasks'}
    }).then(res =>{
      console.log(res)
      this.data5 = res.data.message;
    })
  },
  computed:{
    getlistdata(){
      this.$store.dispatch('taskgetlist')
      this.data5 = this.$store.state.taskdata.tasklist.data.message
    }
  },
  methods: {
    closelabel(index){

      this.tabs.labels = this.tabs.labels.filter((item)=>item.label != index)

      },
    newTask(name) {
      let ran = String(Math.ceil((Math.random()*10000)))

      this.tabs.labels.push({label:this.NameMap[name]+ran,data:{randomid:ran,type:name}})
      this.tabs.clabel =this.NameMap[name]+ran
      // console.log(this.NameMap[name])
    },
    Continue(index){
      let x = this.tabs.labels.filter(ret => ret.label == String(this.data5[index].randomid))
      // console.log(x)
      if(x.length == 0){
        let lab = String(this.data5[index].randomid)
        let stp = this.data5[index].showtype
        let id = this.data5[index].randomid
        let ct = this.data5[index].cdate
        let gtp = this.data5[index].gettype
        this.tabs.labels.push({label:lab,data:{randomid:id,cdate:ct,type:gtp}})
 
        this.tabs.clabel = lab

      }else{
        this.tabs.clabel = String(this.data5[index].randomid)
      }
      
    },
    Delete(index){
      request({
        url:'/tasks',
        params:{
          action:'deletetask',
          randomid:this.data5[index].randomid,
          cdate:this.data5[index].cdate,
          type:this.data5[index].gettype
        }
      }).then(res=>{
        this.data5.splice(index,1)
        console.log(res)
      })
      // axios({
      // method:'get',
      // url:'http://localhost/ecserver/index.php/tasks',
      // params:{
      //   action:'deletetask',
      //   randomid:this.data5[index].randomid,
      //   cdate:this.data5[index].cdate,
      //   type:this.data5[index].gettype
      //   },
      // // data,
      // timeout:1000
      // }).then(res=>{
      //   console.log(res)
      //   this.data5.splice(index,1)
      // })
      
    },
    Cancel(){
      this.$Message.info('You click cancel--')
    },
    tabclick(index){
      if(index == 'home'){
        request({
          url:'/tasks',
          params:{action:'showtasks'}
        }).then(res=>{
          this.data5 = res.data.message;
        })
        this.tabs.clabel = 'home'
      }
    }
  },

}
</script>

<style scoped>
  .rightspace{
    margin-right:10px;
  }
</style>
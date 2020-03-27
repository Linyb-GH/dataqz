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

    <Button type="primary" @click="newTask('设备上架')" class="rightspace">设备上架</Button> 

    <Button type="primary" @click="newTask('布线')" class="rightspace">布线</Button>
    <Button type="primary" @click="newTask('每天巡检')">每天巡检</Button>
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
      // tabs:[],//新增显示的标签页标题
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
  mounted(){
    request({
      url:'/tasks',
      params:{action:'showtasks'}
    }).then(res =>{
      this.data5 = res.data.message;
    })
    // axios({
    //   method:'get',
    //   url:'http://localhost/ecserver/index.php/tasks',
    //   params:{action:'showtasks'},
    //   // data,
    //   timeout:1000
    // }).then(res=>{
    //   this.data5 = res.data.message;
    //   console.log(this.data5);
    // })
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

      let tp
      if(name == '设备上架') {tp = 'tasks_server'}
      if(name == '布线') {tp = 'tasks_wiring'}
      if(name == '每天巡检') {tp = 'tasks_inspecting'}
      this.tabs.labels.push({label:name+ran,data:{randomid:ran,type:tp}})
      this.tabs.clabel = name+ran
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
        // axios({
        //   method:'get',
        //   url:'http://localhost/ecserver/index.php/tasks',
        //   params:{action:'showtasks'},
        //   // data,
        //   timeout:1000
        // }).then(res=>{
        //   this.data5 = res.data.message;
          
        // })
        this.tabs.clabel = 'home'
      }
    }
  },

}
</script>

<style scoped>
  .rightspace{
    margin-right: 10px;
  }
</style>
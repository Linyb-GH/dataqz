<template>
<Tabs ref="tasks" type="card" :value="tabs.clabel"  @on-click="tabclick" @on-tab-remove="closelabel">
  <!-- <router-view></router-view> -->
  <TabPane label="任务列表" key="任务列表" name='home'>
    <Table border :columns="columns" :data="data5" >
      <template slot-scope="{ row, index }"  slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="Continue(index)">继续</Button>
        <!-- <Button type="error" size="small" style="margin-right: 5px" @click="Delete(index)">删除</Button> -->
        <Poptip placement="left-end"
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

    <Button type="primary" @click="newTask('布线')">布线</Button>
  </TabPane>

  <TabPane closable v-for="(tab,index) in tabs.labels" :name="tab.label" :key=tab.label+index :label="tab.label">
    <NewTask :message = tab.data></NewTask>
  </TabPane>
</Tabs>
</template>

<script>
import NewTask from '../components/tasks/new'
import axios from 'axios'

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
          key: 'creat_time'
        },
        {
            title: '任务ID',
            key: 'id_random'
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
  
    axios({
      method:'get',
      url:'http://localhost/ecserver/index.php/tasks',
      params:{action:'showtasks'},
      // data,
      timeout:1000
    }).then(res=>{
      this.data5 = res.data.message;
      // console.log(this.data5);
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

      let tp
      if(name == '设备上架') {tp = 'tasks_server'}
      if(name == '布线') {tp = 'tasks_wiring'}
      this.tabs.labels.push({label:name+ran,data:{id_random:ran,type:tp}})
      this.tabs.clabel = name+ran
    },
    Continue(index){
      let x = this.tabs.labels.filter(ret => ret.label == String(this.data5[index].id_random))
      console.log(x)
      if(x.length == 0){
        let lab = String(this.data5[index].id_random)
        let stp = this.data5[index].showtype
        let id = this.data5[index].id_random
        let ct = this.data5[index].creat_time
        let gtp = this.data5[index].gettype
        this.tabs.labels.push({label:lab,data:{id_random:id,creat_time:ct,type:gtp}})
        // this.tabs.labels.push({label:lab,data:[stp,gtp,id,ct]})
        this.tabs.clabel = lab
        // this.tabs.labels.push(lab)
        // this.tabs.clabel = lab
        // this.tasks.new = this.data5[index].showtype
        // this.Cdata(index)
        // this.tabs.labels.push({label:'hae',data:['ah','fei','fei']})

      }else{
        this.tabs.clabel = String(this.data5[index].id_random)
      }
      
    },
    Delete(index){
      axios({
      method:'get',
      url:'http://localhost/ecserver/index.php/tasks',
      params:{
        action:'deletetask',
        id_random:this.data5[index].id_random,
        creat_time:this.data5[index].creat_time,
        type:this.data5[index].gettype
        },
      // data,
      timeout:1000
      }).then(res=>{
        console.log(res)
        this.data5.splice(index,1)
      })
      
    },
    Cancel(){
      this.$Message.info('You click cancel--')
    },
    tabclick(index){
      if(index == 'home'){
        axios({
          method:'get',
          url:'http://localhost/ecserver/index.php/tasks',
          params:{action:'showtasks'},
          // data,
          timeout:1000
        }).then(res=>{
          this.data5 = res.data.message;
          
        })
        this.tabs.clabel = 'home'
      }
      // console.log(this.tabs)

    }
  },

}
</script>

<style scoped>
  .rightspace{
    margin-right: 10px;
  }
</style>
<template>
  <div class="demo-split">
  
    <div slot="left" class="demo-split-pane">
      <div v-show="this.formdata.steps == 0">
        <Table stripe :columns="columns1" :data="serverdata.inspectservers">
          <template slot-scope="{ }"  slot="action">
            <RadioGroup v-model="serverdata.server1">
              <Radio label="正常"></Radio>
              <Radio label="警告"></Radio>
              <Radio label="重要"></Radio>
              <Radio label="紧急"></Radio>
            </RadioGroup>
            <!-- <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
        </template>
        </Table>
      </div >
      <div v-show="this.formdata.steps == 1">
        巡检页面2
      </div>
      <br>
      <div class="buttons">
        <Button type="primary" @click="nextstep('back')">上一步</Button>
        <Button type="success" @click="saveAction" :disabled="formdata.isfinish" >保存</Button>
        
        <Poptip
          confirm
          title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
          @on-ok="ok"
          @on-cancel="cancel">
          <Button type="success" v-show="formdata.steps == 1" :disabled="formdata.isfinish">完成</Button>
        </Poptip>
        <Button type="primary" @click="nextstep('next')">下一步</Button>
      </div>
    </div>

  </div>
  
</template>

<script>
// import axios from 'axios';
import {request} from '../../network/request'
import Qs from 'qs';
export default {
  props:[
    "message"
  ],
  data(){
    return{
      formdata:{
        split1: 0.75,
        steps:0,
        isfinish:false,
        

      },
      columns1:[
        {
          title: '设备',
          key: 'name'
        },
        {
          title: '管理登录',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          slot: 'action',
          width:'300px',
          align: 'center'
        }
      ],
      serverdata:{
        inspectservers:[
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          },
        ],
        server1:''
      },
      
    }
  },
  created(){
    // this.formdata.tabpaperuse='NotUse'
    let cdate = new Date()
    this.formdata.cdate = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate()
  },
  methods:{
    nextstep(name){
      if(name == 'back'){
        if(this.formdata.steps>0){
          this.formdata.steps--
        }      
      }
      if(name == 'next'){
        if(this.formdata.steps<1){
          this.formdata.steps++
        }
      }
    },
    remove(){
      console.log('re')
    },
    saveAction(){
      this.$Message.success('This is a success tip:');
      // this.formdata.randomid = this.message.randomid
      // this.formdata.tasktype = this.message.type
 
      // this.formdata.currentstp = this.formdata.formdata.formdata.steps+1+"/2"
      // if(this.formdata.randomid == 'new' ){
      //   this.formdata.randomid = this.message.id_random//(Math.ceil((Math.random()*10000)))
      // }
      // let data = Qs.stringify({"taskdata":this.formdata});
      // request({
      //   method:'post',
      //   url:'/tasks',
      //   params:{action:'creattask'},
      //   data,
      // }).then(res =>{
      //   console.log(res)
      // })
    },
    ok(){
      this.$Message.info('wiring task is ok')
      // let data = Qs.stringify({"taskdata":this.formdata});
      // request({
      //   method:'post',
      //   url:'/tasks',
      //   params:{action:'taskfinish',type:'tasks_wiring'},
      //   data
      // }).then(res =>{
      //   console.log(res)
      //   this.isfinish = true
      // })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){
    console.log(this.message)
    // request({
    //   url:'/tasks',
    //   params:{
    //     action:'pageinit',
    //     type:'tasks_wiring'
    //   }
    // }).then(res =>{
    //   // console.log(res)
    //   this.selectdata = res.data.message
    // })

    if(this.message.cdate != null){
    //   request({
    //     url:'/tasks',
    //     params:{
    //       action:'continue',
    //       cdate:this.message.cdate,
    //       randomid:this.message.randomid,
    //       type:'tasks_wiring'
    //     }
    //   }).then(res =>{
    //     let data = {}
    //     data = res.data.message
    //     this.formdata.steps = parseInt(data.currentstp.substr(0,1)) -1
    //     if(data.ldevice){data.ldevice = data.ldevice.split(',')}
    //     if(data.rdevice){data.rdevice = data.rdevice.split(',')}
    //     this.formdata = data
    //   })
    }else{
      this.formdata.randomid = 'new'
    }
  },
}

</script>

<style>
  .demo-split{
    height: 400px;
    border: 1px solid #dcdee2;
    position: relative;
  }
  .demo-split-pane{
    padding: 10px;
  }
  .left{
    width: 300px;
    height: 100%;
  }
  .leftsmall{
    width: 150px;
    height: 100%;
  }
  .right{
    /* display: flex; */
    width: 300px;
    height: 100%;
  }
  .rightsmall{
    /* display: flex; */
    /* flex:1; */
    width: 150px;
    height: 100%;
  }
  .buttons{
    position: absolute;
    padding: 10px;
    bottom: 5px;
    color:black
  }
</style>

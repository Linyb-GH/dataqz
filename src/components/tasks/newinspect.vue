<template>
  <div class="inspect-split">
  
    <div slot="left" class="inspect-split-pane">
      <div v-show="this.formdata.steps == 0">
        <Table stripe :columns="columns1" :data="serverdata.inspectp1">
          <template slot-scope="{index}"  slot="login">
            <a target="_blank" :href="serverdata.inspectp1[index].login">{{serverdata.inspectp1[index].login.substr(8)}}</a>     
          </template>
          <template slot-scope="{index}"  slot="action">
            <RadioGroup v-model="serverdata.servers[index]">
              <Radio label="正常"></Radio>
              <Radio label="警告"></Radio>
              <Radio label="重要"></Radio>
              <Radio label="紧急"></Radio>
            </RadioGroup>
          </template>
        </Table>
        <br>巡检人：
        <Input v-model="serverdata.inspector" placeholder="备注：处理情况等..." style="width:300px" />
      </div >
      <div v-show="this.formdata.steps == 1">
        <Table stripe :columns="columns1" :data="serverdata.inspectp2">
          <template slot-scope="{index}"  slot="login">
            <a target="_blank" :href="serverdata.inspectp2[index].login">{{serverdata.inspectp2[index].login.substr(8)}}</a>     
          </template>
          <template slot-scope="{index}"  slot="action">
            <RadioGroup v-model="serverdata.servers[index+5]">
              <Radio label="正常"></Radio>
              <Radio label="警告"></Radio>
              <Radio label="重要"></Radio>
              <Radio label="紧急"></Radio>
            </RadioGroup>
          </template>
        </Table>
        <div><br>
          <Input v-model="serverdata.remark" placeholder="备注：处理情况等..." class="remarksty" />
        </div>
      </div>
      <br>
      <div class="buttons">
        <Button type="primary" @click="nextstep('back')">上一页</Button>       
        <Poptip
          confirm
          title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
          @on-ok="ok"
          @on-cancel="cancel">
          <Button type="success" v-show="formdata.steps == 1" :disabled="formdata.isfinish">完成</Button>
        </Poptip>
        <Button type="primary" @click="nextstep('next')">下一页</Button>
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
        steps:0,
        isfinish:false,
      },
      columns1:[
        {
          title: '设备名称',
          key: 'name'
        },
        {
          title: '上次巡检时间',
          key: 'lastdate'
        },
        {
          title: '登陆',
          slot: 'login',
          // key: 'login'
        },
        {
          title: '账号密码',
          key: 'password'
        },
        {
          title: '巡检结果',
          slot: 'action',
          width:'280px',
          align: 'center'
        }
      ],
      serverdata:{
        inspectp1:[
          {
            name: 'John Brown',
            lastdate: '2016-10-03',
            login: '192.168.111.222',
            account:'administ/administrator',
            // date: '2016-10-03',
          },
        ],
        cdate:'',
        randomid:'',
        inspectp2:[],
        servers:[],
        inspector:'林毓斌',
        remark:''
      },
      
    }
  },
  created(){
    // this.formdata.tabpaperuse='NotUse'
    let cdate = new Date()
    this.serverdata.randomid = this.message.randomid
    this.serverdata.cdate = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate()
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
    ok(){
      // console.log(this.serverdata)
      let data = Qs.stringify({"taskdata":this.serverdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_inspecting'},
        data
      }).then(res =>{
        this.$Message.success('inspect task is ok')
        console.log(res)
        this.formdata.isfinish = true
      }).catch(err =>{
        this.$Message.error('发生错误'+err)
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){
    // console.log(this.message)
    request({
      url:'/tasks',
      params:{
        action:'pageinit',
        type:'tasks_inspecting'
      }
    }).then(res =>{
      this.serverdata.inspectp1 = res.data.message[0]
      this.serverdata.inspectp2 = res.data.message[1]
      // console.log(res)
      // this.selectdata = res.data.message
    }).catch(err =>{
      this.$Message.error('发生错误')
      console.log(err)
    })
  },
}

</script>

<style> 
/* inspect命名需要修改 */
  .inspect-split{
    height: auto;
    border: 1px solid #dcdee2;
    position: relative;
  }
  .inspect-split-pane{
    height: 420px;
    padding: 10px;
  }
  .left{
    width: 300px;
    height: 100%;
  }
 
  .remarksty{
    width: 100%;
  }
  .buttons{
    position: absolute;
    padding: 10px;
    bottom: 5px;
    color:black
  }
</style>

<template>
  <div>
    <div class="moving-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="moving-split-pane">
          <div v-show="this.steps == 0"><br>
            <div style="display:flex;">
            要迁移的设备：  
              <Cascader v-model="senddata.mdevice" :load-data="loadData" :data="jiliandata" placeholder="迁移设备"></Cascader>
            </div>
            <br>
            迁移原因：
            <Input v-model="senddata.reason" type="textarea" :rows="4" placeholder="Enter something..." />
          </div >
          <div v-show="this.steps == 1">
            
            <br>
            迁移后的位置:
            <Select v-model="senddata.room" style="width:100px" >
              <Option v-for="item in formdata.room" :value="item" :key="item">{{ item }}</Option>
            </Select> <br>
            <div class="flexsyt topmargin">
              上架位置：
              <Cascader :data="site" v-model="senddata.jigui" class="siteclass rightspace"></Cascader>
              所在机柜位置（1-42）：
              <Input style="width:50px" v-model="senddata.site" />
            </div>
            <div class="flexsyt topmargin">
              新名称　：
              <Input v-model="senddata.newname" style="width:200px"  placeholder="设备名称" />
            </div>
            <div class="flexsyt topmargin">
              所属平台：
              <Input v-model="senddata.system" class="rightspace" style="width:200px"  placeholder="政务外网" />
              平台区域：
              <Input v-model="senddata.systemarea" class="rightspace" style="width:200px"  placeholder="互联网区" />
            </div>
            <div class="flexsyt topmargin">
              BMCip　：
              <Input v-model="senddata.bmcip" class="rightspace" style="width:200px"   />
              BMC账号/密码：
              <Input v-model="senddata.bmclogin" class="rightspace" style="width:200px"  />
            </div>
          </div>
          <br>
          <div class="buttons">
            <Button type="primary" @click="nextstep('back')">上一步</Button>
            <Button type="success" @click="saveAction" :disabled="isfinish" >保存</Button>
            
            <Poptip
              confirm
              title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
              @on-ok="ok"
              @on-cancel="cancel">
              <Button type="success" v-show="steps == 1" :disabled="isfinish">完成</Button>
            </Poptip>
            <Button type="primary" @click="nextstep('next')">下一步</Button>
          </div>
        </div>
        <div slot="right" class="moving-split-pane" >
          <Steps :current="steps" direction="vertical">
          <Step title="迁移设备" content="确定要迁移的设备。"></Step>
          <Step title="上架位置" content="确定要上架的位置，迁移后删除所有接线，保留当前维修信息和设备信息。"></Step>
          </Steps>
        </div>
      </Split>
    </div>
  </div>

</template>

<script>
import {request} from '../../network/request'
import Qs from 'qs';
export default {
  props:[
    "message"
  ],
  data(){
    return{
      senddata:{
        mdevice:[],
        reason:'',
        room:'',
        site:'',
        jigui:[],
        newname:'',
        system:'政务外网',
        systemarea:'互联网区',
        bmcip:'',
        bmclogin:''

      },
      split1: 0.75,
      steps:0,
      isfinish:false,
      formdata:{
        room:['3-2','1-2']
      },
      site:[
        {
          value: 'A',
          label: 'A列',
          children: []
        },
        {
          value: 'B',
          label: 'B列',
          children: []
        },
      ],
      jiliandata:[
        {
          value: '3-2_A',
          label: '3-2_A列',
          children: [],
          loading: false
        },
        {
          value: '3-2_B',
          label: '3-2_B列',
          children: [],
          loading:false
        },
        {
          value: '1-2_A',
          label: '1-2_A列',
          children: [],
          loading:false
        },
      ]
    }
  },
  created(){
    for(let i=1;i<23;i++){
      if(i<10){
        this.site[0].children.push({'value':'0'+i,label:'0'+i});
        this.site[1].children.push({'value':'0'+i,label:'0'+i});
      }else{
        this.site[0].children.push({'value':i,label:i});
        this.site[1].children.push({'value':i,label:i});
      }
    }
    this.senddata.site = 1
    let cdate = new Date()
    let yy = cdate.getFullYear()
    let mm = (cdate.getMonth()<9? '0'+ (cdate.getMonth()+1):cdate.getMonth()+1)
    let dd = cdate.getDate()<10? '0'+(cdate.getDate()):cdate.getDate()
    this.senddata.cdate = yy + "-" + mm + "-" + dd
  },
  methods:{
    nextstep(name){
      if(name == 'back'){
        if(this.steps>0){
          this.steps--
        }      
      }
      if(name == 'next'){
        if(this.steps<1){
          this.steps++
        }
      }
    },
    loadData (item, callback) {
      item.loading = true;
      request({
        url:'/servers',
        params:{
          action:'getjilianinfo',
          column:item.value
        }
      }).then(res=>{
        let jilian = res.data
        item.children = jilian.message.children
        item.loading = false;
        callback();
      })
    },
    saveAction(){
      
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata.currentstp = this.steps+1+"/2"
      // this.senddata.cdate = this.message.cdate
      if(this.senddata.randomid == 'new' ){
        this.senddata.randomid = this.message.id_random
      }
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_moving'},
        data,
      }).then(res =>{
        this.$Message.success('设备变更成功');
        console.log(res)
      }).catch(err =>{
        this.$Message.error('发生错误'.res);
        console.log(err)
      })
    },
    ok(){
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_moving'},
        data
      }).then(res =>{
        this.$Message.success('设备迁移成功')
        console.log(res)
        //this.isfinish = true
      }).catch(err =>{
        this.$Message.error('发生错误：'.err)
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){
    // request({
    //   url:'/tasks',
    //   params:{
    //     action:'pageinit',
    //     type:'tasks_moving'
    //   }
    // }).then(res =>{
    //   // console.log(res)
    //   this.selectdata = res.data.message
    // })

    if(this.message.cdate != null){
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_moving'
        }
      }).then(res =>{
        console.log(res);
        let data = {}
        data = res.data.message
        if(data.currentstp != 'finish'){
          this.steps = parseInt(data.currentstp.substr(0,1)) -1
        }
        
        // if(data.ldevice){data.ldevice = data.ldevice.split(',')}
        // if(data.rdevice){data.rdevice = data.rdevice.split(',')}
        this.senddata = data
      })
    }else{
      this.senddata.randomid = 'new'
    }
  },
}

</script>

<style>
  @import '../../assets/css/common.css';
  .moving-split{
    height: 400px;
    border: 1px solid #dcdee2;
    position: relative;
  }
  .moving-split-pane{
    height: auto;
    padding: 10px;
    /* height: 400px; */
  }
  .left{
    width: 300px;
    height: 100%;
  }
  .flexsyt{
    display: flex;
  }
  .buttons{
    position: absolute;
    padding: 10px;
    bottom: 5px;
    color:black
  }
</style>

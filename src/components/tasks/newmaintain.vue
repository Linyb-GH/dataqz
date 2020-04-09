<template>
  <div>
    
    <div class="common-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="common-split-pane">
          <div v-show="this.steps == 0"><br>
            维护类型：<br>
            <RadioGroup v-model="formdata.mtype">
              <Radio label="设备报修"></Radio>
              <Radio label="系统安装"></Radio>
              <!-- <Radio label="IDC用户维护"></Radio> -->
              <Radio label="网络故障维护"></Radio>
              <Radio label="配置更改"></Radio>
              <Radio label="其他维护"></Radio>
            </RadioGroup>
            
            <div class="topmargin" >
              <Cascader :disabled="isdisable" v-model="formdata.device" :load-data="loadData" :data="jiliandata" style="width:300px" placeholder="维修设备"></Cascader>
            </div>
            <div class="topmargin" >
            过程描述：
            <Input v-model="formdata.myprocedure" type="textarea" :rows="4" placeholder="Enter something..." />
            </div>
          </div >
          <div v-show="this.steps == 1">
            <br>
            结果：<br>
            <RadioGroup v-model="formdata.result">
              <Radio label="完成"></Radio>
              <Radio label="暂时搁置"></Radio>
              <Radio label="取消"></Radio>
              <Radio label="其它情况"></Radio>
            </RadioGroup>
            <div class="topmargin">
              联系方式：
              <Input v-model="formdata.contact" style="width:300px" placeholder="联系人/联系方式" />
            </div>
            <div class="topmargin">
              完成日期：
              <Input v-model="formdata.fdate" type="date" style="width:300px" placeholder="联系人/联系方式" />
            </div>
            <div class="topmargin">
              维护人员：
              <Input v-model="formdata.maintainer"  style="width:300px" placeholder="维护人员" />
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
        <div slot="right" class="common-split-pane" >
          <Steps :current="steps" direction="vertical">
          <Step title="维护类型" content="选择维护类型并记录过程，过程记录以序号标识展开并记录日期。"></Step>
          <Step title="结果反馈" content="记录处理结果，处理联系人，维护人员等信息"></Step>
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
      formdata:{
        device:[],
        mtype:'',
        result:'',
        myprocedure:'',
        contact:'',
        fdate:'',
        maintainer:'',
      },
      isdisable:false,
      split1: 0.75,
      steps:0,
      isfinish:false,
      jiliandata:
      [
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
    // this.formdata.tabpaperuse='NotUse'
    let cdate = new Date()
    this.formdata.cdate = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate()
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

      this.formdata.randomid = this.message.randomid
 
      this.formdata.currentstp = this.steps+1+"/2"
      if(this.formdata.randomid == 'new' ){
        this.formdata.randomid = this.message.id_random//(Math.ceil((Math.random()*10000)))
      }
      let data = Qs.stringify({"taskdata":this.formdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_maintain'},
        data,
      }).then(res =>{
        this.$Message.success('保存成功');
        console.log(res)
      }).catch(res =>{
        this.$Message.error('保存失败');
      })
    },
    ok(){
      
      let data = Qs.stringify({"taskdata":this.formdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_maintain'},
        data
      }).then(res =>{
        this.$Message.success('数据已保存并更新')
        this.isfinish = true
      }).catch(err =>{
        this.$Message.error('an error happen')
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){

    if(this.message.cdate != null){ //区分是继续还是新建的页面
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_maintain'
        }
      }).then(res =>{
        let data = {}
        data = res.data.message
        console.log(data.device)
        this.steps = parseInt(data.currentstp.substr(0,1)) -1
        if(data.device){data.device = data.device.split(',')}
        this.formdata = data
      })
    }else{
      this.formdata.randomid = 'new'
    }
  },
  // watch:{
  //   'formdata.mtype':{
  //     handler(newvalue,oldvalue){
  //       if(newvalue == 'IDC用户维护'){
  //         this.isdisable = true
  //       }else{
  //         this.isdisable = false
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // }
}

</script>

<style>
  @import '../../assets/css/common.css';

  
</style>

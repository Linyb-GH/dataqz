<template>
  <div>
    <div class="common-split">
      <Form  label-position="left" class="formcss" :label-width="100">
        <FormItem label="编号设备" >
          <Cascader @on-change="selected" v-model="senddata['device']" :load-data="loadData" :data="jiliandata" placeholder="服务器等应用设备"></Cascader>
        </FormItem>
        <FormItem label="编号时间">
          <Input type="date" v-model="senddata['tdate']" />
        </FormItem>
        <FormItem label="故障编号">
          <Input v-model="senddata['number']" />
        </FormItem>
      </Form>
      <br>
      <div class="buttons">
        <!-- <Button type="primary" @click="nextstep('back')">上一步</Button> -->
        <Button type="success" @click="saveAction" :disabled="isfinish" >保存</Button>
        
        <Poptip
          confirm
          title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
          @on-ok="ok"
          @on-cancel="cancel">
          <Button type="success"  :disabled="isfinish">完成</Button>
        </Poptip>
        <!-- <Button type="primary" @click="nextstep('next')">下一步</Button> -->
      </div>
       
    </div>
  </div>

</template>

<script>
import {request} from '../../network/request'
import Qs from 'qs';
import {IdcTools} from '../../assets/JStools/idc'
var action = new IdcTools()
export default {
  props:[
    "message"
  ],
  data(){
    return{
      senddata:[],
      isfinish:false,
      steps:0,
      jiliandata:[]
    }
  },
  created(){
    this.senddata['tdate'] = action.now
    this.senddata['cdate'] = action.now
    this.jiliandata = action.jiliandata
    
  },
  methods:{
    loadData (item, callback) {
      action.deviceslect(item,callback)
    },
    selected(value, selectedData){
      // console.log(selectedData[2].label)
      this.senddata['remark'] = selectedData[2].label
    },
    saveAction(){
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata.currentstp = '1/1'
 
      if(this.senddata.randomid == 'new' ){
        this.senddata.randomid = this.message.id_random
      }
      //console.log(this.senddata)
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_assetnum'},
        data,
      }).then(res =>{
        this.$Message.success('数据已保存');
        console.log(res)
      }).catch(err =>{
        this.$Message.error('发生错误'.res);
        console.log(err)
      })
    },
    ok(){
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata.currentstp = 'finish'
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_assetnum'},
        data
      }).then(res =>{
        this.$Message.success('固资变更成功')
        // console.log(res)
        this.isfinish = true
      }).catch(err =>{
        this.$Message.error('发生错误：'.err)
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){

    if(this.message.cdate != null){
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_assetnum'
        }
      }).then(res =>{
        console.log(res);
        let data = {}
        data = res.data.message
        if(data.currentstp != 'finish'){
          this.steps = 0 //parseInt(data.currentstp.substr(0,1)) -1
        }else{
          this.isfinish = true
        }
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
  .formcss{
    margin-top: 20px;
    margin-left: 10px;
    width: 500px;
   
  }

</style>

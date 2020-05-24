<template>
  <div>
    <div class="common-split">
  
      <div v-show="this.steps == 0">
        <Form :model="formdata" label-position="left" class="moveoutform" :label-width="100">
          <FormItem label="迁出设备">
            <Cascader v-model="senddata['device']" :load-data="loadData" :data="jiliandata" placeholder="服务器等应用设备"></Cascader>
            <!-- <Input v-model="formLeft.input1"/> -->
          </FormItem>
          <FormItem label="迁出原因">
            <Input v-model="senddata['reason']" />
          </FormItem>
          <FormItem label="存放方式" prop="gender">
            <RadioGroup v-model="senddata['set']">
                <Radio label="store">存放仓库</Radio>
                <Radio label="other">直接迁出</Radio>
            </RadioGroup>
        </FormItem>
        </Form>
      </div >
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
import {location, Publicfunc, IdcTools} from '../../assets/JStools/idc'
var action = new IdcTools()
export default {
  props:[
    "message"
  ],
  data(){
    return{
      senddata:[],
      isfinish:false,
      formdata:{
        room:['3-2','1-2']
      },
      steps:0,
      site:[],
      jiliandata:[]
    }
  },
  created(){
    this.senddata.cdate = action.now
    this.site = action.location
    this.jiliandata = action.jiliandata
    
    this.senddata.site = 1
  },
  methods:{
    // nextstep(name){
    //   if(name == 'back'){
    //     if(this.steps>0){
    //       this.steps--
    //     }      
    //   }
    //   if(name == 'next'){
    //     if(this.steps<1){
    //       this.steps++
    //     }
    //   }
    // },
    loadData (item, callback) {
      action.deviceslect(item,callback)
    },
    saveAction(){
      
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata.currentstp = '1/1'
      // this.senddata.cdate = this.message.cdate
      if(this.senddata.randomid == 'new' ){
        this.senddata.randomid = this.message.id_random
      }
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_moveout'},
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
      this.senddata.currentstp = 'finish'
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_moveout'},
        data
      }).then(res =>{
        this.$Message.success('设备迁移成功')
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
          type:'tasks_moveout'
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
  .moveoutform{
    margin-top: 20px;
    margin-left: 10px;
    width: 500px;
   
  }

</style>

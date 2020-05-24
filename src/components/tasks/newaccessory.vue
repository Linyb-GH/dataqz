<template>
  <div>  
    <div class="common-split">
      <div slot="left" class="common-split-pane">
        <div>
          <div class="flexsty topmargin" v-for="(item,index) in senddata" :key="item+index">
            <Select @on-change="typeselect(index)" v-model="senddata[index].type" style="width:100px">
              <Option value="model"  label="光模块"></Option>
              <Option value="fiber" label="光纤"></Option>
              <Option value="copper" label="网线"></Option>
              <Option value="hardware" label="硬件设备"></Option>
              <Option value="tabpaper" label="标签纸"></Option>
              <Option value="other" label="其它"></Option>
            </Select>
            <Select class="leftmargin10"  v-model="senddata[index].name" style="width:150px">
              <Option v-for="item in senddata[index].nameopt" :label="item" :value="item" :key="item"></Option>
              <!-- <Option value="f" label="蓝色光纤"></Option> -->
            </Select>
            <Select class="leftmargin10" v-model="senddata[index].method" style="width:100px">
              <Option value="取用"  label="取用"></Option>
              <Option value="入库" label="入库"></Option>
              <Option value="借出"  label="借出"></Option>
              <Option value="借入"  label="借入"></Option>
            </Select>
            <Input class="leftmargin10" style="width:50px" v-model = senddata[index].amount />
            <Input class="leftmargin10" v-model="senddata[index].remark" placeholder="备注" style="width: 300px" />
          </div>
        </div >
        <!-- <div v-show="this.steps == 1">
          page2
        </div> -->
        <br>
        <div class="buttons">
          <Button type="primary" @click="add">添加</Button>
          <Button type="success" @click="saveAction" :disabled="isfinish" >保存</Button>
          
          <Poptip
            confirm
            title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
            @on-ok="ok"
            @on-cancel="cancel">
            <Button type="success" :disabled="isfinish">完成</Button>
          </Poptip>
        </div>
      </div>
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
        randomid:'',
      },
      isdisable:false,
      senddata:[{type:'',nameopt:[],name:'',method:'',amount:1,uint:'',remark:''}],
      isfinish:false,
      
    }
  },
  created(){
    // this.formdata.tabpaperuse='NotUse'
    let cdate = new Date()
    let yy = cdate.getFullYear()
    let mm = (cdate.getMonth()<9? '0'+ (cdate.getMonth()+1):cdate.getMonth()+1)
    let dd = cdate.getDate()<10? '0'+(cdate.getDate()):cdate.getDate()
    this.formdata.cdate = yy + "-" + mm + "-" + dd
  },
  methods:{
    typeselect(index){
      request({
        url:'/accessories',
        params:{action:'getname',type:this.senddata[index].type},
      }).then(res =>{
        //senddata[index].nameopt
        this.senddata[index].nameopt = res.data.message
        console.log(res)
      })
    },
    add(){
      this.senddata.push({type:'',nameopt:[],name:'',method:'',amount:1,uint:'',remark:''})
    },
    saveAction(){
      this.formdata.senddata = this.senddata
      this.formdata.randomid = this.message.randomid
      this.formdata.tasktype = this.message.type
      // console.log(this.formdata)
 
      if(this.formdata.randomid == 'new' ){
        this.formdata.randomid = this.message.id_random//(Math.ceil((Math.random()*10000)))
      }
      let data = Qs.stringify({"taskdata":this.formdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_accessory'},
        data,
      }).then(res =>{
        this.$Message.success('保存成功!');
        console.log(res)
      }).catch(res =>{
        this.$Message.error('保存失败');
      })
    },
    ok(){
      this.formdata.senddata = this.senddata
      this.formdata.randomid = this.message.randomid
      this.formdata.tasktype = this.message.type
      this.formdata.currentstp = 'finish'
      let data = Qs.stringify({"taskdata":this.formdata});
      this.senddata.filter(item =>{
        if(item.name == ''){
          this.$Message.error('名称不得为空')
          data = 0;
        }
      })
      if(data != 0){
          request({
          method:'post',
          url:'/tasks',
          params:{action:'taskfinish',type:'tasks_accessory'},
          data
        }).then(res =>{
          this.$Message.success('数据已保存并更新')
          console.log(res)
          this.isfinish = true
          
        }).catch(err =>{
          this.$Message.error('an error happen')
        })
      }
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
  },
  mounted(){
    // console.log(this.message)
    if(this.message.cdate != null){ //区分是继续还是新建的页面
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_accessory'
        }
      }).then(res =>{
        let data = {}
        data = res.data.message
        console.log(data)
        this.senddata = data.senddata
        this.formdata.randomid = data.randomid
        this.formdata.cdate = data.cdate
        if(data.currentstp == 'finish'){this.isfinish = true}
        
        // this.steps = parseInt(data.currentstp.substr(0,1)) -1
        // if(data.device){data.device = data.device.split(',')}
        // this.formdata = data
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

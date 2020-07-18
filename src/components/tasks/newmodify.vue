<template>
  <div>
    <div class="common-split">
      <Split v-model="split1" min="40px" v-show="this.steps < 2">
        <div slot="left" class="common-split-pane">
          <div v-show="this.steps == 0"><br>
            <div >
              <Cascader  @on-change="selected" 
               :load-data="loadData" :data="jiliandata" style="width:300px" placeholder="修改之前信息"></Cascader>
            </div>

            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'带外管理IP：'+initdata['bmcip']" /><br>
            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'账号：'+initdata['bmclogin']" /> <br>
            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'序列号：'+initdata['serial']" /> <br>
            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'型号：'+initdata['devicemodel']" /> <br>
            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'备注：'+initdata['remark']" /> <br>
          </div >
          <div v-show="this.steps == 1">
            <Input  style="width:300px;margin-top:20px" disabled  :placeholder="'所属区域：'+initdata['systemarea']" /> <br>
          </div>
          <br>
        </div>
        <div slot="right" class="common-split-pane" >
          <div v-show="this.steps == 0"><br>
            <div >
              <Input  style="width:300px" v-model="senddata['device']"  />
            </div> 
            <Input  style="width:300px;margin-top:20px" v-model="senddata['bmcip']"  />
            <Input  style="width:300px;margin-top:20px" v-model="senddata['bmclogin']"  />
            <Input  style="width:300px;margin-top:20px" v-model="senddata['serial']"  />
            <Input  style="width:300px;margin-top:20px" v-model="senddata['devicemodel']"  />
            <Input  style="width:300px;margin-top:20px" v-model="senddata['remark']"  />
          </div>
          <div v-show="this.steps == 1">
            <Input  style="width:300px;margin-top:20px" v-model="senddata['systemarea']"  />
          </div>
        </div>
      </Split>
      <div v-show="this.steps == 2">
        <!-- <div v-for="(index,item) in wiring" :key="item+index">
          {{index}}
        </div> -->
        <Table height="400" :columns="wiringcolumns" :data="wiring">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="error" :loading="loading" size="small" @click="remove(index)">
              <span v-if="!loading">Delete</span>
              <span v-else>Loading...</span>
            </Button>
          </template>
        </Table>
      </div>
    </div>
    <div class="buttomcss">
      <Button type="primary" @click="nextstep('back')">上一步</Button>
      <Button type="success" @click="saveAction" :disabled="isfinish" >保存</Button>
      <Poptip
        confirm
        title="点击完成后数据将更新到相关列表里，确定完成并提交数据?"
        @on-ok="ok"
        @on-cancel="cancel">
        <Button type="success" v-show="steps == 2" :disabled="isfinish">完成</Button>
      </Poptip>
      <Button type="primary" @click="nextstep('next')">下一步</Button>
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
      initdata:[],
      isfinish:false,
      
      split1: 0.5,
      steps:0,
      loading: false,
      
      jiliandata:[],
      wiringcolumns:[
        {
          title: '端口',
          key: 'port'
        },
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '对连设备',
          key: 'name'
        },
        {
          title: '对连端口',
          key: 'port2'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      wiring:[],
    }
  },
  created(){
    this.jiliandata = action.jiliandata
    this.senddata['cdate'] = action.now
  },
  methods:{
    nextstep(name){
      if(name == 'back'){
        if(this.steps>0){
          this.steps--
        }      
      }
      if(name == 'next'){
        if(this.steps<2){
          this.steps++
        }
      }
    },
    selected(value, selectedData){
      request({
        url:'servers',
        params:{
          action:'showinfo',
          server:selectedData[2].value
        }
      }).then(res =>{
        this.initdata = res.data.message.info[0]
        this.senddata.bmcip = res.data.message.info[0]['bmcip']
        this.senddata.bmclogin = res.data.message.info[0]['bmclogin']
        this.senddata.serial = res.data.message.info[0]['serial']
        this.senddata.devicemodel = res.data.message.info[0]['devicemodel']
        this.senddata.remark = res.data.message.info[0]['remark']
        this.senddata.systemarea = res.data.message.info[0]['systemarea']
        this.senddata['device'] = selectedData[2].label
        this.wiring = res.data.message.wiring
        console.log(res.data.message.wiring)
      }).catch(err =>{
        this.$Message.error('后台读取数据失败'.err);
      })
    },
    loadData (item, callback) {
      action.deviceslect(item,callback)
    },
    saveAction(){
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata.currentstp = this.steps+1+"/2"
      if(this.senddata.randomid == 'new' ){
        this.senddata.randomid = this.message.id_random//(Math.ceil((Math.random()*10000)))
      }
      this.senddata['bck'] = this.initdata //保存修改前的信息
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_modify'},
        data,
      }).then(res =>{
        this.$Message.success('保存成功');
        // console.log(res)
      }).catch(res =>{
        this.$Message.error('保存失败');
      })
    },
    ok(){
      this.senddata.randomid = this.message.randomid
      this.senddata.tasktype = this.message.type
      this.senddata['bck'] = this.initdata //保存修改前的信息
      let data = Qs.stringify({"taskdata":this.senddata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_modify'},
        data
      }).then(res =>{
        console.log(res)
        this.$Message.success('数据已保存并更新')
        this.isfinish = true
      }).catch(err =>{
        this.$Message.error('an error happen')
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
    remove(index){
      // console.log(this.wiring[index]['cardid'])
      // console.log(index)
      this.loading = true;
      request({
        url:'servers',
        params:{
          action:'deleteport',
          cardid:this.wiring[index]['cardid']
        }
      }).then(res =>{
        this.$Message.success('已删除');
        this.loading = false
        this.wiring.splice(index,1)
      }).catch(err =>{
        this.$Message.error('发生错误，联系林毓斌处理'+err);
      })
      
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
          type:'tasks_modify'
        }
      }).then(res =>{
        let data = {}
        data = res.data.message
        if(data.currentstp == 'finish'){this.isfinish = true}
        // console.log(data)
        this.senddata = data
        this.initdata = data.bck
      })
    }else{
      this.senddata.randomid = 'new'
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
  .buttomcss{
    margin-top: 10px;
    margin-left: 10px;
  }

  
</style>

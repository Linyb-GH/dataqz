<template>
  <div>
    
    <div class="wiring-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="wiring-split-pane">
          <div v-show="this.steps == 0"><br>
            <div style="display:flex;">
              <Cascader v-model="formdata.ldevice" :load-data="loadData" :data="jiliandata" class="left" placeholder="服务器等应用设备"></Cascader>
              ---
              <Cascader v-model="formdata.rdevice" :load-data="loadData" :data="jiliandata" class="right" placeholder="交换机等网络设备"></Cascader>
            </div>
              <br>
              
            <Form ref="formValidate"  :label-width="80">
              <div style="display:flex;">
              <FormItem label="设备左：" prop="namel" style="margin-right:30px">
                <Input v-model="formdata.lport" placeholder="端口编号" class="leftsmall" />
              </FormItem>
            
              <FormItem label="设备右：" prop="namer" >
                <Input v-model="formdata.rport" placeholder="端口编号" class="rightsmall" />
              </FormItem>
              </div>
              <FormItem label="Type" prop="type">
                <RadioGroup v-model="formdata.wiringtype">
                  <Radio label="fiber">光纤</Radio>
                  <Radio label="copper">铜线</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem v-show="formdata.wiringtype == 'fiber'" label="模块取用" prop="type">
                <RadioGroup v-model="formdata.modulefetch">
                  <Radio label="store">仓库</Radio>
                  <Radio label="other">其它</Radio>
                </RadioGroup>
                <Select v-model="formdata.module" :disabled="formdata.modulefetch =='other'" style="width:100px">
                  <Option v-for="(item,index) in selectdata.fibermodel" :value="item" :key="item+index">{{item}}</Option>
                </Select>
              </FormItem>
              <div style="display:flex">
                <FormItem label="铜线取用" v-if="this.formdata.wiringtype=='copper'">
                  <RadioGroup v-model="formdata.wiringfetch">
                    <Radio label="store">仓库</Radio>
                    <Radio label="other">其它</Radio>
                  </RadioGroup>
                  <Select v-model="formdata.wirelength" :disabled="formdata.wiringfetch=='other'" style="width:100px">
                    <Option v-for="(item,index) in selectdata.copperwiring" :value="item" :key="item+index">{{item}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="光纤取用" v-if="this.formdata.wiringtype=='fiber'">
                  <RadioGroup v-model="formdata.wiringfetch">
                    <Radio label="store">仓库</Radio>
                    <Radio label="other">其它</Radio>
                  </RadioGroup>
                  <Select v-model="formdata.wirelength" :disabled="formdata.wiringfetch=='other'" style="width:100px">
                    <Option v-for="(item,index) in selectdata.fiberwiring" :value="item" :key="item+index">{{item}}</Option>
                  </Select>
                </FormItem>
              </div>
            </Form>
            <!-- </div> -->
          </div >
          <div v-show="this.steps == 1">
            <br>
            <div>
              <Form ref="formValidate" :label-width="80">
                <RadioGroup v-model="formdata.tabpaperuse">
                  <Radio label="NotUse">无取用新标签纸</Radio>
                  <Radio label="Use">取用新标签纸</Radio>
                </RadioGroup> 
                <Select v-model="formdata.tabpaper" 
                  :disabled="formdata.tabpaperuse=='NotUse'" style="width:100px">
                  <Option v-for="(item,index) in selectdata.tabpaper" :value="item" :key="item+index">{{item}}</Option>
                </Select>
                <br><br>
                IP地址: <Input v-model="formdata.ip" style="width:200px" placeholder="IP address" />
                <br><br><br>
                <FormItem label="其它备注" >
                  <Input v-model="formdata.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注" />
                </FormItem>
              </Form>
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
        <div slot="right" class="wiring-split-pane" >
          <Steps :current="steps" direction="vertical">
          <Step title="对联信息" content="确定对联设备，接口描述为：设备号/板卡号/端口号。配件如果不是从仓库取件请选择其它"></Step>
          <Step title="打印标签" content="在网线两端贴上一致的标签，如：A01核心交换机_22--B01服务器_01;
          布线时一定要走理线架，不能直接穿过机柜；线要铺开不能答卷在一处"></Step>

          </Steps>
        </div>
      </Split>
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
        ldevice:[],
        rdevice:[],
        tabpaperuse:'NotUse',
        cdate:'',
        lport:'',
        rport:'',
        wiringtype:'copper',
        modulefetch:'other',
        module:'',
        wiringfetch: "store",
        wirelength: "",
        tabpaper: "",
        currentstp: "1/2",
        ip:'',
        remark: "",
      },
      split1: 0.75,
      steps:0,
      isfinish:false,
      selectdata:{
        tabpaper:[],
        copperwiring:[],
        fiberwiring:[],
        fibermodel:[]
      },
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
    // let cdate = new Date()
    // this.formdata.cdate = cdate.getFullYear() + "-" + (cdate.getMonth() + 1) + "-" + cdate.getDate()
    let cdate = new Date()
    let yy = cdate.getFullYear()
    let mm = (cdate.getMonth()<9? '0'+ (cdate.getMonth()+1):cdate.getMonth()+1)
    let dd = cdate.getDate()<10? '0'+(cdate.getDate()):cdate.getDate()
    this.formdata.cdate = yy + "-" + mm + "-" + dd
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
      // axios({
      // method:'get',
      // url:'http://localhost/ecserver/index.php/servers',
      // params:{
      //   action:'getjilianinfo',
      //   column:item.value
      // },
      // // data,
      //   timeout:5000
      // }).then(res=>{
      //   let jilian = res.data;
      //   item.children = jilian.message.children
      //   console.log(item.label)
      //   item.loading = false;
      //   callback();
      // }) 
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
      this.formdata.tasktype = this.message.type
      this.formdata.currentstp = this.steps+1+"/2"
      if(this.formdata.randomid == 'new' ){
        this.formdata.randomid = this.message.id_random//(Math.ceil((Math.random()*10000)))
      }
      let data = Qs.stringify({"taskdata":this.formdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_wiring'},
        data,
      }).then(res =>{
        this.$Message.success('布线信息已保存');
        console.log(res)
      }).catch(err =>{
        this.$Message.error('发生错误');
      })
    },
    ok(){
      this.formdata.randomid = this.message.randomid
      this.formdata.tasktype = this.message.type
      let data = Qs.stringify({"taskdata":this.formdata});
      // axios({
      //   method:'post',
      //   url:'http://localhost/ecserver/index.php/tasks',
      //   params:{action:'taskfinish',type:'tasks_wiring'},
      //   data,
      //   timeout:1000
      // }).then(res=>{
      //   console.log(res);
      // })
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_wiring'},
        data
      }).then(res =>{
        this.$Message.success('布线数据已保存')
        console.log(res)
        this.isfinish = true
      }).catch(err =>{
        this.$Message.error('发生错误'.err)
      })
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
    debugfunc(){
      this.testdata[1].children[0].children.splice(1,0,{value:'ahha',label:'new'})
      console.log('run here')
    }
  },
  mounted(){
    request({
      url:'/tasks',
      params:{
        action:'pageinit',
        type:'tasks_wiring'
      }
    }).then(res =>{
      this.selectdata = res.data.message
    })

    if(this.message.cdate != null){
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_wiring'
        }
      }).then(res =>{
        console.log(res)
        let data = {}
        data = res.data.message
        if(data.currentstp == 'finish'){this.isfinish = true}
        this.formdata = data
      })
    }else{
      this.formdata.randomid = 'new'
    }
  },
  // watch:{
  //   'formdata.wiringtype':{
      // handler(newvalue,oldvalue){
      //   if(newvalue == 'fiber'){
      //     this.selectdata.wiring = this.selectdata.fiberwiring
      //   }
      //   if(newvalue == 'copper'){
      //     this.selectdata.wiring = this.selectdata.copperwiring
      //   }
      //   console.log(this.selectdata)
      // },
      // deep: true,
      // immediate: true
  //   }
  // }

}

</script>

<style>
  .wiring-split{
    height: 450px;
    border: 1px solid #dcdee2;
    position: relative;
  }
  .wiring-split-pane{
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

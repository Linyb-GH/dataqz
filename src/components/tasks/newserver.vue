<template>
  <div>
    
    <div class="demo-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="demo-split-pane">
          <div v-show="this.steps == 0">
            <br>上架机房：
            <Select v-model="stpdata['room']" style="width:100px" class="rightspace">
              <Option v-for="item in jifang" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> <br>
            <br>
           
            上架位置：
            <div class="flexsyt">
            <Cascader :data="site" v-model="stpdata['jigui']" class="siteclass rightspace"></Cascader>
            所在机柜位置（1-42）：
            <InputNumber :max="42" :min="1" v-model="stpdata['site']"></InputNumber>
            </div>
            <br>
            设备大小（U）：<InputNumber :max="20" :min="1" v-model="stpdata['size']" ></InputNumber><br><br>
            设备功耗（W）：<InputNumber :max="3000" :min="1" v-model="stpdata['power']"></InputNumber> 
          </div>
          <div v-show="this.steps == 1">
            <Form  label-position="left" :label-width="100">
              <div class="flexsyt">
                <FormItem label="设备名称" class="widthInput">
                  <Input v-model="stpdata['name']"/> 
                </FormItem>
                <FormItem label="设备类型" class="widthInput">
                  <Select v-model="stpdata['type']">
                    <Option value="服务器">服务器</Option>
                    <Option value="防火墙">防火墙</Option>
                    <Option value="交换机">交换机</Option>
                    <Option value="路由器">路由器</Option>
                    <Option value="负载均衡">负载均衡</Option>
                    <Option value="存储阵列">存储阵列</Option>
                    <Option value="安全设备">安全设备</Option>
                    <Option value="其它">其它</Option>
                  </Select>
                </FormItem>
              </div>
              <div class="flexsyt">
                <FormItem label="设备型号" class="widthInput">
                  <Input v-model="stpdata['devicemodel']"/>
                </FormItem>
                <FormItem label="产品序列号" class="widthInput">
                  <Input v-model="stpdata['serial']"/>
                </FormItem>
              </div>
              <div class="flexsyt">
                <FormItem label="所属平台" class="widthInput">
                  <Input v-model="stpdata['system']"/>
                </FormItem>
                <FormItem label="平台分区" class="widthInput">
                  <Input v-model="stpdata['systemarea']"/>
                </FormItem>
              </div>
              <div class="flexsyt">
                <FormItem label="BMC IP" class="widthInput">
                  <Input v-model="stpdata['bmcip']"/> 
                </FormItem>
                <FormItem label="BMC 账号密码" class="widthInput">
                  <Input v-model="stpdata['bmclogin']"/>
                </FormItem>
              </div>
              
              <FormItem label="固资编号" class="widthInput">
                <Input v-model="stpdata['gnumber']"/>
              </FormItem>
            </Form>
          </div>
          <div v-show="this.steps == 2">
            <br><br>
            <Form  label-position="left" :label-width="100">
              <FormItem label="上架日期" class="widthInput">
                <Input v-model="stpdata['date']" type="date" placeholder="yyyy-mm-dd"/> 
              </FormItem>
              <FormItem label="设备归属">
                <RadioGroup v-model="stpdata['belong']">
                  <Radio label="临时测试">临时测试</Radio>
                  <Radio label="用户长期使用">用户长期使用</Radio>
                  <Radio label="公司长期使用">公司长期使用</Radio>
                  <Radio label="其它情况">其它情况</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="设备上架来源">
                <RadioGroup v-model="stpdata['isfetch']">
                  <Radio label="仓库取用">仓库取用</Radio>
                  <Radio label="直接上架">直接上架</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </div>
          <div v-show="this.steps == 3">
            <br><br>
            
            <br>
            <Form  label-position="left" :label-width="100">
              <FormItem label="是否巡检">
                <RadioGroup v-model="stpdata['inspect']">
                  <Radio label="加入巡检">加入巡检</Radio>
                  <Radio label="其他">其他</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="是否需要验收">
                <RadioGroup v-model="stpdata['state']">
                  <Radio label="未验收">未验收</Radio>
                  <Radio label="已验收">已验收</Radio>
                  <Radio label="不需要验收">不需要验收</Radio>
                  <Radio label="其它情况">其它情况</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="其它备注信息">
                <Input v-model="stpdata['remark']" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="配件存放描述等..." />
              </FormItem>

            </Form>
            
            <a :href="bmctest" target="_blank">BMC测试</a>
            
          </div>
          <div class="buttons">
            <Button type="primary" @click="nextstep('back')" >上一步</Button>
            <Button type="success" @click="saveAction" v-if=" !this.isfinish">保存</Button>
            
            <Poptip
              confirm
              title="完成后无法再修改?"
              @on-ok="ok"
              @on-cancel="cancel">
              <Button type="success" v-if="this.steps==3 && !this.isfinish">完成</Button>
            </Poptip>
            <Button type="primary" @click="nextstep('next')" >下一步</Button>
          </div>
        </div>
        <div slot="right" class="demo-split-pane" >
          <Steps :current="steps" direction="vertical">
          <Step title="上架申请" content="设备上架时需提前向电信申请，设备的实际功耗一般2U设备为350W"></Step>
          <Step title="完善信息" content="完善设备的序列号、设备型号、设备类型等必要信息。固资编号可后面补。"></Step>
          <Step title="设备上电" content="上电发现有异常指示灯、设备异响等情况要立即联系厂商和反馈情况"></Step>
          <Step title="完成" content="完成MGT口的布线后登陆检查下设备运行情况"></Step>
          </Steps>
        </div>
      </Split>
    </div>
  </div>

</template>

<script>
import {request} from '../../network/request'
  // import axios from 'axios';
  import Qs from 'qs';

export default {

  props:[
    "message"
  ],
  data(){
    return{
      split1: 0.75,
      steps:0,
      stpdata:[],
      isfinish:false,
      bmctest:'http://',
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
      jifang:[
        {value: '3-2',label: '3-2'},
        {value: '1-2',label: '1-2'}
      ],
    }
  },
  methods:{
    
    nextstep(name){
      if(name == 'back'){
        if(this.steps>0){
          this.steps--
        }      
      }
      if(name == 'next'){
        if(this.steps<3){
          this.steps++
        }
        if(this.steps == 2){
            this.bmctest+=this.stpdata['bmcip']
          }
      }
    },
    saveAction(){
      
      this.stpdata['currentstp'] = this.steps+1+"/4"
      if(this.stpdata['randomid']== 'new' ){
        this.stpdata['randomid'] = this.message.randomid
      }
      let data = Qs.stringify({"taskdata":this.stpdata});
      // console.log(this.stpdata)
      request({
        method:'post',
        url:'/tasks',
        params:{action:'creattask',type:'tasks_server'},
        data
      }).then(res =>{
        this.$Message.success('保存成功');
        console.log(res)
      })  
    },
    ok(){

      this.isfinish = true
      let data = Qs.stringify({"taskdata":this.stpdata});
      request({
        method:'post',
        url:'/tasks',
        params:{action:'taskfinish',type:'tasks_server'},
        data
      }).then(res =>{
        this.$Message.info('servers data is update !')
        console.log(res)
      })
      // axios({
      //   method:'post',
      //   url:'http://localhost/ecserver/index.php/tasks',
      //   params:{action:'taskfinish',type:'tasks_server'},
      //   data,
      //   timeout:1000
      // }).then(res=>{
      //   console.log(res);
      // })

    },
    cancel(){
      this.$Message.info('You click cancel')
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
    this.stpdata['system'] = '政务外网'
    let cdata = new Date()
    this.stpdata['cdate'] = cdata.getFullYear() + "-" + (cdata.getMonth() + 1) + "-" + cdata.getDate()

    
  },
  mounted(){
    // let isempty = Object.keys(this.message.id_random) .length != 0
    // let isempty = this.message.id_random == null
    // console.log(this.message.id_random == null)
    if(this.message.cdate != null){
      request({
        url:'/tasks',
        params:{
          action:'continue',
          cdate:this.message.cdate,
          randomid:this.message.randomid,
          type:'tasks_server'
        }
      }).then(res =>{ 
        let data = []
        for(let i in res.data.message){//将对象转换成数组
          if(i == 'jigui'){data[i] = [res.data.message[i].substr(0,1),res.data.message[i].substr(2)];continue;}
          if(i == 'currentstp'){data[i] = res.data.message[i].substr(0,1);continue}
          data[i] = res.data.message[i]                  
        }
        this.steps = parseInt(data['currentstp']) -1
        this.stpdata = data
      })
      // axios({
      // method:'get',
      // url:'http://localhost/ecserver/index.php/tasks',
      // params:{
      //   action:'continue',
      //   cdate:this.message.cdate,
      //   randomid:this.message.randomid,
      //   type:'tasks_server'
      // },
      // // data,
      //   timeout:1000
      // }).then(res=>{
      //   let data = []
      //   for(let i in res.data.message){//将对象转换成数组
      //     if(i == 'jigui'){data[i] = [res.data.message[i].substr(0,1),res.data.message[i].substr(2)];continue;}
      //     if(i == 'bmcip'){data['BMCip'] = res.data.message[i];continue}
      //     if(i == 'bmclogin') {data['BMClogin'] = res.data.message[i]; continue}
      //     if(i == 'currentstp'){data[i] = res.data.message[i].substr(0,1);continue}
      //     data[i] = res.data.message[i]                  
      //   }
      //   this.steps = parseInt(data['currentstp']) -1
      //   this.stpdata = data
      // })
    }else{
      this.stpdata['randomid'] = 'new'
    }

  }
}

</script>

<style>
  .demo-split{
    height: 400px;
    border: 1px solid #dcdee2;
    position: relative;;
  }
  .demo-split-pane{
    padding: 10px;
  }

  .buttons{
    position: absolute;
    padding: 10px;
    bottom: 5px;
    color:black
  }
  .siteclass{
    width:200px;
  }
  .rightspace{
    margin-right: 20px;
  }
  .flexsyt{
    display: flex;
  }
  .widthInput{
    width:300px;
    margin-right: 50px;
  }
</style>

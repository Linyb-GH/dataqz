<template>
  <div>
    
    <div class="demo-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="demo-split-pane">
          <div v-show="this.steps == 0">
            <div style="display:flex;">
              <Cascader v-model="leftserver" :data="testdata" trigger="hover" class="left" placeholder="左边设备"></Cascader>
              ---
              <Cascader v-model="rightserver" :data="testdata" trigger="hover" class="right" placeholder="右边设备"></Cascader>
            </div>
              <br>
              
            <!-- <div style="display:flex;"> -->
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <div style="display:flex;">
                <FormItem label="设备左：" prop="namel" style="margin-right:30px">
                  <Input v-model="formValidate.namel" placeholder="端口编号" class="leftsmall" />
                </FormItem>
              
                <FormItem label="设备右：" prop="namer" >
                  <Input v-model="formValidate.namer" placeholder="端口编号" class="rightsmall" />
                </FormItem>
                </div>
                <FormItem label="Type" prop="type">
                  <RadioGroup v-model="formValidate.type">
                    <Radio label="fiber">光纤</Radio>
                    <Radio label="copper">铜线</Radio>
                  </RadioGroup>
                </FormItem>
                <div style="display:flex">
                  <FormItem label="取用场所" value="store">
                    <RadioGroup v-model="fetchdate">
                      <Radio label="store">仓库</Radio>
                      <Radio label="other">其它</Radio>
                    </RadioGroup>
                    <Select v-model="wirelength" :disabled="fetchdate=='other'" style="width:100px">
                      <Option value="5">5米</Option>
                      <Option value="10" disabled>10米</Option>
                      <Option value="15">15米</Option>
                    </Select>
                  </FormItem>
                </div>

                <FormItem label="其它备注" >
                  <Input v-model="remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="添加备注" />
                </FormItem>

              </Form>
            <!-- </div> -->
          </div >
          <div v-show="this.steps == 1">
            打印信息：<br>
            {{leftserver[0]}}---{{rightserver}}
            <div>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <RadioGroup v-model="usepaper">
                  <Radio label="NotUse">无取用新标签纸</Radio>
                  <Radio label="Use">取用新标签纸</Radio>
                </RadioGroup> 
                <Select v-model="labelpaper" :disabled="usepaper=='NotUse'" style="width:100px">
                  <Option value="5">5米</Option>
                  <Option value="10" disabled>10米</Option>
                  <Option value="15">15米</Option>
                </Select>
              </Form>
            </div>
          </div>
          <br>
          <div class="buttons">
            <Button type="primary" @click="nextstep('back')">上一步</Button>
            <Button type="success" @click="saveAction">保存</Button>
            
            <Poptip
              confirm
              title="确定要删除?"
              @on-ok="ok"
              @on-cancel="cancel">
              <Button type="warning">删除</Button>
            </Poptip>
            <Button type="primary" @click="nextstep('next')">下一步</Button>
          </div>
        </div>
        <div slot="right" class="demo-split-pane" >
          <Steps :current="steps" direction="vertical">
          <Step title="对联信息" content="确定对联设备，接口描述为：设备号/板卡号/端口号"></Step>
          <Step title="打印标签" content="在网线两端贴上一致的标签，如：A01核心交换机_22--B01服务器_01"></Step>
          <Step title="布线" content="布线时一定要走理线架，不能直接穿过机柜；线要铺开不能答卷在一处"></Step>
          <Step title="完成" content="测试连通性"></Step>
          </Steps>
        </div>
      </Split>
    </div>
  </div>

</template>

<script>

export default {
  props:[
    "message"
  ],
  data(){
    return{
      split1: 0.75,
      steps:0,
      fetchdate:'store',
      usepaper:'NotUse',
      labelpaper:0,
      wirelength:0,
      leftserver:[],
      rightserver:[],
      remark:'',
      formValidate:{
        namel:'',
        namer:'',
        type:'',
      },
      ruleValidate: {
        namel: [
            { required: true, message: 'cannot be empty', trigger: 'blur' }
        ],
        namer: [
            { required: true, message: 'cannot be empty', trigger: 'blur' }
        ],
        type: [
            { required: true, message: 'cannot be empty', trigger: 'change' }
        ],
      },
      testdata:[
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, 
        {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
              {
                value: 'fuzimiao',
                label: '夫子庙',
              }]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }]
        }
      ]
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
      }
    },
    saveAction(){
      this.$Message.success('This is a success tip:'+this.rightserver);
    },
    ok(){
      this.$Message.info('You click ok')
    },
    cancel(){
      this.$Message.info('You click cancel')
    },
    debugfunc(){
      this.testdata[1].children[0].children.splice(1,0,{value:'ahha',label:'new'})
      console.log('run here')
    }
  },
  // watch:{
  //   fetchdate(newName,oldName){
  //     console.log(newName)
  //   }
  // }
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

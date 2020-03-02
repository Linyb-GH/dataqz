<template>
  <div>
    
    <div class="demo-split">
      <Split v-model="split1" min="40px">
        <div slot="left" class="demo-split-pane">
          <div v-show="this.steps == 0">
            page1
          </div>
          <div v-show="this.steps == 1">
            page2
          </div>
          <div class="buttons">
            <Button type="primary" @click="backstep('back')">上一步</Button>
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
          <Step title="上架申请" content="设备上架时需提前向电信申请，设备的实际功耗一般2U设备为350W"></Step>
          <Step title="完善信息" content="完善设备的序列号、设备型号、设备类型等必要信息"></Step>
          <Step title="设备上电" content="上电发现有异常指示灯、设备异响等情况要立即联系厂商和反馈情况"></Step>
          <Step title="完成" content="完成MGT口的布线后登陆检查下设备运行情况"></Step>
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
      steps:0
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
      this.$Message.success('This is a success tip');
    },
    ok(){
      this.$Message.info('You click ok')
    },
    cancel(){
      this.$Message.info('You click cancel')
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
</style>

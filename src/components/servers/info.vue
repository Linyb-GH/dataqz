<template>

  <div>
    <Collapse v-model="value1">
      <Panel name='1'>
        设备信息
        <div slot="content"> 
          设备编号：[{{message.info[0].number}}]----------上架时间：[{{message.info[0].date}}]<br>
          设备名称：[{{message.info[0].name}}]----------设备型号：[{{message.info[0].devicemodel}}]<br>
          设备类型：[{{message.info[0].types}}]----------设备大小：[{{message.info[0].size}} U]<br>
          所属系统：[{{message.info[0].system}}]----------所属分区：[{{message.info[0].systemarea}}]<br>
          机房位置：[{{message.info[0].location1}}]----------机柜位置：[{{message.info[0].location2}}]<br>
          厂商：[{{message.info[0].manufacturer}}]----------序列号：[{{message.info[0].serial}}]<br>
          BMC登录：<a :href="BMClogin" target="_black">[{{message.info[0].bmcip}}]</a>---------
          BMC账号：[{{message.info[0].bmclogin}}]<br>
          固资编号：[{{message.info[0].gnumber}}]------------功耗：[{{message.info[0].power}}]<br>
          备注：{{message.info[0].remark}}
        </div>
      </Panel>
      <Panel name="2">
        设备端口信息
        <div slot="content">
          <p v-for="(tab,index) in message.wiring" :key=tab+index >
          {{tab.port}}----{{tab.ip}}----------<a @click="services">{{tab.name}}</a>--{{tab.port2}}---{{tab.type}}--{{tab.remark}}</p>
        </div>
      </Panel>
      <Panel name="3">
        设备维修记录
        <div slot="content">
          <p v-for="(tab,index) in message.maintain" :key=tab+index >
            时间：{{tab.fdate}}--------------------------------------<br>
            类型：{{tab.mtype}}----联系人：{{tab.contact}}<br>
            过程描述：<br>
            {{tab.myprocedure}}<br><br><br>
          </p>
        </div>
      </Panel>
    </Collapse>

  </div>

</template>

<script>

export default {
  props:[
    "message"
  ],
  data () {
    return {
      BMClogin:'https://',
      tabs:["abc","def"],
      value1: '1'
    }
  },
  mounted(){
    this.BMClogin = this.BMClogin + this.message.info[0].bmcip
    // console.log(this.BMClogin)
    console.log(this.message)
  },
  methods: {
    services(){
      console.log(this.message)
    }
    
  }
}
</script>

<style scoped>
  .right{
    text-align: right;
    margin:0px 10px;
  }
</style>
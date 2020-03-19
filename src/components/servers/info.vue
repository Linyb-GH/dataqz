<template>

  <div>
    <Collapse v-model="value1">
      <Panel name='1'>
        设备信息
        <div slot="content"> 
          设备编号：{{message[0].number}}----------设备名称：{{message[0].name}}<span class="right">haha</span><br>
          设备类型：{{message[0].types}}----------设备大小：{{message[0].size}} U<br>
          所属系统：{{message[0].system}}----------所属分区：{{message[0].systemarea}}<br>
          机房位置：{{message[0].location1}}----------机柜位置：{{message[0].location2}}<br>
          序列号：{{message[0].serial}}----------上架时间：{{message[0].date}}<br>
          BMC登录：<a :href="BMClogin" target="_black">{{message[0].bmcip}}</a>---------
          BMC账号：{{message[0].bmclogin}}<br>
          固资编号：{{message[0].gnumber}}------------功耗：{{message[0].power}}
        </div>
      </Panel>
      <Panel name="2">
        设备端口信息
        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），
          美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name="3">
        设备维修记录
        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，
          英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，
          他是对苹果那些著名的产品最有影响力的人。</p>
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
    this.BMClogin = this.BMClogin + this.message[0].bmcip
    console.log(this.BMClogin)
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .right{
    text-align: right;
    margin:0px 10px;
  }
</style>
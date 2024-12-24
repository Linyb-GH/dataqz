<template>
  <div class="bodysty">
    <div style="margin: 5px 5px;">
      <Space wrap>
        统计日期范围：在
        <DatePicker v-model="dateslect.date_start" type="date" placeholder="Select date" style="width: 200px" />
        之后--
        在
        <DatePicker v-model="dateslect.date_end" type="date" placeholder="Select date" style="width: 200px" />
        之前
      </Space>
      <Button type="primary" style="margin-left: 10px;" @click="count">统计</Button>
    </div>
    
    <div style="margin: 20px 10px;">
      {{ statistics }}
    </div>
    <hr>
    <Table style="margin: 10px 10px;" stripe :columns="init.columns" :data="ReqData.tablelist"></Table>
    <div id="Rprjtstatistic" style=" text-align:center;width: 600px; height: 400px;"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Projects from '@/router/interface/Projects'
import * as echarts from 'echarts';
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      statistics:'',
      dateslect:{date_start:'',date_end:''},
      init:{columns:[
        {title: '项目经理',key: 'name'},
        {title: '项目评审',key: 'review'},
        {title: '实施中项目',key: 'doing'},
        {title: '维保期项目',key: 'maintenance'},
        {title: '已完成项目',key: 'finished'},
        {title: '项目总数',key: 'count'},
        {title: '逾期项目',key: 'myoverdue'},
        {title: '逾期率',key: 'overdueratio'},
      ]},
      ReqData:{
        countprj:0,
        overdue:0,
        tablelist:[
          {name:'',count:0,myoverdue:0,review:'',doing:'',maintenance:'',finished:0,overdueratio:0}]
      },
      chardata:{
        xdata:['项目评审', '项目施工', '维保期', '项目完结','所有项目'],
        ydata:[0, 0, 0, 0],
      }
    }
  },
  mounted(){
    this.GetRPrjstatistic()
    this.statistics = '在统计时间段内，'+'共承接XX个项目，其中按时完成了XX个，及时完成率XX%；项目完结XX个，交付阶段XX个，运维阶段XX个。'+this.ReqData.countprj
  },
  methods:{
    async GetRPrjstatistic(){
      let x = new Projects()
      let y = await x.GetRPrjstatistic(this.dateslect)
      if(y.data){
 
        this.ReqData.tablelist = y.data.list
        this.ReqData.countprj = y.data.count
        this.ReqData.overdue = y.data.overdue
        let yq = Math.round(this.ReqData.overdue*1000/this.ReqData.countprj)/10
        this.statistics = '在统计时间段内，'+'共承接'+this.ReqData.countprj+'个项目，其中有'+this.ReqData.overdue+
        '个项目逾期，逾期率为'+yq+'%.'
        let count = y.data.list[y.data.list.length-1]
        this.chardata.ydata = [count['review'], count['doing'], count['maintenance'], count['finished'], count['count']],
        this.charinit()
      }

    },
    count(){
      this.GetRPrjstatistic()
      // this.s_date = this.$Date(this.s_date).format('YYYY-MM-DD')
      // console.log(this.date_s,'date_s')
      // console.log(this.date_e,'date_e')
    },
    charinit(){
      var myChart = echarts.init(document.getElementById('Rprjtstatistic'));
      myChart.setOption({
        title: {
          text: '项目统计-'+this.$Date().format('YYYY-MM-DD')
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.chardata.xdata
        },
        yAxis: {type: 'value'},
        series: [
          {
            name: '合计统计项目',
            type: 'bar',
            data: this.chardata.ydata,
            label:{
              show:true,
              position: 'inside'
            }
          },
        ]
      });
    }
  }
})
</script>
<style scoped>
.bodysty{
  margin-bottom: 5px;
  min-width: 900px;
  min-height: 500px;
  text-align: left;
  border: #dcdee2 1px solid;
}
.tablesty{
  margin-top: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}


</style>
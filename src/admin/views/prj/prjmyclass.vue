<template>
  <div>我的项目分类</div>
  <div id="main" style="width: 600px; height: 400px;"></div>
  <Button @click="btntest">新标签页测试</Button>
</template>

<script lang="ts">
import { defineComponent,ref, onMounted} from 'vue'
import store from '@/store'
import {NetRequest} from '@/router/request'
import {WebFront} from '@/router/interface'
import * as echarts from 'echarts';
export default defineComponent({
  setup() {
    onMounted(() => {
    })
  },
  data(){
    return{
      xdata:['项目评审', '项目施工', '维保期', '项目完结',],
      ydata:[5, 20, 36, 10],
      zdata:[1, 2, 2, 0]
    }
  },
  mounted(){
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.xdata
      },
      yAxis: {type: 'value'},
      series: [
        {
          name: '销量',
          type: 'bar',
          stack:'a',
          data: this.ydata
        },
        {
          name: '减少',
          type: 'bar',
          stack:'a',
          itemStyle:{
            color:'rgba(180, 180, 180, 0.2)'
          },
          data: this.zdata
        }
      ]
    });
  },
  methods:{
    btntest(){
      this.ydata[3] +=1
    },
    async getList(page:number){
      let x = new WebFront()
      let y = await x.GetHomeNews('all',page)
      if(y){
        console.log(y,'getlist')
      }else{
        this.$Message.error('网络错误')
      }
    },
    initChart() {
      const chartRef = ref<HTMLDivElement | null>(null);
    }
  }
})
</script>


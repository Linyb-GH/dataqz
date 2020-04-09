<template>
<Tabs ref="contents" type="card"  >

  <TabPane label="任务报表" key="任务报表" >
    <div class="center">
      <!-- 服务器数量分类统计
      配件不足提醒
      近阶段（七天）任务完成量，分类统计
      生成月报（上个月） -->
      任务完成情况统计、设备分类统计、EXCEL导出；
    </div>
    
  </TabPane>

  <TabPane v-for="tab in tabs" :key=tab :label="tab">
    <p>{{tab}}</p>
  </TabPane>
  
</Tabs>
</template>

<script>

export default {
  data () {
    return {
      tabs:[]
    }
  },
  components:{

  },
  methods: {
    
  },

}
</script>

<style scoped>
  .center{
    text-align: center
  }
</style>
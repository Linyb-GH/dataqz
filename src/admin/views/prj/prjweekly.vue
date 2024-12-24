<template>
  <div v-if="isloading" class="bodysty">
    <Space style="margin-top: 5px;margin-left: 5px;"  wrap>
      日期范围：
      <DatePicker @on-change="datechange" v-model="dateselected" type="daterange" placement="bottom-start" placeholder="选择日期范围" style="width: 200px" />
    </Space>

    <Collapse style="margin: 10px 10px;" simple>
      <Panel v-for="(item,index) in prjdata" :key="index" :name=index+item.title>
        <Text strong >{{ item.title }}</Text>
        <template #content>
          <div v-for="(itm) in item.contents">
            <Text style="margin-left: 2rem;">[{{ itm.taskname }}] {{ itm.content }} - {{ itm.doingtime }}</Text>
            <br/>
          </div>
          <!-- <Text v-html="item.content" style="margin-left: 2rem;"> </Text> -->
        </template>
      </Panel>
    </Collapse>
  </div>
  <div v-else>
    加载中...
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Projects from '@/router/interface/Projects'
export default defineComponent({
  setup() {
    
  },
  data(){
    return {
      isloading:true,
      dateselected:'',
      parameter:{date_start:'',date_end:''},
      prjdata:[
        {title:'',contents:[
          {doingtime:'',content:'',taskname:''},
          
        ]},
        // {title:'安溪住建局等保测评服务',content:'另外一项事情'},
        // {title:'晋江公卫密评项目',content:'推动备案审核进度，机要局要求业主直接跟金密签合同。'},
      ]
    }
  },
  mounted(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      this.isloading = false
      let x = new Projects()
      let y = await x.GetPrjWeekly(this.parameter)
      if(y.data){
        this.isloading = true
        this.prjdata = y.data
      }

    },
    datechange(){
      this.parameter.date_start = this.dateselected[0]
      this.parameter.date_end = this.dateselected[1]
      this.getInfo()
      console.log(this.dateselected)
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
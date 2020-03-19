<template>
<Tabs ref="accessories" type="card" :value="tabs.clabel"  @on-click="tabclick" @on-tab-remove="closelabel">
  <!-- <router-view></router-view> -->
  <TabPane label="配件列表" key="Home" name='home'>
    
    <Table size="small" border :columns="columns" :data="data5"></Table>
 
  </TabPane>
  <TabPane label="Action" key="Action" name='Action'>
    action page
    <button @click="test">New-Label</button>
  </TabPane>

  <TabPane closable v-for="(tab,index) in tabs.labels" :name="tab.label" :key=tab.label+index :label="tab.label">
    <p>{{tab.data}}</p>
  </TabPane>
</Tabs>
</template>

<script>
  import axios from 'axios'

export default {

  components:{
   
  },
  data () {
    return {
      tabs:{
        clabel:'', //当前标签页
        labels:[] //标签页列表{label:'',data:{}}
      },
      columns: [
        {
          title: '配件类别',
          key: 'type',
          filters: [
            {
              label: '网线',
              value: '网线'
            },
            {
              label: '模块',
              value: '模块'
            },
            {
              label: '光纤',
              value: '光纤'
            }
          ],
          filterMethod (value, row) {
            return row.type.indexOf(value) > -1;
          }
        },
        {
          title: '配件名称',
          key: 'name'
        },
        {
          title: '规格',
          key: 'specifications',
        },
        {
          title: '数量',
          key: 'amount',
          
        },
        {
          title: '单位',
          key: 'uint'
        },
        {
          title: '存放位置',
          key: 'site'
        }
      ],
      data5: [
        {
          type:'网线',
          name: 'John Brown',
          specifications: 18,
          num: 'New York No. 1 Lake Park',
          uint: '2016-10-03',
          site: 'site'          
        },

      ],
    }
  },
  mounted(){
    axios({
      method:'get',
      url:'http://localhost/ecserver/index.php/accessories',
      params:{action:'getlist'},
      // data,
      timeout:1000
    }).then(res=>{
      this.data5 = res.data.message;
      console.log(res);
    })
  },
  computed:{

  },
  methods: {
    closelabel(index){
      this.tabs.labels = this.tabs.labels.filter((item)=>item.label != index)
    },
    tabclick(index){
      console.log(this.tabs)
    },
    test(){
      let ran =Math.ceil(Math.random()*10000) 
      this.tabs.labels.push({label:'new'+ran,data:{random:ran,type:'tasks_accessory'}})
      this.tabs.clabel = 'new'+ran
      console.log(this.tabs)
    }
  },

}
</script>

<style scoped>

</style>
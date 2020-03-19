<template>
<Tabs ref="servers" type="card"   :value="tabs.clabel" @on-tab-remove="closelabel" >
  <TabPane label="设备列表" key="设备列表" name="servers" >
    <Table border :columns="columns6" :data="data5" size="small">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
      </template>
    </Table>
    <br>
    <Page style="text-align:center;" :total="totalpage" @on-change="pagefunc" />
    <br>
  </TabPane>
  <TabPane label="设备查找" key="设备查找">
    <div class="searchsty">
      <Input style="width:300px" @on-search="search" search enter-button="Search" placeholder="IP、名称、A#01 、固资编号" />
      <CheckboxGroup v-model="searchfilter" style="margin:5px 10px">
        <Checkbox label="3-2机房"></Checkbox>
        <Checkbox label="1-2机房"></Checkbox>
      </CheckboxGroup>
    </div>
    
  </TabPane>

  <TabPane v-for="(tab,index) in tabs.labels" :name="tab.label" :key="tab.label+index" :label="tab.label" closable>
    <info :message = tab.data></info>
  </TabPane>
  
</Tabs>
</template>

<script>
import info from '../components/servers/info'
import axios from 'axios'
export default {
  data () {
    return {
      tabs:{
        clabel:'',
        labels:[]
      },
      sendinfo:['null'],
      searchfilter:['3-2机房'],
      totalpage:10,
      page:1,
      columns6: [
        {
          title: '编号',
          key: 'number'
        },
        {
            title: '名称',
            key: 'name'
        },
        {
            title: '设备类别',
            key: 'types',
        },
        {
          title: '所属平台',
          key: 'system',
        },
        {
          title: '平台区域',
          key: 'systemarea'
        },
        {
          title: '设备位置',
          key: 'location2'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 100,
          align: 'center'
        }
    ],
    data5: [],
    }
  },
  components:{
    info
  },
  created(){

      axios({

        url:'http://localhost/ecserver/index.php/servers',
        params:{
          page:this.page,
          action:'showlist'
        },
        method:'get'
      }).then(res=>{
        // console.log(res.data);
        this.data5 = res.data.message.servers;
        this.totalpage = res.data.message.page;
        // this.totalpage = 12;
      })
  },
  methods: {
    closelabel(index){
      this.tabs.labels = this.tabs.labels.filter((item)=>item.label != index)
    },
    search (value) { //搜索
      console.log(this.searchfilter)
      console.log(value)
    },
    show(index){ //详情按钮
      let lab = this.data5[index].name
      let x = this.tabs.labels.filter((item) =>  item.label == lab)
      if(x.length == 0){
        axios({
        url:'http://localhost/ecserver/index.php/servers',
        params:{
          action:'showinfo',
          server:this.data5[index].number
        },
      }).then(res=>{
        // this.sendinfo = res.data.message
        this.tabs.labels.push({label:lab,data:res.data.message})
        this.tabs.clabel = lab
      })
    }else{
      this.tabs.clabel = lab
    }

    },
    
    pagefunc(page){ //页面显示

      axios({
        url:'http://localhost/ecserver/index.php/servers',
        params:{
          page:page,
          action:'showlist'
        },
        method:'get'
      }).then(res=>{
        this.data5 = res.data.message.servers
      })
    }
  },

}
</script>

<style scoped>
  .searchsty{
    /* border: 1px solid #000;; */
    display:flex;
    margin: 0 10px;
    /* width:900px; */
  }
</style>
<template>
<Tabs ref="contents" type="card"  >

  <TabPane label="设备列表" key="设备列表" >
    <Table border :columns="columns6" :data="data5" size="small">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
      </template>
    </Table>
    <br>
    <Page style="text-align:center;" :total="totalpage" @on-change="pagefunc" />
    <br>
  </TabPane>

  <TabPane v-for="tab in tabs" :key=tab :label="tab">
    <p>{{tab}}</p>
    <info :message="sendinfo"></info>
  </TabPane>
  
</Tabs>
</template>

<script>
import info from '../components/servers/info'
import axios from 'axios'
export default {
  data () {
    return {
      tabs:[],
      sendinfo:[],
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
            filters: [
                {
                    label: '服务器',
                    value: '服务器'
                },
                {
                    label: '交换机',
                    value: '交换机'
                },
                {
                    label: '防火墙',
                    value: '防火墙'
                }
            ],
            // filterMultiple: false,
            filterMethod (value, row) {
              // console.log('value:'+value+'--row:'+row.types)
              return row.types.indexOf(value) > -1
            }
        },
        {
          title: '所属平台',
          key: 'system',
          filters: [
              {
                  label: 'New York',
                  value: 'New York'
              },
              {
                  label: 'London',
                  value: 'London'
              },
              {
                  label: 'Sydney',
                  value: 'Sydney'
              }
            ],
          filterMethod (value, row) {
              return row.address.indexOf(value) > -1;
          }
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
        // url:'http://123.207.32.32:8000/home/multidata',
        url:'http://localhost/ecserver/index.php/servers',
        params:{
          page:this.page,
          action:'showlist'
        },
        method:'get'
      }).then(res=>{
        console.log(res.data);
        this.data5 = res.data.message.servers;
        this.totalpage = res.data.message.page;
        // this.totalpage = 12;
      })
      // console.log(this.data5)
      // return this.data5


  },
  methods: {
    additem (name) { //新增标签页动作
      console.log('test by servers'+name);
      if(this.tabs.indexOf(name) == -1)
        this.tabs.splice(this.tabs.length,0,name)
    },
    show(index){ //详情按钮
      if(this.tabs.indexOf(this.data5[index].name) == -1){
        this.tabs.splice(this.tabs.length,0,this.data5[index].name)
      }
      this.sendinfo = this.data5[index].name
      axios({
        url:'http://localhost/ecserver/index.php/servers',
        params:{
          action:'showinfo',
          server:this.data5[index].number
        },
      }).then(res=>{
        this.sendinfo = res.data.message
      })
    },
    
    pagefunc(page){

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
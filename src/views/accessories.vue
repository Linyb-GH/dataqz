<template>
<Tabs ref="accessories" type="card" :value="tabs.clabel"  @on-click="tabclick" @on-tab-remove="closelabel">
  <!-- <router-view></router-view> -->
  <TabPane label="配件列表" key="Home" name='home'>
    
    <Table size="small"  :columns="columns" :data="data5">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
      </template>
    </Table>
 
  </TabPane>
  <!-- <TabPane label="Action" key="Action" name='Action'>
    action page
    <button @click="test">New-Label</button>
  </TabPane> -->

  <TabPane closable v-for="(tab,index) in tabs.labels" :name="tab.label" :key=tab.label+index :label="tab.label">
    <Showinfo :fcolumns = tab.columns :message = tab.data></Showinfo>
  </TabPane>
</Tabs>
</template>

<script>
  // import axios from 'axios'
  import {request} from '../network/request'
  import Showinfo from '../components/common/tabshowmiddle'
export default {

  components:{
   Showinfo
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
            },
            {
              label: '其他',
              value: '其他'
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
          width:'60px',
          align:'center'
          
        },
        {
          title: '单位',
          key: 'uint',
          width:'60px'
        },
        {
          title: '存放位置',
          key: 'site'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 100,
          align: 'center'
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
      columnsinfo:[
        {
          title: '日期',
          key: 'date',
        },
        {
          title: '使用（购买）者',
          key: 'user'
        },
        {
          title: '方式',
          key: 'modify',
        },
        {
          title: '数量',
          key: 'useamount',
          width:'60px',
          align:'center'
          
        },
        {
          title: '用途/来源',
          key: 'usefor'
        },
        {
          title: '当前剩余',
          key: 'remainder'
        },
        {
          title: '备注',
          key: 'remark'
        }
      ],
    }
  },
  mounted(){
    request({
      url:'accessories',
      params:{action:'getlist'}
    }).then(res =>{
      this.data5 = res.data.message;
    })
    // axios({
    //   method:'get',
    //   url:'http://localhost/ecserver/index.php/accessories',
    //   params:{action:'getlist'},
    //   // data,
    //   timeout:1000
    // }).then(res=>{
    //   this.data5 = res.data.message;
    //   console.log(res);
    // })
  },
  computed:{

  },
  methods: {
    show(index){
      
      let lab = this.data5[index].name+this.data5[index].id
      let x = this.tabs.labels.filter((item) =>  item.label == lab)
      if(x.length == 0){
        request({
          url:'accessories',
          params:{
            action:'getinfo',
            id:this.data5[index].id
          }
        }).then(res =>{
          this.tabs.labels.push({label:lab,columns:this.columnsinfo,data:res})
          this.tabs.clabel = lab
        })
      //   axios({
      //   url:'http://localhost/ecserver/index.php/accessories',
      //   params:{
      //     action:'getinfo',
      //     id:this.data5[index].id
      //   },
      // }).then(res=>{
      //   this.tabs.labels.push({label:lab,columns:this.columnsinfo,data:res})
      //   this.tabs.clabel = lab
      // })
      }else{

        // this.tabs.clabel = lab
      }
    },
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
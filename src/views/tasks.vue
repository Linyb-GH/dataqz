<template>
<Tabs ref="contents" type="card"  >
  <!-- <router-view></router-view> -->
  <TabPane label="任务列表" key="任务列表" >
    <Table border :columns="columns6" :data="data5"></Table>
    <button>测试分页</button>
  </TabPane>
  <TabPane label="新建任务" key="新建任务" >

    <Button type="primary" @click="newTask('设备上架')" class="rightspace">设备上架</Button> 

    <Button type="primary" @click="newTask('布线')">布线</Button>
  </TabPane>

  <TabPane v-for="(tab,index) in tabs" :key=tab+index :label="tab">
    <NewTask :message = tab></NewTask>
  </TabPane>

</Tabs>
</template>

<script>
import NewTask from '../components/tasks/new'

export default {
  components:{
    NewTask
  },
  data () {
    return {
      tabs:[],
      columns6: [
        {
          title: 'Date',
          key: 'date'
        },
        {
            title: 'Name',
            key: 'name'
        },
        {
            title: 'Age',
            key: 'age',
            filters: [
                {
                    label: '大于 25',
                    value: 1
                },
                {
                    label: '小于 25',
                    value: 2
                }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
                if (value === 1) {
                    return row.age > 25;
                } else if (value === 2) {
                    return row.age < 25;
                }
            }
        },
        {
          title: 'Address',
          key: 'address',
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
        }
    ],
    data5: [
        {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
        },
        {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
        },
        {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
        }
    ],
}
        
    },
  methods: {
    newTask(name) {
      this.tabs.splice(this.tabs.length,0,name);
    }
  },
  // created(){
  //   this.$store.commit('showpg','page1')
  // }
}
</script>

<style scoped>
  .rightspace{
    margin-right: 10px;
  }
</style>
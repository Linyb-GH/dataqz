<template>
  <div class="bodysty">
    <Modal v-model="modalstatus.userselect" title="抄送"  width="300"   >
      <UserSelector @selectuser="usercc"></UserSelector>
      <template #footer>
        <div></div>
      </template>
    </Modal>
    <Modal v-model="modalstatus.isshow" title="周报-未评审"  width="800" :loading="modalstatus.loading"  @on-ok="modalyes" @on-cancel="modalcancel"  >
      <Form :model="modaldata" :label-width="80">
        <Row>
          <Col span="12">
            <FormItem label="评审人">
              <UserSelector @selectuser="userselected"></UserSelector>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="周报日期">
              <DatePicker @on-change="datechange" v-model="modaldata.dateselected" type="daterange" placement="bottom-start" placeholder="选择日期范围" style="width: 200px" />
            </FormItem>
          </Col>
        </Row>
        <FormItem label="抄送">
          <div style="margin: 0px 10px;">
            <Tag v-for="item in pagedata.cc" :key="item.id"  :name="item.name" closable @on-close="handleClose">{{ item.name }}</Tag>
            <Button icon="ios-add" type="dashed"  @click="handleAdd">添加人员</Button>
          </div>
        </FormItem>
        <div v-for="(item,index) in modaldata.ques" :key="index" style="margin: 10px 10px;">
          <div style="margin: 10px 10px;">
            {{ index+1 }}
            <Text style="margin-right: 10px;">
              {{ item.ques }}
            </Text>
            <Button v-if="item.isshow" icon="ios-arrow-down" @click="btn_ques(index)"  shape="circle"></Button>
            <Button v-else icon="ios-arrow-up" @click="btn_ques(index)" shape="circle"></Button>
          </div>
          <MyEditor :message="{id:index}" @getEditContent = "getContent" v-show="item.isshow" ></MyEditor>
        </div>
      </Form>
    </Modal>
    <div style="width:100vw;min-width: 900px;">
      <Button @click="newreport" style="float:left;margin-left:20px;margin-top:20px" type="primary">写周报</Button>
    </div>
    <Table class="tablesty" stripe :loading="initdata.tabloading" :columns="columns" :data="pagedata.prjlist">
      <template #schedule="{ row }" >
        <span>{{ row.schedule }}</span>
        <!-- <a :href= urlstr+row.number>{{ row.name1 }}</a> -->
      </template>
      <template #action="{ row, index }">
        <Button type="primary" size="small" @click="editorreport(index)">编辑</Button>
        <!-- <Button type="error" size="small" style="margin-left: 5px" @click="deleteprj(index)">删除</Button> -->
      </template>
      <template #status="{ row }" >
        <Text v-if="row.status == '已评审'" type="success">{{ row.status }}</Text>
        <Text v-else type="danger">{{ row.status }}</Text>
      </template>
    </Table>
    
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="totalnum" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyEditor from '@/admin/common/Editor.vue'
import UserSelector from '@/admin/common/UserSelector.vue'
export default defineComponent({
  components:{MyEditor,UserSelector},
  setup() {
    
  },
  data(){
    return {
      modalstatus:{isshow:false,loading:false,userselect:false},
      initdata:{tabloading:false},
      columns:[{title: '周报日期',key: 'DateRange',width:'200px'},
        {title: '提交时间',key:'HDate',width:'120px'},{title: '评审人',key: 'reviewer'},{title: '评审状态',slot: 'status'},{title: '评审内容',key: 'command'},{title:'操作',slot:'action'}],
      pagedata:{prjlist:[
        {DateRange:'2021-10-01 - 2021-10-07',HDate:'2021-10-07',reviewer:'郭琛',status:'未评审'}
      ],cc:[{id:'',name:''}]},
      totalnum:0,
      modaldata:{
        ques:[{ques:'本周你完成了哪些工作？哪些项目状态有变更？',isshow:false,html:''},
          {ques:'下周你计划做什么？要完成什么目标？',isshow:false,html:''}],
        dateselected:[]
      },
    }
  },
  mounted(){
    this.pagedata.cc = []
  },
  methods:{
    newreport(){
      this.modalstatus.isshow = true
    },
    editorreport(i:number){
      console.log(i)
    },
    tuenpage(i:number){
      console.log(i)
    },
    modalyes(){
      console.log(this.modaldata)
      console.log('modalyes')
    },
    modalyes2(x:any){
      console.log(x)
      // this.pagedata.cc.push()
    },
    getContent(EditorData:{id:number,content:string}){
      // console.log(EditorData)
      this.modaldata.ques[EditorData.id].html = EditorData.content
    },
    datechange(){

    },
    handleAdd(){
      this.modalstatus.userselect = true
      // this.pagedata.cc.push({id:'2',name:'xiaoming'})
      console.log('handleAdd')
    },
    btn_ques(i:number){
      if(this.modaldata.ques[i].isshow){
        this.modaldata.ques[i].isshow = false
      }else{
        this.modaldata.ques[i].isshow = true
      }
    },
    handleClose(){

    },
    userselected(user:{id:'',name:''}){
      // console.log(user.id,'hhh')
    },
    usercc(user:{id:'',name:''}){
      this.pagedata.cc.push(user)
      
      this.modalstatus.userselect = false
    },
    modalcancel(){
      console.log('modalcancel')
    }
  }
})
</script>

<style scoped>
.bodysty{
  min-height: 600px;
  min-width: 900px;
  margin-bottom: 5px;
  display: flex;
  justify-content: left;
  align-content: flex-start;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  min-width: 1100px;
  margin-top: 10px;
  margin-left: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
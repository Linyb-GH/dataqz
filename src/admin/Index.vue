<template>
  <PrjTask @actions="NTactions" v-if="modalstatus.taskid != ''" :message="{id:modalstatus.taskid,id_todo:modalstatus.id_todo}" >
  </PrjTask>
  <Layout v-if="isloading">
    <Header class="headersty" >
      <Menu mode="horizontal" @on-select = "headerselected" theme="light" class="menusty" >
        <a href="/" class="layout-logo"></a>
        <div class="headerclass">
          <MenuItem v-for="(value,index) in xdata" :key="index" :name= "index">
            <Icon :type="value.micon" />
            {{value.manu}}
          </MenuItem>
        </div>
        <div class="accountsty">
          <Badge :count="unreadTodo" />
          <Notification  @on-clear="handleClear" >
            <NotificationTab title="待办" name="todo" :count="unreadTodo" :loading="todoLoading" :scroll-to-load="false">
              <div  @click ="handleNotice(item)"  v-for="(item, index) in todoList">
                <NotificationItem  
                  :key="index"
                  :title="item.title"
                  :content="item.content"
                  :tag="item.tag"
                  :tag-props="item.tagProps"
                  :read="item.read"/>
              </div>
            </NotificationTab>
          </Notification>

          <Avatar :src=user.avatar style="background-color: #87d068;margin-left: 10px;margin-bottom: 5px;" icon="ios-person" />
          <span style="margin: 10px;">您好</span>
          <Dropdown  @on-click="account">
            <a >
              {{ user.name }}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <template #list>
              <DropdownMenu >
                <DropdownItem name='accountinfo'>账号信息</DropdownItem>
                <DropdownItem name='logout'>注销</DropdownItem>
                <DropdownItem name='modifypsw'>修改密码</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu @on-select="siderslected" width="auto" >
          <Submenu v-for="(item,index) in xdata[siderindex].sider" :key="index" :name=item.sidername>
            <template #title>
                <Icon :type="item.icon" />
                {{ item.sidername }}
            </template>
            <MenuItem v-for="(i,index) in item.sidermem" :key="index" :name=i.url>{{ i.itemname }}</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout-content" >
        <Content :style="{padding: '15px',margin:'5px', minHeight: '600px', background: '#fff'}">
          <Tabs ref="servers" name="Home" type="card"  @on-click="onclick" :model-value="tabs.tabcurrent" @on-tab-remove="closelabel" >
            <TabPane :label="$route.name" key="HomePane" name="HomePane" >
              <router-view/>
            </TabPane>
            <TabPane closable  v-for="(tab,index) in tabs.tablists" :name="tab.label"  :key="tab.label+index" :label="tab.label">
              <Admintabs :message = tab ></Admintabs>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  <Spin fix v-else>
    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
</template>

<script lang="ts">
import router from '@/router'
import store from '@/store'
import { Auth,User } from '@/router/interface'
import Admintabs from '@/admin/tabs/Index.vue'
import { defineComponent,ref } from 'vue'
import { Input } from 'view-ui-plus';
import PrjTask from '@/admin/views/prj/modal/prjmytasks.vue'
export default defineComponent({
  setup() {
    let isloading = ref(false)
    let siderindex = ref(0)

    //当前Tab的信息
    const tabs = ref(store.state.tabs)

    //header变更后的sider数据
    const siderslected=((val:string)=>{
      router.push({path:val})
      store.commit('Tab_ClickTab','HomePane')
    })
    const headerselected = ((val:number)=>{
      siderindex.value = val
      // siderlist.value = pdata.value[val].sider
    })
    return {siderslected,headerselected,isloading,tabs,siderindex}
  },
  components:{Admintabs,PrjTask},
  data(){
    return {
      user:store.state.user,
      xdata:store.state.page_data,
      todoList: [{id:'',title:'',content:'',tag:'',tagProps:{color:''},read:1}],
      todoLoading: false,
      password_c:{username:'',oldpsw:'',newpsw:''},
      modalstatus:{taskid:'',id_todo:''}
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    async init(){
      this.Initialization()
      this.GetPageAuth()
      this.GetTodoList()
      this.todoList = []
    },
    async Initialization(){
      let x = new Auth()
      let y = await x.Initialization()
      if(y.ret == '200'){
      }else{
        this.$Message.error('Initialization初始化出错！')
      }
    },
    async GetTodoList(){
      let x = new Auth()
      let y = await x.GetTodoList()
      if(y.data){
        this.todoList = y.data
        console.log(y.data,'GetTodoList')
      }else{
        console.log(y,'GetTodoList')
        this.todoList = []
      }
    },
    async GetPageAuth(){
      let x = new Auth()
      let y = await x.GetPageAuth()
      if(y.ret == 200){
        if(y.data){
          this.xdata = y.data
          this.isloading = true
        }else{
          this.$router.push({name:'Login'})
          this.$Message.warning(y.msg)
        }
      }else{
        console.log(y)
        this.$router.push({name:'Login'})
        this.$Message.warning('登录失败，接口请求失败！')
      }
    },
    handleNotice(tab:any){
      this.modalstatus.taskid = tab.id_task
      this.modalstatus.id_todo = tab.id
    },
    NTactions(emit:{action:string,data:string}){
      if(emit.action == 'closed'){
        this.modalstatus.taskid = ''
        this.modalstatus.id_todo = ''
      }
      if(emit.action == 'done'){
        this.GetTodoList()
      }
    },
    handleClear(){
      this.todoList = []
    },
    onclick(tab:string){
      store.commit('Tab_ClickTab',tab)
    },
    closelabel(tab:string){
      store.commit('Tab_DeleteTab',tab)
    },
    async modifyPassword(){
      let x = new User()
      let y = await x.Modifypsw(this.password_c)
      if(y.data){
        this.$Message.success('修改成功，请记好新密码！')
      }else{
        this.$Message.error('修改出错！')
      }
    },
    account(val:string){
      if(val == 'logout'){
        store.commit('USER_LOGINOUT')  
      }
      if(val == 'accountinfo'){
        store.commit('Tab_NewTab',{id:'',label:'账号信息',component:'TabAccount',data:{hh:'xx'}})
      }
      if(val == 'modifypsw'){
        let m = {username:store.state.user.name,oldpsw:'',newpsw:''}
        let newpswcheck:string
        this.$Modal.confirm({
          render: (h:any) => {
            return [
            h( Input, 
              {
                size: "large",
                style:'margin:10px 10px;',
                type:'password',
                autofocus: true,
                placeholder: '请输入旧密码',
                'onInput': (event:any) => {
                  m.oldpsw = event.target.value;
                }
              }),
              h( Input, {
                size: "large",
                style:'margin:10px 10px;',
                type:'password',
                password:true,
                autofocus: true,
                placeholder: '请输入新密码',
                'onInput': (event:any) => {
                  m.newpsw = event.target.value;
                }
              }),
              h( Input, {
                size: "large",
                style:'margin:10px 10px;',
                type:'password',
                password:true,
                autofocus: true,
                placeholder: '再次输入新密码',
                'onInput': (event:any) => {
                  newpswcheck = event.target.value;
                }
              }),
            ]
            
          },
          onOk:()=>{ 
            if(m.oldpsw == '' || m.newpsw == ''){
              this.$Message.error('修改出错');return
            }
            if(m.newpsw == newpswcheck){
              this.password_c = m
              this.modifyPassword()
            }else{
              this.$Message.error('两次输入的新密码不一致！')
            }
          },
        })
      }
    }
  },
  computed: {
            
    unreadTodo() {
      let unread = 0;
      this.todoList.forEach(item => {
        if (!item.read) unread++;
      });
      return unread;
    }
  },
})
</script>
<style  scoped >

.headersty{
  padding:5px;
  min-width: 900px;
  background-color: aliceblue;
}
.menusty{
  display: flex;
  flex-wrap: nowrap;
}
.layout-logo{

  width: 160px;
  height: 53px;

  background-image: url('../assets/dtqz.png');
  border-radius: 3px;
  position: relative;
  top: 5px;
  left: 20px;
}
.layout-content{ 
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 5px 10px;
}
.headerclass{
  margin: 0 auto;
  margin-left: 40px;
}
.accountsty{

  /* border: 1px solid black; */

  margin-right: 50px;
}
</style>

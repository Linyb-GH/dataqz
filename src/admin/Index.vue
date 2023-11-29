<template>
  <!-- <div>admin index page</div> -->
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
          <Avatar style="background-color: #87d068" icon="ios-person" />
          <span style="margin:1vw">您好</span>
          <Dropdown  @on-click="account">
            <a >
              {{ user.name }}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <template #list>
              <DropdownMenu >
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
import { Auth } from '@/router/interface'
import Admintabs from '@/admin/tabs/Index.vue'
import { defineComponent,ref } from 'vue'
import { Input } from 'view-ui-plus';
export default defineComponent({
  setup() {
    let isloading = ref(false)

    let siderindex = ref(0)

    //当前Tab的信息
    const tabs = ref(store.state.tabs)
    //header变更后的sider数据
    

    const siderslected=((val:string)=>{
      router.push({path:val})
      console.log(val)
    })
    const headerselected = ((val:number)=>{
      siderindex.value = val
      // siderlist.value = pdata.value[val].sider
    })
   

    return {siderslected,headerselected,isloading,tabs,siderindex}
  },
  components:{Admintabs},
  data(){
    return {
      user:store.state.user,
      xdata:store.state.page_data
    }
  },
  mounted(){
    this.init()

  },
  methods:{
    async init(){
      this.GetPageAuth()
    },
    async GetPageAuth(){
      let x = new Auth()
      let y = await x.GetPageAuth()
      if(y){
        this.xdata = y
        this.isloading = true
      }else{
        this.$Message.error('发生错误！')
      }
    },
    onclick(tab:string){
      store.commit('Tab_ClickTab',tab)
    },
    closelabel(tab:string){
      store.commit('Tab_DeleteTab',tab)
    },
    account(val:string){
      if(val == 'logout'){
        store.commit('USER_LOGINOUT')  
      }
      if(val == 'modifypsw'){
        let oldpsw:string,newpsw:string,newpsw2:string
        this.$Modal.confirm({
          render: (h:any) => {
            return [
            h( Input, 
              {
                size: "large",
                // modelValue: oldpsw,
                style:'margin:10px 10px;',
                type:'password',
                autofocus: true,
                placeholder: '请输入旧密码',
                'onInput': (event:any) => {
                  oldpsw = event.target.value;
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
                  newpsw = event.target.value;
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
                  newpsw2 = event.target.value;
                }
              }),
            ]
            
          },
          onOk:()=>{
            if(oldpsw == ''){
              return
            }
            if(newpsw == newpsw2){

            }else{
              this.$Message.error('两次输入的新密码不一致！')
            }
            console.log(newpsw)
          },
        })
        console.log('modifypsw func')

      }
    }
  }
})
</script>
<style  scoped >
.headersty{
  padding:0;
  background-color: aliceblue;
  /* border: solid 1px yellow; */
}
.menusty{
  /* background: #d7dde4; */
  display: flex;
  flex-wrap: nowrap;
}
.layout-logo{
  /* border: blueviolet 1px solid; */
  width: 160px;
  height: 53px;
  /* background-color: gray; */
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
  /* height: 30px; */
  /* width: 420px; */
  margin: 0 auto;
  margin-left: 40px;
  /* border: springgreen solid 1px; */
}
.accountsty{
  /* border: red 1px solid; */
  margin-right: 50px;
}
</style>

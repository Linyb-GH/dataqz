<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        /* background: #fff; */
        background:rgba(255,255,255,1);
        /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .headerclass{
      position:fixed;
      width:100%;
      border: 1px solid #f5f7f9;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <Sideridc  v-if="showsider == 2"></Sideridc>
                    <Sidercloud  v-if="showsider == 3"></Sidercloud>
                </Menu>
            </Sider>
            
            <Layout>
                <Header :style="{padding:0}"  class="layout-header-bar">
                  <Menu mode="horizontal" theme="light" v-bind:active-name="showsider" >
                    <div class="headerclass">
                      <MenuItem name="1" @click.native="collapsedSider" >
                        <Icon 
                          :class="rotateIcon" type="md-menu" size="24" ></Icon>
                      </MenuItem>
                      <MenuItem name="2" @click.native="showheader('2')">
                        <Icon type="ios-keypad"></Icon>
                        EC机房服务器
                      </MenuItem>
                      <MenuItem name="3" @click.native="showheader('3')">
                        <Icon type="ios-analytics"></Icon>
                        备案记录
                      </MenuItem>
                      <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                          Item 4
                      </MenuItem>
                    </div>
                  </Menu>
                </Header>
                <Content></Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
  import './iview/index'
  import Sideridc from './components/sider/Sideridc'
  import Sidercloud from './components/sider/Sidercloud'
  import Content from './components/content/content'
    export default {
      name: 'App',
      components:{Sideridc,Sidercloud,Content},
        data () {
            return {
                showsider:"2",
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
                //console.log(this.$store.state.showpage)
            },
            showheader(item){ 
                this.showsider = item
            },
        },      
    }
</script>

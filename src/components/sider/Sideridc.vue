
<template >
    <div>
        <MenuItem name="sideridc-1" >
          <router-link to="/servers" tag="div"  >
            <Icon type="ios-desktop-outline"></Icon>
            <span>--设备列表</span>
          </router-link>
        </MenuItem>
        <MenuItem name="sideridc-2"  >
          <router-link to="/tasks" tag="div" >
            <!-- <Icon type="ios-search"></Icon> -->
            <Icon type="ios-briefcase"></Icon>
            <span>--任务列表</span>
          </router-link>
        </MenuItem>
        <MenuItem name="sideridc-3"  >
            <router-link to="/accessories" tag="div" >
            <!-- <Icon type="ios-settings"></Icon> -->
            <Icon type="ios-basket"></Icon>
            <span>--配件库存</span>
            </router-link>
        </MenuItem>
        <MenuItem name="sideridc-4"  >
            <router-link to="/report" tag="div" >
            <Icon type="md-analytics"></Icon>
            <span>--报表统计</span>
            </router-link>
        </MenuItem>
        
        <MenuItem name="1-4" >
        <router-link to="/page2" tag="div">
          <Icon type="ios-settings"></Icon>
          
          <span>测试页</span>
        </router-link>
        </MenuItem>
        
    </div> 
</template>

<script>

import '../../iview/index'
export default{
    data(){
        return{
            
        }
    },
    methods:{
        clklabel(item){
            this.$store.commit('showpg',item)
          
            // console.log(this.$store.state.showpage)
        }
    },
    // created:{
    // }
}
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    /* .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    } */
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
</style>



<template >
    <div>
        <!-- <MenuItem @click.native="clklabel('tab0')"  name="1-1">
            <Icon type="ios-keypad"></Icon>
            <router-link to="/page1" tag="span">Option 2-1</router-link>
        </MenuItem> -->
        <MenuItem name="2-1" >
          <router-link to="/page1" tag="div"  >
            <Icon type="ios-keypad"></Icon>
            <span>Option 2-1</span>
          </router-link>
        </MenuItem>
        <MenuItem name="2-2"  >
          <router-link to="/page2" tag="div" >
            <Icon type="ios-search"></Icon>
            <span>Option 2-2</span>
          </router-link>
        </MenuItem>
        <MenuItem name="2-3"  >
          <router-link to="/page2" tag="div" >
            <Icon type="ios-settings"></Icon>
            <span>Option 2-3</span>
          </router-link>
        </MenuItem>
        <!-- <MenuItem @click.native="clklabel('tab2')" name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>Option 2-3</span>
        </MenuItem> -->
        <!-- <router-link to="/page1" tag="MenuItem" name="1-3">
        </router-link> -->
        
        <MenuItem name="1-4" >
          <Icon type="ios-settings"><router-link to="/page1" ></router-link></Icon>
          
          <router-link to="/page1" tag="span">Option 2-4</router-link>
          <!-- <span>Option 2-3</span> -->
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
    // computed:{
    //     menuitemClasses () {
    //         return [
    //             'menu-item',
    //             this.isCollapsed ? 'collapsed-menu' : ''
    //             ]
    //         }
    //     },
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


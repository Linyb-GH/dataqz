<template>
  <header  ref="header">
    <img src="../assets/images/headerlogo.png" class="imagelogo">
    <Menu mode="horizontal"  :active-name="activename"  class="menu">
      <MenuItem name="/home" to="/home" class="textsyt">
        首页
      </MenuItem>
      <MenuItem name="/about" to="/about?class=gaik" class="textsyt">
        公司概况
      </MenuItem>
      <MenuItem name="/news" to="/news?class=news" class="textsyt">
        新闻中心
      </MenuItem>
      <MenuItem name="/product" to="http://ygyp.dataquanzhou.com/2023/dataquanzhou.html" class="textsyt">
        产品中心
      </MenuItem>
      <MenuItem name="/contact" to="http://ygyp.dataquanzhou.com" class="textsyt">
        云谷云盘
      </MenuItem>
    </Menu>
  </header>
</template>

<script>

export default {
  name: 'Header',
  data(){
    return{
      scroll:0,
      isChange: true,
      activename:''
    }
  },
  props: {
    msg: String
  },
  mounted(){

    this.activename = this.$route.path
  },
  methods:{

  },
}
</script>

<style scoped>

header{
  position: relative;
  top:0;
  left: 0;
  
  display: flex;
  flex-wrap:nowrap;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: auto;
  padding: 1.5% 5%;
  z-index: 1000;
}

/* header.sticky{
  padding: 5px 100px;
  background: #fff;
} */

header .imagelogo{
  width:20vw;
  height:auto;
  /* border: solid 1px black; */
}
header .menu{
  /* border: solid 1px black; */
  display: flex;
  flex-wrap:nowrap;
  justify-content:flex-end;
  width:auto;
}

header .textsyt{
  font-size: 2vw;
  white-space: nowrap;
}



</style>

<template>
  <footer class="fbody">
    <!-- <Divider /> -->
    <div class="stytext">
      <p>通讯地址：福建省泉州市丰泽区祥泰大厦14-15层、福建省安溪县龙门EC产业园
        总机电话：0595-29010066</p>
       
      <p>版权所有：泉州市数字云谷信息产业发展有限公司 
        <!-- <a  target="_blank" href="http://110.88.153.196:8082/cas/login?service=http%3A%2F%2F110.88.153.196%3A8082%2Fyjsoa%2Fnewxyoa%2F%3F_app_url_%3Dhttp%3A%2F%2F192.168.52.194%3A8080%2Fyjsoa%2F">云谷办公</a> -->
        | <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">闽ICP备17022168号</a></p>
      
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  },
  mounted(){
    
  },
  methods:{

  }
}
</script>

<style scoped>

.stytext{
  position: relative;
  bottom: -13px;
  color:black;
  text-align: center;
  font-size: 10;
  line-height: 20px;
}


.fbody{
  position: relative;
  width: 100%;
  height: 60px;
  /* bottom: 0px; */
  background-color:#e0e0e0;
  /* background-size: cover; */
}

</style>

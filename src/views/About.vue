<template>
  <Header></Header>
  <div class="Habout"></div>
  <div class="banner">
    <Affix :offset-top="50">
      <div class="fixarea">
        <Button size="large" @click="btnselect('gaik')" class="leftbtn" :type="selected.gaik">公司概况</Button>
        <Button size="large" @click="btnselect('orga')" class="leftbtn" :type="selected.orga">组织结构</Button>
        <Button size="large" @click="btnselect('hono')" class="leftbtn" :type="selected.hono">荣誉资质</Button>
        <Button size="large" @click="btnselect('recr')" class="leftbtn" :type="selected.recr">招贤纳士</Button>
        <Button size="large" @click="btnselect('cont')" class="leftbtn" :type="selected.cont">联系我们</Button>
      </div>
    </Affix>
    <Gaik class="Rightlist" v-show="$route.query.class == 'gaik'"></Gaik>
    <Orga class="Rightlist" v-show="$route.query.class == 'orga'"></Orga>
    <Hono class="Rightlist" v-show="$route.query.class == 'hono'"></Hono>
    <Recr class="Rightlist" v-show="$route.query.class == 'recr'"></Recr>
    <Cont class="Rightlist" v-show="$route.query.class == 'cont'"></Cont>
    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue'
import Gaik from '@/components/about/gaikuang.vue'
import Orga from '@/components/about/organization.vue'
import Hono from '@/components/about/honor.vue'
import Recr from '@/components/about/recruit.vue'
import Cont from '@/components/about/contact.vue'
export default defineComponent ({
  components:{
    Header,Gaik,Orga,Hono,Recr,Cont
  },
  setup(){
   
  },
  data(){
    return({
      selected:{gaik:'primary',orga:'default',hono:'default',recr:'default',cont:'default'}
    })
  },
  mounted(){
  },
  methods:{
    btnselect(p:string){
      let Qclass = this.$route.query.class
      if(Qclass == p) return
      this.selected = {gaik:'default',orga:'default',hono:'default',recr:'default',cont:'default'}
      if(p == 'gaik') {
        this.selected.gaik = 'primary' 
        this.$router.push({query:{class:p}
        })
      }
      if(p == 'orga') {
        this.selected.orga = 'primary'
        this.$router.push({query:{class:p}
        })
      }
      if(p == 'hono'){
        this.selected.hono = 'primary'
        this.$router.push({query:{class:p}
        })
      } 
      if(p == 'recr') {
        this.selected.recr = 'primary'
        this.$router.push({query:{class:p}
        })
      }
      if(p == 'cont') {
        this.selected.cont = 'primary'
        this.$router.push({query:{class:p}
        })
      }
    }
  }
  
})

</script>
<style scoped>
.Habout{
  position: relative;
  width: 100%;
  height: 150px;
  background: url(../assets/about/about.png);
  background-size: cover;
}
.fixarea{
  position: relative;
  /* border:black solid 1px; */
  width: 200px;
  margin-left: 40px;
}
.banner{
  position: relative;
  width: 100%;
  height: 100vh;
}
.leftbtn{
  font-size: medium;
  margin-top: 10px;
  width:100%;
  /* border: 1px,solid,black; */

}
.Rightlist{
  position: relative;
  top:-200px;
  left:25vw ;
  width:70vw;
 
  /* border:solid blue 1px; */
}
</style>
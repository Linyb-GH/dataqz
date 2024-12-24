<template>
  <div class="homesty">
    <Header class="homesty" ></Header>
    <img src="../assets/home/banner.png" class="staticbanner">
    <!-- <a :href="adminurl"><img src="../assets/logo.png"></a> -->
    <div class="rowtow">
      <Carousel :autoplay="autoplay" v-model="value" loop class="ca" dots="none"
      :autoplay-speed="speed" arrow="hover" >
        <CarouselItem v-for="(item) in RotateData" :key="item.id" class="Item">
          <router-link :to="{path:'/news/content',query:{'id':item.id}}">
            <div @mouseover="mouseover" @mouseleave="mouseout">
              <img :src="item.cover"  class="carousel" :title="item.title" >
            </div>
            <span class="pctxt">{{item.title}}</span> 
          </router-link>
        </CarouselItem>
      </Carousel>

      <div class="lbody" ref='Label'>
        <Button size="large" type="primary">公司新闻</Button>
        <hr>
        <div class="listdiv">
          <div v-for="(tab) in listdata" :key="tab.id" class="listsyt" >
            <router-link :to="{path:'/news/content',query:{'id':tab.id,'class':tab.class}}" 
              style="color:black;"  >{{tab.title}}</router-link><span class="sright">{{tab.p_date}}</span>
            <!-- <hr> -->
            <!-- <Divider /> -->
          </div>
        </div>
      </div>
      
    </div>
    <Footer class="homesty"></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
//import {request} from '../router/request'
import {WebFront} from '@/router/interface'
export default defineComponent({
  data(){
    return{
      value: 0,
      speed:3000,
      autoplay:true,
      listdata:[{id:'',title:'',p_date:'',class:''}],
      RotateData:[{id:'',title:'',cover:''}],
      ldiv:'1rem'
    }
  },
  mounted(){
    // console.log('Home page')
    // this.$router.replace('/admin')
    this.getRotate()
    this.getNews()
  },
  components:{
    Header,Footer
  },
  methods:{
    mouseover(){
      this.autoplay = false
    },
    mouseout(){
      this.autoplay = true
    },
    async getNews(){
      let x = new WebFront()
      let y = await x.GetHomeNews('',1)
      if(y.ret == 200 ){
        this.listdata = y.data
      }else{
        this.$Message.error(y.msg)
      }
    
    },
    async getRotate(){
      let x = new WebFront()
      let y = await x.GetWebRotate()
      this.RotateData  = y.data
    }
  }
})
</script>
<style scoped>
.homesty{
  /* border: solid 1px black; */
  width:100vw;
}
.staticbanner{
  /* margin-top: 100px; */
  /* position: relative; */
  width: 100vw;
  height: auto;
  background: url(../assets/home/banner.png);
  /* background-size: cover; */
}
.rowtow{
  display: flex;
  flex-wrap:nowrap;
  justify-content:center;
  align-items:flex-start;
  margin:10px 0;
}

.ca{
  width:40vw;
  height: auto;
  margin: 1px,1px;
  /* border: rgb(200, 200, 200) 1px solid; */
}
.pctxt{
  color:black;
  text-align: center;

}
.Item{
  text-align: center;
  padding-bottom: 0.3rem;
  /* background-color: thistle; */
}
.carousel{
  width:100%;
  height: 25vw;
  /* background-color: aqua; */
}

.lbody{
  width:45vw;
  margin-left: 10px;
  text-align: left;
}
.listdiv{
  display:flex;
  flex-direction:column;
  justify-content:space-around; 
  /* height: 20rem; */
  /* border:solid black 1px; */
  /* font-size: medium; */
  /* font-size: 4%; */
}

.listsyt{
  font-size: 1rem; 
  margin-top: 1rem;
  /* border:solid black 1px; */
 
}
.listsyt:hover{
  color:rgb(29, 29, 160);
}
.sright{
  float:right;
  color:rgb(65, 61, 61);
}
</style>
<template>
  <Header></Header>
  <div class="newsheader"></div>
  <div class="newsbody">
    <Affix :offset-top="50">
      <div class="fixarea">
        <Button size="large" @click="btnselect('news')" class="leftbtn" :type="selected.news">企业新闻</Button>
        <Button size="large" @click="btnselect('anno')" class="leftbtn" :type="selected.anno">企业公告</Button>
      </div>
    </Affix>
    <div class="Rightlist"><router-view/></div>

    <NewsList class="Rightlist" v-if = "$route.query.class == 'news'" ></NewsList>
    <AnnoList class="Rightlist" v-else-if="$route.query.class == 'anno'"></AnnoList>
    <!-- <NewsContent v-show="false" class="Rightlist"></NewsContent> -->
    <!-- <Footer></Footer> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import NewsList from '../components/news/NewsList.vue'
import AnnoList from '../components/news/AnnoList.vue'
export default defineComponent({
  setup() {
  },
  data(){
    return({
      selected:{news:'primary',anno:'default'}
    })
  },
  components: {Header,NewsList,AnnoList,
  },
  methods:{
    btnselect(p:string){
      let routeclass = this.$route.query.class
      if(p == routeclass) return
      this.selected={news:'default',anno:'default'}
      if(p == 'news') {
        this.selected.news = 'primary' 
        this.$router.push({
          path:'/news',
          query:{
            class:p
          }
        })
      }
      if(p == 'anno') {
        this.selected.anno = 'primary' 
        this.$router.push({
          path:'/news',
          query:{
            class:p
          }
        })
      }
    }
  }
})
</script>


<style scoped>
.newsheader{
  /* position: relative; */
  width: 100%;
  height: 250px;
  background: url(../assets/news/news.png);
  background-size: cover;
}
.newsbody{
  /* position: relative; */
  width: 100%;
  height: 100vh;
}
.Rightlist{
  position: relative;
  top:-90px;
  left:25vw ;
  width:70vw;
 
  /* border:solid blue 1px; */
}
.fixarea{
  /* border:black solid 1px; */
  width: 200px;
  margin-left: 40px;
}
.leftbtn{
  font-size: medium;
  margin-top: 10px;
  width:100%;

}
</style>

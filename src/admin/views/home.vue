<template>
  <!-- <div class="hello">home page</div> -->
  <Card class="cardsty">
      <template #title>
        <div style="text-align: left;">
          <Icon color="#10fee0" size="20" type="ios-film-outline"></Icon>
          <span style="font-size:15px;">Classic film</span>
        </div>
      </template>
      <template #extra>
        <a href="#" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          <span style="font-size:15px;text-align: center;">Change</span>
        </a>
      </template>
      <p class="ratedemo" v-for="(item,index) in movieList" :key="index">
        <!-- <Button type="text">
          <span>
            <Ellipsis :text="item.name" :lines="1" :transfer="true" tooltip />
          </span>
        </Button> -->
        <!-- <a :href="item.url" target="_blank">
          <Ellipsis :text="item.name" :lines="1" :transfer="true" tooltip />
        </a> -->
        <Ellipsis class="cardlist" @click="c1(index)" :text="item.name" :lines="1"  :transfer="true" tooltip />
        <span>
          2022-03-11 14:00
            <!-- <Rate disabled v-model="item.rate" />{{ item.rate }} -->
        </span>
      </p>
  </Card>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import store from '@/store';
export default defineComponent({
  data(){
    return{
      movieList: [
        {
            name: 'The Shawshank Redemption',
            url: 'https://movie.douban.com/subject/1292052/',
            rate: 9.6
        },
        {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
        },
        {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
        },
        {
            name: 'Leon:The Professional nnnnnnnnnnnnnnnnnnn',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
        },
        {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
        },
        {
            name: 'Leon:The Professional',
            url: 'https://movie.douban.com/subject/1295644/',
            rate: 9.4
        },
      ],
    }
  },
  components:{

  },
  setup() {
    
  },
  mounted(){
    this.changeLimit();
  },
  methods:{
    changeLimit () {
      function getArrayItems(arr:any, num:number) {
          const temp_array = [];
          for (let index in arr) {
              temp_array.push(arr[index]);
          }
          const return_array = [];
          for (let i = 0; i<num; i++) {
              if (temp_array.length>0) {
                  const arrIndex = Math.floor(Math.random()*temp_array.length);
                  return_array[i] = temp_array[arrIndex];
                  temp_array.splice(arrIndex, 1);
              } else {
                  break;
              }
          }
          return return_array;
      }
      
    },
    c1(index:number){
      store.commit('Tab_NewTab',{id:'SelectedPane',label:this.movieList[index].name,component:'TabTest'})
      console.log(index)
    }
  }
})
</script>

<style scoped>
.ratedemo {
  display: flex;
  justify-content: space-between;
  align-items: center;   
}

.cardsty{ 
  width:400px;
  /* padding: 2px 1px; */
  margin: 2px 2px;
}
.cardlist{ 
  cursor:pointer;
}
.cardlist:hover{ 
  color:#3399ff;
}
</style>
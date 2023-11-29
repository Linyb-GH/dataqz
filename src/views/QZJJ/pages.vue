<template>
  <div>
    <!-- <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>点击播放</title>
    </head> -->
    
    <div role="dialog" aria-modal="true" aria-label="音频播放" class="el-dialog" style="margin-top: 10vh; width: 400px;">
      
      <div class="el-dialog__header"></div>
        <div v-for="(item) in imgs" :key="item.key" >
          <div v-if="item.key == $route.query.p" class="el-dialog__body" >
            <div  class="el-zhuti">{{ item.title }}</div> 
            <img :src="'https://www.dataquanzhou.com/uploads/QZJJ/'+item.img" style="width: 375px;height: 220px;" /><br><br>
            <audio :src="'https://www.dataquanzhou.com/uploads/QZJJ/'+item.audio" controls autoplay ></audio>
          </div>
        </div>
        <!-- <div v-if="$route.query.p == '1'" class="el-dialog__body">
          <div class="el-zhuti">九日山祈风石刻</div> 
            <img src="@/assets/QZJJ/01.png" style="width: 375px;height: 220px;" /><br><br>
            <audio  src="http://192.168.27.189/media/QZJJ/01.mp3" controls autoplay ></audio>
        </div>
        <div v-else-if="$route.query.p == '2'" class="el-dialog__body">
          <div class="el-zhuti">市舶司遗址</div> 
          <img src="./02.png" style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./02.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '3'" class="el-dialog__body">
          <div class="el-zhuti">德济门遗址</div> 
            <img src='./03.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./03.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '4'" class="el-dialog__body">
          <div class="el-zhuti">泉州天后宫</div> 
            <img src='./04.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./04.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '5'" class="el-dialog__body">
          <div class="el-zhuti">真武庙</div> 
            <img src='./05.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./05.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '6'" class="el-dialog__body">
          <div class="el-zhuti">南外宗正司遗址</div> 
            <img src='./06.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./06.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '7'" class="el-dialog__body">
          <div class="el-zhuti">泉州府文庙</div> 
            <img src='./07.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./07.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '8'" class="el-dialog__body">
          <div class="el-zhuti">泉州开元寺</div> 
            <img src='./08.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./08.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '9'" class="el-dialog__body">
          <div class="el-zhuti">老君岩造像</div> 
            <img src='./09.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./09.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '10'" class="el-dialog__body">
          <div class="el-zhuti">清净寺</div> 
            <img src='./10.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./10.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '11'" class="el-dialog__body">
          <div class="el-zhuti">伊斯兰教圣墓</div> 
            <img src='./11.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./11.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '12'" class="el-dialog__body">
          <div class="el-zhuti">草庵摩尼光佛造像</div> 
            <img src='./12.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./12.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '13'" class="el-dialog__body">
          <div class="el-zhuti">磁灶窑址</div> 
            <img src='./13.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./13.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '14'" class="el-dialog__body">
          <div class="el-zhuti">德化窑址</div> 
            <img src='./14.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./14.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '15'" class="el-dialog__body">
          <div class="el-zhuti">安溪青阳下草埔冶铁遗址</div> 
            <img src='./15.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./15.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '16'" class="el-dialog__body">
          <div class="el-zhuti">洛阳桥</div> 
            <img src='./16.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./16.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '17'" class="el-dialog__body">
          <div class="el-zhuti">安平桥</div> 
            <img src='./17.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./17.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '18'" class="el-dialog__body">
          <div class="el-zhuti">顺济桥遗址</div> 
            <img src='./18.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./18.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '19'" class="el-dialog__body">
          <div class="el-zhuti">江口码头</div> 
            <img src='./19.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./19.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '20'" class="el-dialog__body">
          <div class="el-zhuti">石湖码头</div> 
            <img src='./20.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./20.mp3" controls:string="controls"></audio>
        </div>
        <div v-else-if="$route.query.p == '21'" class="el-dialog__body">
          <div class="el-zhuti">六胜塔</div> 
            <img src='./21.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./21.mp3" controls:string="controls"></audio>
        </div>
        <div  v-else-if="$route.query.p == '22'" class="el-dialog__body">
          <div class="el-zhuti">万寿塔</div> 
            <img src='./22.png' style="width: 375px;height: 220px;" /><br><br>
          <audio autoplay:string="autoplay"  src="./22.mp3" controls:string="controls"></audio>
        </div>
        <div v-else></div> -->
    </div>
    <div class="el-foot">泉州市公安局交通警察支队（宣）</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue'
// @ is an alias to /src
export default defineComponent ({
  data(){
    return({
      imgs:[
        {key:'1',title:'九日山祈风石刻',audio:'01.mp3',img:'01.png'},
        {key:'2',title:'市舶司遗址',audio:'02.mp3',img:'02.png'},
        {key:'3',title:'德济门遗址',audio:'03.mp3',img:'03.png'},
        {key:'4',title:'泉州天后宫',audio:'04.mp3',img:'04.png'},
        {key:'5',title:'真武庙',audio:'05.mp3',img:'05.png'},
        {key:'6',title:'南外宗正司遗址',audio:'06.mp3',img:'06.png'},
        {key:'7',title:'泉州府文庙',audio:'07.mp3',img:'07.png'},
        {key:'8',title:'泉州开元寺',audio:'08.mp3',img:'08.png'},
        {key:'9',title:'老君岩造像',audio:'09.mp3',img:'09.png'},
        {key:'10',title:'清净寺',audio:'10.mp3',img:'10.png'},
        {key:'11',title:'伊斯兰教圣墓',audio:'11.mp3',img:'11.png'},
        {key:'12',title:'草庵摩尼光佛造像',audio:'12.mp3',img:'12.png'},
        {key:'13',title:'磁灶窑址',audio:'13.mp3',img:'13.png'},
        {key:'14',title:'德化窑址',audio:'14.mp3',img:'14.png'},
        {key:'15',title:'安溪青阳下草埔冶铁遗址',audio:'15.mp3',img:'15.png'},
        {key:'16',title:'德化窑址',audio:'16.mp3',img:'16.png'},
        {key:'17',title:'德化窑址',audio:'17.mp3',img:'17.png'},
        {key:'18',title:'德化窑址',audio:'18.mp3',img:'18.png'},
        {key:'19',title:'德化窑址',audio:'19.mp3',img:'19.png'},
        {key:'20',title:'德化窑址',audio:'20.mp3',img:'20.png'},
        {key:'21',title:'德化窑址',audio:'21.mp3',img:'21.png'},
        {key:'22',title:'德化窑址',audio:'22.mp3',img:'22.png'},
      ]
    })
  },
  setup() {
    const show = ref('1')
    return {
      show
    }
  },
  mounted(){
    console.log(this.$route.query.p)

    // this.class = this.$route.query.class
    // console.log(this.$route.query)
  },
  components: {

  },
  methods:{
    
  }

})

</script>
<style scoped>
.el-dialog {
  border-radius: 8px!important;
  position: relative;
  margin: 0 auto 50px;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
}
.el-dialog__header {
  padding: 20px 20px 10px;
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  padding-top: 10px;
  text-align:center;
}  
.el-zhuti{
  height: 40px; 
  white-space: 
  nowrap; 
  overflow: 
  hidden; 
  text-overflow: 
  ellipsis;
  font-size: 150%;
  line-height: 1em;
}
.el-foot{
  width: 100%;
  height:30px;
  position: fixed;
  bottom: 50px;
  font-size:14px;
  color:rgb(63, 63, 63);
  text-align:center;
  left:0px;
}
</style>
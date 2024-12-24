<template>
  <Modal v-model="modalstatus.isshow" fullscreen footer-hide  @on-visible-change="IsShowTask" >
    
  </Modal>
</template>

<script lang="ts">
import { defineComponent ,ref} from 'vue'
import { Input } from 'view-ui-plus';

export default defineComponent({
  props:["message"],
  emits:['actions'],
  setup() {
  },
  data(){
    return {
      modalstatus:{isshow:true}
    }
  },
  mounted(){
    
  },
  methods:{
    IsShowTask(isshow:boolean){
      if(isshow){
      }else{
        let int={action:'closed',data:''}
        this.$emit('actions',int)
      }
    },
  },
  computed:{
  },
})
</script>

<style scoped>
.bodysty{ 
  min-height: 600px;
  min-width: 900px;
}


</style>
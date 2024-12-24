<template>
  <div class="bodysty">
    this is test tab
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//store.commit('Tab_NewTab',{id:'SelectedPane',label:'xxx',component:'TabTest',data:{}})
export default defineComponent({
  setup() {
    
  },
  mounted(){
    console.log(this.message)
  },
  props:[
    "message"
  ],
})
</script>

<style scoped>

.bodysty{ 
  min-width: 900px;
}
</style>
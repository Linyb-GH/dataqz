<template>

    
<Table size="small"  :columns="columns" :data="data5">

</Table>

</template>

<script>

export default {
  props:[
    "message",
    "fcolumns"
  ],
  data () {
    return {

      columns: [],
      data5: [],
    }
  },
  mounted(){
    // this.columns = this.fcolumns
    this.columns = this.fcolumns
    this.data5 = this.message.data.message
    console.log(this.message)
    // console.log(this.fcolumns)
  },
 
  methods: {

  },

}
</script>

<style scoped>

</style>
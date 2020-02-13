<template>
<Tabs ref="contents" type="card"  >
  <!-- <router-view></router-view> -->
  <TabPane label="page1" key="page1" >
    <p>this is page 1</p>
  </TabPane>
</Tabs>
</template>

<script>
export default {
  data(){
    return{
      show:true
    }
  },
  methods: {
    handleTabRemove (name) {
      this.show = false;
    }
  },
  created(){
    this.$store.commit('showpg','page1')
  }
}
</script>
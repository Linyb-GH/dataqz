<template>
<Tabs ref="contents" type="card"  >
  <TabPane label="page2">
    <p>this is page 2</p>
    <button @click="buttontest">测试按钮</button>
  </TabPane>
  <TabPane label="page2-1">
    <p>this is page 2-1</p>
    <button @click="buttontest">测试按钮</button>
  </TabPane>
  <TabPane v-for="tab in tabs" :key=tab :label="tab">
    <p>{{tab}}</p>
  </TabPane>
</Tabs>
</template>

<script>
export default {
  data () {
    return {
      tabs:["abc","def"]
    }
  },
  // created:{

  // },
  methods: {
    buttontest(){
      this.tabs.splice(this.tabs.length,0,"add")
      console.log(this.$store.state.showcurrent.indexOf("tab1")== -1)
    }
  }
}
</script>
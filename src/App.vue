<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch('verifyLogin',this)
  },
  mounted() {
    //  const userJsonStr  =  sessionStorage.getItem("user");
    //  const perpetual =  localStorage.getItem("user");
    //  console.log(userJsonStr)
    //  if(userJsonStr || perpetual){
    //    this.$router.push("/admin");
    //  }else{
    //    this.$router.push("/login");
    //  }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body,
html,
#app {
  height: 100%;
}
</style> 

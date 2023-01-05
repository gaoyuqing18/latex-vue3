<script setup>
  import HelloWorld from "./components/HelloWorld.vue";
  import { onMounted } from "vue"
  onMounted(() => {
     var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

    //获取页面的HTML Dom
    var htmlDom = document.getElementsByTagName('html')[0];

    htmlDom.style.fontSize = htmlWidth / 10 + 'px';

    window.addEventListener('resize',function(e){
      var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
      htmlDom.style.fontSize = htmlWidth / 10 + 'px';
    })
  })
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>

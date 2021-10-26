<template>
  <div id="app">
    <Header
    class="header"
    />
    <router-view
      class="view"
    />
    <Footer

    />
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  components: { Header, Footer }
}
</script>
<style>
@import './styles/app.css';
.header {
  z-index: 10000;
   position: fixed;
   top: 0px;
   width: 100%;
}
.view {
  margin-top: 5rem;
  min-height: 80vh;
}
</style>

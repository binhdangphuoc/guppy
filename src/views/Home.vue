<template>
  <div class="home">
    <Slider/>
    <ListShow
      :listFish = hot_sale
      :title = title1
    />
    <ListShow
      :listFish = guppy
      :title = title2
    />
    <Blog
      :blogs = blogs
    />
    <Contact />
  </div>
</template>

<script>
import Blog from '../components/home/Blog.vue'
import Contact from '../components/home/Contact.vue'
import ListShow from '../components/home/ListShow.vue'
import Slider from '../components/home/Slider.vue'

import {mapState} from 'vuex'
  export default {
    name: 'Home',

    components: {
      Blog, Contact, ListShow, Slider
    },
    async beforeCreate() {
      await this.$store.dispatch("getHomePage")
    },
    computed: {
      ...mapState({
        hot_sale: (state) => state.home.hot_sale,
        guppy: (state) => state.home.guppy,
        blogs: (state) => state.home.blogs
        // hot_sale: { type: Array },
        // guppy: { type: Array },
        // blogs: { type: Array }
      })
    },
    data() {
      return {
        title1: "hot sale",
        title2: "guppy",
      }
    }
  }
</script>

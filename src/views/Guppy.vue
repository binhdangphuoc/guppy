<template>
  <div class="guppy">
      <Search
        class="search"
        :names = names
        :colors = colors
        :prices = prices
        @search = "search"
      />
      <Show
        class="show"
        :list_guppy = list_guppy
        @loadPage = loadPage
      />
  </div>
</template>

<script>
import Search from '../components/guppy/Search.vue'
import Show from '../components/guppy/Show.vue'

import { mapState } from "vuex"

export default {
    name: 'Guppy',
    components: {
      Search, Show
    },

    data() {
      return {

      }
    },
  // beforeMount() {
  //   let path = this.$router.currentRoute.path.slice(11, this.$router.currentRoute.path.length)
  //   console.log(path)
  //   this.loadPage(path)
  // },
    computed: {
      ...mapState ({
        names: (state) => state.home.names,
        colors: (state) => state.home.colors,
        prices: (state) => state.home.prices,
        list_guppy: (state) => state.guppy.list_guppy,
      })
    },
    methods: {
      loadPage(page) {
        console.log(page)
        // this.$router.push({path:'page'+page});
        this.$store.dispatch("getListGuppy", page)
      },
      search(valNames, valColors, valPrices) {
        console.log(valNames, valColors, valPrices)
      }
    }
}
</script>

<style>
.guppy {
  display: flex;
}
.guppy .search {
  width: 15rem;
}
.guppy .show {
  width: calc(100% - 15rem);
}
</style>
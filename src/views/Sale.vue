<template>
  <div class="hot-sale">
      <Show
        class="show"
        :list_guppy = list_guppy
        @loadPage = loadPageSale
      />
  </div>
</template>

<script>
import Show from '../components/guppy/Show.vue'
import { mapState } from "vuex"

export default {
    name: 'Guppy',
    components: {
      Show
    },

    data() {
      return {

      }
    },
    methods: {
      loadPageSale(page) {
        console.log("sale:", page)
        // this.$router.push({path:'page'+page});
        this.$store.dispatch("getSale", page)
      },
    },
    // async beforeCreate() {
    //   await this.$store.dispatch("getSale", 1)
    //   console.log("da goi guppy")
    // },
    computed: {
      ...mapState ({
        names: (state) => state.home.names,
        colors: (state) => state.home.colors,
        prices: (state) => state.home.prices,
        list_guppy: (state) => state.guppy.list_guppy,
      })
    },

}
</script>

<style>

</style>
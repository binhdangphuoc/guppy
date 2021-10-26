import Vue from "vue"

const myMixin = Vue.mixin({
  filters: {
    currencyFormat :  function (n) {
      return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(n)
    },
    saleFormat : function(n) {
      return n*100 + '%'
    }
  },
  methods: {
    click(guppy) {
      this.$store.dispatch("getGuppyDetail", guppy)
      console.log(guppy)
    },
    addToCart(guppy, cnt) {
      this.$store.dispatch("addToCart", {"guppy": guppy ,"cnt": cnt})
      console.log("add to cart ", guppy, cnt)
    },
    removeToCart(id) {
      this.$store.dispatch("removeToCart", id)
      console.log("remove to cart ", id)
    },

  },
  data() {
    return {
      i: 0,
    }
  }
})

export default myMixin
<template>
  <div class="show">
    <div class="list-guppy">
      <div class="guppy" v-for="guppy in list_guppy" :key="guppy.id">
        <div class="status" v-show = "!guppy.status" >
          <img src="../../assets/soldout.jpg" alt="sold out">
          </div>
        <div class="icon-sale" v-if="guppy.sale > 0">
          {{ guppy.sale | saleFormat }}
        </div>

        <div class="image">
          <a :href="'/detail/' + guppy.id" @click="click(guppy)">
            <img :src="guppy.image" alt="guppy">
          </a>
        </div>

        <div class="info">
          <p class="name">{{ guppy.name }}</p>
          <p class="price" style="color:red; font-weight: bold;">{{ guppy.price*(1-guppy.sale) | currencyFormat }}</p>
        </div>
        <button class="btn" v-if="guppy.status">
          <div class="fas fa-cart-plus" @click="addToCart(guppy,1)">Add</div>
        </button>
      </div>
    </div>
    <div class="pages">
      <a href=""></a>
      <div class="fas fa-backward" v-show="pageCurrent > 1" @click="prevPage()"></div>
      <div class="fas fa-forward" v-show="!pageMax" @click="nextPage()"></div>
    </div>
  </div>
</template>

<script>
export default {
  // filters: {
  //     currencyFormat: function (n) {
  //       return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(n)
  //     },
  //     saleFormat: function(n) {
  //       return n*100 + '%'
  //     }
  //   },
    name: 'Show',
    props: {
      list_guppy: {
        type: Array
      }
    },
  data() {
    return {
      pageCurrent: 1,
      pageMax: false,
    }
  },
  mounted() {
    let path = ''
    if(this.$router.currentRoute.path.includes('guppy')) {
      path = this.$router.currentRoute.path.slice(11, this.$router.currentRoute.path.length)
    } else {
      path = this.$router.currentRoute.path.slice(10, this.$router.currentRoute.path.length)
    }
    this.$emit("loadPage", path)
    this.pageCurrent = path
  },
  methods: {
    async nextPage() {
      if(this.pageMax==true) return
      this.pageCurrent ++;
      this.$router.push({path:'page' + this.pageCurrent});
      await this.$emit("loadPage", this.pageCurrent)

    },
    async prevPage() {
      if(this.pageCurrent==1) return
      this.pageCurrent --;
      this.$router.push({path:'page' + this.pageCurrent});
      await this.$emit("loadPage", this.pageCurrent)
    },
  }
}
</script>

<style scoped>
.show {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-guppy {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.list-guppy .guppy {
  width: 18rem;
  height: 25rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  background: gray;
  border-radius: 10px;
  overflow: hidden;
}
.list-guppy .guppy .image {
  width: 100%;
  height: 18rem;
}
.list-guppy .guppy .image a img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.list-guppy .guppy .info {
  height: 3rem;
  text-align: center;
  margin-top: 1rem;

}
.list-guppy .guppy .info > * {
    font-size: 1.3rem;

}
.list-guppy .guppy .btn {
  height: 2rem;
  margin: 0.5rem auto;
}
.list-guppy .guppy .status {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.status img {
  width: 100%;
  height: 100%;

}
.list-guppy .guppy .icon-sale {
  width: 60px;
  height: 30px;
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  top: 5%; left: 5%;
  background: white;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  /* transform: translate(50%, 50%); */
}

.pages {
  display: flex;
  align-items: center;
  justify-content: center;

}
.pages >* {
  margin: 0 2rem;
  background: white;
  padding: .2rem .5rem;
  border-radius: .2rem;
  overflow: hidden;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
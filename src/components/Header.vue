<template>
  <div class="header" :class="{'scroll' : scrollY}">
    <a href="/" class="logo">
      <img src="../assets/logo.png" alt="logo">
    </a>
    <div class="navbar" v-bind:class = "{ 'showNav': showNavbar}">
      <a href="/">home</a>
      <a href="/sale/page1">sale</a>
      <a href="/guppy/page1">guppy</a>
      <a href="/blogs/page1">blog</a>
      <a href="/contact">contact</a>
    </div>
    <div class="icons">
      <div class="fas fa-search" id="search-btn" @click="showSearch = !showSearch; outsideSearch = false"></div>
      <div class="fas fa-shopping-cart" id="cart-btn" @click="showCart = !showCart; showNavbar = false; showSearch = false"></div>
      <div class="fas fa-bars" id="menu-btn" @click="showNavbar = !showNavbar; showSearch = false; showCart = false" v-click-outside = "hideNav"></div>
    </div>
    <div class="search-form" :class="{'active': showSearch}">
      <input type="search" id="search-box" placeholder="Search here">
      <button class="fas fa-search" @click="search"></button>
    </div>
    <div class="cart-items-container" :class="{'show-cart': showCart}">
      <ul class="cart-item">
        <li v-for="item in cartItems" :key="item.guppy.id">
          <div class="fas fa-times" @click="removeToCart(item.guppy.id)"></div>
          <a href="#" class="image-item">
            <img :src= "item.guppy.image" alt="image">
          </a>
          <div class="info-item">
            <h3>{{ item.guppy.name }}</h3>
            <p><strong>Price:</strong> {{ item.guppy.price*(1-item.guppy.sale) }}</p>
            <p><strong>Quantity:</strong> {{ item.cnt }}</p>
          </div>
        </li>
      </ul>
      <button class="btn checkout-btn" v-show="cartItems.length > 0">
        <a href="/checkout">Checkout</a>
      </button>
      <div class="empty" v-show="cartItems.length<=0">
        <p style="font-size: 1.5rem; margin: 1rem auto">Your cart is empty</p>
        <a href="/guppy/page1"><button class="btn" style="margin: 1rem auto; ">Shop now</button></a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {

    name: 'Header',

    mounted() {
      window.addEventListener("scroll", this.onScroll)
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll)
    },
    computed: {
      ...mapState({
        cartItems: (state) => state.guppy.cart
      })
    },
    data() {
      return {
        // cartItems: [
        //   {
        //     id: 1,
        //     name: 'Full Red',
        //     price: 300000,
        //     img: 'https://cakhoecasung.com/wp-content/uploads/2019/11/vi-sinh-song-livepro-ca-bay-mau-ca-guppy-full-red-12.jpg',
        //     quantity: 1
        //   },
        //   {
        //     id: 2,
        //     name: 'Koi red ear',
        //     price: 500000,
        //     img: 'https://cabaymau.vn/wp-content/uploads/2021/06/koi-red-ear.jpg',
        //     quantity: 2
        //   },
        //   {
        //     id: 3,
        //     name: 'Blue Topaz',
        //     price: 2500000,
        //     img: 'https://guppynhatminh.com/wp-content/uploads/2020/09/Blue-topaz-guppy-3.jpg',
        //     quantity: 3
        //   },
        // ],
        showCart: false,
        showNavbar: false,
        showSearch: false,
        scrollY: false,
      }
    },
  methods: {
    hideSearch() {
      if (this.outsideSearch == true)
      this.showSearch = false
    },
    hideCart() {
      this.showCart = false
    },
    hideNav() {
      this.showNavbar = false
    },

    search() {
      this.showSearch = false
    },
    onScroll() {
        this.windowTop = window.scrollY;
        if(this.windowTop > 50) this.scrollY = true;
        else this.scrollY = false
    }
  },

}
</script>

<style scoped>
  @import '../styles/header.css';
</style>
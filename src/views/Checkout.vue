<template>
  <div class="checkout">
      <div class="items">
          <div class="item" v-for="(item,index) in cart" :key="item.guppy.id">
              <div class="image">
                  <a href="'/detail'+item.id">
                    <img :src="item.guppy.image" alt="image">
                  </a>
              </div>
              <div class="info">
                  <p>STT: {{ index+1 }}</p>
                  <p>Name:</p>
                  <p style="font-weight: bold; font-size: 1.3rem;">{{ item.guppy.name }}</p>
                  <p>Price:</p>
                  <div class="price">
                      <span :class="{'have-sale':  item.guppy.sale>0 }" style="font-size: 1.3rem">{{ item.guppy.price | currencyFormat }}</span>
                      <span class="fas fa-level-down-alt" v-show="item.guppy.sale>0" style="padding: 0 1rem;"></span>
                      <span v-show="item.guppy.sale>0" style="font-size: 1.3rem">{{ (1-item.guppy.sale)*item.guppy.price | currencyFormat }}</span>
                  </div>
                  <div class="quantity">
                      <input type="number" v-model="item.cnt" min="1">
                      <div class="remove" @click="removeToCart(item.guppy.id)">
                          <i class="fas fa-trash-alt"></i>
                      </div>
                  </div>
              </div>
        </div>
      </div>
        <div class="submit">
            <div class="total">Total: {{ total | currencyFormat }}</div>
            <button class="btn btn-checkout">checkout</button>
        </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'checkout',
    computed: {
        ...mapState({
            cart: (state) => state.guppy.cart,
            total: function () {
                let sum = 0;
                for(let i in this.cart) {
                    sum += this.cart[i].cnt * this.cart[i].guppy.price*(1-this.cart[i].guppy.sale)
                }
                return sum;
            }
        }),
    },
}
</script>

<style>
.checkout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem .5rem ;
}
.items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

}
.items .item {
    width: 28rem;
    height: 15rem;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 2rem;
    background: white;
}
.item .image {
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    object-fit: cover;
}
.item .image a img {
    width: 100%;
    height: 100%;
}

.item .info {
    width: 10rem;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
}
.item .info >* {
    margin-top: .2rem;
    margin-bottom: .2rem;
}
.item .info .quantity input {
    height: 2rem;
    width: 4rem;
    font-size: 1.5rem;
}
.quantity {
    display: flex;
    align-items: center;

}
.quantity .remove i{
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 2rem;
}
.submit {
    display: flex;
    align-items: center;
    justify-content: center;
}
.submit >* {
    margin: 1rem 2rem;
}
.btn-checkout {
    height: 4rem;
    width: 15rem;
    background: white;
    color: black;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
}
.btn-checkout:hover {
    background: greenyellow;
}
.total {
    font-size: 2rem;
    font-weight: bold;
}

@media (max-width: 650px) {
    .items  {
        flex-direction: column;
        align-items: center;

    }
    .items .item {
        width: auto;
    }
}
@media (max-width: 400px) {
    .submit {
        flex-direction: column;
    }
}
</style>
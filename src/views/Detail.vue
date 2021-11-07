<template>
  <div class="show-detail">
      <div class="detail">
        <div class="col-1" >
            <div class="image-active">
                <img :src="detail.guppy.image" alt="image-Show" style="width: 100%; height: 100%">
            </div>
            <div class="images">
                <img class="image"  v-for="(image,index) in detail.images" :key="index" :src="image" alt="image" style="width: 100%; height: 100%" @click="i=index">
            </div>
        </div>
        <div class="col-2">
            <h3>{{ detail.guppy.name }}</h3>
            <div class="describe">
                {{ detail.guppy._describe }}
            </div>
            <div class="small">
                <div class="price">
                    <span :class="{ 'have-sale': detail.guppy.sale>0 }">{{ detail.guppy.price | currencyFormat }}</span>
                    <span v-show="detail.guppy.sale>0">{{ detail.guppy.price*(1-detail.guppy.sale) | currencyFormat }}</span>
                </div>
                <div class="quantity">
                    <input type="number" min="1" max="detail.quantity" v-model="quantity" v-if="detail.quantity > 0">
                    <p style="font-size: 1.5rem; margin-top: 1.5rem;">In stock: {{ detail.quantity }}</p>
                </div>
            </div>

            <button class="btn" @click="addToCart()" v-if="detail.quantity > 0">Add to cart</button>
        </div>
      </div>
    <div class="video">
        <iframe width="560" height="315" v-for="(video,index) in detail.videos" :key="index" :src="detail.videos[index]" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: 'Detail',
    // async beforeCreate() {
    //     await this.$store.dispatch("getDetail", 1)

    // },
    async beforeMount() {

        this.idDetail = this.$route.path.substr(8,this.$route.path.length)
        console.log(" =>befor mount view detail: ", this.idDetail)
        await this.$store.dispatch("getGuppyDetail", this.idDetail);
    },
    mounted() {
        console.log("get detail (view): ",this.detail)

    },
    data() {
        return {

            quantity: 1,

        }
    },
    computed: {
        ...mapState({
            detail : (state) => state.detail.guppy_detail
        })
    },
    methods: {
        showdetail() {
            console.log("=>",this.detail.id)
        },
        addToCart() {
            this.$store.dispatch("addToCart", {guppy: this.detail.guppy, cnt: this.quantity})
        }
    }
}
</script>

<style>
.show-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.detail {
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
.detail .col-1 {
    width: 30rem;
    height: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: .5rem;
    background: white;
    border: 2px solid red;
}
.detail .col-1 .image-active {
    width: 100%;
    height: 32rem;
    object-fit: cover;
}
.detail .col-1 .images {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 8rem;
    height: 8rem;
    object-fit: cover;
}
.detail .col-1 .images .image {
    margin-right: .5rem;
}

.detail .col-2 {
    display: flex;
    flex-direction: column;
    height: 40rem;
    width: 30rem;
    margin-left: .5rem;
    background: white;
}
.detail .col-2 h3 {
    margin: 2rem auto;
    height: 2rem;
}
.detail .col-2 .describe {
    font-size: 1.3rem;
    height: 16rem;
}
.detail .col-2 .small {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5rem;
}
.detail .col-2 .price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
}
.detail .col-2 .price >* {
    height: 4rem;
    font-size: 2rem;
    line-height: 4rem;
}
.detail .col-2 .price .have-sale {
    text-decoration: line-through;
}
.detail .col-2 .quantity input {
    height: 3rem;
    width: 5rem;
    font-size: 2rem;
}
.detail .col-2 button {
    height: 4rem;
    width: 15rem;
    margin: 0 auto;
    font-size: 2rem;

}

.show-detail .video {
    width: auto;
    height: 30rem;
}

@media (max-width:650px) {
    .detail {
        flex-direction: column;
    }
    .detail >* {
        width: 90%;
    }
    .video {
        width: 100%;
        height: auto;
        margin: 0 auto;
        object-fit: cover;
    }
}
</style>
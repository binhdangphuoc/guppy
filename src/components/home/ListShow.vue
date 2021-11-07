<template>
  <div class="sale">
      <div class="title">
        <h2>{{ title }}</h2>
        <!-- <p>Time from {{ timeSaleFrom }} to {{ timeSaleTo }}</p> -->
      </div>
      <a href="#" class="more">see more</a>

        <div class="list-fish-content" ref="one_fish">
          <div class="animation" ref="list_sale">

              <!--list-->
            <div class="list-fish" v-for="(fish,index) in listFish" :key="index" >

                <div class="status" :class="{'soldout' : fish.status}"><img src="../../assets/soldout.jpg" alt="sold out"></div>

                <div class="icon-sale" v-if="fish.sale > 0">
                  {{ fish.sale | saleFormat }}
                </div>
                <div class="image">
                  <a :href="'/detail/' + fish.id">
                    <img :src="fish.image" alt="fish">
                  </a>
                </div>

                <div class="info">
                  <div class="name">{{ fish.name }}</div>
                  <div class="price">
                    <span :class="{'have-sale' : fish.sale>0}">{{ fish.price | currencyFormat }}</span>
                    <i v-if="fish.sale" class="fas fa-angle-double-right"></i>
                    <span v-if="fish.sale>0">{{ (1-fish.sale)*fish.price | currencyFormat }}</span>
                  </div>
                </div>
                <div class="icons" v-if="!fish.status">
                  <div class="fas fa-cart-plus" @click="addToCart(fish, 1)" v-if="fish.status == true">Add</div>
                </div>

            </div>
          </div>

          <div class="slide-prev btn-handle" @click="btnPrev" ><i class="fas fa-chevron-left"></i></div>
          <div class="slide-next btn-handle" @click="btnNext" ><i class="fas fa-chevron-right"></i></div>
        </div>
  </div>

</template>

<script>
import $ from 'jquery'

export default {
    name: 'Sale',
    // filters: {
    //   currencyFormat: function (n) {
    //     return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(n)
    //   },
    //   saleFormat: function(n) {
    //     return n*100 + '%'
    //   }
    // },
    mounted:
      async function() {
        //calc size of width window and set class1/2/3
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        if(this.mywindow.width >= 700) {
          this.$refs.one_fish.classList.add('my-class1')
          this.limited = -50
        }
        else if(this.mywindow.width >= 550) {
          this.$refs.one_fish.classList.add('my-class2')
          this.limited = -66.667
        }
        else {
          this.$refs.one_fish.classList.add('my-class3')
          this.limited = -83.333
        }

        //auto next slide
        for(;;) {
          this.$refs.list_sale.style.left= this.dis + "%"
          var a = await new Promise(function(rs) {
              setTimeout(()=> rs(true),5000);
              $('.btn-handle').click(() => rs(false));
          });
            if(a) {
              this.btnNext()
            }
         }
      },
    props: {
      listFish: {
          type: Array
      },
      title: String
    },
    data() {
      return {
        mywindow: {
            width: 0,
            height: 0
        },
        dis: 0,
        limited: -50,
        denta: 16.667,
        timeSaleFrom: '05-10-2021',
        timeSaleTo: '10-10-2021',

      }
    },
    methods: {
      btnPrev() {
        if(this.dis >=0) this.dis = this.limited;
        else this.dis += 16.667
      },
      btnNext() {
        if(this.dis <= (this.limited+1)) this.dis = 0;
        else this.dis -= 16.667
      },
      handleResize() {
            this.mywindow.width = window.innerWidth;
            this.mywindow.height = window.innerHeight;
      },
      // async detail(index) {
      //   await this.$store.dispatch("getGuppyDetail", index);
      //   console.log("get")
      // }
    },
    computed: {
      size1() {
        if(this.mywindow.width>=700) return true
        else return false
      },
      size2() {
        if(this.mywindow.width>=500 && this.mywindow.width<700) return true
        else return false
      },
      size3() {
        if(this.mywindow.width<500) return true
        else return false
      },
    },
    watch: {
      //size1 size2 size3 to set class depend on width of window
      size1: function(val) {
        if(val) {
          this.limited = -50
          this.$refs.one_fish.classList.add('my-class1')
          this.$refs.one_fish.classList.remove('my-class2')
          this.$refs.one_fish.classList.remove('my-class3')
        }
      },
      size2: function(val) {
        if(val) {
          this.limited = -66.667
          this.$refs.one_fish.classList.remove('my-class1')
          this.$refs.one_fish.classList.add('my-class2')
          this.$refs.one_fish.classList.remove('my-class3')
        }
      },
      size3: function(val) {
        if(val) {
          this.limited = -83.333
          this.$refs.one_fish.classList.remove('my-class1')
          this.$refs.one_fish.classList.remove('my-class2')
          this.$refs.one_fish.classList.add('my-class3')
        }
      }
    }
}
</script>

<style scoped>

.sale {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sale .title {
  margin: 1rem auto;
  text-align: center;
}
.sale .title h2 {
  font-size: 3rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-transform: uppercase;
  color: red;
  padding-top: 1rem;
}
.sale .title p {
  font-size: 1.5rem;
  font-style: italic;
}

.sale .list-fish-content .list-fish .icons {
  /* position: absolute;
  top: 50%;
  left: 50%; */
  z-index: 5;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  /* transform: translate(-50%, -50%); */
  margin: 5px auto;
}
.sale .list-fish-content .list-fish .icons > * {

  width: 6rem;
  height: 3rem;
  margin: 10% auto;
  text-align: center;
  font-size: 1.5rem;
  line-height: 3rem;
  border-radius: 10%;
  background-color: white;
  visibility: visible;
}
.sale .list-fish-content .list-fish .icons > *:hover {
  background-color: yellow;
}
.sale .list-fish-content .list-fish .status {
  opacity: 0;
  width: 5rem;
  height: 5rem;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
  z-index: 1;
  text-align: center;
  border-radius: 30%;
  overflow: hidden;
}
.sale .list-fish-content .list-fish .status.soldout {
  opacity: 1;
}
.sale .list-fish-content .list-fish .status img {
  width: 100%;
  height: 100%;
}
.sale .more {
  align-self: flex-end;
  text-align: right;
  font-style: italic;
  color: black;
  margin-top: -2rem;
  margin-right: 3rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  text-transform: capitalize;
  text-decoration: underline;
}

.sale .list-fish-content {
  height: 60vh;
  overflow: hidden;
  position: relative;
}
.sale .list-fish-content .animation {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  height: 100%;

}
.sale .list-fish-content .animation .list-fish{
  text-align: center;
  box-shadow: 10px 10px 30px rgba(0,0,0,0.2);
  height: 60vh;
  margin: 0 .5%;
  border-radius: 10px;
  position: relative;
  background: rgb(65, 64, 64);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
/* add class 1-2-3 */
.sale .list-fish-content.my-class1 {
  width: 200%;
}
.sale .list-fish-content.my-class1 .animation > *{
  width: 30%;
}
.sale .list-fish-content.my-class2 {
  width: 300%;
}
.sale .list-fish-content.my-class2 .animation > *{
  width: 50%;
}
.sale .list-fish-content.my-class3 {
  width: 600%;
}
.sale .list-fish-content.my-class3 .animation > *{
  width: 100%;
}



.sale .list-fish-content .list-fish:hover .icons > *{
  visibility: visible;
  /* animation: fade 0.5s; */
}
.sale .list-fish-content .animation .list-fish .image {
  width: 100%;
  height: 40vh;
  overflow: hidden;
}
.sale .list-fish-content .list-fish:hover .image img{
  transform: scale(1.1);
}
@keyframes fade {
  0% {opacity:0;}
  100% {opacity: 1;}
}

.sale .list-fish-content .list-fish .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}
.slide-prev {
  width: 3rem;
  height: 3rem;
  /* opacity: 0; */
  position: absolute;
  top: 40%;
  left: .5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .5s ease;
}
.btn-handle i {
    font-size: 3rem;
    color: white;
}
.slide-next {
  width: 3rem;
  height: 3rem;
  /* opacity: 0; */
  position: absolute;
  top: 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .5s ease;
}
.my-class1 .slide-next {
    left: 47.5%;
}
.my-class2 .slide-next {
    left: 31%;
}
.my-class3 .slide-next {
    left: 15%;
}
.sale .list-fish-content:hover .btn-handle {
  opacity: 1;
}

.info {
  height: 5vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
}
.info .name {
  line-height: 4vh;
  color: white;
  font-size: 1.4rem;

}
.info .price span{
  line-height: 4vh;
  color: white;
  font-size: 1.5rem;

}
.info .price {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info .price i{
  font-size: 1.5rem;
  margin: 0 1rem;
  color: greenyellow;
}
.my-class3 .info .name {
  font-size: 2.2rem;
}
.my-class3 .info .price span {
  font-size: 2rem;
}
.info .price .have-sale {
  font-style: initial;
  text-decoration: line-through solid red;
  color: while;
  /* text-decoration: green; */
  animation: nhapnhay 1.5s infinite;
}
.info .price span:last-child {
  color: red;
}
@keyframes nhapnhay{
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.icon-sale {
  width: 6rem;
  height: 3rem;
  font-size: 2rem;
  line-height: 3rem;
  display: inline-block;
  text-align: center;
  background-color: white;
  color: red;
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 0;
  animation: nhapnhay 1.5s infinite;
  border-radius: 10%;

}

@media (min-width:700px) {
  .slide-prev  {
    opacity: 0;
  }
  .slide-next {
    opacity: 0;
  }
}
/* @media (max-width:460px) {
  .sale .btn-prev {
    opacity: 1;
  }
} */
</style>
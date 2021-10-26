<template>
  <div class="search">
      <h3>Filter</h3>
      <div class="filter">
          <p>Name</p>
          <div class="name">
              <div v-for="name in names" :key="name">
                  <label>{{ name }}</label>
                    <input type="checkbox" v-model="filterName" :value="name">
              </div>
          </div>
          <div class="group-filter" >
              <span v-for="name in filterName" :key="name">{{ name }}</span>
          </div>
      </div>
      <div class="filter" >
          <p>Color</p>
          <div class="color">
              <div v-for="color in colors" :key="color">
                  <label>{{ color }}</label>
                    <input type="checkbox" v-model="filterColor" :value="color" >

              </div>
          </div>
          <div class="group-filter" >
              <span v-for="color in filterColor" :key="color">{{ color }}</span>
          </div>
      </div>
      <div class="filter" >
          <p>Price</p>
          <div class="price">
            <input class="min-price" type="range" :min="prices[0]" :max="prices[1]" v-model="filterPrice[0]" step="100">
            <input class="max-price" type="range" :min="prices[0]" :max="prices[1]" v-model="filterPrice[1]" step="100">
          </div>
          <div class="group-filter" >
              <span>{{ filterPrice | formatMinPrice }}</span>
              <i class="fas fa-long-arrow-alt-right"></i>
              <span>{{ filterPrice | formatMaxPrice }}</span>
          </div>
      </div>
      <button class="btn" @click="search" style="background: blue; align-self: center;">Search</button>
  </div>
</template>

<script>

export default {
    name: 'Search',
    props: {
        names: {
            type: Array
        },
        colors: {
            type: Array
        },
        prices: {
            type: Array
        }
    },
    filters: {
        formatMinPrice(val) {
            if(val[0] <= val[1]) return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(val[0])
            else return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(val[1])
        },
        formatMaxPrice(val) {
            if(val[1] > val[0]) return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(val[1])
            else return Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(val[0])
        }
    },
    data() {
        return {
            filterName: [],
            filterColor: [],
            filterPrice: [this.prices[0], this.prices[1]],
        }
    },
    methods: {
        search() {
            this.$emit('search', this.filterName, this.filterColor, this.filterPrice)
        },
        pressFilter() {
            console.log(this.filterColor)
            console.log(this.filterName)
        },
        change() {
            console.log("changed")
            // this.filterName = event.target.value
        }
    }
}
</script>

<style scoped>
input[type = checkbox] {
    width: 15px;
    height: 15px;
    color: red;
}
.search {

    padding: 1rem .5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: white;
}
.search .filter {
    margin: 1rem 0;
}
.search .filter:nth-child(4) {
    background-image: linear-gradient(to bottom right, rgb(132, 175, 255), rgb(84, 241, 45));;
}
.search .filter:nth-child(2) {
    background-image: linear-gradient(to bottom right, rgb(247, 125, 68), yellow);;
}
.search .filter:nth-child(3) {
    background-image: linear-gradient(to bottom right, rgb(134, 250, 111), rgb(252, 252, 93));;
}
.search .filter p {
    font-size: 1.5rem;
    line-height: 3rem;
}
.search .filter .name, .color {
    display: flex;
    flex-wrap: wrap;
}
.search .filter .name>div, .color>div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
}
.search .filter .name>div>label, .color>div>label {
    margin: 0 3px;
    font-size: 1.2rem;
}

.filter .group-filter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: gray;
    padding: 3px 5px;

}
.filter .group-filter>* {
    margin: 0 3px;
    font-size: 1.3rem;
}


</style>
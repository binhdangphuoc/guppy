<template>
  <div class="left-bar">
      <div class="personal">

            <div class="image">
                <img src="https://im0-tub-ru.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac&n=27&h=480&w=480" alt="avatar">
            </div>
            <a href="/admin">Admin</a>

      </div>
      <div class="list-management">
          <p>management</p>
          <div class="list-btn">
              <button @click="adminClick('add-guppy')">add guppy</button>
              <button @click="adminClick('modify-guppy')">modify guppy</button>
              <button @click="adminClick('add-images-videos')">add images videos</button>
              <button @click="adminClick('modify-images-videos')">modify images vides</button>
              <button @click="adminClick('orders')">orders</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "LeftBar",
    data() {
        return {

        }
    },
    methods: {
        adminClick(chooseClass) {
            console.log("click ne")
            this.$emit("adminClick", chooseClass);
        }
    }

}
</script>

<style scoped>
.left-bar {
    display: flex;
    flex-direction: column;
    width: 15rem;
    background: white;
}
.left-bar .personal {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-image: linear-gradient(45deg, red,orange,yellow,green,blue,indigo,violet);
}
.left-bar .personal .image {
    width: 15rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-bar .personal .image img {
    width: 50%;
    border-radius: 50%;
}
.left-bar .personal a {
    font-size: 2rem;
    color: blue;
    text-transform: uppercase;
}
.left-bar .list-management {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem auto;
    background-image: linear-gradient(45deg, rgb(77, 236, 241) , rgb(238, 149, 194));

}
.left-bar .list-management p {
    text-transform: uppercase;
    font-size: 1.8rem;
    color: green;
    margin: 1rem auto;
}
.left-bar .list-management .list-btn {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: .5rem;
    padding-right: .5rem;
}
.left-bar .list-management .list-btn >* {
    margin-bottom: 1rem;
    width: 100%;
    height: 3rem;
    background: yellow;
    border: none;
    border-radius: .5rem;
    font-size: 1.3rem;
    color: black;
    line-height: 3rem;
    padding-left: .5rem;
    padding-right: .5rem;
    text-transform: capitalize;
    cursor: pointer;
    text-align: left;
}
.left-bar .list-management .list-btn >*:hover {
    font-weight: bold;
    background: orange;
}
</style>
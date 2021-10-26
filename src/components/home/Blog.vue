<template>
  <div class="blogs">
      <div class="title">
        <h2>blogs</h2>
        <a href="#" class="more">see more</a>
      </div>
      <div class="list-blogs">
        <div class="blog" v-for="(blog, index) in blogs" :key="index">
          <div class="image">
            <img :src="blog.image" alt="image-blog">
          </div>
          <div class="title-blog">
            <a :href="blog.id">{{ blog.title }}</a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Blog',
    props: {
      blogs: Array,
    },
    data() {
      return {

      }
    }
}
</script>

<style scoped>
.blogs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 3rem auto;
}
.blogs .title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}
.blogs .title h2{
  text-align: center;
  font-size: 3rem;
  color: white;
}

.blogs .list-blogs {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: auto;
}
.blogs .list-blogs .blog {
  width: 30%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: red;
  border-radius: 10px;
  overflow: hidden;
  margin: 2rem .5rem;
}
.blogs .list-blogs .blog .image {
  width: 100%;
  height: 20rem;
}
.blogs .list-blogs .blog .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.blogs .list-blogs .blog .title-blog {
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blogs .list-blogs .blog .title-blog a{
  font-size: 1.8rem;
  color: white;
}

a.more {
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

@media (max-width: 500px) {
  .blogs .list-blogs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  .blogs .list-blogs .blog {
    width: 90%;
  }
}
</style>
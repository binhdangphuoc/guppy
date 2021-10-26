<template>
  <div class="page-blogs">
    <Blog
        :blogs = blogs
    />
  </div>
</template>

<script>
import Blog from '../components/home/Blog.vue'

import { mapState } from "vuex"
export default {
    name: 'Blogs',
    components: { Blog },
    async beforeCreate() {
        await this.$store.dispatch("getListBlogs", 1)
        console.log("call blogs")
    },
    computed: {
        ...mapState ({
            blogs: (state) => state.blogs.list_blogs,
        })
    }
}
</script>

<style>
.blogs .list-blogs {
    flex-wrap: wrap !important;
}
.blogs .list-blogs .blog {
    width: 25rem !important;
}
</style>
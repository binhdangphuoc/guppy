<template>
  <div class="admin">
      <LeftBar
        class="left-bar"
        @adminClick = adminClick
      />
      <AdminHome
        v-show="classAdmin == 'admin-home'"
        class="admin-home"
      />
      <AddGuppy
        v-show="classAdmin == 'add-guppy'"
        class="add-guppy"
      />
      <ModifyGuppy
        v-show="classAdmin == 'modify-guppy'"
        class="modify-guppy"
      />
      <AddImagesVideos
        v-show="classAdmin == 'add-images-videos'"
        class="add-images-videos"
      />
      <ModifyImagesVideos
        v-show="classAdmin == 'modify-images-videos'"
        class="modify-images-videos"
      />
      <Orders
        v-show="classAdmin == 'orders'"
        class="orders"
      />
  </div>
</template>

<script>
import LeftBar from "../components/admin/LeftBar.vue"

export default {
    name: 'Admin',
    components: {
      LeftBar,
      AdminHome: () => import("../components/admin/AdminHome.vue"),
      AddGuppy: () => import("../components/admin/AddGuppy.vue"),
      ModifyGuppy: () => import("../components/admin/ModifyGuppy.vue"),
      AddImagesVideos: () => import("../components/admin/AddImagesVides.vue"),
      ModifyImagesVideos: () => import("../components/admin/ModifyImagesVides.vue"),
      Orders: () => import("../components/admin/Orders.vue"),
    },
    data() {
      return {
        classAdmin: "admin-home"
      }
    },
    methods: {
      adminClick(chooseClass) {
        this.classAdmin = chooseClass;
        console.log(this.classAdmin)
      }
    }
}
</script>

<style>
  .admin {
    display: flex;
    flex-direction: row;

  }
</style>
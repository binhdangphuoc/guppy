<template>
  <div class="modify-guppy">
      <div class="filter-bar">
        <label >name</label>
        <input type="text" v-model="nameFilter" placeholder="enter name to filter">
        <button @click="getListGuppyInfo">Filter</button>
      </div>
      <div class="select-change">
        <button @click="show = 'info'" :class="{'active': show == 'info'}">Guppy info</button>
        <button @click="show = 'detail'" :class="{'active': show == 'detail'}">Guppy detail</button>
        <button @click="show = 'quantity'" :class="{'active': show == 'quantity'}">Guppy quannity</button>
      </div>
      <div class="show-guppy-info" v-show="show == 'info' || show == 'quantity'">
        <div class="guppy-info" v-for="(guppy, index) in listGuppyInfo" :key="index">
          <div v-show="editing" class="editing">Editting</div>
          <div class="row-1">
            <div class="modify-name" >
              <label class="title">Name:</label>
              <label class="big" v-show="!array_edit[index]" >{{ guppy.name }}</label>
              <input class="big" v-show="array_edit[index]" type="text" v-model="guppy.name">
            </div>
            <div class="numbers">
              <div class="modify-number">
                <label class="title">Price:</label>
                <label v-show="!array_edit[index]">{{ guppy.price }}</label>
                <input v-show="array_edit[index]" type="number" step="0.01" v-model="guppy.price">
              </div>
              <div class="modify-number">
                <label class="title">Sale:</label>
                <label v-show="!array_edit[index]">{{ guppy.sale }}</label>
                <input v-show="array_edit[index]" type="number" step="0.01" v-model="guppy.sale">
              </div>
              <div class="modify-number">
                <label class="title">In stock:</label>
                <label v-show="show == 'info'">{{ guppy.status }}</label>

              </div>
            </div>
          </div>

          <div class="row-2">
            <div class="modify-describe">
              <label class="title">Describe:</label>
              <label v-show="!array_edit[index]">{{ guppy._describe }}</label>

              <textarea v-show="array_edit[index]" v-model="guppy._describe"></textarea>
            </div>
          </div>

          <div class="row-3">
            <div class="modify-image">
              <label class="title">Image:</label>
              <img :src="guppy.image" alt="image">
              <label v-show="!array_edit[index]">{{ guppy.image }}</label>
              <input v-show="array_edit[index]" type="text" v-model="guppy.image">
            </div>
          </div>

          <div class="row-4">
            <button v-show="!array_edit[index]" @click="edit(index)">edit</button>
            <button v-show="array_edit[index]" @click="edited(index)">edited</button>
            <button @click="remove(index)">remove</button>
            <button @click="update(guppy)">save</button>
          </div>

        </div>
      </div>
      <button @click="test">test</button>
      <div class="container-dialog" v-if="sendData">
        <div class="dialog">
          <p v-show="has_error==null" class="msg-sending">Sending</p>
          <p v-show="has_error != null"> {{ has_error }}</p>
          <img v-show="has_error==null" class="image-sending" src="../../assets/onload.jpg">
          <img v-show="has_error!=null" src="../../assets/error.jpg">

          <button v-show="has_error==null" class="dialog-click" @click="cancelSending">cancel</button>
          <button v-show="has_error!=null" class="dialog-click"  @click="cancelSending">Error</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "ModifyGuppy",
    data() {
      return {
        modify: 1,
        nameFilter: "",
        sendData: false,
        array_edit: [],
        editing: false,
        show: "info",
      }
    },
    computed: {
      ...mapState({
        listGuppyInfo: (state) => state.admin.list_guppy_info,
        listGuppyInfoRoot: (state) => state.admin.list_guppy_info_root,
        has_error: (state) => state.admin.error_sending,
        resultSend: (state) => state.admin.resultSending,
      })
    },
    mounted() {
      this.getListGuppyInfo();
    },
    methods: {
      async getListGuppyInfo() {
        this.sendData = true;

        await this.$store.dispatch("getListGuppyInfo", this.nameFilter);
        console.log("await error: ",this.has_error)
        if(this.has_error == null) this.sendData = false;
      },
      cancelSending() {
        console.log("cancel");
        this.sendData = false;
        this.$store.dispatch("resetState");
      },

      test() {
        console.log("list change: ",this.listGuppyInfo[0])
        console.log("list root: ",this.listGuppyInfoRoot[0])


      },
      edit(index) {
        if(this.array_edit[index] == true) this.array_edit[index] = false;
        else if(this.array_edit[index] == false) this.array_edit[index] = true;
        else this.array_edit[index] = true;
        console.log("array_index[",index,"]",this.array_edit[index]);
        this.editing = !this.editing;

      },
      edited(index) {
          if(JSON.stringify(this.listGuppyInfo[index]) != JSON.stringify(this.listGuppyInfoRoot[index])) {
            if(confirm("Don't save?")) {
              this.cancelEdit(index);
              return
            } else {
              return
            }
          } else {
            this.edit(index);
          }
      },
      cancelEdit(index) {
        let old = JSON.parse(JSON.stringify(this.listGuppyInfoRoot[index]))
        this.listGuppyInfo.splice(index, 0, old);
        console.log("old: ", old)
        console.log("sau khi reset: ", this.listGuppyInfo[index])
        // this.listGuppyInfo[index] = this.listGuppyInfoRoot[index];
        this.edit(index);
      },
      async remove(index) {
        console.log("remove ", index)
        this.sendData = true
        await this.$store.dispatch("removeGuppy", index)
        if(this.resultSend == 0 || this.has_error != null) {
          return
        } else {
          this.sendData = false

        }
      },
       async update(g) {
         this.sendData = true
        console.log("update ", JSON.stringify(g))
        await this.$store.dispatch("updateGuppy", JSON.stringify(g))
        if(this.resultSend == 0 || this.has_error != null) {

          return
        } else {
          this.sendData = false

        }
      }
    },

}
</script>

<style>
input {
  font-size: 1rem;
  height: 2rem;
}
input:focus {
  outline: none;
  background: yellow;
  font-size: 1rem;
}
.title {
  font-weight: bold;
}
.modify-guppy {
  width: 100%;
  height: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background: white;
  display: flex;
  flex-direction: column;
}
.modify-guppy .filter-bar {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: yellow;
}
.modify-guppy .filter-bar >*{
  margin: 0 .5rem;
}
.modify-guppy .filter-bar label {
  font-size: 2rem;
  font-style: italic;
}
.modify-guppy .filter-bar input {
  width: 20rem;
  height: 3rem;
  border-radius: 5px;
}

.modify-guppy .filter-bar button {
  width: 5rem;
  height: 2rem;
  background: yellow;
}
button:hover {
  background: green;
  transform: scale(1.1);
}

.modify-guppy .select-change {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modify-guppy .select-change button {
  width: 10rem;
  height: 3rem;
  margin: 0 1rem;
  background: white;
  border-radius: .5rem;
}
.modify-guppy .select-change button.active {
  background: red;
}

.modify-guppy .show-guppy-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.modify-guppy .show-guppy-info .guppy-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 15rem;
  margin-bottom: .5rem;
  background: rgb(212, 250, 155);
}
.modify-guppy .show-guppy-info .guppy-info .row-3 {
  width: 10rem;
  height: 15rem;
}
.row-3 .modify-image {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row-3 .modify-image >* {
  width: 100%;
  overflow: hidden;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
}
.row-3 .modify-image img {
  height: 10rem;
}
.modify {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modify >* {
  margin: 0 .5rem;
}

.modify-guppy .show-guppy-info .guppy-info .row-2 {
  width: 10rem;
  height: 15rem;
  display: flex;
}
.row-2 .modify-describe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row-2 .modify-describe:first-child {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
}
.row-2 .modify-describe textarea {
  width: 100%;
  min-height: 13rem;
  background: yellow;
}


.modify-guppy .show-guppy-info .guppy-info .row-1 {
  width: 20rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 .5rem;
}
.row-1 .modify-name {
  height: 10rem !important;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
}
.row-1 .modify-name .title {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  align-self: flex-start;
}
.row-1 .modify-name .big{
  height: 6rem;
  width: 100%;
  font-size: 1.5rem;
  line-height: 3rem;

}
.row-1 .numbers {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
}
.row-1 .numbers .modify-number {
  width: 5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: .5rem;
}
.row-1 .numbers .modify-number >* {
  height: 2rem;
  width: 4rem;
}

.modify-guppy .show-guppy-info .guppy-info .row-4 {
  width: 5rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 1rem;
}
.row-4 button {
  width: 5rem;
  height: 2rem;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

}
.row-4 button:nth-child(1) {
  background: yellow;
}
.row-4 button:nth-child(2) {
  background: red;
}
.row-4 button:nth-child(3) {
  background: green;
}

.editing {
  position: absolute;
  left: -10000px;
}
</style>
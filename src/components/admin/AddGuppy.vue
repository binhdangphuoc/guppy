<template>
  <div class="add-guppy">
      <h3>add guppy to database</h3>
      <p>{{ title }}</p>

      <div class="add-action">
        <div class="rows" v-for="(row, index) in rowsGuppy" :key="index">
          <div class="url-input">
            <div class="name-input">
              <label>Name</label>
              <input type="text" v-model="rowsGuppy[index].name" placeholder="Add name guppy">
            </div>
            <div class="image-input">
              <label>Image</label>
              <input type="text" v-model="rowsGuppy[index].image" placeholder="Add url image of guppy">
            </div>
            <div class="number-input">
              <div class="price"><label>Price</label><input type="number" min="0" step="0.01" v-model="rowsGuppy[index].price"></div>
              <div class="sale"><label>Sale</label> <input type="number" min="0" step="0.01" v-model="rowsGuppy[index].sale"></div>
              <div class="status"><label>Status</label><input type="checkbox" v-model="rowsGuppy[index].status"></div>
            </div>
            <div class="describe-input">
              <label>Describe</label>
              <textarea v-model="rowsGuppy[index]._describe" placeholder="Describe guppy"></textarea>
            </div>
            <div class="small-btn">
              <button @click="subThisRow(index)">Remove</button>
            </div>
          </div>
          <img :src="rowsGuppy[index].image" alt="image">
        </div>
      </div>

      <div class="btn-row">
        <button @click="addRows"><i class="fas fa-plus"></i></button>
        <button  @click="subRows"><i class="fas fa-minus"></i></button>
      </div>
      <div class="submit">
        <button @click="submit">submit</button>
      </div>

      <div class="container-dialog" v-if="sendData">
        <div class="dialog">
          <p v-show="result_add_guppy == null && has_error==null" class="msg-sending">Sending</p>
          <p v-show="result_add_guppy != null && has_error==null">Done</p>
          <p v-show="has_error != null">{{ has_error }}</p>
          <img v-show="result_add_guppy == null && has_error==null" class="image-sending" src="../../assets/onload.jpg">
          <img v-show="result_add_guppy != null && has_error==null" src="../../assets/completed.jpg">
          <img v-show="has_error!=null" src="../../assets/error.jpg">

          <button v-show="result_add_guppy == null && has_error==null" class="dialog-click" @click="cancelSending">cancel</button>
          <button v-show="result_add_guppy != null && has_error==null" class="dialog-click"  @click="completedSending">completed</button>
          <button v-show="has_error!=null" class="dialog-click"  @click="completedSending">Error</button>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "AddGuppy",
    data() {
      return {
        rowsGuppy: [
          {
            name: "",
            image: "",
            price: 0,
            sale: 0,
            status: false,
            _describe: "1 couble includes 1 male and 1 female",
          }
        ],
        title: "Guppy",
        sendData: false,
      }
    },
    computed: {
      ...mapState({
        result_add_guppy: (state) => state.admin.add_guppy,
        has_error: (state) => state.admin.error_sending,
      })
    },
    methods: {
      submit() {
        console.log(this.rowsGuppy);
        this.sendData = true;
        this.$store.dispatch("addGuppy", JSON.stringify(this.rowsGuppy))
      },
      addRows() {
        console.log(this.result_add_guppy)
        this.rowsGuppy.push({name: "", image: "", price: 0, sale: 0, status:false, _describe: "1 couble includes 1 male and 1 female"});
      },
      subRows() {
        if(this.rowsGuppy.length > 0){
          if(this.rowsGuppy[this.rowsGuppy.length-1].name != "" || this.rowsGuppy[this.rowsGuppy.length-1].image != "") {
          if(confirm("Are you sure delete last rows?"))
            {
              this.rowsGuppy.pop();
            }
          } else {
            this.rowsGuppy.pop();
          }
        }
      },
      subThisRow(index) {
        if(confirm("Are you sure delete this row?")) {
           this.rowsImage.splice(index,1);
        }
      },
      cancelSending() {
        this.sendData = false;
        this.$store.dispatch("resetState");
      },
      completedSending() {
        this.sendData = false;
        this.$store.dispatch("resetState");
        this.rowsGuppy = [{
            name: "",
            image: "",
            price: 0,
            sale: 0,
            status: false,
            _describe: "1 couble includes 1 male and 1 female",}]
      }
    },

  watch: {
      rowsGuppy: {
        handler: function() {
          console.log("watch :v")
          for(let i = 0; i < this.rowsGuppy.length; i++) {
            this.rowsGuppy[i].image = this.rowsGuppy[i].image.replace("file/d/", "uc?export=view&id=")
            this.rowsGuppy[i].image = this.rowsGuppy[i].image.replace("/view", "")
            console.log("lan thu ", i, " => ",this.rowsGuppy[i].url)
          }
        }, deep: true
      },
    }

}
</script>

<style scoped>
@import "../../styles/dialogSending.css";

.add-guppy {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: linear-gradient(180deg ,rgb(182, 248, 250), rgb(241, 255, 179), rgb(207, 253, 189));
}
.add-guppy h3 {
  text-transform: uppercase;
  color: blue;
  font-style: italic;
  margin: 1rem auto;
  line-height: 4rem;
  text-align-last: center;
}

.add-guppy >p {
  text-align: center;
  margin: 1rem auto;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

.add-guppy .add-action {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: .5rem;
  padding-right: .5rem;
}
.add-guppy .add-action .rows {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 15rem;
  justify-content: space-around;
  align-items: center;
  background: rgb(123, 255, 123);
  margin-bottom: 1rem;
}
.add-guppy .add-action .rows img {
  width: 10rem;
  height: 10rem;
}
.add-guppy .add-action .rows iframe {
  width: 10rem;
  height: 10rem;
}
.add-guppy .add-action .rows .url-input {
  width: calc(90% - 10rem);
  display: flex;
  flex-direction: column;
}
.add-guppy .add-action .rows .url-input >div {
  width: 100%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: left;
  margin: 1px auto;
  min-height: 2rem;
}
.add-guppy .add-action .rows .url-input >div>input {
  width: 100%;
  height: 1.8rem;
  font-size: 1.3rem;
}
.add-guppy .add-action .rows .url-input >div label {
  width: 5rem;
  font-size: 1.3rem;
  font-style: italic;
  margin: 0 ;
}
.number-input >div{
  display: flex;
  flex-direction: row;
  width: 33%;
  align-items: center;
}
.number-input >div input {
  width: 5rem;
  height: 1.8rem;
  font-size: 1.5rem;
}
.add-guppy .add-action .rows .url-input input:focus {
  outline: 0;
  background: rgb(255, 255, 147);
}
.add-guppy .add-action .rows .url-input textarea {
  width: 100%;
  font-size: 1rem;
  height: 5rem;
  margin-top: .2rem;
}
.add-guppy .add-action .rows .url-input textarea:focus {
  outline: 0;
  background: rgb(255, 255, 147);
}
.add-guppy .add-action .rows .url-input .small-btn {
  display: flex;
  align-items: center;
  justify-content: start;
}
.add-guppy .add-action .rows .url-input .small-btn button {
  padding: 1px 5px;
}
.add-guppy .add-action .rows .url-input .small-btn button:hover {
  background: red;
}

.add-guppy .btn-row {
  align-self: flex-end;
  margin-right: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

}
.add-guppy .btn-row >* {
  width: 5rem;
  height: 2rem;

}
.add-guppy .btn-row >*:hover {
  background: red;
}
.add-guppy .btn-row button i {
  font-size: 1.5rem;
}
.add-guppy .btn-row >*:not(:last-child) {
  margin-right: 1rem;
}

.add-action .rows .labels {
  display: flex;
  flex-direction: column;
}
</style>
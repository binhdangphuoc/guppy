<template>
  <div class="add-images-videos">
      <h3>add images and videos to database</h3>
      <div class="btn-change">
        <button @click="changeShow(1, 'images')">images</button>
        <button @click="changeShow(2, 'videos')">videos</button>
      </div>
      <p>{{ title }}</p>

      <div class="add-action" v-show="show == 1">
        <div class="rows" v-for="(row, index) in rowsImage" :key="index">
          <div class="url-input">
            <input type="text" v-model="rowsImage[index].name" placeholder="Add name image">
            <input type="text" v-model="rowsImage[index].url" placeholder="Add url image">
            <textarea v-model="rowsImage[index]._describe" placeholder="Describe image"></textarea>
            <div class="small-btn">
              <button @click="subThisRow(index)">Remove</button>
            </div>
          </div>
          <img :src="rowsImage[index].url" alt="image">
        </div>
      </div>
      <div class="add-action" v-show="show == 2">
        <div class="rows" v-for="(row, index) in rowsVideo" :key="index">
          <div class="url-input">
            <input type="text" v-model="rowsVideo[index].name" placeholder="Add name video">
            <input type="text" v-model="rowsVideo[index].url" placeholder="Add url video">
            <textarea v-model="rowsVideo[index]._describe" placeholder="Describe video"></textarea>
            <div class="small-btn">
              <button @click="subThisRow(index)">Remove</button>
            </div>
          </div>
          <iframe :src="rowsVideo[index].url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>

      <div class="btn-row">
        <button @click="addRows"><i class="fas fa-plus"></i></button>
        <button @click="subRows"><i class="fas fa-minus"></i></button>
      </div>
      <div class="submit">
        <button @click="submit">submit</button>
      </div>

      <div class="container-dialog" v-if="sendData">
        <div class="dialog">
          <p v-show="result_add_images==null && result_add_videos==null && has_error==null" class="msg-sending">Sending</p>
          <p v-show="(result_add_images!=null || result_add_videos!=null) && has_error==null">Done</p>
          <p v-show="has_error != null"> {{ has_error }}</p>
          <img v-show="result_add_images==null && result_add_videos==null && has_error==null" class="image-sending" src="../../assets/onload.jpg">
          <img v-show="(result_add_images!=null || result_add_videos!=null) && has_error==null" src="../../assets/completed.jpg">
          <img v-show="has_error!=null" src="../../assets/error.jpg">

          <button v-show="result_add_images==null && result_add_videos==null && has_error==null" class="dialog-click" @click="cancelSending">cancel</button>
          <button v-show="(result_add_images!=null || result_add_videos!=null) && has_error==null" class="dialog-click"  @click="completedSending">completed</button>
          <button v-show="has_error!=null" class="dialog-click"  @click="cancelSending">Error</button>
        </div>
      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "AddImagesVides",
    data() {
      return {
        rowsImage: [
          {
            name: "",
            url: "",
            _describe: "",
          }
        ],
        rowsVideo: [
          {
            name: "",
            url: "",
            _describe: "",
          }
        ],
        show: 1,
        title: "images",
        sendData: false,
      }
    },
    computed: {
      ...mapState({
        result_add_images: (state) => state.admin.add_images,
        result_add_videos: (state) => state.admin.add_videos,
        has_error: (state) => state.admin.error_sending,
      })
    },
    methods: {
      submit() {
        console.log(this.rowsImage);
        console.log(this.rowsVideo);
        this.sendData = true;
        if(this.show == 1) this.$store.dispatch("addImages", JSON.stringify(this.rowsImage))
        else if(this.show == 2) this.$store.dispatch("addVideos", JSON.stringify(this.rowsVideo))

      },
      changeShow(i, title) {
        this.show = i;
        this.title = title;
      },
      addRows() {
        if(this.show == 1) this.rowsImage.push({name:"", url: "", _describe: ""});
        else if(this.show == 2) this.rowsVideo.push({name: "", url: "", _describe: ""});
      },
      subRows() {
        if(this.show == 1) {
          if(this.rowsImage.length > 0){
            if(this.rowsImage[this.rowsImage.length-1].url != "") {
            if(confirm("Are you sure delete rows?"))
              {
                this.rowsImage.pop();
              }
            } else {
              this.rowsImage.pop();
            }
          }
        } else if(this.show == 2) {
          if(this.rowsVideo.length > 0) {
            if(this.rowsVideo[this.rowsVideo.length-1].url != "") {
              if(confirm("Are you sure delete rows?"))
                {
                  this.rowsVideo.pop();
                }
            } else {
              this.rowsVideo.pop();
            }
          }
        }
      },
      subThisRow(index) {
        if(confirm("Are you sure delete this row?")) {
           if(this.show == 1) this.rowsImage.splice(index,1);
          else if(this.show == 2) this.rowsVideo.splice(index, 1);
        }
      },
      cancelSending() {
        console.log("cancel");
        this.sendData = false;
        this.$store.dispatch("resetState");
      },
      completedSending() {
        console.log("completed");
        this.sendData = false;
        this.$store.dispatch("resetState");
        if(this.show==1) this.rowsImage = [{name:"", url: "", _describe: ""}];
        else if(this.show==2) this.rowsVideo = [{name:"", url: "", _describe: ""}];
      }
    },
    watch: {
      rowsImage: {
        handler: function() {
          console.log("watch :v")
          for(let i = 0; i < this.rowsImage.length; i++) {
            this.rowsImage[i].url = this.rowsImage[i].url.replace("file/d/", "uc?export=view&id=")
            this.rowsImage[i].url = this.rowsImage[i].url.replace("/view", "")
            console.log("lan thu ", i, " => ",this.rowsImage[i].url)
          }
        }, deep: true
      },
    }


}
</script>

<style scoped>
@import "../../styles/dialogSending.css";

.add-images-videos {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-image: linear-gradient(180deg ,rgb(182, 248, 250), rgb(241, 255, 179), rgb(207, 253, 189));
}
.add-images-videos h3 {
  text-transform: uppercase;
  color: blue;
  font-style: italic;
  margin: 1rem auto;
  line-height: 4rem;
  text-align-last: center;
}
.add-images-videos .btn-change {
  align-self: center;
  margin: 1rem auto;
}
.add-images-videos .btn-change >* {
  width: 10rem;
  height: 3rem;
  font-size: 1.8rem;
  color: red;
  background-image: linear-gradient(rgb(93, 237, 241), rgb(134, 241, 107));
  border: none;
  border-radius: .5rem;
  cursor: pointer;
}
.add-images-videos .btn-change >*:not(:last-child) {
  margin-right: 1rem;
}

.add-images-videos >p {
  text-align: center;
  margin: 1rem auto;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

.add-images-videos .add-action {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: .5rem;
  padding-right: .5rem;
}
.add-images-videos .add-action .rows {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 12rem;
  justify-content: space-around;
  align-items: center;
  background: rgb(123, 255, 123);
  margin-bottom: 1rem;
}
.add-images-videos .add-action .rows img {
  width: 10rem;
  height: 10rem;
}
.add-images-videos .add-action .rows iframe {
  width: 10rem;
  height: 10rem;
}
.add-images-videos .add-action .rows .url-input {
  width: calc(90% - 10rem);
  display: flex;
  flex-direction: column;
}
.add-images-videos .add-action .rows .url-input input {
  width: 100%;
  height: 2rem;
  font-size: 1.5rem;
  margin-bottom: 2px;
}
.add-images-videos .add-action .rows .url-input input:focus {
  outline: 0;
  background: rgb(255, 255, 147);
}
.add-images-videos .add-action .rows .url-input textarea {
  width: 100%;
  font-size: 1rem;
  height: 5rem;
  margin-top: .2rem;
}
.add-images-videos .add-action .rows .url-input textarea:focus {
  outline: 0;
  background: rgb(255, 255, 147);
}
.add-images-videos .add-action .rows .url-input .small-btn {
  display: flex;
  align-items: center;
  justify-content: start;
}
.add-images-videos .add-action .rows .url-input .small-btn button {
  padding: 1px 5px;
}
.add-images-videos .add-action .rows .url-input .small-btn button:hover {
  background: red;
}

.add-images-videos .btn-row {
  align-self: flex-end;
  margin-right: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

}
.add-images-videos .btn-row >* {
  width: 5rem;
  height: 2rem;

}
.add-images-videos .btn-row >*:hover {
  background: red;
}
.add-images-videos .btn-row button i {
  font-size: 1.5rem;
}
.add-images-videos .btn-row >*:not(:last-child) {
  margin-right: 1rem;
}


</style>
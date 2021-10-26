<template>
  <div class="slider">
      <ul class="slides">
        <li v-for="(slide, index) in slides" :key="slide.title" :style="{'background-image': 'url('+slide.img+')'}" v-show = "stt==index" class="slide fade-in-slide">
          <div class="content">
            <h3>{{ slide.title }}</h3>
            <button class="btn shopnow-btn">Shop now</button>
          </div>
        </li>
      </ul>
      <div class="slide-prev btn-handle" @click="btnPrev" ><i class="fas fa-chevron-left"></i></div>
      <div class="slide-next btn-handle" @click="btnNext" ><i class="fas fa-chevron-right"></i></div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
    name: 'Slider',
    mounted:  async function() {
      for(;;) {
         var a = await new Promise(function(rs) {
            setTimeout(()=> rs(true),5000);
            $('.btn-handle').click(() => rs(false));
        });
            if(a) this.btnNext()
         }
      },
    data() {
      return {
        slides: [
          {
            title: 'Sale off upto 50%',
            img: 'https://a-z-animals.com/media/guppy-5.jpg'
          },
          {
            title: 'Guppy best quality',
            img: 'https://geturpet.com/wp-content/uploads/2021/01/Red-Lace-Solo-Guppy.jpg'
          },
          {
            title: 'Guppy limited',
            img: 'https://choicacanh.com/content/uploads/cms/2021/05/17/phan-biet-cac-dong-ca-7-mau-4.jpg'
          }
        ],
        stt: 0,
      }
    },
    methods: {
      btnPrev() {
        if(this.stt == 0) this.stt = this.slides.length-1;
        else this.stt--
      },
      btnNext() {
        if(this.stt == (this.slides.length-1)) this.stt = 0
        else this.stt++
      },
    },

}
</script>

<style>
@import '../../styles/fadeIn.scss';
.slider {
  position: relative;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 1005;
}
.slider .slides li.slide {
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-size: cover !important;
  background-position: center !important;
}

.slider .slides li.slide .content {
  height: 10rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(49, 71, 71, 0.5);
  padding: 1rem;
  border-radius: 1rem;
}


.slider .slides li.slide .content h3 {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  position: relative;
  animation-name: animation1;
  animation-duration: 2s;
  animation-iteration-count: 1;
}
@keyframes animation1 {
  0%   {top:-3rem; opacity: 0;}
  100%  {top:0; opacity: 1;}
}
.slider .slides li.slide .content button {
  background-color: white;
  color: black;
  font-size: 1.5rem;
  position: relative;
  animation-name: animation2;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
@keyframes animation2 {
  0%   {top:-3rem; opacity: 0;}
  100%  {top:0; opacity: 1;}
}

.slider .slides li.slide .content button:hover {
  background-color: rgb(243, 243, 125);
}

.slider .slide-prev {
  width: 3rem;
  height: 3rem;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 1s ease;
}
.slider .slide-prev i {
    font-size: 3rem;
    color: white;
}
.slider .slide-next {
  width: 3rem;
  height: 3rem;
  opacity: 0;
  position: absolute;
  top: 50%;
  right: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

}
.slider .slide-next i {
    font-size: 3rem;
    color: white;
}
.slider:hover .slide-next, .slider:hover .slide-prev {
  opacity: 1;
  transform: translateX(10px);
}
</style>
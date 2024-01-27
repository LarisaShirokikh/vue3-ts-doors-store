<template>
    <div class="slideshow-container">
        <!-- Full-width images with number and caption text -->
        <div v-for="(slide, index) in slides" :key="index" :class="{ 'mySlides': true, 'fade': index === currentSlide }">
            <div class="numbertext">{{ index + 1 }} / {{ slides.length }}</div>
            <img :src="slide.image" style="width:100%" />
            <div class="text">{{ slide.caption }}</div>
        </div>

        <!-- Next and previous buttons -->
        <a class="prev" @click="changeSlide(-1)">&#10094;</a>
        <a class="next" @click="changeSlide(1)">&#10095;</a>
    </div>
    <br />

    <!-- The dots/circles -->
    <div style="text-align:center">
        <span v-for="(dot, index) in slides" :key="index" class="dot" @click="setCurrentSlide(index)"
            :class="{ 'active': index === currentSlide }"></span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    data() {
        return {
            currentSlide: ref(0),
            slides: [
                { image: 'https://dveri-na-pobede.ru/wp-content/uploads/2021/05/vhodnie-dveri-banner.jpg', caption: 'Caption Text' },
                { image: 'https://dveri-na-pobede.ru/wp-content/uploads/2021/05/md-main3.jpg', caption: 'Caption Two' },
                { image: 'https://dveri-na-pobede.ru/wp-content/uploads/2021/05/md-main3.jpg', caption: 'Caption Three' },
            ],
        };
    },
    methods: {
        changeSlide(n: number) {
            this.currentSlide = (this.currentSlide + n + this.slides.length) % this.slides.length;
        },
        setCurrentSlide(n: number) {
            this.currentSlide = n;
        },
        showSlides(n: number) {
            this.slides.forEach((slide, index) => {
                const slideElement = document.querySelector(`.mySlides:nth-child(${index + 1})`);
                const dotElement = document.querySelector(`.dot:nth-child(${index + 1})`);

                if (slideElement && dotElement) {
                    (slideElement as HTMLElement).style.display = index === n ? 'block' : 'none';
                    (dotElement as HTMLElement).classList.toggle('active', index === n);
                }
            });
        },
    },
    mounted() {
        this.showSlides(this.currentSlide);
    },
    watch: {
        currentSlide(newValue) {
            this.showSlides(newValue);
        },
    },
});
</script>
<style scoped>
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
    display: none;
    border-radius: 20px; /* Закругленные края */
    overflow: hidden;
}

.mySlides img {
    width: 100%;
    border-radius: 20px; /* Закругленные края */
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>
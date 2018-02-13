import './style.styl';


document.addEventListener("DOMContentLoaded", function () {
// create instance of carousel
  class BScarousel {
    // constructor with one argument - string of selector
    constructor(options) {

      this.selector = options;
      // handling err if something wrong argument, and don't destroy all JS
      if (document.querySelector(this.selector) === null) {
        throw new Error('Something wrong with your selector 😭');
      }
      // variables
      this.carousel = document.querySelector(this.selector);
      this.carouselImg = this.carousel.querySelectorAll('img');
      this.carouselLength = this.carouselImg.length;
      this.build()

    }
    // method for current slider/ index / img
    currentSlide(n) {
      this.showSlides(this.index = n);
    }
    // method for change slider
    plusSlides(n) {
      this.showSlides(this.index += n);
    }
    // method for create dots
    createIndicators() {
      let wrapIndicators = document.createElement('ul');
      wrapIndicators.classList.add('wrap-indicators')

      if (this.carouselLength > 1) {
        this.carousel.appendChild(wrapIndicators);
        for (let i = 1; i < this.carouselLength + 1; i++) {

          let dot = document.createElement('li');
          dot.classList.add('dot');
          dot.setAttribute('value', i);

          dot.addEventListener('click', (e) => {
            this.index = e.target.value;
            this.showSlides(this.index)
          });

          wrapIndicators.appendChild(dot);
        }
      }
    }
//How TO - Slideshow https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow
    showSlides(index) {

      this.carousel.classList.add('fade');
      if (!!this.index && !!index) {
        if (index >= this.carouselLength && this.index >= this.carouselLength) {
          this.index = 0
        }

        if (index < 1) {
          this.index = this.carouselLength;
          index = this.carouselLength
        }

        for (let i = 0; i < this.carouselLength; i++) {
          this.carouselImg[i].style.display = "none";
        }
        this.carouselImg[index - 1].style.display = "block";

        this.carouselImg.forEach((item) => {
          item.classList.add('item');
          item.style.width = '100%';
          item.setAttribute('draggable', false);
        });
      }
    }

    // control swipe direction ( change slider for + or -  direction)
    controls(direction) {
      if (direction === 'left') {
        this.plusSlides(1);
      } else {
        this.plusSlides(-1);
      }
    }
    // start point off swipe, get direction of swipe
    swipeStart(e) {
      this.swiping = true;
      this.startX = e.pageX;
    }
// direction of swipe from start point
    swipeMove(event) {

      let checkSwipe = event.touches
          ? event.touches[0].pageX - this.startX
          : event.pageX - this.startX;
      if (this.swiping) {
        if (checkSwipe > 0) {
          this.carousel.scrollLeft -= this.width / 100;
        } else {
          this.carousel.scrollLeft += this.width / 100;
        }
      }
      event.preventDefault()
    }
// ending point, get direction
    swipeEnd(event) {
      this.swiping = false;
      if (event.touches) {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      } else {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      }
    }

    addEvents() {
      this.startX = undefined;
      this.carousel.ondragstart = () => false;

      this.carousel.onmousedown = this.swipeStart.bind(this);
      this.carousel.onmousemove = this.swipeMove.bind(this);
      this.carousel.onmouseup = this.swipeEnd.bind(this);

      this.carousel.ontouchstart = this.swipeStart.bind(this);
      this.carousel.ontouchmove = this.swipeMove.bind(this);
      this.carousel.ontouchend = this.swipeEnd.bind(this);

    }

    //build all methods to create carousel
    build() {

      this.index = 1;
      this.showSlides(this.index);
      this.addEvents();
      this.currentSlide(this.index);
      this.createIndicators();

    }
  }

  new BScarousel(".bs-carousel");
  new BScarousel(".bs-carousel-test");
  new BScarousel(".bs-carousel2");

});


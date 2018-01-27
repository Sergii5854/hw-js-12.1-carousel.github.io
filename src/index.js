import './style.styl';


document.addEventListener("DOMContentLoaded", function () {

  class BSCarousel {

    constructor(options) {
      this.slideIndex = 1;
      this.selector = options;
      this.hash = this.selector
      this.showSlides(this.slideIndex);

      this.addEvents()

      this.currentSlide(this.slideIndex )
    }

    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    }

    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    }

    showSlides(index) {
      let slideIndex =  index;
      console.log(index);
      let select = this.selector;
      let carousel = document.querySelector(select);
      let i;

      let carouselImg = carousel.querySelectorAll('img');

      if (slideIndex >= carouselImg.length) {
        this.currentSlide(0)
      }

      // if (slideIndex <= 1) {
      //   console.log(this.slideIndex ,slideIndex <= 0, carouselImg.length);
      //   // this.slideIndex = carouselImg.length
      //   this.currentSlide(carouselImg.length)
      // }

      for (i = 0; i < carouselImg.length; i++) {
        carouselImg[i].style.display = "none";
      }

      carouselImg[slideIndex - 1].style.display = "block";

      carouselImg.forEach((item) => {
        item.classList.add('item');
        item.style.width = '100%';
        item.setAttribute('draggable', false);
      });

    }


    controls(direction) {
      if (direction === 'left') {
        this.plusSlides(1);
      } else {
        this.plusSlides(-1);
      }
    }

    swipeStart(e) {
      this.swiping = true;
      this.startX = e.pageX;
    }

    swipeMove(event) {
      let select = this.selector;
      let carousel = document.querySelector(select);
      let diff = event.touches
          ? event.touches[0].pageX - this.startX
          : event.pageX - this.startX;
      if (this.swiping) {
        if (diff > 0) {
          carousel.scrollLeft -= this.width / 100;
        } else {
          carousel.scrollLeft += this.width / 100;
        }
      }
      event.preventDefault()
    }

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
      let select = this.selector;
      let carousel = document.querySelector(select);
      carousel.ondragstart = () => false;

      carousel.onmousedown = this.swipeStart.bind(this);
      carousel.onmousemove = this.swipeMove.bind(this);
      carousel.onmouseup = this.swipeEnd.bind(this);

      carousel.ontouchstart = this.swipeStart.bind(this);
      carousel.ontouchmove = this.swipeMove.bind(this);
      carousel.ontouchend = this.swipeEnd.bind(this);

    }
  }

  new BSCarousel(".bs-carousel");

  new BSCarousel(".bs-carousel-test");


});


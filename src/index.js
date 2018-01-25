import './style.styl';

document.addEventListener("DOMContentLoaded", function () {
  class BSCarousel {

    constructor(options) {
      this.slideIndex = 1;
      this.selector = options;
      this.showSlides(this.slideIndex );
    }

    showSlides(index) {
      let slideIndex = index;
      let select =  this.selector;
      console.log("init", select);
      let wrap = document.querySelector(select);
      console.log(wrap);
      let i;

      let n = 1;
      let carousel = wrap.querySelectorAll('img');
      console.log(carousel.length);
      if (n > carousel.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = carousel.length
      }
      for (i = 0; i < carousel.length; i++) {
        carousel[i].style.display = "none";
      }
      carousel[slideIndex - 1].style.display = "block";
      this.next()
    }

    next() {
    // let select = document.querySelector(this.selector);

      document.querySelector(this.selector).querySelector('.right').addEventListener('click', function () {
        let slideIndex = this.slideIndex;
        let showSlides = this.showSlides;
        console.log("next");
        let n = 1;
       showSlides(slideIndex += n)
      });
    }

    //   wrap.querySelector('.left').addEventListener('click', function () {
    //   let n = -1;
    //   console.log("left", slideIndex)
    //   slideIndex += n
    //   this.init()
    // });


  }

  new BSCarousel(".bs-carousel");
  new BSCarousel(".bs-carousel3333");


});
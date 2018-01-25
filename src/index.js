import './style.styl';

document.addEventListener("DOMContentLoaded", function () {
  // var slideIndex = 1;
  // showDivs(slideIndex);
  // var n = 1;
  // document.querySelector('.right').addEventListener('click', function () {
  //   console.log("right")
  //   showDivs(slideIndex += n);
  // });
  // document.querySelector('.left').addEventListener('click', function () {
  //   console.log("left")
  //   showDivs(slideIndex += n);
  // });


  class BSCarousel {

    constructor(options) {

      this.selector = options;
      this.init(this.selector);
      // this.next();
      // this.prev();

    }

    init(selector) {
      console.log("init", selector);
      let wrap =  document.querySelector(selector);
      let i;
      let slideIndex = 1;
      let n =1;
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



      wrap.querySelector('.right').addEventListener('click', function () {
          console.log("right")
       init(slideIndex += n);
        });

      wrap.querySelector('.left').addEventListener('click', function () {
          console.log("left")
          init(slideIndex += n);
        });

    }



  }

  new BSCarousel(".bs-carousel");
  new BSCarousel(".bs-carousel3333");


});
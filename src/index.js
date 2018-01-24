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
  // function showDivs(n) {
  //   var i;
  //   var x = document.getElementsByClassName("mySlides");
  //   if (n > x.length) {
  //     slideIndex = 1
  //   }
  //   if (n < 1) {
  //     slideIndex = x.length
  //   }
  //   for (i = 0; i < x.length; i++) {
  //     x[i].style.display = "none";
  //   }
  //   x[slideIndex - 1].style.display = "block";
  // }


  class BSCarousel {

    constructor(options) {

      this.selector = options;
      this.init(this.selector);
    }

    init(selector) {
      console.log("init", selector);
      let wrap =  document.querySelector(selector)
      let i;
      let slideIndex = 1
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
    }


  }

  new BSCarousel(".bs-carousel");
  new BSCarousel(".bs-carousel3333");


});
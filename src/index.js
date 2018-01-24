import './style.styl';

document.addEventListener("DOMContentLoaded",function() {
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
      this.config = BSCarousel.mergeSettings(options)
      this.selector = if(typeof this.config.selector === 'string') {
       return document.querySelector(this.config.selector);
      }else {
        return  this.config.selector;
      }
      if (this.selector === null) {
        throw new Error('Something wrong with your selector 😭');
      }


    }
    static mergeSettings(options) {
      const settings = {
        selector: '.bs__carousel',
        easing: 'ease-out',

        startIndex: 0,
        draggable: true,

        loop: false,

      };
  }

  // new BSCarousel({
  //   selector: "#siema1"
  // });
  // new BSCarousel({
  //   selector: "#siema"
  // });


});
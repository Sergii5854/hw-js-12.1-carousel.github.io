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
      this.config = BSCarousel.mergeSettings(options);
      console.log(this.config);
      this.selector = typeof this.config.selector === 'string'
          ? document.querySelector(this.config.selector)
          : this.config.selector;
      if (this.selector === null) {
        throw new Error('Something wrong with your selector ');
      }
      this.resolveSlidesNumber();


      this.selectorWidth = this.selector.offsetWidth;
      this.innerElements = [].slice.call(this.selector.children);
      this.currentSlide = Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage));
      this.transformProperty = BSCarousel.webkitOrNot();

      // Bind all event handlers for referencability
      ['resizeHandler',
        'touchstartHandler',
        'touchendHandler',
        'touchmoveHandler',
        'mousedownHandler',
        'mouseupHandler',
        'mouseleaveHandler',
        'mousemoveHandler',
        'clickHandler'].forEach(method => {
        this[method] = this[method].bind(this);
      });

      this.init();
    }

    static mergeSettings(options) {
      const settings = {
        selector: '.bs-carousel',
        duration: 200,
        easing: 'ease-out',

        onInit: () => {},
        onChange: () => {},
      };

      const userSttings = options;
      for (const attrname in userSttings) {
        settings[attrname] = userSttings[attrname];
      }

      return settings;
    }
    resolveSlidesNumber() {
      if (typeof this.config.perPage === 'number') {
        this.perPage = this.config.perPage;
      }
      else if (typeof this.config.perPage === 'object') {
        this.perPage = 1;
        for (const viewport in this.config.perPage) {
          if (window.innerWidth >= viewport) {
            this.perPage = this.config.perPage[viewport];
          }
        }
      }
    }

    static webkitOrNot() {
      const style = document.documentElement.style;
      if (typeof style.transform === 'string') {
        return 'transform';
      }
      return 'WebkitTransform';
    }


  }

  new BSCarousel({
    selector: ".bs-carousel"
  });
  new BSCarousel({
    selector: ".bs-carousel3333"
  });


});
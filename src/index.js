import './style.styl';


document.addEventListener("DOMContentLoaded", function () {
  //create instance of carousel
  class BScarousel {
    constructor(options) {
      this.selector = options;
      if (document.querySelector(this.selector) === null) {  // handling error
        throw new Error('Something wrong with your selector 😭');
      }
      this.build(); // build instance carousel
    }

    // declarate all variables we need to operate carousel
    carouselVariabls() {
      this.carousel = document.querySelector(`${this.selector}`);
      this.carouselList = this.carousel.querySelector(`.carousel__display`);
      this.carouselImg = this.carousel.querySelectorAll('img');
      this.carouselLength = this.carouselImg.length;
      this.itemWidth = parseFloat(getComputedStyle(this.carousel.querySelector('img')).width);
      this.carouselWidth = (this.carouselLength - 1) * this.itemWidth;
      this.wrapIndicators = document.createElement('ul');

      this.swiping = false;
      this.previous = null;
      this.carouselSwipe = null;
      this.item = 0;
    }

    // create indicators - dots
    createIndicators() {
      this.wrapIndicators.classList.add('wrap-indicators');
      if (this.carouselLength > 1) {
        this.carousel.appendChild(this.wrapIndicators);
        for (let i = 0; i < this.carouselLength; i++) {
          let dot = document.createElement('li');
          dot.classList.add('dot');
          dot.setAttribute('value', i);
          dot.addEventListener('click', (e) => {
            this.index = e.target.value;
            this.carouselList.style.left = -this.index * this.itemWidth + 'px';
          });
          this.wrapIndicators.appendChild(dot);
        }
      }
    }

    // start swipe/ dragging event
    swipeStart(e) {
      this.swiping = true;
      this.startX = e.pageX;
    }

    //declarate  proses of dragging event
    swipeMove(event) {
      if (this.swiping) {
        if (this.previous) {
          this.left = parseInt(this.carouselList.style.left || 0) + ( event.clientX - this.previous  ) * 2; //get the meaning of our movement

          if (this.left >= 0) {
            this.left = 0;
          } else if (this.carouselWidth < Math.abs(this.left)) {
            this.left = 0;
          }
          this.carouselList.style.left = this.left + 'px';
        }
        this.previous = event.clientX;
      }
      event.preventDefault()
    }
    //end  proses of dragging event;  expect the final position
    swipeEnd() {
      this.carouselSwipe = Math.abs(parseFloat(getComputedStyle(this.carouselList).left));// get value of swipe
      this.item = (this.carouselSwipe / this.itemWidth) | 0 || 0; // get current item

      if (this.carouselSwipe >= this.carouselWidth) {
        this.item = 0;
        this.carouselList.style.left = '0px';
        this.swiping = false;
      }

      if (this.carouselSwipe <= 0) {
        this.item = this.carouselLength - 1;
        this.carouselList.style.left = this.carouselWidth + 'px';
        this.swiping = false;
      }
      // swiping function
      if (event.touches) {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      } else {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      }

      this.carouselList.style.left = -Math.abs(this.item * this.itemWidth) + 'px';// expect the final position
      this.previous = null;
      this.swiping = false;

    }
    // swipe event
    controls(direction) {
      if (direction === 'left') {
        this.item++
      }
    }
    //  add event to current instance of carousel
    addEvents() {
      this.carouselList.onmousedown = this.swipeStart.bind(this);
      this.carouselList.onmousemove = this.swipeMove.bind(this);
      this.carouselList.onmouseup = this.swipeEnd.bind(this);

      this.carouselList.ontouchstart = this.swipeStart.bind(this);
      this.carouselList.ontouchmove = this.swipeMove.bind(this);
      this.carouselList.ontouchend = this.swipeEnd.bind(this);
    }

    // build our instance
    build() {
      this.carouselVariabls();
      this.createIndicators();
      this.addEvents();

    }
  }
  // create instances of carousel
  new BScarousel(".bs-carousel");
  new BScarousel(".bs-carousel-test");
  new BScarousel(".bs-carousel2");

}, false);


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

      this.carouselOptions = {
        carouselList: this.carousel.querySelector(`.carousel__display`),
        carouselImg: this.carousel.querySelectorAll('img'),
        carouselLength: this.carousel.querySelectorAll('img').length,
        itemWidth: parseFloat(getComputedStyle(this.carousel.querySelector('img')).width),
        wrapIndicators: document.createElement('ul'),
      };

      this.carouselWidth = (this.carouselOptions.carouselLength - 1) * this.carouselOptions.itemWidth;
      this.swiping = false;
      this.previous = null;
      this.carouselSwipe = null;
      this.item = 0;
    }

    // create indicators - dots
    createIndicators() {
      this.carouselOptions.wrapIndicators.classList.add('wrap-indicators');
      if (this.carouselOptions.carouselLength > 1) {
        this.carousel.appendChild(this.carouselOptions.wrapIndicators);
        for (let i = 0; i < this.carouselOptions.carouselLength; i++) {
          let dot = document.createElement('li');
          dot.classList.add('dot');
          dot.setAttribute('value', i);
          dot.addEventListener('click', (e) => {
            this.index = e.target.value;
            this.carouselOptions.carouselList.style.left = -this.index * this.carouselOptions.itemWidth + 'px';
          });
          this.carouselOptions.wrapIndicators.appendChild(dot);
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

            this.left = parseInt(this.carouselOptions.carouselList.style.left || 0) + ( event.clientX - this.previous  ) * 2; //get the meaning of our movement

            if (this.left >= 0) {
              this.left = 0;
            } else if (this.carouselWidth < Math.abs(this.left)) {
              this.left = 0;
            }
            this.carouselOptions.carouselList.style.left = this.left + 'px';

        }
          this.previous = event.clientX;
        }
        event.preventDefault()

    }

    //end  proses of dragging event;  expect the final position
    swipeEnd() {

      if (Math.abs(this.startX - this.previous) !== this.startX) {

        this.carouselSwipe = Math.abs(parseFloat(getComputedStyle(this.carouselOptions.carouselList).left));// get value of swipe
        this.item = (this.carouselSwipe / this.carouselOptions.itemWidth) | 0 || 0; // get current item

        if (this.carouselSwipe >= this.carouselWidth) {
          this.item = 0;
          this.carouselOptions.carouselList.style.left = '0px';
          this.swiping = false;
        }

        if (this.carouselSwipe <= 0) {
          this.item = this.carouselOptions.carouselLength - 1;
          this.carouselOptions.carouselList.style.left = this.carouselWidth + 'px';
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

        this.carouselOptions.carouselList.style.left = -Math.abs(this.item * this.carouselOptions.itemWidth) + 'px';// expect the final position
        this.previous = null;
        this.swiping = false;

      } else {
        this.carouselOptions.carouselList.style.left = -Math.abs(this.item * this.carouselOptions.itemWidth) + 'px';// expect the final position

        this.previous = null;
        this.swiping = false;
      }
    }

    // swipe event
    controls(direction) {
      if (direction === 'left') {
        this.item++
      }
    }

    //  add event to current instance of carousel
    addEvents() {
      this.carouselOptions.carouselList.onmousedown = this.swipeStart.bind(this);
      this.carouselOptions.carouselList.onmousemove = this.swipeMove.bind(this);
      this.carouselOptions.carouselList.onmouseup = this.swipeEnd.bind(this);

      this.carouselOptions.carouselList.ontouchstart = this.swipeStart.bind(this);
      this.carouselOptions.carouselList.ontouchmove = this.swipeMove.bind(this);
      this.carouselOptions.carouselList.ontouchend = this.swipeEnd.bind(this);
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


import './style.styl';


document.addEventListener("DOMContentLoaded", function () {
  class BScarousel {
    constructor(options) {
      this.selector = options;
      if (document.querySelector(this.selector) === null) {
        throw new Error('Something wrong with your selector 😭');
      }
      this.build()
    }

    carouselVaribls() {
      this.swiping = false;
      this.previous = null;
      this.carousel = document.querySelector(`${this.selector}`);
      this.carouselList =this.carousel.querySelector(`.carousel__display`);
      this.carouselImg = this.carousel.querySelectorAll('img');
      this.carouselLength = this.carouselImg.length;
      this.itemWidth = parseFloat(getComputedStyle(this.carousel.querySelector('img')).width);
      this.itemHeight = parseFloat(getComputedStyle(this.carousel.querySelector('img')).height);
      this.carouselWidth = (this.carouselLength - 1) * this.itemWidth;
      this.carouselSwipe = null ;
      this.item = (this.carouselSwipe / this.itemWidth );
      this.wrapIndicators = document.createElement('ul');

    }

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
            this.carouselList.style.left = -this.index * (this.itemWidth) + 'px';
          });
          this.wrapIndicators.appendChild(dot);
        }
      }
    }

    swipeStart() {
      this.swiping = true;
    }

    swipeMove(event) {
      if (this.swiping) {
        if (this.previous) {
          this.left = parseInt(this.carouselList.style.left || 0) + ( event.clientX - this.previous  ) *3 ;

          if (this.left >= 0) {
            this.left = 0;
          } else if (this.carouselWidth - this.itemWidth < Math.abs(this.left)) {

            this.left = -this.carouselWidth;
          }
          this.carouselList.style.left = this.left + 'px';
        }
        this.previous = event.clientX;
      }
      event.preventDefault()
    }

    swipeEnd() {
      this.swiping = false;
      this.previous= null;
      this.carouselSwipe = Math.abs(parseFloat(getComputedStyle(this.carouselList).left));
      console.log(this.carouselLength, this.carouselSwipe <= 0, this.carouselSwipe , this.carouselWidth, -this.item * this.itemWidth);
      if (this.carouselSwipe >= this.carouselWidth) {
        this.item = 0
      }

      if (this.carouselSwipe <= 0) {
        console.log("swipeleft");
        this.item = this.carouselLength-1
      }
      if ((this.carouselSwipe % this.itemWidth) > (this.itemWidth / this.carouselLength)) {
        console.log(true, "item swipe");
        ++this.item;
      }
      if ((this.carouselSwipe % this.itemWidth) < (this.itemWidth / this.carouselLength)) {
        console.log(true, "item swipe");
        --this.item;
      }
      this.carouselList.style.left = -(this.item * this.itemWidth)  + 'px';
    }

    addEvents() {
      this.carouselList.onmousedown = this.swipeStart.bind(this);
      this.carouselList.onmousemove = this.swipeMove.bind(this);
      this.carouselList.onmouseup = this.swipeEnd.bind(this);

      this.carouselList.ontouchstart = this.swipeStart.bind(this);
      this.carouselList.ontouchmove = this.swipeMove.bind(this);
      this.carouselList.ontouchend = this.swipeEnd.bind(this);
    }

    build() {
      this.carouselVaribls();
      this.createIndicators();
      this.addEvents();

    }
  }

  new BScarousel(".bs-carousel");
  new BScarousel(".bs-carousel-test");
  new BScarousel(".bs-carousel2");

}, false);


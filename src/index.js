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
      this.carouselSwipe = Math.abs(parseFloat(getComputedStyle(this.carouselList).left));

      this.item = this.itemWidth || (this.carouselSwipe / this.itemWidth );
      this.wrapIndicators = document.createElement('ul');


      console.log(" this.carouselList",this.carouselList);
      console.log(" this.carouselLength",this.carouselLength);
      console.log(" this.carouselWidth",this.carouselWidth);
      console.log(" this.itemWidth",this.itemWidth);
      console.log(" this.item",this.item);
      console.log(" this.carouselSwipe",this.carouselSwipe);
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
          this.left = parseInt(this.carouselList.style.left || 0) + ( event.clientX - this.previous  ) * 2;

          if (this.left > 0) {
            this.left = 0;
          } else if (this.carouselWidth-this.itemWidth < Math.abs(this.left)) {
            console.log(this.left, this.carouselWidth - this.itemWidth);
            this.left = -this.carouselWidth;
          }
          this.carouselList.style.left = this.left + 'px';
        }
        this.previous = event.clientX;
      }
      event.preventDefault()
    }

    swipeEnd() {


      if (this.carouselSwipe % this.itemWidth > this.itemWidth / this.carouselLength) {
        this.item++;
      }

      if (this.carouselSwipe >= this.carouselWidth) {
        this.item = 0
      }

      if (this.carouselSwipe <= 0) {
        this.item = this.carouselLength
      }
      this.carouselList.style.left = -(this.item * this.itemWidth) - this.itemWidth + 'px';
      this.swiping = false;
      this.previous= null;
    }

    addEvents() {
      console.log("start");
      this.carouselList.onmousedown = this.swipeStart.bind(this);
      this.carouselList.onmousemove = this.swipeMove.bind(this);
      this.carouselList.onmouseup = this.swipeEnd.bind(this);

      this.carouselList.ontouchstart = this.swipeStart.bind(this);
      this.carouselList.ontouchmove = this.swipeMove.bind(this);
      this.carouselList.ontouchend = this.swipeEnd.bind(this);
    }
    removeEvents() {
      console.log("remove");
      this.carouselList.onmousedown = null;
      this.carouselList.onmousemove = null;
      this.carouselList.onmouseup = null;

      this.carouselList.ontouchstart = null;
      this.carouselList.ontouchmove = null;
      this.carouselList.ontouchend = null;
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


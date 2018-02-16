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

      this.carousel = document.querySelector(`${this.selector}`);
      this.carouselList = this.carousel.querySelector(`.carousel__display`);
      this.carouselImg = this.carousel.querySelectorAll('img');
      this.carouselLength = this.carouselImg.length;
      this.itemWidth = parseFloat(getComputedStyle(this.carousel.querySelector('img')).width);
      this.itemHeight = parseFloat(getComputedStyle(this.carousel.querySelector('img')).height);
      this.carouselWidth = (this.carouselLength - 1) * this.itemWidth;
      this.wrapIndicators = document.createElement('ul');

      this.swiping = false;
      this.previous = null;
      this.carouselSwipe = null;
      this.item = 0;
    }

    mutateData() {
      this.carouselImg.forEach((item, index) => {
        item.dataset.index = index
      });
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
            this.carouselList.style.left = -this.index * this.itemWidth + 'px';
          });
          this.wrapIndicators.appendChild(dot);
        }
      }
    }

    swipeStart(e) {
      this.swiping = true;
      this.startX = e.pageX;
    }

    swipeMove(event) {
      if (this.swiping) {
        if (this.previous) {
          this.left = parseInt(this.carouselList.style.left || 0) + ( event.clientX - this.previous  )*2;
          if (this.left >= 0) {
            this.left = 0;
          } else if (this.carouselWidth < Math.abs(this.left)) {
            this.left = this.carouselWidth;
          }else {
            this.left = 0;
          }
          this.carouselList.style.left = this.left + 'px';
        }
        this.previous = event.clientX;
      }
      event.preventDefault()
    }

    swipeEnd() {
      this.carouselSwipe = Math.abs(parseFloat(getComputedStyle(this.carouselList).left));
      this.item = (this.carouselSwipe / this.itemWidth) | 1;


      if (this.carouselSwipe >= this.carouselWidth) {
        this.item = 0;
        this.swiping = false;
      }

      if (this.carouselSwipe <= 0) {
        this.item = this.carouselLength
        this.swiping = false;
      }
      if (event.touches) {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      } else {
        (event.pageX < this.startX)
            ? this.controls('left')
            : this.controls('right')
      }

      this.carouselList.style.left = -Math.abs(this.item * this.itemWidth) + 'px';
      this.previous = null;
      this.swiping = false;

    }

    controls(direction) {
      console.log(this.item);
      if (direction === 'left') {
        this.item++
      } else {
        this.item = this.item -1
      }
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
      this.mutateData();
      this.addEvents();

    }
  }

  new BScarousel(".bs-carousel");
  new BScarousel(".bs-carousel-test");
  new BScarousel(".bs-carousel2");

}, false);


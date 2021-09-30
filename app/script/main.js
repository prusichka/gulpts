new Swiper(".slider1", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
});

new Swiper (".slider2", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
})
new Swiper('.slider3', {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
})

const body = document.querySelector('body');
const openMenu = document.getElementById('open');
const closeMenu = document.getElementById('close');

openMenu.addEventListener('click', ()=> {
  body.classList.add('lock-scroll');
})
closeMenu.addEventListener('click', ()=> {
  body.classList.remove('lock-scroll');
})
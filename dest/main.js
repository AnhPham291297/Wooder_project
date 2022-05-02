// Progress Bar top
function showProgressBar() {
  window.addEventListener("scroll", () => {
    let heightWindow = window.innerHeight;
    let heightBody = document.querySelector("body").clientHeight;
    let progressBarTop = document.querySelector("#progressbar-top");
    let scrollY = window.pageYOffset;
    let percent = Number(scrollY / (heightBody - heightWindow)) * 100;

    progressBarTop.style.width = `${percent}%`;
  });
}
showProgressBar();

// function setProgressBar() {
//   let hBody = document.querySelector("body").clientHeight;
//   let hwindow = window.innerHeight;
//   let progessBarTop = document.querySelector(".progressbar-top");
//   window.addEventListener("scroll", () => {
//     let hScrollY = window.pageYOffset;
//     let wProgessVar = Number((hScrollY / (hBody - hwindow)) * 100);
//     progessBarTop.style.width = `${wProgessVar}%`;
//   });
// }
// setProgressBar();

// function showProgressBar() {
//   let vh = window.innerHeight;
//   let progress = document.querySelector("#progressbar-top");
//   let heightBody = document.querySelector("body").clientHeight;
//   let scrollY = window.pageYOffset;
//   let percent = Number((scrollY / (heightBody - vh)) * 100);
//   progress.style.width = percent + "%";
// }

// setTimeout(function () {
//   showProgressBar();
// }, 200);

// document.addEventListener("scroll", function () {
//   showProgressBar();
// });

// Sticky Navigation Bar
let header = document.querySelector("header");
let slider = document.querySelector(".slider");
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;

function changeBgHeader() {
  let scrollY = window.pageYOffset;

  if (scrollY > heightSlider - heightHeader) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Back to top
let backtotop = document.querySelector("#scroll-top");
let getHeightWindow = window.innerHeight;

function ShowBackToTop() {
  let scrollY = window.pageYOffset;

  if (scrollY > getHeightWindow) {
    backtotop.classList.add("is-active");
  } else {
    backtotop.classList.remove("is-active");
  }
}
backtotop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("scroll", function () {
  changeBgHeader();
  ShowBackToTop();
});

// Tags
let tagText = document.querySelectorAll(".new__tag .tag");
let tagPost = document.querySelectorAll(".new__post");

tagText.forEach(function (item, index) {
  item.addEventListener("click", function () {
    let tagID = index + 1;
    tagText.forEach(function (tag) {
      tag.classList.remove("tab-active");
    });
    this.classList.add("tab-active"); // this o day la item

    tagPost.forEach(function (tagPost) {
      tagPost.classList.remove("tab-active");
    });
    document.querySelector(".new__post-" + tagID).classList.add("tab-active");
  });
});

// Nav Toggle Menu Mobile
const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-mobile");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMobile.classList.toggle("active");
});

navLink.forEach((nav) => {
  nav.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMobile.classList.remove("active");
  });
});

window.onscroll = () => {
  hamburger.classList.remove("active");
  navMobile.classList.remove("active");
};

// Language SelectBox
// B1: Sự kiện click button (lang) - toggle class
// B2: Sự kiện click item Option Lang;
// B3: Lấy textContent của item mình bấm
// B4: Lấy textContent của Current Lang và gán vào 1 biến
// B5: Lấy textContent của item được bấm vào Current Lang
// B6: Đẩy giá trị được lưu trữ trước đó vào item Lang vừa được bấm
// B7: Bấm vào document và hide Lang, sử dụng stopPropagation()

function selectLanguage() {
  const lang = document.querySelector(".lang");
  const langCurrent = document.querySelector(".lang .lang__current span");
  const langItems = document.querySelectorAll(".lang__option-item");

  lang.addEventListener("click", function (e) {
    e.stopPropagation();
    lang.classList.toggle("active");
  });

  langItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      let langText = this.textContent;
      let langCurrentSpan = langCurrent.textContent;
      langCurrent.innerHTML = langText;
      this.innerHTML = langCurrentSpan;
    });
  });

  document.addEventListener("click", function () {
    lang.classList.remove("active");
  });
}
selectLanguage();

// Implementing Smooth Scrolling
let menus = document.querySelectorAll("header .navlist a");
let heightHeader_1 = document.querySelector("header").offsetHeight;
let sections = [];

function removeActiveMenu() {
  menus.forEach(function (menu_element, menu_index) {
    menu_element.classList.remove("active");
  });
}

menus.forEach(function (element, index) {
  let className = element.getAttribute("href").replace("#", "");
  let section = document.querySelector("." + className);
  sections.push(section);

  element.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: section.offsetTop - heightHeader_1 + 1,
      behavior: "smooth",
    });

    removeActiveMenu();
    element.classList.add("active");
  });
});

window.addEventListener("scroll", function (e) {
  let positionScroll = window.pageYOffset;

  sections.forEach(function (section, index) {
    if (
      positionScroll > section.offsetTop - heightHeader_1 &&
      positionScroll < section.offsetTop + section.offsetHeight
    ) {
      removeActiveMenu();
      menus[index].classList.add("active");
    } else {
      menus[index].classList.remove("active");
    }
  });
});

/*
// Slider vanilla js
let listItemSlider = document.querySelectorAll(".slider__item");
let number = document.querySelector(".slider__bottom-paging .number");
let dot_li = document.querySelectorAll(".slider__bottom-paging .dotted li");
let currentSlider = 0;

listItemSlider.forEach(function (itemSlider, index) {
  if (itemSlider.classList.contains("active")) {
    currentSlider = index;
  }
});

function showNumber(index) {
  number.innerHTML = index.toString().padStart(2, "0");
}

showNumber(currentSlider + 1);
dot_li[currentSlider].classList.add("active");

function goTo(index) {
  listItemSlider[currentSlider].classList.remove("active");
  listItemSlider[index].classList.add("active");
  dot_li[currentSlider].classList.remove("active");
  dot_li[index].classList.add("active");
  currentSlider = index;
  showNumber(currentSlider + 1);
}

// Bấm nút next slider
document.querySelector(".btnctr.next").addEventListener("click", function () {
  if (currentSlider < listItemSlider.length - 1) {
    // listItemSlider[currentSlider].classList.remove("active");
    // listItemSlider[currentSlider + 1].classList.add("active");
    // currentSlider++;
    goTo(currentSlider + 1);
  } else {
    // listItemSlider[currentSlider].classList.remove("active");
    // listItemSlider[0].classList.add("active");
    // currentSlider = 0;
    goTo(0);
  }
});

// Bấm nút prev slider
document.querySelector(".btnctr.prev").addEventListener("click", function () {
  if (currentSlider > 0) {
    // listItemSlider[currentSlider].classList.remove("active");
    // listItemSlider[currentSlider - 1].classList.add("active");
    // currentSlider--;
    goTo(currentSlider - 1);
  } else {
    // listItemSlider[currentSlider].classList.remove("active");
    // listItemSlider[listItemSlider.length - 1].classList.add("active");
    // currentSlider = listItemSlider.length - 1;
    goTo(listItemSlider.length - 1);
  }
});

// Bấm đotted
dot_li.forEach(function (li, index) {
  li.addEventListener("click", function () {
    goTo(index);
  });
});
*/

//Slider flickity js
let $carousel = $(".slider__item-wrap");
$carousel.flickity({
  //option
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  // autoPlay: 2000,
  on: {
    ready: function () {
      let dotted = $(".flickity-page-dots");
      paging = $(".slider__bottom-paging .dotted");
      dotted.appendTo(paging);
    },
    change: function (index) {
      let number = $(".slider__bottom-paging .number");
      let indexPage = index + 1;
      number.text(indexPage.toString().padStart(2, 0));
    },
  },
});

$(".slider__bottom-control .prev").on("click", function () {
  $carousel.flickity("previous");
});
$(".slider__bottom-control .next").on("click", function () {
  $carousel.flickity("next");
});

// POPUP Video
let button_video = document.querySelectorAll(".quality__item-video");
let popup_video = document.querySelector(".popup-video");
let close_video = document.querySelector(".popup-video .close");
let iframe = document.querySelector(".popup-video iframe");

button_video.forEach(function (button) {
  button.addEventListener("click", function () {
    let video_id = button.getAttribute("data-video-id");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + video_id);
    popup_video.style.display = "flex";
  });
});

close_video.addEventListener("click", function () {
  iframe.setAttribute("src", "");
  popup_video.style.display = "none";
});

document.querySelector(".popup-video").addEventListener("click", function () {
  iframe.setAttribute("src", "");
  popup_video.style.display = "none";
});

// Gallery
Fancybox.bind("[data-fancybox]", {
  infinite: false,
  keyboard: {
    Escape: "close",
    Delete: "close",
    Backspace: "close",
    PageUp: "next",
    PageDown: "prev",
    ArrowUp: "next",
    ArrowDown: "prev",
    ArrowRight: "next",
    ArrowLeft: "prev",
  },
});

// Slider shows

let shows = document.querySelector(".show");
let flkty = new Flickity(shows, {
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  freeScroll: true,
  pageDots: false,
  prevNextButtons: false,
});
let progressBar = document.querySelector(".timeline .timeline__progressbar");
flkty.on("scroll", (process) => {
  process = Math.max(0, Math.min(1, process));
  progressBar.style.width = process * 100 + "%";
});

// AOS
AOS.init({
  duration: 1200,
});

const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach((link) => {
	link.addEventListener("click", () => {
		menuLinks.forEach((link) => {
			link.classList.remove("is-active");
		});
		link.classList.add("is-active");
	});
});



// CARD JS
 
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });



//   our team section

/*inspiration 
PINTEREST
*/

const cards = document.querySelectorAll(".grid-item");
cards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cards.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});


//   our team section ------- xxxx



// PRICING================

var swiper = new Swiper('.product-slider', {
  spaceBetween: 30,
  effect: 'fade',
  // initialSlide: 2,
  loop: false,
  navigation: {
      nextEl: '.next',
      prevEl: '.prev'
  },
  // mousewheel: {
  //     // invert: false
  // },
  on: {
      init: function(){
          var index = this.activeIndex;

          var target = $('.product-slider__item').eq(index).data('target');

          console.log(target);

          $('.product-img__item').removeClass('active');
          $('.product-img__item#'+ target).addClass('active');
      }
  }

});

swiper.on('slideChange', function () {
  var index = this.activeIndex;

  var target = $('.product-slider__item').eq(index).data('target');

  console.log(target);

  $('.product-img__item').removeClass('active');
  $('.product-img__item#'+ target).addClass('active');

  if(swiper.isEnd) {
      $('.prev').removeClass('disabled');
      $('.next').addClass('disabled');
  } else {
      $('.next').removeClass('disabled');
  }

  if(swiper.isBeginning) {
      $('.prev').addClass('disabled');
  } else {
      $('.prev').removeClass('disabled');
  }
});

$(".js-fav").on("click", function() {
  $(this).find('.heart').toggleClass("is-active");
});


// PRICING======XXXXXXXXX=============xxxxx



// footer======-------


const bubble = document.querySelector(".bubble");

bubble.addEventListener("click", function (evt) {
  evt.preventDefault();
  bubble.classList.add("animated");
  setTimeout(function () {
    bubble.classList.remove("animated");
  }, 1000);
});




// footer======-------xxxxxxxxx



// // CLINT LOGO SLIDER
// var copy = document.querySelector(".logos-slide").cloneNode(true);
// document.querySelector(".logo-slider").appendChild(copy);

// // CLINT LOGO SLIDER--XXXXX



// popural service comment slider  ---------------

(function App() {
  let isDark = false;
  if (localStorage.getItem("dark-mode")) {
    isDark = true;
    setDarkTheme();
  }
  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle.addEventListener("click", () => {
    if (isDark) {
      setLightTheme();
      isDark = false;
      ManageLocalStorage("DELETE");
      return;
    }
    setDarkTheme();
    ManageLocalStorage("ADD");
    isDark = true;
  });

  function setLightTheme() {
    document.body.classList.remove("dark");
  }
  function setDarkTheme() {
    document.body.classList.add("dark");
  }

  function ManageLocalStorage(command) {
    if (command === "DELETE") {
      localStorage.removeItem("dark-mode");
      return;
    }
    localStorage.setItem("dark-mode", true);
  }
})();


// populer service comment slider  ------xxxxx------
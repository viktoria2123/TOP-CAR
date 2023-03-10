/** Used Only For Touch Devices **/
(function (window) {

	// for touch devices: add class cs-hover to the figures when touching the items
	if (Modernizr.touch) {

		// classie.js https://github.com/desandro/classie/blob/master/classie.js
		// class helper functions from bonzo https://github.com/ded/bonzo

		function classReg(className) {
			return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ('classList' in document.documentElement) {
			hasClass = function (elem, c) {
				return elem.classList.contains(c);
			};
			addClass = function (elem, c) {
				elem.classList.add(c);
			};
			removeClass = function (elem, c) {
				elem.classList.remove(c);
			};
		}
		else {
			hasClass = function (elem, c) {
				return classReg(c).test(elem.className);
			};
			addClass = function (elem, c) {
				if (!hasClass(elem, c)) {
					elem.className = elem.className + ' ' + c;
				}
			};
			removeClass = function (elem, c) {
				elem.className = elem.className.replace(classReg(c), ' ');
			};
		}

		function toggleClass(elem, c) {
			var fn = hasClass(elem, c) ? removeClass : addClass;
			fn(elem, c);
		}

		var classie = {
			// full names
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			// short names
			has: hasClass,
			add: addClass,
			remove: removeClass,
			toggle: toggleClass
		};

		// transport
		if (typeof define === 'function' && define.amd) {
			// AMD
			define(classie);
		} else {
			// browser global
			window.classie = classie;
		}

		[].slice.call(document.querySelectorAll('ul.grid > li > figure')).forEach(function (el, i) {
			el.querySelector('figcaption > a').addEventListener('touchstart', function (e) {
				e.stopPropagation();
			}, false);
			el.addEventListener('touchstart', function (e) {
				classie.toggle(this, 'cs-hover');
			}, false);
		});

	}

})(window);

// var swiper = new Swiper(".mySwiper", {
// 	slidesPerView: 1,
// 	spaceBetween: 30,
// 	loop: true,
// 	pagination: {
// 		el: ".swiper-pagination",
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: ".swiper-button-next",
// 		prevEl: ".swiper-button-prev",
// 	},
// });

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 2.5,
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		350: {
			slidesPerView: 1,
		},
		650: {
			slidesPerView: 1,
		},
		980: {
			slidesPerView: 2.5,
		},
	}
});

// window.addEventListener("scroll", function() {
// 	var phoneBtn = document.querySelector(".phone-btn");
// 	phoneBtn.classList.toggle("hidden", window.scrollY > 100);
//   });
  
const callBtn = document.querySelector('.call-btn');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
  const heroImageOffsetTop = heroImage.offsetTop;
  const heroImageHeight = heroImage.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > heroImageOffsetTop && scrollTop < (heroImageOffsetTop + heroImageHeight - windowHeight)) {
    const opacity = 1 - ((scrollTop - heroImageOffsetTop) / (heroImageHeight - windowHeight));
    callBtn.style.opacity = opacity;
  } else if (scrollTop >= (heroImageOffsetTop + heroImageHeight - windowHeight)) {
    callBtn.style.opacity = 0;
  } else {
    callBtn.style.opacity = 1;
  }
});



  
  
  
  
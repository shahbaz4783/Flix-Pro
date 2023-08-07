export const carouselSwiper = () => {
	new Swiper('.carousel .swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
};

export const contentSwiper = () => {
	new Swiper('.content .swiper', {
		slidesPerView: 6,
		spaceBetween: 20,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 0,
			},
			200: {
				slidesPerView: 2,
				spaceBetween: 5,
			},
			300: {
				slidesPerView: 3,
				spaceBetween: 8,
			},
			600: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 5,
				spaceBetween: 15,
			},

			1000: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
		},
	});
};

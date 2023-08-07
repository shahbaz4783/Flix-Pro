export const createCarousel = (data, genres, listClass, isMovie) => {
	const genreNames = data.genre_ids
		.map((genreId) => {
			const genre = genres.find((genre) => genre.id === genreId);
			return genre ? genre.name : '';
		})
		.slice(0, 3);

	const cardContainer = document.createElement('div');
	cardContainer.classList.add('swiper-slide');
	const posterImg = document.createElement('img');
	const content = document.createElement('div');
	const title = document.createElement('h3');
	const genre = document.createElement('p');
	const rating = document.createElement('p');
	const year = document.createElement('p');
	const details = document.createElement('a');

	cardContainer.classList.add('swiper-slide');
	content.classList.add('movie-overview');
	posterImg.classList.add('carousel-backdrop');
	title.classList.add('carousel-title');
	genre.classList.add('carousel-genre');
	rating.classList.add('carousel-rating');
	year.classList.add('carousel-release-year');
	details.classList.add('carousel-details');

	posterImg.src = isMovie
		? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
		: `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
	details.href = isMovie
		? `movie-detail.html?id=${data.id}`
		: `show-detail.html?id=${data.id}`;

	title.textContent = isMovie ? data.title : data.name;
	genre.textContent = `${genreNames.join(' ')}`;
	rating.textContent = `${data.vote_average.toFixed(1)}`;
	year.textContent = isMovie
		? `${new Date(data.release_date).getFullYear()}`
		: `Rating: ${data.vote_average.toFixed(1)}`;
	details.textContent = 'Details';

	content.append(title, rating, genre, year, details);
	cardContainer.append(posterImg, content);

	document.querySelector(`.${listClass} .swiper-wrapper`).append(cardContainer);
	carouselSwiper();
};

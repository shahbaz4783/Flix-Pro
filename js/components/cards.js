export const createCard = (data, genres, listClass, isMovie) => {
	const releaseDate = new Date(data.release_date).getFullYear();

	const genreNames = data.genre_ids
		.map((genreId) => {
			const genre = genres.find((genre) => genre.id === genreId);
			return genre ? genre.name : '';
		})
		.slice(0, 2);

	// creating elements
	const cardContainer = document.createElement('div');
	const poster = document.createElement('img');
	const content = document.createElement('div');
	const title = document.createElement('h3');
	const genre = document.createElement('p');
	const rating = document.createElement('p');
	const year = document.createElement('p');
	const details = document.createElement('a');

	// adding class
	cardContainer.classList.add('swiper-slide');
	poster.classList.add('poster');
	content.classList.add('content-div');
	title.classList.add('title');
	genre.classList.add('genre');
	rating.classList.add('rating');
	year.classList.add('release-year');
	details.classList.add('details');

	// adding attributes
	poster.src = isMovie
		? `https://image.tmdb.org/t/p/w500${data.poster_path}`
		: `https://image.tmdb.org/t/p/original${data.poster_path}`;
	details.href = isMovie
		? `movie-detail.html?id=${data.id}`
		: `show-detail.html?id=${data.id}`;

	// adding text content
	title.textContent = isMovie ? data.title : data.name;
	genre.textContent = `${genreNames.join(' ')}`;
	rating.textContent = `${data.vote_average.toFixed(1)}`;
	year.textContent = isMovie
		? `${releaseDate}`
		: `First Air Date: ${data.first_air_date}`;
	details.textContent = 'Details';

	// append elements
	content.append(title, rating, genre, year, details);
	cardContainer.append(poster, content);
	document.querySelector(`.${listClass} .swiper-wrapper`).append(cardContainer);

	contentSwiper();
};

const displayTrendingShows = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/tv/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/tv/list');
	const genres = genreResponse.genres;

	results.forEach((show) => {
		createCarousel(show, genres, 'featured', false);
	});
};


// display popular Shows
const displayPopularShows = async () => {
	const { results } = await fetchAPIdata('tv/popular');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'popular-shows-list', false);
	});
};

// display top rated Shows
const displayTopRatedShows = async () => {
	const { results } = await fetchAPIdata('tv/top_rated');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'top-rated-shows-list', false);
	});
};


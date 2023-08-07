const displayTrendingMovies = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/movie/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCarousel(movie, genres, 'featured', true);
	});
};

// Now Playing in Theaters
const displayNowPlayingMovies = async () => {
	const { results } = await fetchAPIdata('movie/now_playing');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'now-playing-list', true);
	});
};

// Display popular movies
const displayPopularMovies = async () => {
	const { results } = await fetchAPIdata('movie/popular');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'popular-list', true);
	});
};

// display top rated movies
const displayTopRatedMovies = async () => {
	const { results } = await fetchAPIdata('movie/top_rated');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'top-rated-list', true);
	});
};

// display upcoming movies
const displayUpcomingMovies = async () => {
	const { results } = await fetchAPIdata('movie/upcoming');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'upcoming-list', true);
	});
};

// display Action movies

const displayActionMovies = async () => {
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;
	const { results } = await fetchAPIdata('discover/movie', { with_genres: 28 });

	results.forEach((movie) => {
		createCard(movie, genres, 'action-list', true);
	});
};

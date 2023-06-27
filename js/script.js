const global = {
	currentPage: window.location.pathname,
};

// Fetch Data From TMBD API
const fetchAPIdata = async (endpoint) => {
	const API_KEY = '47152db3059591a245fa638f38ce9f76';
	const API_URL = 'https://api.themoviedb.org/3/';

	const resonse = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-IND`
	);
	const data = await resonse.json();

	return data;
};


// display now playing in theaters
const displayNowPlayingMovies = async () => {
	let movieList = [];
	let movieIndex = 0;
	let intervalId;

	const fetchMovies = async () => {
		const { results } = await fetchAPIdata('movie/now_playing');
		movieList = results;
	};

	const showNextMovie = async () => {
		const movie = movieList[movieIndex];
		const backdropPath = movie.backdrop_path;
		const posterPath = movie.poster_path;

		const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
		const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

		const cardContainer = document.createElement('div');
		cardContainer.classList.add('playing-movie-card');
		cardContainer.innerHTML = `
        <div class="playing-movie-content">
            <img class="playing-poster" src="${posterUrl}" alt="${movie.title}">
            <img class="backdrop" src="${backdropUrl}">
        </div>
    `;

		const nowPlayingList = document.querySelector('.now-playing-list');
		nowPlayingList.innerHTML = '';
		nowPlayingList.append(cardContainer);

		movieIndex = (movieIndex + 1) % movieList.length;

		clearInterval(intervalId);
		intervalId = setInterval(showNextMovie, 3000);
	};

	await fetchMovies();
	showNextMovie();

	intervalId = setInterval(showNextMovie, 3000);
};


// display top rated movies
const displayTopRatedMovies = async () => {
	const { results } = await fetchAPIdata('movie/top_rated');
	let movieCount = 0;

	results.forEach((movie) => {
		if (movieCount < 14) {
			const releaseDate = new Date(movie.release_date);
			const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
				'default',
				{ month: 'short' }
			)} ${releaseDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('movie-card');
			cardContainer.innerHTML = `
        <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">Released: ${formattedDate}</p>
            <button class="details">Details</button>
        </div>
        `;
			document.querySelector('.top-rated-list').append(cardContainer);
			movieCount++;
		}
	});
};

// display popular movies
const displayPopularMovies = async () => {
	const { results } = await fetchAPIdata('movie/popular');
	let movieCount = 0;

	results.forEach((movie) => {
		if (movieCount < 5) {
			const releaseDate = new Date(movie.release_date);
			const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
				'default',
				{ month: 'short' }
			)} ${releaseDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('popular-box');
			cardContainer.innerHTML = `

           <img class="popular-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="flex-info">${movie.title}
            <p>${formattedDate}</p>
            <button class="details">Details</button>
            </div>

        `;
			document.querySelector('.popular-list').append(cardContainer);
			movieCount++;
		}
	});
};

// display upcoming movies
const displayUpcomingMovies = async () => {
	const { results } = await fetchAPIdata('movie/upcoming');
	let movieCount = 0;

	results.forEach((movie) => {
		if (movieCount < 7) {
			const releaseDate = new Date(movie.release_date);
			const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
				'default',
				{ month: 'short' }
			)} ${releaseDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('movie-card');
			cardContainer.innerHTML = `
        <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">Released: ${formattedDate}</p>
            <button class="details">Details</button>
        </div>
        `;
			document.querySelector('.upcoming-list').append(cardContainer);
			movieCount++;
		}
	});
};



// display top rated Shows
const displayTopRatedShows = async () => {
	const { results } = await fetchAPIdata('tv/top_rated');
	let showCount = 0;

	results.forEach((show) => {
		if (showCount < 14) {
			const airDate = new Date(show.first_air_date);
			const formattedDate = `${airDate.getDate()} ${airDate.toLocaleString(
				'default',
				{ month: 'short' }
			)} ${airDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('movie-card');
			cardContainer.innerHTML = `
           <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.title}">
            <div class="movie-content">
            <p>${show.name}</p>
            <p>${formattedDate}</p>
            <button class="details">Details</button>
            </div>
        `;
			document.querySelector('.top-rated-shows-list').append(cardContainer);
			showCount++;
		}
	});
};


// display popular Shows
const displayPopularShows = async () => {
	const { results } = await fetchAPIdata('tv/popular');
	let showCount = 0;

	results.forEach((show) => {
		if (showCount < 14) {
			const airDate = new Date(show.first_air_date);
			const formattedDate = `${airDate.getDate()} ${airDate.toLocaleString(
				'default',
				{ month: 'short' }
			)} ${airDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('movie-card');
			cardContainer.innerHTML = `
           <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.title}">
            <div class="movie-content">
            <p>${show.name}</p>
            <p>${formattedDate}</p>
            <button class="details">Details</button>
            </div>
        `;
			document.querySelector('.popular-shows-list').append(cardContainer);
			showCount++;
		}
	});
};

// Init App
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayNowPlayingMovies();
			displayTopRatedMovies();
			displayPopularMovies();
			displayUpcomingMovies();
			break;
		case '/shows.html':
            displayTopRatedShows();
			displayPopularShows();
			break;
		case '/movie-detail.html':
			console.log('Movie Detail');
			break;
		case '/search.html':
			console.log('Search Result');
			break;
		default:
			break;
	}
};

init();

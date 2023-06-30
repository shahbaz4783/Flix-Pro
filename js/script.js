const global = {
	currentPage: window.location.pathname,
};


// Fetch Data From TMBD API
const fetchAPIdata = async (endpoint) => {
	const API_KEY = '47152db3059591a245fa638f38ce9f76';
	const API_URL = 'https://api.themoviedb.org/3/';

    showLoader();
    hideContent();

	const resonse = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-IND`
	);
	const data = await resonse.json();

    hideLoader();
    showContent();
	return data;
};



// Now Playing in Theaters
const displayNowPlayingMovies = async () => {
    const { results } = await fetchAPIdata('movie/now_playing');

    results.forEach((movie) => {
        const cardContainer = document.createElement('div');
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
            <img class="backdrop" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}">
            <div class="movie-overview">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average.toFixed(1)}</p>
            <a class="feature-details" href="movie-detail.html?id=${movie.id}">Details</a>
            </div>
            `;
        document.querySelector('.swiper-wrapper').append(cardContainer);
        initSwiper();
    })
}


const initSwiper = () => {
    new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }


// display popular movies
const displayPopularMovies = async () => {
	const { results } = await fetchAPIdata('movie/popular');
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
            <a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>

        `;
			document.querySelector('.popular-list').append(cardContainer);
			movieCount++;
		}
	});
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
            <a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>
        `;
			document.querySelector('.top-rated-list').append(cardContainer);
			movieCount++;
		}
	});
};


// display upcoming movies
const displayUpcomingMovies = async () => {
	const { results } = await fetchAPIdata('movie/upcoming');
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
            <a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>
        `;
			document.querySelector('.upcoming-list').append(cardContainer);
			movieCount++;
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
            <a class="show-details" href="show-detail.html?id=${show.id}">Details</a>
            </div>
        `;
			document.querySelector('.popular-shows-list').append(cardContainer);
			showCount++;
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
            <a class="show-details" href="show-detail.html?id=${show.id}">Details</a>

            </div>
        `;
			document.querySelector('.top-rated-shows-list').append(cardContainer);
			showCount++;
		}
	});
};

// Movie Details Page
const movieDetails = async () => {
	const movieID = window.location.search.split('=')[1];
	const movie = await fetchAPIdata(`movie/${movieID}`);

	const releaseDate = new Date(movie.release_date);
	const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
		'default',
		{ month: 'short' }
	)} ${releaseDate.getFullYear()}`;

	const credits = await fetchAPIdata(`movie/${movieID}/credits`);
	const cast = credits.cast.slice(0, 5);


	const details = document.createElement('div');
	details.innerHTML = `
    <div class="images">
    <img class="detail-poster" src="https://image.tmdb.org/t/p/w500${
			movie.poster_path
		}" alt="${movie.title}">
     <img class="detail-backdrop" src="https://image.tmdb.org/t/p/original${
			movie.backdrop_path
		}" alt="${movie.title}">

        </div>
        <div class="basic-info">
        <div>
            <p class="rating">Rating: ${movie.vote_average.toFixed(1)}</p>
            <p class="release">${formattedDate}</p>
            <p class="runtime">${movie.runtime} minutes</p>
        </div>
            <div>
            <p class="genre">${movie.genres
							.map((genre) => `<li>${genre.name}</li>`)
							.join('')}</p>
                            </div>
        </div>
        <div class="overview">
            <h3>${movie.title}</h3>
            <p class="info">${movie.overview}</p>
        </div>
        <div class="crew">
            <p class="director"> Director:
            ${credits.crew.find((member) => member.job === 'Director').name}
            </p>
            <div class="production-list">
            <p class="production"> Production
            ${movie.production_companies
							.map((company) => `<li>${company.name}</li>`)
							.join('')}
            </p>
            </div>
        </div>
        <div class="cast">
      <h3>Cast</h3>
      <ul>
        ${cast.map((castMember) => `<li>${castMember.name}</li>`).join('')}
      </ul>
    </div>
    <div class="finance">
            <p>Budget: ${movie.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p class="info">Collection: ${movie.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
    </div>
    
    `;
	document.querySelector('.display-details').append(details);
};




// Show Details Page
const showDetails = async () => {
	const showID = window.location.search.split('=')[1];
	const show = await fetchAPIdata(`tv/${showID}`);

	const releaseDate = new Date(show.first_air_date);
	const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
		'default',
		{ month: 'short' }
	)} ${releaseDate.getFullYear()}`;

	const credits = await fetchAPIdata(`tv/${showID}/credits`);
	const cast = credits.cast.slice(0, 5);

	const details = document.createElement('div');
	details.innerHTML = `
    <div class="images">
    <img class="detail-poster" src="https://image.tmdb.org/t/p/w500${
			show.poster_path
		}" alt="${show.title}">
     <img class="detail-backdrop" src="https://image.tmdb.org/t/p/original${
			show.backdrop_path
		}" alt="${show.title}">

        </div>
        <div class="basic-info">
        <div>
            <p class="rating">Rating: ${show.vote_average.toFixed(1)}</p>
            <p class="release">${formattedDate}</p>
        </div>
            <div>
            <p class="genre">${show.genres
							.map((genre) => `<li>${genre.name}</li>`)
							.join('')}</p>
            </div>
        </div>
        <div class="overview">
            <h3>${show.name}</h3>
            <p class="info">${show.overview}</p>
        </div>
        <div class="finance">
                <p class="info">Total Seasons: ${show.number_of_seasons}</p>
                <p class="info">Total Episodes: ${show.number_of_episodes}</p>
        </div>


        <div class="cast">
      <h3>Cast</h3>
      <ul>
        ${cast.map((castMember) => `<li>${castMember.name}</li>`).join('')}
      </ul>
    </div>

    <div class="crew">

    <p class="production"> Production
    ${show.production_companies
                    .map((company) => `<li>${company.name}</li>`)
                    .join('')}
    </p>
</div>
    `;
	document.querySelector('.display-details').append(details);
};

// Show Hide Loading
const showLoader = () => {
    document.querySelector('.loading').style.display = 'block';
}
const hideLoader = () => {
    document.querySelector('.loading').style.display = 'none';
}

// Show Hide Movie Page
const showContent = () => {
    document.querySelector('main').style.display = 'block';
}
const hideContent = () => {
    document.querySelector('main').style.display = 'none';
}


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
			movieDetails();
			break;
		case '/show-detail.html':
			showDetails();
			break;
		case '/search.html':
            search();
			break;
		case '/views/nav.html':
            search();
			break;
		default:
			break;
	}
};

document.addEventListener('DOMContentLoaded', init);
// Show-Hide Content
const showLoader = () => {
	document.querySelector('.loading-section').style.display = 'flex';
};
const hideLoader = () => {
	document.querySelector('.loading-section').style.display = 'none';
};
const showContent = () => {
	document.querySelector('main').style.display = 'block';
};
const hideContent = () => {
	document.querySelector('main').style.display = 'none';
};

// Global Variables
const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		page: 1,
		totalPage: 1,
	},
};

// Fetch Data From TMBD API
const fetchAPIdata = async (endpoint) => {
	try {
		hideContent();
		showLoader();

		const API_KEY = '47152db3059591a245fa638f38ce9f76';
		const API_URL = 'https://api.themoviedb.org/3/';

		const response = await fetch(
			`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
		);

		const data = await response.json();

		hideLoader();
		showContent();

		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

// Sliders
const carouselSwiper = () => {
	new Swiper('.carousel .swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
};

const contentSwiper = () => {
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

// Display Trending Movies
const displayTrendingMovies = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/movie/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((show) => {
		const cardContainer = document.createElement('div');
		cardContainer.classList.add('swiper-slide');
		const genreNames = show.genre_ids
			.map((genreId) => {
				const genre = genres.find((genre) => genre.id === genreId);
				return genre ? genre.name : '';
			})
			.slice(0, 3);
		cardContainer.innerHTML = `
        <img class="backdrop" src="https://image.tmdb.org/t/p/original${
					show.backdrop_path
				}" alt="${show.name}">
        <div class="movie-overview">
          <h3>${show.title}</h3>
          <p>Rating: ${show.vote_average.toFixed(1)}</p>
          <p>${genreNames.join(', ')}</p>
          <a class="feature-details" href="movie-detail.html?id=${
						show.id
					}">Details</a>
            </div>
        </div>
      `;
		document.querySelector('.featured .swiper-wrapper').append(cardContainer);
		carouselSwiper();
	});
};

// Now Playing in Theaters
const displayNowPlayingMovies = async () => {
	const { results } = await fetchAPIdata('movie/now_playing');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		const releaseDate = new Date(movie.release_date).getFullYear();

		const genreNames = movie.genre_ids
			.map((genreId) => {
				const genre = genres.find((genre) => genre.id === genreId);
				return genre ? genre.name : '';
			})
			.slice(0, 2);

		// creating elements
		const cardContainer = document.createElement('div');
		const posterIMG = document.createElement('img');
		const content = document.createElement('div');
		const title = document.createElement('span');
		const genre = document.createElement('p');
		const rating = document.createElement('p');
		const year = document.createElement('p');
		const details = document.createElement('a');

		// adding class
		cardContainer.classList.add('swiper-slide');
		content.classList.add('content-div');
		title.classList.add('movie-title');
		posterIMG.classList.add('poster');
		genre.classList.add('movie-description');
		rating.classList.add('movie-description');
		year.classList.add('movie-description');
		details.classList.add('movie-details');

		// adding attributes
		posterIMG.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		details.href = `movie-detail.html?id=${movie.id}`;

		// adding text content
		title.textContent = `${movie.title}`;
		genre.textContent = `${genreNames.join(' ')}`;
		title.textContent = `${movie.title}`;
		rating.textContent = `${movie.vote_average.toFixed(1)}`;
		year.textContent = `${releaseDate}`;
		details.textContent = 'Details';

		// append elements
		content.append(title, rating, genre, year, details);
		cardContainer.append(posterIMG, content);

		document
			.querySelector('.now-playing-list .swiper-wrapper')
			.append(cardContainer);

		contentSwiper();
	});
};

// display popular movies
const displayPopularMovies = async () => {
	const { results } = await fetchAPIdata('movie/popular');
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		const releaseDate = new Date(movie.release_date).getFullYear();

		const genreNames = movie.genre_ids
			.map((genreId) => {
				const genre = genres.find((genre) => genre.id === genreId);
				return genre ? genre.name : '';
			})
			.slice(0, 2);

		// creating elements
		const cardContainer = document.createElement('div');
		const posterIMG = document.createElement('img');
		const content = document.createElement('div');
		const title = document.createElement('span');
		const genre = document.createElement('p');
		const rating = document.createElement('p');
		const year = document.createElement('p');
		const details = document.createElement('a');

		// adding class
		cardContainer.classList.add('swiper-slide');
		content.classList.add('content-div');
		title.classList.add('movie-title');
		posterIMG.classList.add('poster');
		genre.classList.add('movie-description');
		rating.classList.add('movie-description');
		year.classList.add('movie-description');
		details.classList.add('movie-details');

		// adding attributes
		posterIMG.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		details.href = `movie-detail.html?id=${movie.id}`;

		// adding text content
		title.textContent = `${movie.title}`;
		genre.textContent = `${genreNames.join(' ')}`;
		title.textContent = `${movie.title}`;
		rating.textContent = `${movie.vote_average.toFixed(1)}`;
		year.textContent = `${releaseDate}`;
		details.textContent = 'Details';

		// append elements
		content.append(title, rating, genre, year, details);
		cardContainer.append(posterIMG, content);
		document
			.querySelector('.popular-list .swiper-wrapper')
			.append(cardContainer);

		contentSwiper();
	});
};

// display Action movies
const displayActionMovies = async () => {
	const { genres } = await fetchAPIdata('genre/movie/list');
	const actionGenre = genres.find((genre) => genre.name === 'Action');

	if (actionGenre) {
		const { results } = await fetchAPIdata('discover/movie', {
			with_genres: actionGenre.id,
			sort_by: 'popularity.desc',
		});

		const actionMovies = results.slice(0, 20);

		actionMovies.forEach((movie) => {
			const releaseDate = new Date(movie.release_date);
			const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
				'default',
				{
					month: 'short',
				}
			)} ${releaseDate.getFullYear()}`;

			const cardContainer = document.createElement('div');
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
		  <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
		  <div class="movie-content">
			<span class="movie-title">${movie.title}</span>
			<p class="movie-description">Released: ${formattedDate}</p>
			<a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
		  </div>
		`;
			document
				.querySelector('.action-list .swiper-wrapper')
				.append(cardContainer);
		});

		contentSwiper();
	}
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
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
        <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">Released: ${formattedDate}</p>
            <a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>
        `;
			document
				.querySelector('.top-rated-list .swiper-wrapper')
				.append(cardContainer);
			movieCount++;
		}
		contentSwiper();
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
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
        <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">Released: ${formattedDate}</p>
            <a class="movie-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>
        `;
			document
				.querySelector('.upcoming-list .swiper-wrapper')
				.append(cardContainer);
			movieCount++;
		}
		contentSwiper();
	});
};

// Display Trending Shows
const displayTrendingShows = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/tv/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/tv/list');
	const genres = genreResponse.genres;

	results.forEach((show) => {
		const cardContainer = document.createElement('div');
		cardContainer.classList.add('swiper-slide');
		const genreNames = show.genre_ids
			.map((genreId) => {
				const genre = genres.find((genre) => genre.id === genreId);
				return genre ? genre.name : '';
			})
			.slice(0, 3);
		cardContainer.innerHTML = `
        <img class="backdrop" src="https://image.tmdb.org/t/p/original${
					show.backdrop_path
				}" alt="${show.name}">
        <div class="movie-overview">
          <h3>${show.name}</h3>
          <p>Rating: ${show.vote_average.toFixed(1)}</p>
          <p>${genreNames.join(', ')}</p>
          <a class="feature-details" href="show-detail.html?id=${
						show.id
					}">Details</a>
            </div>
        </div>
      `;
		document.querySelector('.featured .swiper-wrapper').append(cardContainer);
		carouselSwiper();
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
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
           <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.title}">
            <div class="movie-content">
            <p>${show.name}</p>
            <p>${formattedDate}</p>
            <a class="show-details" href="show-detail.html?id=${show.id}">Details</a>
            </div>
        `;
			document
				.querySelector('.popular-shows-list .swiper-wrapper')
				.append(cardContainer);
			showCount++;
		}
		contentSwiper();
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
			cardContainer.classList.add('swiper-slide');
			cardContainer.innerHTML = `
           <img class="poster" src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.title}">
            <div class="movie-content">
            <p>${show.name}</p>
            <p>${formattedDate}</p>
            <a class="show-details" href="show-detail.html?id=${show.id}">Details</a>

            </div>
        `;
			document
				.querySelector('.top-rated-shows-list .swiper-wrapper')
				.append(cardContainer);
			showCount++;
		}
		contentSwiper();
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

	const details = document.createElement('div');
	details.innerHTML = `
	<div>
    <div class="backdrop-img" style="background-image: url('https://image.tmdb.org/t/p/original${
			movie.backdrop_path
		}')"></div>
	
	<div class="overview">
    <img class="poster-img" src="https://image.tmdb.org/t/p/w500${
			movie.poster_path
		}">
		<div class="info">
            <h3>${movie.title}</h3>
			<div>
			<p class="rating">${movie.vote_average.toFixed(1)}</p>
			<p class="runtime">${movie.runtime} minutes</p>
            <p class="release">${formattedDate}</p>
			</div>
			<div class="genre">
            <p>${movie.genres
							.map((genre) => `<li>${genre.name}</li>`)
							.join('')}</p>
			</div>
            <div><p>${movie.overview}</p></div>
		</div>
        </div>

       
    `;

	document.querySelector('.display-details').append(details);

	// Display Actors
	const cast = credits.cast;
	cast.forEach((castMember) => {
		const casts = document.createElement('div');
		casts.classList.add('swiper-slide');

		casts.innerHTML = `
    <div class="cast">
        <ul>
            <div class="cast-info">
                <img src="${
									castMember.profile_path
										? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
										: '../assets/no-people.png'
								}">
                <li>${castMember.name}</li>
                <li>${castMember.character}</li>
            </div>
        </ul>
    </div>
    `;
		document.querySelector('.cast-list .swiper-wrapper').append(casts);
		contentSwiper();
	});

	const crew = credits.crew;

	crew.forEach((crewMember) => {
		const crew = document.createElement('div');
		crew.classList.add('swiper-slide');

		crew.innerHTML = `
    <div class="cast">
        <ul>
            <div class="cast-info">
                <img src="${
									crewMember.profile_path
										? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
										: '../assets/no-people.png'
								}">
                <li>${crewMember.name}</li>
                <li>${crewMember.job}</li>
            </div>
        </ul>
    </div>
    `;
		document.querySelector('.crew-list .swiper-wrapper').append(crew);
		contentSwiper();
	});

	// Production and Finance
	const production = document.createElement('div');
	production.innerHTML = `
	<div>   
	 <div class="production-list">
	 <p class="production">Production</p>
	 <ul>
		 ${movie.production_companies
				.map(
					(company) => `
				 <li class="lists">
					 <img class="production-img" src="${
							company.logo_path
								? `https://image.tmdb.org/t/p/w200${company.logo_path}`
								: ''
						}">
					 ${company.logo_path ? '' : `<p>${company.name}</p>`}
				 </li>`
				)
				.join('')}
	 </ul>
 </div>
	</div>


<div class="finance">
		<p>Budget: <span>${movie.budget.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
			maximumFractionDigits: 0,
		})}</span></p>
		<p>Revenue: <span>${movie.revenue.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
			maximumFractionDigits: 0,
		})}</span></p>
	`;

	document.querySelector('.companies-list').append(production);

	// Display Similar Movies
	const { results } = await fetchAPIdata(`movie/${movieID}/similar`);

	results.forEach((movie) => {
		const releaseDate = new Date(movie.release_date).getFullYear();

		const similarMovies = document.createElement('div');
		similarMovies.classList.add('swiper-slide');
		similarMovies.innerHTML = `

            <img class="poster" src="https://image.tmdb.org/t/p/w500${
							movie.poster_path
						}">
            <div class="similar-movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">${
							movie.release_date ? releaseDate : ''
						}</p>
            <a class="movie-details" href="movie-detail.html?id=${
							movie.id
						}">Details</a>
           </div>
        
        `;
		document
			.querySelector('.simiar-movies-list .swiper-wrapper')
			.append(similarMovies);

		contentSwiper();
	});
};

// Show details
const showDetails = async () => {
	const showID = window.location.search.split('=')[1];
	const movie = await fetchAPIdata(`tv/${showID}`);

	const releaseDate = new Date(movie.first_air_date);
	const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
		'default',
		{ month: 'short' }
	)} ${releaseDate.getFullYear()}`;

	const credits = await fetchAPIdata(`tv/${showID}/credits`);
	const details = document.createElement('div');
	details.innerHTML = `
	<div>
    <div class="backdrop-img" style="background-image: url('https://image.tmdb.org/t/p/original${
			movie.backdrop_path
		}')"></div>
	
	<div class="overview">
    <img class="poster-img" src="https://image.tmdb.org/t/p/w500${
			movie.poster_path
		}">
		<div class="info">
            <h3>${movie.name}</h3>
			<div>
			<p class="rating">${movie.vote_average.toFixed(1)}</p>

            <p class="release">${formattedDate}</p>
			</div>
			<div class="genre">
            <p>${movie.genres
							.map((genre) => `<li>${genre.name}</li>`)
							.join('')}</p>
			</div>
            <div><p>${movie.overview}</p></div>
			<div class="seasons">
	   		 <p>Seasons:<span> ${movie.number_of_seasons}</span></p>
	    	<p>Episodes:<span> ${movie.number_of_episodes}</span></p>
		</div>
		</div>
		
        </div>
    `;

	document.querySelector('.display-details').append(details);

	// Display Actors
	const cast = credits.cast;
	if (cast.length > 0) {
		cast.forEach((castMember) => {
			const casts = document.createElement('div');
			casts.classList.add('swiper-slide');

			casts.innerHTML = `
    <div class="cast">
        <ul>
            <div class="cast-info">
                <img src="${
									castMember.profile_path
										? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
										: '../assets/no-people.png'
								}">
                <li>${castMember.name}</li>
                <li>${castMember.character}</li>
            </div>
        </ul>
    </div>
    `;
			document.querySelector('.cast-list .swiper-wrapper').append(casts);
			contentSwiper();
		});
	} else {
		document.querySelector('.casting').style.display = 'none';
	}

	const crew = credits.crew;
	if (crew.length > 0) {
		crew.forEach((crewMember) => {
			const crew = document.createElement('div');
			crew.classList.add('swiper-slide');

			crew.innerHTML = `
    <div class="cast">
        <ul>
            <div class="cast-info">
                <img src="${
									crewMember.profile_path
										? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
										: '../assets/no-people.png'
								}">
                <li>${crewMember.name}</li>
                <li>${crewMember.job}</li>
            </div>
        </ul>
    </div>
    `;
			document.querySelector('.crew-list .swiper-wrapper').append(crew);
			contentSwiper();
		});
	} else {
		document.querySelector('.crew').style.display = 'none';
	}

	// Production and Finance
	const production = document.createElement('div');
	production.innerHTML = `
	<div>   
	 <div class="production-list">
	 <p class="production">Production</p>
	 <ul>
		 ${movie.production_companies
				.map(
					(company) => `
				 <li class="lists">
					 <img class="production-img" src="${
							company.logo_path
								? `https://image.tmdb.org/t/p/w200${company.logo_path}`
								: ''
						}">
					 ${company.logo_path ? '' : `<p>${company.name}</p>`}
				 </li>`
				)
				.join('')}
	 </ul>
 </div>
	</div>
	`;

	document.querySelector('.companies-list').append(production);

	// Display Similar Shows
	results.forEach((movie) => {
		const releaseDate = new Date(movie.release_date).getFullYear();

		const similarMovies = document.createElement('div');
		similarMovies.classList.add('swiper-slide');
		similarMovies.innerHTML = `

            <img class="poster" src="https://image.tmdb.org/t/p/w500${
							movie.poster_path
						}">
            <div class="similar-movie-content">
            <span class="movie-title">${movie.title}</span>
            <p class="movie-description">${
							movie.release_date ? releaseDate : ''
						}</p>
            <a class="movie-details" href="movie-detail.html?id=${
							movie.id
						}">Details</a>
           </div>
        
        `;
		document
			.querySelector('.simiar-shows-list .swiper-wrapper')
			.append(similarMovies);

		contentSwiper();
	});
};

// Search Movie and Shows Function

const searchAPIdata = async () => {
	try {
		showLoader();
		hideContent();
		const API_KEY = '47152db3059591a245fa638f38ce9f76';
		const API_URL = 'https://api.themoviedb.org/3/';

		const response = await fetch(
			`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
		);

		const data = await response.json();

		// hideLoader();
		showContent();

		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const search = async () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	global.search.term = urlParams.get('search-term');

	if (global.search.term !== '' && global.search.term !== null) {
		const { results } = await searchAPIdata();

		if (results.length === 0) {
			alert('No Result Found');
		}

		document.querySelector('#search-term').value = '';

		displaySearchResult(results);
	} else {
		alert('Please Write Something in Box');
	}
};

const displaySearchResult = (results) => {
	results.forEach((result) => {
		const posterPath = result.poster_path
			? `https://image.tmdb.org/t/p/w500${result.poster_path}`
			: `<img src="../assets/no-image.jpg" alt="${result.title}"/>`;

		const cardContainer = document.createElement('div');
		cardContainer.classList.add('result-container');
		cardContainer.innerHTML = `

            <img class="poster" src="https://image.tmdb.org/t/p/w500${posterPath}" alt="poster">
            <div class="movie-content">
            <span class="title">${
							result.media_type === 'movie'
								? `${result.title}`
								: `${result.name}`
						}</span>
            <p class="year">${
							result.release_date
								? new Date(result.release_date).getFullYear()
								: `${new Date(result.first_air_date).getFullYear()}`
						}</p>
            <a class="details" href="${
							result.media_type === 'movie'
								? 'movie-detail.html'
								: 'show-detail.html'
						}?id=${result.id}">Details</a>

        </div>

        `;
		document.querySelector('.search-list').append(cardContainer);
	});
};

// Init App
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayTrendingMovies();
			displayNowPlayingMovies();
			displayActionMovies();
			displayTopRatedMovies();
			displayPopularMovies();
			displayUpcomingMovies();
			break;
		case '/shows.html':
			displayTrendingShows();
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
		default:
			break;
	}
};

document.addEventListener('DOMContentLoaded', init);

// header Background Color Change
const header = document.querySelector('header');
const swipeThreshold = window.innerHeight * 0.15;

const changeBg = () => {
	if (window.scrollY > swipeThreshold) {
		header.classList.add('background');
	} else {
		header.classList.remove('background');
	}
};
window.addEventListener('scroll', changeBg);

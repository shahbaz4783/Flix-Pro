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

// Create Carousel Function
const createCarousel = (data, genres, listClass, isMovie) => {
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

// Display Trending Movies in slide
const displayTrendingMovies = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/movie/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCarousel(movie, genres, 'featured', true);
	});
};



// Display Trending Shows
const displayTrendingShows = async () => {
	const timeWindow = 'day';
	const { results } = await fetchAPIdata(`trending/tv/${timeWindow}`);
	const genreResponse = await fetchAPIdata('genre/tv/list');
	const genres = genreResponse.genres;

	results.forEach((show) => {
		createCarousel(show, genres, 'featured', false);
	});
};

// Create Card Function
const createCard = (data, genres, listClass, isMovie) => {
	const releaseDate = new Date(data.release_date).getFullYear();
	const airDate = new Date(data.first_air_date).getFullYear();


	const genreNames = data.genre_ids
		.map((genreId) => {
			const genre = genres.find((genre) => genre.id === genreId);
			return genre ? genre.name : '';
		})
		.slice(0, 1);

	// creating elements
	const cardContainer = document.createElement('div');
	const poster = document.createElement('img');
	const content = document.createElement('div');
	const title = document.createElement('h3');
	const genre = document.createElement('li');
	const rating = document.createElement('span');
	const year = document.createElement('span');
	const details = document.createElement('a');

	// adding class
	cardContainer.classList.add('swiper-slide', 'swiper-card');
	poster.classList.add('poster');
	content.classList.add('content-div');
	title.classList.add('title');
	genre.classList.add('genre');
	rating.classList.add('rating');
	year.classList.add('release-year');
	details.classList.add('details');

	// adding attributes
	poster.src = isMovie
		? `https://image.tmdb.org/t/p/original${data.poster_path}`
		: `https://image.tmdb.org/t/p/original${data.poster_path}`;
	details.href = isMovie
		? `movie-detail.html?id=${data.id}`
		: `show-detail.html?id=${data.id}`;

	// adding text content
	title.textContent = isMovie ? data.title : data.name;
	genre.textContent = `${genreNames.join(' ')}`;
	

	rating.textContent = `${data.vote_average.toFixed(1)}`;
	year.textContent = isMovie
		? `${releaseDate}  `
		: `${airDate}`;
	details.textContent = 'Details';

	// append elements
	content.append(title, year, rating, genre, details);
	cardContainer.append(poster, content);
	document.querySelector(`.${listClass} .swiper-wrapper`).append(cardContainer);

	contentSwiper();
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
		const directorName = credits.crew.find(
			(member) => member.job === 'Director'
		);

		// Create elements
		const cardContainer = document.createElement('div');
		const backdrop = document.createElement('div');
		const poster = document.createElement('img');
		const content = document.createElement('div');
		const title = document.createElement('h3');
		const rating = document.createElement('span');
		const year = document.createElement('span');
		const runtime = document.createElement('span');
		const tagline = document.createElement('p');
		const genre = document.createElement('p');
		const overview = document.createElement('p');

		const crewDiv = document.createElement('div');
		const director = document.createElement('p');
		const job = document.createElement('p');

		// Add classes
		backdrop.classList.add('backdrop-img');
		poster.classList.add('poster-img');
		content.classList.add('texts');
		title.classList.add('title');
		genre.classList.add('genre');
		rating.classList.add('rating');
		runtime.classList.add('runtime');
		year.classList.add('release');
		overview.classList.add('overview');
		tagline.classList.add('tagline');
		director.classList.add('director');
		crewDiv.classList.add('crew-div');
		job.classList.add('job');

		// Set content for the elements
		backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;

		poster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
		title.textContent = `${movie.title}`;
		rating.textContent = `${movie.vote_average.toFixed(1)}`;
		tagline.textContent = `${movie.tagline}`;
		genre.textContent = `${movie.genres
			.map((genre) => `${genre.name}`)
			.join(', ')}`;
		runtime.textContent = `${movie.runtime} mins`;
		year.textContent = `${formattedDate}`;
		overview.textContent = `${movie.overview}`;
		job.textContent = `${directorName.job}`;
		director.textContent = `${directorName.name}`;

		// Append elements
		crewDiv.append(director, job);

		content.append(
			title,
			rating,
			runtime,
			year,
			tagline,
			genre,
			overview,
			crewDiv
		);
		cardContainer.append(backdrop, poster, content);
		document.querySelector('.display-details').append(cardContainer);

		// Display Actors
		const cast = credits.cast;
		cast.forEach((castMember) => {
			// Create Elements
			const casts = document.createElement('div');
			const cast = document.createElement('div');
			const castIMG = document.createElement('img');
			const castName = document.createElement('li');
			const castChar = document.createElement('li');
			const castInfo = document.createElement('div');

			// Add Class
			casts.classList.add('swiper-slide');
			cast.classList.add('cast');
			castInfo.classList.add('cast-info');

			// Add attributes
			castIMG.src = `${
				castMember.profile_path
					? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
					: '../assets/no-people.png'
			}`;

			castName.textContent = `${castMember.name}`;
			castChar.textContent = `${castMember.character}`;

			// Append
			castInfo.append(castIMG, castName, castChar);
			cast.append(castInfo);
			casts.append(cast);
			document.querySelector('.cast-list .swiper-wrapper').append(casts);
		});

		// Other Details
		const detailsInfo = document.createElement('div');
		detailsInfo.classList.add('details-info');

		const budget = document.createElement('p');
		budget.textContent = `Budget: ${movie.budget.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
		})}`;

		const collection = document.createElement('p');
		collection.textContent = `Collection: ${movie.revenue.toLocaleString(
			'en-US',
			{
				style: 'currency',
				currency: 'USD',
				maximumFractionDigits: 0,
			}
		)}`;

		const status = document.createElement('p');
		status.textContent = `Status: ${movie.status}`;

		// Append elements
		detailsInfo.append(status, budget, collection);
		document.querySelector('.other-info').appendChild(detailsInfo);

		// Production Companies
		const production = document.createElement('div');
		const productionList = document.createElement('div');
		productionList.classList.add('production-list');

		const ul = document.createElement('ul');

		movie.production_companies.forEach((company) => {
			const li = document.createElement('li');
			li.classList.add('lists');

			const img = document.createElement('img');
			img.classList.add('production-img');
			img.src = company.logo_path
				? `https://image.tmdb.org/t/p/w200${company.logo_path}`
				: '';

			const p = document.createElement('p');
			p.textContent = company.logo_path ? '' : company.name;

			li.appendChild(img);
			li.appendChild(p);
			ul.appendChild(li);
		});

		productionList.appendChild(ul);
		production.append(productionList);

		document.querySelector('.companies-list').append(production);

		// Fetch trailer data
		const trailerData = await fetchAPIdata(`movie/${movieID}/videos`);

		// Find the trailer with type "Trailer"
		const trailer = trailerData.results.find(
			(video) => video.type === 'Trailer'
		);

		if (trailer) {
			const trailerIframe = document.createElement('iframe');
			trailerIframe.classList.add('trailer');
			trailerIframe.src = `https://www.youtube.com/embed/${trailer.key}`;
			trailerIframe.allowFullscreen = true;
			trailerIframe.classList.add('trailer-iframe');

			document.querySelector('.trailer').appendChild(trailerIframe);
		} else {
			document.querySelector('.trailer').remove();
		}

		// Show reviews
		const review = await fetchAPIdata(`movie/${movieID}/reviews`);
		const formatDate = (dateString) => {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		};

		// Create review elements
		const reviewContainer = document.createElement('div');
		reviewContainer.classList.add('reviews-container');

		if (review.results.length > 0) {
			const reviewData = review.results[0];

			// Create elements
			const reviewBox = document.createElement('div');
			const author = document.createElement('span');
			const rating = document.createElement('span');
			const date = document.createElement('p');
			const content = document.createElement('p');

			// Add class
			reviewBox.classList.add('review-box');
			content.classList.add('review-content');
			date.classList.add('review-date');
			rating.classList.add('review-rating');
			author.classList.add('review-author');

			// Text content
			author.textContent = reviewData.author;
			rating.textContent = reviewData.author_details.rating;
			date.textContent = formatDate(reviewData.created_at);
			content.textContent = reviewData.content;

			// Append
			reviewBox.append(rating, author, date, content);
			reviewContainer.append(reviewBox);

			if (review.results.length > 1) {
				const showMoreButton = document.createElement('button');
				const showLessButton = document.createElement('button');

				showMoreButton.textContent = 'Show More';
				showLessButton.textContent = 'Show Less';

				showMoreButton.addEventListener('click', () => {
					showMoreButton.remove();

					// Show the rest of the reviews
					for (let i = 1; i < review.results.length; i++) {
						const reviewData = review.results[i];

						// Create Element
						const reviewBox = document.createElement('div');
						const author = document.createElement('span');
						const rating = document.createElement('span');
						const content = document.createElement('p');
						const date = document.createElement('p');

						// Add Class
						reviewBox.classList.add('review-box');
						content.classList.add('review-content');
						date.classList.add('review-date');
						rating.classList.add('review-rating');
						author.classList.add('review-author');

						// Add Text Content
						author.textContent = reviewData.author;
						rating.textContent = reviewData.author_details.rating;
						date.textContent = formatDate(reviewData.created_at);
						content.textContent = reviewData.content;

						// Append
						reviewBox.append(rating, author, date, content);
						reviewContainer.append(reviewBox, showLessButton);
					}
				});

				reviewContainer.append(showMoreButton);
			}
		} else {
			const noReviews = document.createElement('p');
			noReviews.textContent = 'Reviews are not available';
			reviewContainer.append(noReviews);
		}

		document.querySelector('.review').append(reviewContainer);

		// Watch Providers
		const watchProviders = await fetchAPIdata(
			`movie/${movieID}/watch/providers`
		);

		// Create watch provider elements
		const watchProviderContainer = document.createElement('div');
		watchProviderContainer.classList.add('watch-provider-container');

		const country = 'IN';

		if (watchProviders.results && watchProviders.results[country]) {
			const providers = [
				...(watchProviders.results[country].flatrate || []),
				...(watchProviders.results[country].ads || []),
			];

			const providerTitle = document.createElement('h3');
			const providerList = document.createElement('ul');

			providerTitle.classList.add('provider-heading')
			providerList.classList.add('provider-container')
			
			providerTitle.textContent = 'Watch Now';
			watchProviderContainer.append(providerTitle);


			providers.forEach((provider) => {
				const listItem = document.createElement('li');
				const logo = document.createElement('img');


				listItem.classList.add('provider-list');
				logo.classList.add('provider-logo');


				logo.src = `https://image.tmdb.org/t/p/original${provider.logo_path}`;
				logo.alt = `${provider.provider_name} logo`;

				
				listItem.append(logo);
				providerList.append(listItem);
			});

			watchProviderContainer.append(providerList);
		} else {
			const noProviders = document.createElement('p');
			noProviders.textContent = 'Watch provider Not Found';
			watchProviderContainer.appendChild(noProviders);
		}

		// Append watch provider container to your details section
		document
			.querySelector('.watch-provider')
			.appendChild(watchProviderContainer);

		// Display Similar Movies
		const displaySimilarMovies = async () => {
			const { results } = await fetchAPIdata(
				`movie/${movieID}/recommendations`
			);
			const genreResponse = await fetchAPIdata('genre/movie/list');
			const genres = genreResponse.genres;

			results.forEach((movie) => {
				createCard(movie, genres, 'simiar-movies-list', true);
			});
		};

		displaySimilarMovies();
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
		const displaySimilarShows = async () => {
			const { results } = await fetchAPIdata(`tv/${showID}/recommendations`);
			const genreResponse = await fetchAPIdata('genre/movie/list');
			const genres = genreResponse.genres;

			results.forEach((movie) => {
				createCard(movie, genres, 'simiar-shows-list', false);
			});
		};

		displaySimilarShows();
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

		hideLoader();
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
			: '';

		// Create elements
		const cardContainer = document.createElement('div');
		const poster = document.createElement('img');
		const content = document.createElement('div');
		const title = document.createElement('h3');
		const genre = document.createElement('p');
		const rating = document.createElement('p');
		const year = document.createElement('p');
		const details = document.createElement('a');

		// Add classes
		cardContainer.classList.add('result-container');
		poster.classList.add('poster');
		content.classList.add('content-div');
		title.classList.add('title');
		genre.classList.add('genre');
		rating.classList.add('rating');
		year.classList.add('release-year');
		details.classList.add('details');

		// Set content for the elements
		poster.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
		title.textContent =
			result.media_type === 'movie' ? result.title : result.name;
		year.textContent = result.release_date
			? new Date(result.release_date).getFullYear()
			: new Date(result.first_air_date).getFullYear();
		details.href =
			result.media_type === 'movie'
				? `movie-detail.html?id=${result.id}`
				: `show-detail.html?id=${result.id}`;
		details.textContent = 'Details';

		// Append elements
		content.append(title, rating, genre, year, details);
		cardContainer.append(poster, content);
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
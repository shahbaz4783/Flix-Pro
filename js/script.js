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
	if (data.poster_path) {
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
		year.textContent = isMovie ? `${releaseDate}  ` : `${airDate}`;
		details.textContent = 'Details';

		// append elements
		content.append(title, year, rating, genre, details);
		cardContainer.append(poster, content);
		document
			.querySelector(`.${listClass} .swiper-wrapper`)
			.append(cardContainer);
	}
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

// _______________________________________ Details Page
const mediaType = window.location.pathname.includes('movie') ? 'movie' : 'tv';

const fetchMediaDetails = async (mediaType) => {
	const mediaID = window.location.search.split('=')[1];
	const media = await fetchAPIdata(`${mediaType}/${mediaID}`);

	const releaseDate = new Date(media.release_date || media.first_air_date);
	const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString(
		'default',
		{ month: 'short' }
	)} ${releaseDate.getFullYear()}`;

	const credits = await fetchAPIdata(`${mediaType}/${mediaID}/credits`);
	const directorName = credits.crew.find((member) => member.job === 'Director');

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
	backdrop.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${media.backdrop_path}')`;

	poster.src = `https://image.tmdb.org/t/p/original${media.poster_path}`;
	title.textContent = `${media.title || media.name}`;
	rating.textContent = `${media.vote_average.toFixed(1)}`;
	tagline.textContent = `${media.tagline}`;
	genre.textContent = `${media.genres
		.map((genre) => `${genre.name}`)
		.join(', ')}`;
	runtime.textContent = `${media.runtime || media.episode_run_time[0]} mins`;
	year.textContent = `${formattedDate}`;
	overview.textContent = `${media.overview}`;

	if (directorName) {
		job.textContent = `${directorName.job}`;
		director.textContent = `${directorName.name}`;
		crewDiv.append(director, job);
	}

// Append elements
crewDiv.append(director, job);

content.append(title, rating, runtime, year, tagline, genre, overview, crewDiv);
cardContainer.append(backdrop, poster, content);
document.querySelector('.display-details').append(cardContainer);
};




// Display Cast
const displayCast = async () => {
    const mediaID = window.location.search.split('=')[1];
	const credits = await fetchAPIdata(`${mediaType}/${mediaID}/credits`);

	const cast = credits.cast;
	cast.forEach((castMember) => {
		// Create Elements
		if (castMember.profile_path) {
			const container = document.createElement('div');
			const cast = document.createElement('div');
			const castIMG = document.createElement('img');
			const castName = document.createElement('p');
			const castChar = document.createElement('p');
			const castInfo = document.createElement('div');

			// Add Class
			container.classList.add('swiper-slide');
			cast.classList.add('cast');
			castIMG.classList.add('cast-img');
			castName.classList.add('cast-name');
			castChar.classList.add('cast-char');
			castInfo.classList.add('cast-info');

			// Add attributes
			castIMG.src = `${
				castMember.profile_path
					? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
					: ''
			}`;

			castName.textContent = `${castMember.name.substring(0, 12)}`;
			castChar.textContent = `${castMember.character.substring(0, 12)}`;

			// Append
			castInfo.append(castIMG, castName, castChar);
			cast.append(castInfo);
			container.append(cast);
			document.querySelector('.cast-list .swiper-wrapper').append(container);
		}

		new Swiper('.cast-list .swiper', {
			slidesPerView: 8,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				200: {
					slidesPerView: 2,
				},
				300: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 5,
				},
				768: {
					slidesPerView: 6,
				},

				1000: {
					slidesPerView: 7,
					spaceBetween: 30,
				},

				1500: {
					slidesPerView: 8,
					spaceBetween: 35,
				},
			},
		});
	});
};

// Watch Provider
const watchProvider = async () => {
	const mediaID = window.location.search.split('=')[1];
	const watchProviders = await fetchAPIdata(`${mediaType}/${mediaID}/watch/providers`);

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

		providerTitle.classList.add('provider-heading');
		providerList.classList.add('provider-container');

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
		noProviders.classList.add('no-provider');
		noProviders.textContent = 'Watch provider not available';
		watchProviderContainer.append(noProviders);
	}

	// Append watch provider container to your details section
	document.querySelector('.watch-provider').appendChild(watchProviderContainer);
};

// Other Details
const financeInfo = async () => {
	    const mediaID = window.location.search.split('=')[1];
			const media = await fetchAPIdata(`${mediaType}/${mediaID}`);
	const detailsInfo = document.createElement('div');
	const budget = document.createElement('p');
	const collection = document.createElement('p');
	const status = document.createElement('p');

	// Add Class
	detailsInfo.classList.add('details-info');
	budget.classList.add('budget');
	collection.classList.add('collection');
	status.classList.add('status');

	// Text Content
	budget.innerHTML = `<span>Budget</span> ${media.budget.toLocaleString(
		'en-US',
		{
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
		}
	)}`;

	collection.innerHTML = `<span>Revenue</span> ${media.revenue.toLocaleString(
		'en-US',
		{
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
		}
	)}`;

	status.innerHTML = `<span>Status</span> ${media.status}`;

	// Append elements
	detailsInfo.append(status, budget, collection);
	document.querySelector('.other-info').appendChild(detailsInfo);
};

// Production Companies
const production = async () => {
	 const mediaID = window.location.search.split('=')[1];
		const media = await fetchAPIdata(`${mediaType}/${mediaID}`);
	const productionList = document.createElement('div');
	const ul = document.createElement('ul');

	productionList.classList.add('production-list');

	media.production_companies.forEach((company) => {
		if (company.logo_path) {
			const li = document.createElement('li');
			const img = document.createElement('img');

			li.classList.add('lists');
			img.classList.add('production-img');

			img.src = company.logo_path
				? `https://image.tmdb.org/t/p/w200${company.logo_path}`
				: '';

			li.append(img);
			ul.append(li);
		}
	});

	productionList.append(ul);

	document.querySelector('.companies-list').append(productionList);
};

const fetchtrailer = async () => {
	const mediaID = window.location.search.split('=')[1];
	const trailerData = await fetchAPIdata(`${mediaType}/${mediaID}/videos`);

	// Find the trailer with type "Trailer"
	const trailer = trailerData.results.find((video) => video.type === 'Trailer');

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
};

// Show reviews
const reviews = async () => {
	const mediaID = window.location.search.split('=')[1];
	const { results } = await fetchAPIdata(`${mediaType}/${mediaID}/reviews`);
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};
	const reviewContainer = document.createElement('div');
	reviewContainer.classList.add('reviews-container');

	if (results.length > 0) {
		const reviewData = results[0];

		// Create elements for the first review
		const firstReviewBox = document.createElement('div');
		const firstAuthor = document.createElement('span');
		const firstRating = document.createElement('span');
		const firstDate = document.createElement('p');
		const firstContent = document.createElement('p');

		// Add classes
		firstReviewBox.classList.add('review-box');
		firstContent.classList.add('review-content');
		firstDate.classList.add('review-date');
		firstRating.classList.add('review-rating');
		firstAuthor.classList.add('review-author');

		// Set text content
		firstAuthor.textContent = reviewData.author;
		firstRating.textContent = reviewData.author_details.rating;
		firstDate.textContent = formatDate(reviewData.created_at);
		firstContent.textContent = reviewData.content;

		// Append elements
		firstReviewBox.append(firstRating, firstAuthor, firstDate, firstContent);
		reviewContainer.append(firstReviewBox);

		if (results.length > 1) {
			const showMoreButton = document.createElement('button');
			const showLessButton = document.createElement('button');

			showMoreButton.textContent = 'Show More';
			showLessButton.textContent = 'Show Less';

			showLessButton.addEventListener('click', () => {
				while (reviewContainer.children.length > 1) {
					reviewContainer.removeChild(reviewContainer.lastChild);
				}
				reviewContainer.append(showMoreButton);
			});

			showMoreButton.addEventListener('click', () => {
				showMoreButton.remove();

				// Show the rest of the reviews
				for (let i = 1; i < results.length; i++) {
					const reviewData = results[i];

					// Create elements for additional reviews
					const additionalReviewBox = document.createElement('div');
					const additionalAuthor = document.createElement('span');
					const additionalRating = document.createElement('span');
					const additionalContent = document.createElement('p');
					const additionalDate = document.createElement('p');

					// Add classes
					additionalReviewBox.classList.add('review-box');
					additionalContent.classList.add('review-content');
					additionalDate.classList.add('review-date');
					additionalRating.classList.add('review-rating');
					additionalAuthor.classList.add('review-author');

					// Set text content
					additionalAuthor.textContent = reviewData.author;
					additionalRating.textContent = reviewData.author_details.rating;
					additionalDate.textContent = formatDate(reviewData.created_at);
					additionalContent.textContent = reviewData.content;

					// Append elements
					additionalReviewBox.append(
						additionalRating,
						additionalAuthor,
						additionalDate,
						additionalContent
					);
					reviewContainer.append(additionalReviewBox, showLessButton);
				}
			});

			reviewContainer.append(showMoreButton);
		}
	} else {
		const noReviews = document.createElement('p');
		noReviews.classList.add('no-reviews');
		noReviews.textContent = 'Reviews are not available';
		reviewContainer.append(noReviews);
	}

	document.querySelector('.review').append(reviewContainer);
};

// Display Similar Movies
const displaySimilarMovies = async () => {
	const movieID = window.location.search.split('=')[1];
	const { results } = await fetchAPIdata(`movie/${movieID}/recommendations`);
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;

	results.forEach((movie) => {
		createCard(movie, genres, 'simiar-movies-list', true);
	});
};


// Display Similar Shows
const displaySimilarShows = async () => {
	const showID = window.location.search.split('=')[1];
	const { results } = await fetchAPIdata(`tv/${showID}/recommendations`);
	const genreResponse = await fetchAPIdata('genre/movie/list');
	const genres = genreResponse.genres;
	
	results.forEach((movie) => {
			createCard(movie, genres, 'simiar-shows-list', false);
		});
	};
	
	/* ---------------------------------------------------- */


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
		if (result.poster_path) {
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
		}
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
			fetchMediaDetails(mediaType);
			displayCast(mediaType);
			watchProvider(mediaType);
			fetchtrailer(mediaType);
			reviews(mediaType);
			production(mediaType);
			financeInfo(mediaType);
			displaySimilarMovies();
			break;
			case '/show-detail.html':
				fetchMediaDetails(mediaType);
				displayCast(mediaType);
				watchProvider(mediaType);
				fetchtrailer(mediaType);
				reviews(mediaType);
				production(mediaType);
				financeInfo(mediaType);
				displaySimilarShows();

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

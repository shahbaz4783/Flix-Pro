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


// Global Pages
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

const fetchGenres = async () => {
    const { genres } = await fetchAPIdata('genre/movie/list');
    console.log(genres);
  };
  
  fetchGenres();



// Now Playing in Theaters
const displayNowPlayingMovies = async () => {
    const { results } = await fetchAPIdata('movie/now_playing');
    const genreResponse = await fetchAPIdata('genre/movie/list');
    const genres = genreResponse.genres;
  
    results.forEach((movie) => {
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('swiper-slide');
      const genreNames = movie.genre_ids
        .map((genreId) => {
          const genre = genres.find((genre) => genre.id === genreId);
          return genre ? genre.name : '';
        })
        .slice(0, 3); // Limit the genres to a maximum of three
      cardContainer.innerHTML = `
        <img class="backdrop" src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="${movie.title}">
        <div class="movie-overview">
          <h3>${movie.title}</h3>
          <p>Rating: ${movie.vote_average.toFixed(1)}</p>
          <p>${genreNames.join(', ')}</p>
          <a class="feature-details" href="movie-detail.html?id=${movie.id}">Details</a>
        </div>
      `;
      document.querySelector('.swiper-wrapper').append(cardContainer);
      initFeatureSwiper();
    });
  };
  
  


const initFeatureSwiper = () => {
    new Swiper(".now-playing-list .swiper", {
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
		if (movieCount < 20) {
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
			document.querySelector('.popular-list .swiper-wrapper').append(cardContainer);
			movieCount++;
		}
        initPopularSwiper();
	});
};

const initPopularSwiper = () => {
    new Swiper(".popular-list .swiper", {
      slidesPerView: 6,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints:{
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
        }
      }
    });
  }

// display Action movies
const displayActionMovies = async () => {
    const { genres } = await fetchAPIdata('genre/movie/list');
    const actionGenre = genres.find((genre) => genre.name === 'Action');
  
    if (actionGenre) {
      const { results } = await fetchAPIdata('discover/movie', {
        // with_genres: actionGenre.id,
      });
  
      const actionMovies = results.slice(0, 20);
  
      actionMovies.forEach((movie) => {
        const releaseDate = new Date(movie.release_date);
        const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', {
          month: 'short',
        })} ${releaseDate.getFullYear()}`;
  
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
        document.querySelector('.action-list .swiper-wrapper').append(cardContainer);
      });
  
      initActionSwiper();
    }
  };
  
      
const initActionSwiper = () => {
    new Swiper(".action-list .swiper", {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints:{
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
            }
          }
    });
  }



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
			document.querySelector('.top-rated-list .swiper-wrapper').append(cardContainer);
			movieCount++;
		}
        initTopRatedSwiper();
	});
};

const initTopRatedSwiper = () => {
    new Swiper(".top-rated-list .swiper", {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints:{
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
            }
          }
    });
  }


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
			document.querySelector('.upcoming-list .swiper-wrapper').append(cardContainer);
			movieCount++;
		}
        initUpcomingSwiper()
	});
};

const initUpcomingSwiper = () => {
    new Swiper(".upcoming-list .swiper", {
        slidesPerView: 6,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints:{
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
            }
          }
    });
  }



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




// Init App
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayNowPlayingMovies();
            displayActionMovies();
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


// header Background Color Change
const header = document.querySelector('header');
const swipeThreshold = window.innerHeight * 0.2;

const changeBg = () => {
    if (window.scrollY > swipeThreshold) {
      header.classList.add('background')
    } else {
      header.classList.remove('background');
    }
  }
window.addEventListener('scroll', changeBg);


const global = {
	currentPage: window.location.pathname,
};

// display popular movies
const displayPopularMovies = async () => {
    const { results } = await fetchAPIdata('movie/popular');
    let movieCount = 0; // Variable to track the number of displayed movies
  
    results.forEach((movie) => {
      if (movieCount < 10) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.innerHTML = `
          <div class="card">
            <div class="front-content">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="content">
              <p class="heading">${movie.title}</p>
              <h3>Released: ${movie.release_date}</h3>
              <p class="description">
                ${movie.overview}
              </p>
              <button>Show Details</button>
            </div>
          </div>
        `;
        document.querySelector('.top-rated-list').append(cardContainer);
        movieCount++;
      }
    });
  };
  

// Fetch Data From TMBD API
const fetchAPIdata = async (endpoint) => {
	const API_KEY = '47152db3059591a245fa638f38ce9f76';
	const API_URL = 'https://api.themoviedb.org/3/';

	const resonse = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	const data = await resonse.json();

	return data;
};

// Init App
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			console.log('Home');
			displayPopularMovies();
			break;
		case '/shows.html':
			console.log('Shows');
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

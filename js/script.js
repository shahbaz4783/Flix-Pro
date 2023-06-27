const global = {
	currentPage: window.location.pathname,
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


// display now playing movies
const displayNowPlayingMovies = async () => {
    let movieList = []; // Array to store the "Now Playing" movies
    let movieIndex = 0; // Index to track the current movie being displayed
    let intervalId; // Variable to store the interval ID
  
    const fetchMovies = async () => {
      const { results } = await fetchAPIdata('movie/now_playing');
      movieList = results;
    };
  
    const showNextMovie = () => {
      const movie = movieList[movieIndex];
  
      const releaseDate = new Date(movie.release_date);
      const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', { month: 'short' })} ${releaseDate.getFullYear()}`;
  
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('playing-movie-card');
      cardContainer.innerHTML = `
        <img class="playing-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="playing-movie-content">
          <span class="movie-title">${movie.title}</span>
          <p class="playing-movie-description">Released: ${formattedDate}</p>
          <button class="details">Details</button>
        </div>
      `;
  
      const nowPlayingList = document.querySelector('.now-playing-list');
      nowPlayingList.innerHTML = ''; // Clear previous movie
      nowPlayingList.append(cardContainer);
  
      movieIndex = (movieIndex + 1) % movieList.length; // Move to the next movie
  
      // Clear previous interval and set new interval to show the next movie after 5 seconds
      clearInterval(intervalId);
      intervalId = setInterval(showNextMovie, 3000);
    };
  
    await fetchMovies(); // Fetch the initial list of "Now Playing" movies
    showNextMovie(); // Show the first movie immediately
  
    // Set interval to show the next movie every 5 seconds
    intervalId = setInterval(showNextMovie, 3000);
  };
  



// display popular movies
const displayPopularMovies = async () => {
    const { results } = await fetchAPIdata('movie/top_rated');
    let movieCount = 0;
  
    results.forEach((movie) => {
    if (movieCount < 14) {

        const releaseDate = new Date(movie.release_date);
        const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', { month: 'short' })} ${releaseDate.getFullYear()}`;
  
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

  // display upcoming movies
  const displayUpcomingMovies = async () => {
    const { results } = await fetchAPIdata('movie/upcoming');
    let movieCount = 0;
  
    results.forEach((movie) => {
    if (movieCount < 7) {

        const releaseDate = new Date(movie.release_date);
        const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', { month: 'short' })} ${releaseDate.getFullYear()}`;
  
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



// Init App
const init = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			console.log('Home');
			displayPopularMovies();
            displayUpcomingMovies();
            displayNowPlayingMovies();
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
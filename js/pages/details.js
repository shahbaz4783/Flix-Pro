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

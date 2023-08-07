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

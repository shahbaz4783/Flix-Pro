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

export const search = async () => {
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

// Import your utility functions and API functions
import {
	showLoader,
	hideLoader,
	showContent,
	hideContent,
} from './utils/loader';
import { getCurrentYear } from './utils/currentYear';
import { fetchAPIdata } from './api/fetchAPI';

// Import your components
import { initSwipers } from './components/swiper';

// Import page-specific scripts
import { initIndexPage } from './pages/index';
import { initShowsPage } from './pages/shows';
import { initMovieDetailPage } from './pages/movieDetail';
import { initShowDetailPage } from './pages/showDetail';
import { initSearchPage } from './pages/search';

// Function to initialize the app based on the current page
const initApp = () => {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			initIndexPage();
			break;
		case '/shows.html':
			initShowsPage();
			break;
		case '/movie-detail.html':
			initMovieDetailPage();
			break;
		case '/show-detail.html':
			initShowDetailPage();
			break;
		case '/search.html':
			initSearchPage();
			break;
		default:
			break;
	}
};

// Add an event listener to initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	// Get the current page URL
	global.currentPage = window.location.pathname;

	// Show the current year
	const currentYearElement = document.querySelector('#currYear');
	if (currentYearElement) {
		currentYearElement.textContent = getCurrentYear();
	}

	// Initialize swipers for carousels and content
	initSwipers();

	// Initialize the app based on the current page
	initApp();
});

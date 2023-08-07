export const showLoader = () => {
	document.querySelector('.loading-section').style.display = 'flex';
};
export const hideLoader = () => {
	document.querySelector('.loading-section').style.display = 'none';
};
export const showContent = () => {
	document.querySelector('main').style.display = 'block';
};
export const hideContent = () => {
	document.querySelector('main').style.display = 'none';
};

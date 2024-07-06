// Display/hide the loader on the screen while waiting for Weather API data to fetch
const displayLoader = () => {
  document.querySelector('.overlay').classList.add('active');
  document.querySelector('.loader').classList.add('active');
};

const hideLoader = () => {
  document.querySelector('.overlay').classList.remove('active');
  document.querySelector('.loader').classList.remove('active');
};

export { displayLoader, hideLoader };

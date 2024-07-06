import getWeatherData from '../API/fetchForecast';
import getSuggestionData from '../API/fetchSearch';
import processData from '../process-weather-data/processWeatherData';
import displayData from './display-weather-data/displayWeatherData';
import displaySuggestions from './display-weather-data/displaySuggestions';
import { displayLoader, hideLoader } from './loader';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const list = document.querySelector('.suggestions');
// Handle submitted search input
const handleSearchFormSubmission = () => {
  // ERROR: prevent nothing being searched
  if (searchInput.value === '') {
    return alert("You've searched nothing!");
  }
  displayLoader();
  const encodedInput = encodeURI(searchInput.value);
  // Retrieve API data for the searched location
  getWeatherData(encodedInput)
    .then((data) => displayData(processData(data)))
    .then(() => hideLoader());
  // Reset input and suggestions
  searchInput.value = '';
  list.textContent = '';
};
// Handle the selected suggestion option
const handleSuggestionSelection = (e) => {
  displayLoader();
  const id = `id:${Number(e.target.id)}`;
  // Retrieve API data for the selected suggested location
  getWeatherData(id)
    .then((data) => displayData(processData(data)))
    .then(() => hideLoader());
  // Reset input and suggestions
  searchInput.value = '';
  list.textContent = '';
};
// Handle suggested locations based on user input
const handleSearchInput = () => {
  // Reset suggestions
  list.textContent = '';
  const encodedInput = encodeURI(searchInput.value);
  // If input value exists call search API and display suggestions
  if (encodedInput !== '') {
    getSuggestionData(encodedInput).then((data) => displaySuggestions(data));
  }
};

export default function initSearchBarEvents() {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSearchFormSubmission();
  });

  list.addEventListener('click', (e) => {
    handleSuggestionSelection(e);
  });

  searchInput.addEventListener('input', () => {
    handleSearchInput();
  });
  // Initial page load displays Belgrade's weather data as a placeholder
  getWeatherData('belgrade').then((data) => displayData(processData(data)));
}

// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';

// Write func to process the data and return an object with only required data

// const getLocation = (data) => {
//   const name = data.location.name;
//   const region = data.location.region;
//   const country = data.location.country;

//   return { name, region, country };
// };

// const getTodaysWeather = (data) => {
// 	const celsius = {
// 		temp: data.current.temp_c,
// 	}

// 	const fahrenheit = {
// 		temp: data.current.temp_c,
// 	}

//   const tempC = data.current.temp_c;
//   const tempF = data.current.temp_f;
//   const isDay = data.current.is_day;
// 	const condition = data.current.condition.text;
// 	const feelsLikeC = data.current.feelslike_c;
// 	const feelsLikeF = data.current.feelslike_f;

// 	// separate C and F values into different objects?
// };

const getForecast = (location) => {
  // should this be here or should I pass it the already encoded location?
  const encoded = encodeURI(location);
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=745413e844de44248cb173813242106&days=7&q=${encoded}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => console.log(response));
};

getForecast('belgrade');

// API requests needed:
// /forecast.json
// /search.json

// The Search/Autocomplete API

// How It Works
// User Input: The user starts typing a location name in an input field (e.g., a search bar).
// API Request: As the user types, the application sends requests to the WeatherAPI.com's Search/Autocomplete
// API with the partial or complete input string.
// API Response: The API returns a list of matching locations. Each location is represented as an object
// containing details such as the name of the city or town, its coordinates (latitude and longitude), and possibly
// other information like country, region, etc.
// Display Suggestions: The application displays the list of matching locations to the user, typically in a
// dropdown menu or list beneath the input field.
// User Selection: The user selects one of the suggested locations, and the application can then use this
// selected location to fetch weather data or other relevant information.

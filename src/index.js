// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';

// Write func to process the data and return an object with only required data

const getLocation = (data) => {
  const name = data.location.name;
  const region = data.location.region;
  const country = data.location.country;

  return { name, region, country };
};

const getTodaysWeather = (data) => {
  const celsius = {
    temp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    wind: data.current.wind_kph,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
  };

  const fahrenheit = {
    temp: data.current.temp_f,
    feelsLike: data.current.feelslike_f,
    wind: data.current.wind_mph,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_f,
    minTemp: data.forecast.forecastday[0].day.mintemp_f,
  };

  const isDay = data.current.is_day;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const date = data.forecast.forecastday[0].date;
  const rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
  const snow = data.forecast.forecastday[0].day.daily_chance_of_snow;

  return {
    celsius,
    fahrenheit,
    isDay,
    condition,
    icon,
    humidity,
    date,
    rain,
    snow,
  };
};

const getForecast = (data) => {
  // Array of processed values needed for forecast days
  const forecastDays = [];
  // Make an array without the first value since that is for today's weather, not the forecast
  const [, ...forecastDaysData] = data.forecast.forecastday;
  // Loop over the rest of the days and extract needed values into new forecastDays array
  forecastDaysData.forEach((day) => {
    const forecastDay = {
      celsius: {
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
      },
      fahrenheit: {
        maxTemp: day.day.maxtemp_f,
        minTemp: day.day.mintemp_f,
      },
      date: day.date,
      condition: day.day.condition.text,
      icon: day.day.condition.icon,
      rain: day.day.daily_chance_of_rain,
      snow: day.day.daily_chance_of_snow,
    };
    forecastDays.push(forecastDay);
  });
  return forecastDays;
};

const getWeatherData = (location) => {
  // should this be here or should I pass it the already encoded location?
  const encoded = encodeURI(location);
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=745413e844de44248cb173813242106&days=7&q=${encoded}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => response);
};

// getWeatherData('belgrade');

// getWeatherData('belgrade').then((data) => console.log(getTodaysWeather(data)));
// getWeatherData('belgrade').then((data) => console.log(getLocation(data)));
getWeatherData('belgrade').then((data) => console.log(getForecast(data)));

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

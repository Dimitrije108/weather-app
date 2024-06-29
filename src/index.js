// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const list = document.querySelector('.suggestions');

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

const displaySuggestions = (data) => {
  // For every suggestion create a list element and append it
  data.forEach((locationData) => {
    const location = document.createElement('li');
    location.textContent = `${locationData.name}, ${locationData.region}, ${locationData.country}`;
    list.appendChild(location);
  });
};

const processData = (data) => {
  const location = getLocation(data);
  const todaysWeather = getTodaysWeather(data);
  const forecast = getForecast(data);
  return { location, todaysWeather, forecast };
};

const getWeatherData = (location) => {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=745413e844de44248cb173813242106&days=7&q=${location}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => response);
};

const getSuggestionData = (location) => {
  return fetch(
    `https://api.weatherapi.com/v1/search.json?key=745413e844de44248cb173813242106&q=${location}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => response);
};

getWeatherData('belgrade').then((data) => console.log(processData(data)));

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // needs handler and prevent nothing being searched
  const encodedInput = encodeURI(searchInput.value);
  getWeatherData(encodedInput).then((data) => console.log(processData(data)));
  searchInput.value = '';
});

searchInput.addEventListener('input', () => {
  // needs a handler
  const encodedInput = encodeURI(searchInput.value);
  if (encodedInput !== '') {
    list.textContent = '';
    getSuggestionData(encodedInput).then((data) => displaySuggestions(data));
  }
});

// 1. Input event listener ✅
// 2. Dynamically request the Search/Autocomplete Weather API ✅
// 3. API responds with array of location objects ✅
// 4. Display locations in a dropdown list ✅
// 5. Each option needs to be clickable/selectable - that's CSS's job

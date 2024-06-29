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
    windSpeed: `${data.current.wind_kph}kph`,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
  };

  const fahrenheit = {
    temp: data.current.temp_f,
    feelsLike: data.current.feelslike_f,
    windSpeed: `${data.current.wind_mph}mph`,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_f,
    minTemp: data.forecast.forecastday[0].day.mintemp_f,
  };

  const isDay = data.current.is_day;
  const condition = data.current.condition.text;
  const icon = data.current.condition.icon;
  const humidity = data.current.humidity;
  const date = data.forecast.forecastday[0].date;
  const windDir = data.current.wind_dir;
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
    windDir,
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

const displayMain = (location, weather, measurementSystem) => {
  const nameAndRegion = document.querySelector('.name-region');
  const country = document.querySelector('.country');
  const high = document.querySelector('.tw-high');
  const low = document.querySelector('.tw-low');
  const icon = document.querySelector('.tw-icon');
  const temp = document.querySelector('.tw-temp');
  const condition = document.querySelector('.tw-condition');
  const rain = document.querySelector('.tw-rain');
  const wind = document.querySelector('.tw-wind');
  const feelsLike = document.querySelector('.tw-feels-like');
  const humidity = document.querySelector('.tw-humidity');

  nameAndRegion.textContent = `${location.name}, ${location.region}`;
  country.textContent = location.country;
  high.textContent = `${weather[measurementSystem].maxTemp}°`;
  low.textContent = `${weather[measurementSystem].minTemp}°`;
  icon.src = weather.icon;
  temp.textContent = `${weather[measurementSystem].temp}°`;
  condition.textContent = weather.condition;
  rain.textContent = `Rain: ${weather.rain}%`;
  wind.textContent = `Wind: ${weather[measurementSystem].windSpeed} ${weather.windDir}`;
  feelsLike.textContent = `Feels like: ${weather[measurementSystem].feelsLike}°`;
  humidity.textContent = `Humidity: ${weather.humidity}%`;
};
// Convert the date received from Weather API into a
// locale format of a day and a month (e.g. 6/30)
const convertDate = (date) => {
  const convertedDate = new Date(date);
  const dateOptions = { day: 'numeric', month: 'numeric' };
  const userLocale = navigator.language || 'en-US';
  return convertedDate.toLocaleDateString(userLocale, dateOptions);
};
// Extract day of the week from Weather API date
const extractDay = (date) => {
  const convertedDate = new Date(date);
  const dayOption = { weekday: 'short' };
  return convertedDate.toLocaleDateString(undefined, dayOption);
};

const displayForecast = (forecast, measurementSystem) => {
  const section = document.querySelector('.forecast');
  forecast.forEach((dayObj) => {
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const highLowWrapper = document.createElement('div');
    const forecastInfoWrapper = document.createElement('div');
    const day = document.createElement('div');
    const date = document.createElement('div');
    const high = document.createElement('div');
    const low = document.createElement('div');
    const condition = document.createElement('div');
    const icon = document.createElement('img');
    const rain = document.createElement('div');

    container.classList.add(`forecast-container`);
    wrapper.classList.add('forecast-wrapper');
    highLowWrapper.classList.add('forecast-high-low');
    forecastInfoWrapper.classList.add('forecast-info');
    day.classList.add('forecast-day');
    date.classList.add('forecast-date');
    high.classList.add('forecast-high');
    low.classList.add('forecast-low');
    condition.classList.add('forecast-condition');
    rain.classList.add('forecast-rain');

    date.textContent = convertDate(dayObj.date);
    day.textContent = extractDay(dayObj.date);
    high.textContent = dayObj[measurementSystem].maxTemp;
    low.textContent = dayObj[measurementSystem].minTemp;
    condition.textContent = dayObj.condition;
    icon.src = dayObj.icon;
    rain.textContent = `Rain: ${dayObj.rain}%`;

    highLowWrapper.appendChild(high);
    highLowWrapper.appendChild(low);
    forecastInfoWrapper.appendChild(icon);
    forecastInfoWrapper.appendChild(condition);
    forecastInfoWrapper.appendChild(rain);
    wrapper.appendChild(highLowWrapper);
    wrapper.appendChild(forecastInfoWrapper);

    container.appendChild(day);
    container.appendChild(date);
    container.appendChild(wrapper);
    section.appendChild(container);
  });
};

const displayData = (data) => {
  const location = data.location;
  const todaysWeather = data.todaysWeather;
  const forecast = data.forecast;
  // Handle isDay: 1; to display day or night maybe
  // Also snow if it's winter? we'll see how later
  displayMain(location, todaysWeather, 'celsius');
  displayForecast(forecast, 'celsius');
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
// Needs error handling with .catch
getWeatherData('belgrade').then((data) => displayData(processData(data)));

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
// 6. Sometimes dropdown doesn't clear when input is empty - fix it

// TESTING GROUNDS YESSIR

// const convertedDate = new Date('2024-06-30');
// const dateOptions = { weekday: 'short', day: 'numeric', month: 'numeric' };
// const userLocale = navigator.language || 'en-US';
// console.log(convertedDate.toLocaleDateString(userLocale, dateOptions));

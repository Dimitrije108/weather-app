// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './style.css';
import sunny from './assets/weather-icons/sunny.svg';
import cloudy from './assets/weather-icons/cloudy.svg';
import partlyCloudy from './assets/weather-icons/partly-cloudy.svg';
import rain from './assets/weather-icons/rain.svg';
import partlyRainy from './assets/weather-icons/partly-rainy.svg';
import thunder from './assets/weather-icons/thunder.svg';
import partlyThunder from './assets/weather-icons/partly-thunder.svg';
import fog from './assets/weather-icons/fog.svg';
import snow from './assets/weather-icons/snow.svg';
import partlySnowy from './assets/weather-icons/partly-snowy.svg';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const list = document.querySelector('.suggestions');
const celsiusBtn = document.querySelector('.celsius-btn');
const fahrenheitBtn = document.querySelector('.fahrenheit-btn');
let currentLocationData = '';
let tempUnit = 'C';
// Process location data
const getLocation = (data) => {
  const name = data.location.name;
  const region = data.location.region;
  const country = data.location.country;
  return { name, region, country };
};
// Process current(todays) weather data
const getTodaysWeather = (data) => {
  const C = {
    temp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    windSpeed: `${data.current.wind_kph}kph`,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
    minTemp: data.forecast.forecastday[0].day.mintemp_c,
  };

  const F = {
    temp: data.current.temp_f,
    feelsLike: data.current.feelslike_f,
    windSpeed: `${data.current.wind_mph}mph`,
    maxTemp: data.forecast.forecastday[0].day.maxtemp_f,
    minTemp: data.forecast.forecastday[0].day.mintemp_f,
  };

  const isDay = data.current.is_day;
  const condition = data.current.condition.text;
  const icon = getWeatherIcon(data.current.condition.code);
  const humidity = data.current.humidity;
  const date = data.forecast.forecastday[0].date;
  const windDir = data.current.wind_dir;
  const rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
  const snow = data.forecast.forecastday[0].day.daily_chance_of_snow;

  return {
    C,
    F,
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
// Process forecast data
const getForecast = (data) => {
  // Array of processed values needed for forecast days
  const forecastDays = [];
  // Make an array without the first value since that is for today's weather, not the forecast
  const [, ...forecastDaysData] = data.forecast.forecastday;
  // Loop over the rest of the days and extract needed values into new forecastDays array
  forecastDaysData.forEach((day) => {
    const forecastDay = {
      C: {
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
      },
      F: {
        maxTemp: day.day.maxtemp_f,
        minTemp: day.day.mintemp_f,
      },
      date: day.date,
      condition: day.day.condition.text,
      icon: getWeatherIcon(day.day.condition.code),
      rain: day.day.daily_chance_of_rain,
      snow: day.day.daily_chance_of_snow,
    };
    forecastDays.push(forecastDay);
  });
  return forecastDays;
};
// Display the main page current weather
const displayMain = (location, weather, tempUnit) => {
  const nameAndRegion = document.querySelector('.name-region');
  const country = document.querySelector('.country');
  const max = document.querySelector('.tw-max');
  const min = document.querySelector('.tw-min');
  const icon = document.querySelector('.tw-icon');
  const temp = document.querySelector('.tw-temp');
  const condition = document.querySelector('.tw-condition');

  const feelsLike = document.querySelector('.tw-feels-like');
  const rain = document.querySelector('.tw-rain');
  const humidity = document.querySelector('.tw-humidity');
  const wind = document.querySelector('.tw-wind');

  const feelsLikeValue = document.querySelector('.feels-like-value');
  const rainValue = document.querySelector('.rain-value');
  const humidityValue = document.querySelector('.humidity-value');
  const windValue = document.querySelector('.wind-value');

  nameAndRegion.textContent = `${location.name}, ${location.region}`;
  country.textContent = location.country;
  max.textContent = `${weather[tempUnit].maxTemp}°${tempUnit}`;
  min.textContent = `${weather[tempUnit].minTemp}°${tempUnit}`;
  icon.src = weather.icon;
  temp.textContent = `${weather[tempUnit].temp}°${tempUnit}`;
  condition.textContent = weather.condition;

  feelsLike.textContent = 'Feels like:';
  rain.textContent = 'Rain:';
  humidity.textContent = 'Humidity:';
  wind.textContent = 'Wind:';

  feelsLikeValue.textContent = `${weather[tempUnit].feelsLike}°${tempUnit}`;
  rainValue.textContent = `${weather.rain}%`;
  humidityValue.textContent = `${weather.humidity}%`;
  windValue.textContent = `${weather[tempUnit].windSpeed} ${weather.windDir}`;
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
// Loop through all available forecast days and display their basic info
const displayForecast = (forecast, tempUnit) => {
  const section = document.querySelector('.forecast');
  section.textContent = '';
  forecast.forEach((dayObj) => {
    const container = document.createElement('div');
    const dayDateWrapper = document.createElement('div');
    const maxMinWrapper = document.createElement('div');
    const conditionWrapper = document.createElement('div');
    const day = document.createElement('div');
    const date = document.createElement('div');
    const max = document.createElement('div');
    const min = document.createElement('div');
    const condition = document.createElement('div');
    const icon = document.createElement('img');
    const rain = document.createElement('div');

    container.classList.add(`forecast-container`);
    dayDateWrapper.classList.add('forecast-day-date');
    maxMinWrapper.classList.add('forecast-max-min');
    conditionWrapper.classList.add('forecast-condition-wrapper');
    day.classList.add('forecast-day');
    date.classList.add('forecast-date');
    max.classList.add('forecast-max');
    min.classList.add('forecast-min');
    condition.classList.add('forecast-condition');
    rain.classList.add('forecast-rain');

    day.textContent = extractDay(dayObj.date);
    date.textContent = convertDate(dayObj.date);
    max.textContent = `${dayObj[tempUnit].maxTemp}°${tempUnit}`;
    min.textContent = `${dayObj[tempUnit].minTemp}°${tempUnit}`;
    condition.textContent = dayObj.condition;
    icon.src = dayObj.icon;
    icon.width = '70';
    icon.height = '70';
    rain.textContent = `Rain: ${dayObj.rain}%`;

    dayDateWrapper.appendChild(day);
    dayDateWrapper.appendChild(date);
    maxMinWrapper.appendChild(max);
    maxMinWrapper.appendChild(min);
    conditionWrapper.appendChild(icon);
    conditionWrapper.appendChild(condition);

    container.appendChild(dayDateWrapper);
    container.appendChild(maxMinWrapper);
    container.appendChild(conditionWrapper);
    container.appendChild(rain);
    section.appendChild(container);
  });
};

const displayData = (data) => {
  const location = data.location;
  const todaysWeather = data.todaysWeather;
  const forecast = data.forecast;
  // Handle isDay: 1; to display day or night maybe
  // Also snow if it's winter? we'll see how later
  displayMain(location, todaysWeather, tempUnit);
  displayForecast(forecast, tempUnit);
};
// Displays all the search bar user input suggestions
// in a dropdown menu form below the search bar itself
const displaySuggestions = (data) => {
  // For every suggestion create a list element and append it
  data.forEach((locationData) => {
    const location = document.createElement('li');
    location.textContent = `${locationData.name}, ${locationData.region}, ${locationData.country}`;
    location.id = locationData.id;
    list.appendChild(location);
  });
};
// All the processed weather data in one place
const processData = (data) => {
  const location = getLocation(data);
  const todaysWeather = getTodaysWeather(data);
  const forecast = getForecast(data);
  return (currentLocationData = { location, todaysWeather, forecast });
};
// Retrieves current weather as well as the available forecast (Weather API (3days))
const getWeatherData = (location) => {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=745413e844de44248cb173813242106&days=7&q=${location}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => response);
};
// Retrieves suggestion locations based on user input
const getSuggestionData = (location) => {
  return fetch(
    `https://api.weatherapi.com/v1/search.json?key=745413e844de44248cb173813242106&q=${location}`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => response);
};

// Needs error handling with .catch

const handleTempUnitChange = (value) => {
  tempUnit = value;
  displayData(currentLocationData);
};

const displayLoader = () => {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.loader').style.display = 'block';
};

const hideLoader = () => {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.loader').style.display = 'none';
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  displayLoader();
  // needs handler and prevent nothing being searched
  const encodedInput = encodeURI(searchInput.value);
  getWeatherData(encodedInput)
    .then((data) => displayData(processData(data)))
    .then(() => hideLoader());
  searchInput.value = '';
  list.textContent = '';
});

list.addEventListener('click', (e) => {
  displayLoader();
  const id = `id:${Number(e.target.id)}`;
  getWeatherData(id)
    .then((data) => displayData(processData(data)))
    .then(() => hideLoader());
  searchInput.value = '';
  list.textContent = '';
});

searchInput.addEventListener('input', () => {
  // needs a handler
  const encodedInput = encodeURI(searchInput.value);
  list.textContent = '';
  if (encodedInput !== '') {
    getSuggestionData(encodedInput).then((data) => displaySuggestions(data));
  }
});

celsiusBtn.addEventListener('click', (e) => {
  fahrenheitBtn.style.fontFamily = 'Comfortaa Light';
  celsiusBtn.style.fontFamily = 'Comfortaa Bold';
  handleTempUnitChange(e.target.value);
});

fahrenheitBtn.addEventListener('click', (e) => {
  celsiusBtn.style.fontFamily = 'Comfortaa Light';
  fahrenheitBtn.style.fontFamily = 'Comfortaa Bold';
  handleTempUnitChange(e.target.value);
});

getWeatherData('belgrade').then((data) => displayData(processData(data)));

// modules:
// API module
// DOM module
// Event module?
// processData module?

const weatherIcons = {
  sunny: {
    code: [1000],
    url: sunny,
  },
  cloudy: {
    code: [1006, 1009],
    url: cloudy,
  },
  partlyCloudy: {
    code: [1003],
    url: partlyCloudy,
  },
  rain: {
    code: [1153, 1168, 1171, 1183, 1189, 1195, 1198, 1201, 1240, 1243, 1246],
    url: rain,
  },
  partlyRainy: {
    code: [1063, 1150, 1180, 1186, 1192],
    url: partlyRainy,
  },
  thunder: {
    code: [1237, 1261, 1264, 1276, 1282],
    url: thunder,
  },
  partlyThunder: {
    code: [1087, 1273, 1279],
    url: partlyThunder,
  },
  fog: {
    code: [1030, 1135, 1147],
    url: fog,
  },
  snow: {
    code: [
      1114, 1117, 1204, 1207, 1213, 1216, 1219, 1225, 1249, 1252, 1255, 1258,
    ],
    url: snow,
  },
  partlySnowy: {
    code: [1066, 1069, 1072, 1210, 1222],
    url: partlySnowy,
  },
};
// Loops through weather icon codes and returns the correct icon url
const getWeatherIcon = (code) => {
  for (const weather of Object.values(weatherIcons)) {
    if (weather.code.includes(code)) {
      return weather.url;
    }
  }
  return 'No icon found';
};

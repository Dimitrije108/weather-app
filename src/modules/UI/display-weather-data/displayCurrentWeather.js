// Display the main page current weather
export default function displayCurrentWeather(location, weather, tempUnit) {
  const nameAndRegion = document.querySelector('.name-region');
  const country = document.querySelector('.country');

  const icon = document.querySelector('.tw-icon');
  const temp = document.querySelector('.tw-temp');
  const condition = document.querySelector('.tw-condition');
  const max = document.querySelector('.tw-max');
  const min = document.querySelector('.tw-min');

  const feelsLike = document.querySelector('.tw-feels-like');
  const precipitation = document.querySelector('.tw-precipitation');
  const humidity = document.querySelector('.tw-humidity');
  const wind = document.querySelector('.tw-wind');

  const feelsLikeValue = document.querySelector('.feels-like-value');
  const precipitationValue = document.querySelector('.precipitation-value');
  const humidityValue = document.querySelector('.humidity-value');
  const windValue = document.querySelector('.wind-value');

  nameAndRegion.textContent = `${location.name}, ${location.region}`;
  country.textContent = location.country;
  icon.src = weather.icon;
  temp.textContent = `${weather[tempUnit].temp}°${tempUnit}`;
  condition.textContent = weather.condition;
  max.textContent = `${weather[tempUnit].maxTemp}°${tempUnit}`;
  min.textContent = `${weather[tempUnit].minTemp}°${tempUnit}`;

  feelsLike.textContent = 'Feels like:';
  precipitation.textContent = 'Precipitation:';
  humidity.textContent = 'Humidity:';
  wind.textContent = 'Wind:';

  feelsLikeValue.textContent = `${weather[tempUnit].feelsLike}°${tempUnit}`;
  // Display whichever precipitation value is bigger - rain or snow
  precipitationValue.textContent =
    weather.snow > weather.rain ? `${weather.snow}%` : `${weather.rain}%`;
  humidityValue.textContent = `${weather.humidity}%`;
  windValue.textContent = `${weather[tempUnit].windSpeed} ${weather.windDir}`;
}

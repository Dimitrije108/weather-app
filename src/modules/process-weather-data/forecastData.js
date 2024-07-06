import getWeatherIcon from '../UI/weatherIcons';
import placeholderForecastData from './placeholderForecastData';
// Process forecast data
export default function getForecast(data) {
  // Array of processed day objects
  const forecastDays = [];
  // An array without the first day since that one is for today's weather, not the forecast
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
  // Generate an array of placeholder days and then add it to the forecastDays array
  // (if forecast API only allows 3 day forecast)
  if (forecastDays.length === 2) {
    const placeholderForecast = placeholderForecastData();
    placeholderForecast.forEach((day) => forecastDays.push(day));
  }
  return forecastDays;
}

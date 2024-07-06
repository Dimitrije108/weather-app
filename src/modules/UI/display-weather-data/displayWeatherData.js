import displayCurrentWeather from './displayCurrentWeather';
import displayForecast from './displayForecast';
import { getTempUnit } from '../tempUnit';
// Displays all the processed weather data
export default function displayWeatherData(data) {
  const location = data.location;
  const todaysWeather = data.todaysWeather;
  const forecast = data.forecast;
  displayCurrentWeather(location, todaysWeather, getTempUnit());
  displayForecast(forecast, getTempUnit());
}

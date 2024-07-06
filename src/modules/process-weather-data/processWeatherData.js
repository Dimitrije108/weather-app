import getLocation from './locationData';
import getTodaysWeather from './todaysWeatherData';
import getForecast from './forecastData';
import { setCurrentLocation, getCurrentLocation } from './currentLocationData';
// Return the processed weather data
export default function processWeatherData(data) {
  const location = getLocation(data);
  const todaysWeather = getTodaysWeather(data);
  const forecast = getForecast(data);
  setCurrentLocation({ location, todaysWeather, forecast });
  return getCurrentLocation();
}

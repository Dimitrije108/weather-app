import getWeatherIcon from '../UI/weatherIcons';
// Process current(todays) weather data
export default function getTodaysWeather(data) {
  return {
    C: {
      temp: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      windSpeed: `${data.current.wind_kph}kph`,
      maxTemp: data.forecast.forecastday[0].day.maxtemp_c,
      minTemp: data.forecast.forecastday[0].day.mintemp_c,
    },
    F: {
      temp: data.current.temp_f,
      feelsLike: data.current.feelslike_f,
      windSpeed: `${data.current.wind_mph}mph`,
      maxTemp: data.forecast.forecastday[0].day.maxtemp_f,
      minTemp: data.forecast.forecastday[0].day.mintemp_f,
    },
    isDay: data.current.is_day,
    condition: data.current.condition.text,
    icon: getWeatherIcon(data.current.condition.code),
    humidity: data.current.humidity,
    date: data.forecast.forecastday[0].date,
    windDir: data.current.wind_dir,
    rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
    snow: data.forecast.forecastday[0].day.daily_chance_of_snow,
  };
}

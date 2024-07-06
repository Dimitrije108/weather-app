import getWeatherIcon from '../UI/weatherIcons';
// Weather API provides 3 forecast days for free. I wanted to display standard
// 7 day forecast instead, that's why these placeholders were added.
export default function placeholderForecastData() {
  const snowyDay = {
    C: {
      maxTemp: 3.2,
      minTemp: -2,
    },
    F: {
      maxTemp: 37.7,
      minTemp: 28.4,
    },
    date: '2024-01-07',
    condition: 'Moderate or heavy snow showers',
    icon: getWeatherIcon(1258),
    rain: 0,
    snow: 88,
    placeholder: true,
  };
  const rainyDay = {
    C: {
      maxTemp: 15.7,
      minTemp: 12.3,
    },
    F: {
      maxTemp: 60.2,
      minTemp: 54.2,
    },
    date: '2024-07-15',
    condition: 'Heavy rain',
    icon: getWeatherIcon(1195),
    rain: 96,
    snow: 0,
    placeholder: true,
  };
  const thunderDay = {
    C: {
      maxTemp: 19.4,
      minTemp: 10.5,
    },
    F: {
      maxTemp: 66.9,
      minTemp: 50.8,
    },
    date: '2024-07-25',
    condition: 'Patchy light rain with thunder',
    icon: getWeatherIcon(1273),
    rain: 67,
    snow: 0,
    placeholder: true,
  };
  const sunnyDay = {
    C: {
      maxTemp: 27,
      minTemp: 15.6,
    },
    F: {
      maxTemp: 80.7,
      minTemp: 60.2,
    },
    date: '2024-07-27',
    condition: 'Sunny',
    icon: getWeatherIcon(1000),
    rain: 0,
    snow: 0,
    placeholder: true,
  };
  return [snowyDay, rainyDay, thunderDay, sunnyDay];
}

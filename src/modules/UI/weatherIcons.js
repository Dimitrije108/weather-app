import sunny from '../../assets/weather-icons/sunny.svg';
import cloudy from '../../assets/weather-icons/cloudy.svg';
import partlyCloudy from '../../assets/weather-icons/partly-cloudy.svg';
import rain from '../../assets/weather-icons/rain.svg';
import partlyRainy from '../../assets/weather-icons/partly-rainy.svg';
import thunder from '../../assets/weather-icons/thunder.svg';
import partlyThunder from '../../assets/weather-icons/partly-thunder.svg';
import fog from '../../assets/weather-icons/fog.svg';
import snow from '../../assets/weather-icons/snow.svg';
import partlySnowy from '../../assets/weather-icons/partly-snowy.svg';
// Object connecting weather code/s with svg icons
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
// Note: Icon url's are imported svg icons so that webpack can include them
export default function getWeatherIcon(code) {
  for (const weather of Object.values(weatherIcons)) {
    if (weather.code.includes(code)) {
      return weather.url;
    }
  }
  return '';
}

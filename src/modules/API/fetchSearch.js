const API_KEY = '745413e844de44248cb173813242106';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1/search.json';
// Retrieves suggestion locations based on user input
export default function getSuggestionData(location) {
  return fetch(`${WEATHER_BASE_URL}?key=${API_KEY}&q=${location}`, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((response) => response);
}

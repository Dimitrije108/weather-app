const API_KEY = '745413e844de44248cb173813242106';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1/search.json';
// Retrieves suggestion locations based on user input
export default function getSuggestionData(location) {
  return fetch(`${WEATHER_BASE_URL}?key=${API_KEY}&q=${location}`, {
    mode: 'cors',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      alert(error);
    });
}

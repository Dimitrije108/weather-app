const API_KEY = '745413e844de44248cb173813242106';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1/search.json';
// Retrieves suggestion locations based on user input
export default async function getSuggestionData(location) {
  try {
    // Retrieve API
    const response = await fetch(
      `${WEATHER_BASE_URL}?key=${API_KEY}&q=${location}`,
      { mode: 'cors' }
    );
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Status: ${response.status} ${response.statusText}`);
    }
    // Process response into data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

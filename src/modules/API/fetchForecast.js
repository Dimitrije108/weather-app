const API_KEY = '745413e844de44248cb173813242106';
const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';
// Retrieves current weather as well as the available forecast (Weather API (3days))
export default async function getWeatherData(location) {
  try {
    // Retrieve API
    const response = await fetch(
      `${WEATHER_BASE_URL}?key=${API_KEY}&days=7&q=${location}`,
      { mode: 'cors' }
    );
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Status: ${response.status} ${response.statusText}`);
    }
    // Process response into data
    const data = await response.json();
    // Check if data has an error
    if (data.error) {
      throw new Error(`Status: ${data.error.code} ${data.error.message}`);
    }
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

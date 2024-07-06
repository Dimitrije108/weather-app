import displayWeatherData from './display-weather-data/displayWeatherData';
import { getCurrentLocation } from '../process-weather-data/currentLocationData';

const celsiusBtn = document.querySelector('.celsius-btn');
const fahrenheitBtn = document.querySelector('.fahrenheit-btn');
let tempUnit = 'C';

const getTempUnit = () => tempUnit;

const changeTempUnit = (value) => (tempUnit = value);

const handleTempUnitChange = (value) => {
  changeTempUnit(value);
  // Change button style to indicate which temperature unit is active/selected
  if (value === 'C') {
    celsiusBtn.classList.add('active');
    fahrenheitBtn.classList.remove('active');
  } else {
    fahrenheitBtn.classList.add('active');
    celsiusBtn.classList.remove('active');
  }
  displayWeatherData(getCurrentLocation());
};

const initTempUnitChanger = () => {
  celsiusBtn.addEventListener('click', (e) => {
    handleTempUnitChange(e.target.value);
  });

  fahrenheitBtn.addEventListener('click', (e) => {
    handleTempUnitChange(e.target.value);
  });
};

export { initTempUnitChanger, getTempUnit };

import { extractDay, convertDate } from '../../utils';
// Loop through all available forecast days and display their data
export default function displayForecast(forecast, tempUnit) {
  const section = document.querySelector('.forecast');
  section.textContent = '';
  forecast.forEach((dayObj) => {
    const container = document.createElement('div');
    const dayDateWrapper = document.createElement('div');
    const maxMinWrapper = document.createElement('div');
    const conditionWrapper = document.createElement('div');

    const day = document.createElement('div');
    const date = document.createElement('div');
    const max = document.createElement('div');
    const min = document.createElement('div');
    const icon = document.createElement('img');
    const condition = document.createElement('div');
    const precipitation = document.createElement('div');

    container.classList.add(`forecast-container`);
    dayDateWrapper.classList.add('forecast-day-date');
    maxMinWrapper.classList.add('forecast-max-min');
    conditionWrapper.classList.add('forecast-condition-wrapper');

    day.classList.add('forecast-day');
    date.classList.add('forecast-date');
    max.classList.add('forecast-max');
    min.classList.add('forecast-min');
    condition.classList.add('forecast-condition');
    precipitation.classList.add('forecast-precipitation');

    day.textContent = extractDay(dayObj.date);
    date.textContent = convertDate(dayObj.date);
    max.textContent = `${dayObj[tempUnit].maxTemp}°${tempUnit}`;
    min.textContent = `${dayObj[tempUnit].minTemp}°${tempUnit}`;
    icon.src = dayObj.icon;
    icon.width = '70';
    icon.height = '70';
    condition.textContent = dayObj.condition;
    // Display whichever precipitation value is bigger - rain or snow
    precipitation.textContent =
      dayObj.snow > dayObj.rain
        ? `Precipitation: ${dayObj.snow}%`
        : `Precipitation: ${dayObj.rain}%`;
    // If data is from a placeholder instead of weather forecast API
    // then display a warning indicating so
    if (dayObj.placeholder === true) {
      const placeholder = document.createElement('div');
      placeholder.textContent = 'Placeholder!';
      placeholder.title = 'For presentation purposes';
      placeholder.classList.add('placeholder');
      container.appendChild(placeholder);
    }

    dayDateWrapper.appendChild(day);
    dayDateWrapper.appendChild(date);
    maxMinWrapper.appendChild(max);
    maxMinWrapper.appendChild(min);
    conditionWrapper.appendChild(icon);
    conditionWrapper.appendChild(condition);

    container.appendChild(dayDateWrapper);
    container.appendChild(maxMinWrapper);
    container.appendChild(conditionWrapper);
    container.appendChild(precipitation);
    section.appendChild(container);
  });
}

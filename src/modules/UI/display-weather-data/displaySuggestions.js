const list = document.querySelector('.suggestions');
// Displays all suggestions based on user's input search
// in a dropdown menu format below the search bar itself
export default function displaySuggestions(data) {
  // For every suggestion create a list element and append it
  data.forEach((locationData) => {
    const location = document.createElement('li');
    location.textContent = `${locationData.name}, ${locationData.region}, ${locationData.country}`;
    location.title = `${locationData.name}, ${locationData.region}, ${locationData.country}`;
    location.id = locationData.id;
    list.appendChild(location);
  });
}

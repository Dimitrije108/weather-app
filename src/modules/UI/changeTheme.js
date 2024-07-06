const changeThemeBtn = document.querySelector('.day-night-button');
// Change root element's class name
const changeTheme = () => {
  const root = document.documentElement;
  const newTheme = root.className === '' ? 'dark' : '';
  root.className = newTheme;
};

export default function initThemeChanger() {
  changeThemeBtn.addEventListener('click', () => changeTheme());
}

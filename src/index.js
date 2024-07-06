// eslint-disable-next-line no-unused-vars
import html from './index.html';
import './styles/main.css';
import initSearchBarEvents from './modules/UI/searchBar';
import initThemeChanger from './modules/UI/changeTheme';
import { initTempUnitChanger } from './modules/UI/tempUnit';

const init = () => {
  initSearchBarEvents();
  initThemeChanger();
  initTempUnitChanger();
};

init();

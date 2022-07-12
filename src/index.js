import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import listInfo from './hbs/listInfo.hbs';
import fullInfo from './hbs/fullInfo.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoTextEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch() {
  const textValue = inputEl.value.trim();

  fetchCountries(textValue).then(country => {
    infoTextEl.innerHTML = '';
    listEl.innerHTML = '';

    if (country.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
    if (country.length === 1) {
      Notiflix.Notify.success('We find your country');

      const markupAll = fullInfo(country);
      console.log(markupAll);
      infoTextEl.innerHTML = markupAll;
    }
    if (country.length > 1 && country.length < 10) {
      const markup = listInfo(country);

      listEl.innerHTML = markup;
    }
  });
}

import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const OPTIONS = 'fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}?${OPTIONS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops, there is no country with that name');
      }

      return response.json();
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
};

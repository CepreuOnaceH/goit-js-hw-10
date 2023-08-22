import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');
const textLoader = document.querySelector('.loader-text');

const toggleLoader = isShown => {
  loaderEl.style.display = isShown ? 'flex' : 'none';
  textLoader.style.display = isShown ? 'flex' : 'none';
};

const toggleError = () => {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
};

toggleLoader(true);
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selectEl.appendChild(option);
    });
    toggleLoader(false);
    selectEl.style.display = 'block';
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(() => {
    toggleLoader(false);
    toggleError(true);
  });

selectEl.addEventListener('change', event => {
  toggleLoader(true);
  const breedId = event.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      toggleLoader(false);
      catInfoEl.innerHTML = `
                <img src="${data.url}" alt="${data.breeds[0].name}">
                <div>
                <h2>${data.breeds[0].name}</h2>
                <p>${data.breeds[0].description}</p>
                <p><strong>Temperament:</strong> ${data.breeds[0].temperament}</p>
                </div>
            `;
    })
    .catch(() => {
      toggleLoader(false);
      toggleError(true);
    });
});

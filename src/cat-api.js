import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_R3lhGMzyC3r0UX0bjrQY8jMIbjc8tJKp4HUhp6fO8Bif6fs8LJM7L6CGae2wPZsl';

export const fetchBreeds = () => {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(res => res.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data[0]);
};

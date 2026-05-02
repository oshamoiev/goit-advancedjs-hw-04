import axios from 'axios';

export const getImagesByQuery = (query, page) => {
  return axios
    .get('https://pixabay.com/api/', {
      timeout: 5000,
      params: {
        key: '55620787-7366754b0519359a7474d5ac8',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: query,
      },
    })
    .then(response => response.data)
    .catch(() => {
      throw new Error('Something went wrong while fetching images');
    });
};

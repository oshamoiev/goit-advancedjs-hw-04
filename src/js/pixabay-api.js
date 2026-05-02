import axios from 'axios';

export const PER_PAGE = 15;

export const  getImagesByQuery = async (query, page) => {
  const requestParams = {
    key: '55620787-7366754b0519359a7474d5ac8',
    per_page: PER_PAGE,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
  };

  const { data } = await axios.get('https://pixabay.com/api/', {
    timeout: 5000,
    params: requestParams,
  });

  return data;
};

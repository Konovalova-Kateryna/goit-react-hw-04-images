import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28418260-76404dde83faaf67fb91aa638';

axios.defaults.baseURL = BASE_URL;

export const getGallery = async (search, page) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesaerch: true,
    per_page: 12,
    page,
  });

  const responce = await axios.get(`/?${searchParams}`);

  return responce.data;
};

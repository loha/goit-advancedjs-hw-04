import axios from 'axios';

const API_KEY = '47642330-01773e177615e156ed5ec02c5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchPixabayImages = async (query, page = 1, perPage = 20) => {
  try {
    const response = await axios.get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { searchPixabayImages };

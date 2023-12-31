import axios from 'axios';
import Notiflix from 'notiflix';

const perPage = 40;

export async function searchImages(query, page) {
  const apiKey = '37208715-2f059b20d89d3ba30564c9c4f';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);

    if (data.hits.length === 0) {
      if (page === 1) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }

    return data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong. Please try again later.'
    );
    throw error;
  }
}

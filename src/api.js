import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Y0ZWRjNGEwOGMyYTVhYWZmMWM2NWMyNzlhODc0YiIsIm5iZiI6MTcyODk4NTcxOS42ODkwMDcsInN1YiI6IjY3MGUzODgzYjE1ZDk3YjFhOTNkN2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gxw9A_0PTL8cC4OkwXBmHs-5p7CoCWtUXtOhA8rCfdM`;
axios.defaults.headers.common["Accept"] = "application/json";

export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day", {
    params: {
      language: "en-US",
    },
  });
  return response.data.results;
};

export const getMovieBySearchWord = async (query) => {
  const response = await axios.get("search/movie", {
    params: {
      language: "en-US",
      include_adult: "false",
      page: "1",
      query,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(`movie/${id}/credits`, {
    params: {
      language: "en-US",
    },
  });
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`, {
    params: {
      language: "en-US",
      page: "1",
    },
  });
  return response.data.results;
};
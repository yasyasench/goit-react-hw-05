import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Use useSearchParams instead of useParams
import { getMovieBySearchWord } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import { Formik, Form, Field } from 'formik';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Correct hook for handling query params
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get('query');
      if (query) {
        try {
          const moviesResult = await getMovieBySearchWord(query);
          setMovies(moviesResult);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchMovies();
  }, [searchParams]);

  const initialValues = {
    query: query || '',
  };

  const handleSubmit = (values, { resetForm }) => {
    setMovies([]);
    if (values.query !== '') {
      setSearchParams({ query: values.query });
    }
    resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.input}
            name="query"
            type="text"
            placeholder="Search movies"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      {movies.length > 0 && <MovieList moviesProp={movies} />}
    </div>
  );
};

export default MoviesPage;

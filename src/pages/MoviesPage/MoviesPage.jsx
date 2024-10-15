import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { getMovieBySearchWord } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader'; // Import the Loader component
import { Formik, Form, Field } from 'formik';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false); // Define loader state

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get('query');
      if (query) {
        setLoader(true); // Start loader
        try {
          const moviesResult = await getMovieBySearchWord(query);
          setMovies(moviesResult);
        } catch (error) {
          console.log(error);
        } finally {
          setLoader(false); // Stop loader after fetching
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

      {loader ? ( // Show Loader while fetching movies
        <Loader />
      ) : (
        movies.length > 0 && <MovieList moviesProp={movies} /> // Show MovieList when not loading
      )}
    </div>
  );
};

export default MoviesPage;

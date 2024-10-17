import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css'; 

const MovieList = ({ fetchMovies, moviesProp }) => {
  const [movies, setMovies] = useState(moviesProp || []);
  const location = useLocation();

  useEffect(() => {
    if (fetchMovies) {
      const fetch = async () => {
        try {
          const moviesData = await fetchMovies();
          setMovies(moviesData);
        } catch (error) {
          console.log(error);
        }
      };
      fetch();
    }
  }, [fetchMovies]);

  return (
    <div className={css.containerMoviesList}>
      <ul className={css.moviesList}>
        {movies.map((movie) => {
          const { id, poster_path, title, name, original_title } = movie;

          return (
            <li className={css.moviesListItem} key={id}>
              <Link  className={css.movieTitleLink} to={`/movies/${id}`} state={{ from: location }}>
                <img
                  className={css.movieImg}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image' 
                  }
                  alt={movie.title}
                />
                <h2 className={css.movieTitle}>
                  {movie.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;

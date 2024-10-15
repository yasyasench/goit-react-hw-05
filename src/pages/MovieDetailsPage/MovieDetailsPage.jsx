import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import css from "./MovieDetailsPage.module.css";
import { getMovieDetails } from '../../api';
import BackLink from "../../components/BackLink/BackLink";
import Loader from '../../components/Loader/Loader'; 

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const location = useLocation();
  const locationRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        setError('Failed to fetch movie details. Please try again later.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <BackLink to={locationRef.current}></BackLink>
      <div className={css.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          width={300}
        />
        <div>
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>User Score: {Math.round(movie.popularity / 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>
                <p>{genre.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      <div>
        <h4>Additional Information</h4>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

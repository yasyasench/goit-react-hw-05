import React, { useEffect, useState } from 'react';
import css from "./HomePage.module.css";
import { getTrendingMovies } from '../../api';
import MovieList from "../../components/MovieList/MovieList";
import Loader from '../../components/Loader/Loader'; 

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => { 
      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);
  
  return (
    <div>
      <h1 className={css.title}>Trending today</h1> 
      {loading ? (
        <Loader />  
      ) : (
        movies.length > 0 ? <MovieList moviesProp={movies} /> : <div>No trending movies available.</div>
      )}
    </div>
  );
};

export default HomePage;

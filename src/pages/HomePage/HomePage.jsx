import React, { useEffect, useState } from 'react'
import css from "./HomePage.module.css"
import { getTrendingMovies } from '../../api';
import MovieList from "../../components/MovieList/MovieList"


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => { 
      try {
        const trendigMovies = await getTrendingMovies();
        setMovies(trendigMovies);
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
      <h1 className={css.titel}>Trending today</h1>
      {movies.length > 0 && <MovieList moviesProp={movies}/>}
    </div>
  )
}

export default HomePage
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const MovieList = ({fetchMovies, moviesProp}) => {
    const [movies, setMovies] = useState(moviesProp   || []);
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
      <div>
          <ul>
              {movies.map((movie) => (
                  <li key={movie.id}>
                      <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                          {movie.title}
                      </Link>
                  </li>
              ))}
          </ul>
    </div>
  )
}

export default MovieList
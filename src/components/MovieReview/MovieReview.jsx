import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api';

const MovieReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

    useEffect(() => { 
        const fetchReview = async () => { 
            try {
                const movieReview = await getMovieReviews(movieId);
                setReviews(movieReview);
            } catch (error){
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [movieId]);

    if (loading) {
        return <div>Loading reviews...</div>;
    }

    if (!reviews.length) {
     return <div>No reviews available.</div>;
    }
    
  return (
    <div>
        <h4>Reviews</h4>
        <ul>
            {reviews.map((review) => (
                <li key={review.id}>
                    <h5>{review.author}</h5>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default MovieReview
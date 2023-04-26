import React from 'react'
import { useEffect, useState } from 'react'

function MovieDetails(props) {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                let api = 'b15623fe';
                console.log(process.env)
                const response = await fetch(`http://www.omdbapi.com/?i=${props.id}&apikey=${api}`)
                const data = await response.json();
                console.log(data)
                setMovie(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchMovie();
    }, [props.id]);

    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      >                    
      <div className='p-8 bg-slate-600'>
        <h1 className='text-white'>{movie.Title}</h1>
        <p className='text-white'>{movie.Plot}</p>
        <p className='text-white'>{movie.Rating}</p>
        <p className='text-white'>{movie.Runtime}</p>
    </div>
</div>  )
}

export default MovieDetails
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import MovieDetails from './MovieDetails';
import Search from './Search';

function MoviesList(props) {

    const [showModal, setShowModal] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        setMovies(props.data.user.Search);
    }, [props.data.user.Search]);

    

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newMovieList = movies.filter((movie) => {
        return Object.values(movie)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newMovieList);
    } else {
      setSearchResults(movies);
    }
  };

  const moviesToDisplay = searchResults.length > 0 ? searchResults : props.data.user.Search;


  return (
    <>
    <div>
        <h1 className='text-3xl text-center text-black'>Search Results</h1>
        <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full pr-10 text-black border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search for movies"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-8 py-1.5 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onClick={() => handleSearch(searchTerm)}
        >
          Search
        </button>
      </div>
          </div>
        <div className='grid grid-cols-1 sm:grid-cols-3'>
        {moviesToDisplay.map((movie) => (
                <div key={movie.imdbID} className="flex justify-center p-2 m-5 text-center rounded-lg bg-slate-200">
                    <button onClick={() => setShowModal(movie.imdbID)}>
                        <Image src={movie.Poster} width={250} height={100} alt={movie.Title} />
                        <h1 className='text-black'>{movie.Title}</h1>
                        <p className='text-black'>{movie.Year}</p>
                    </button>
                </div>
            ))}
            {showModal ? (<div  onClick={() => setShowModal(null)} >
                        <MovieDetails id={showModal} />
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>  
                    </div>) : null}
        </div>
    </>
  )
}

export default MoviesList
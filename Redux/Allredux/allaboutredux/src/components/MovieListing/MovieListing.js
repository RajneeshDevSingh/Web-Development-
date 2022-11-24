import React from 'react'
import MovieCard from "../MovieCard/MovieCard"
import { useSelector } from 'react-redux'
import { getAllMovies , getAllShows } from '../../features/movies/movieSlice'
import "./MovieListing.scss"

const MovieListing = () => {
  const movies = useSelector(getAllMovies)
  const shows = useSelector(getAllShows)
  let renderMovie = "";
  let renderShows = "";

  renderShows = shows.Response === "True"?(shows.Search.map((movie , index) =>
  (
    <MovieCard key={index} data={movie}/>
  ))):(<div className='shows-error'><h3>{shows.Error}</h3></div>);


  renderMovie = movies.Response === "True"?(movies.Search.map((movie , index) =>
  (
    <MovieCard key={index} data={movie}/>
  ))):(<div className='movies-error'><h3>{movies.Error}</h3></div>);
  // console.log(movies)
  return (
    <div className='movie-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className='movie-container'>{renderMovie}</div>
      </div>

      <div className='movie-list'>
        <h2>shows</h2>
        <div className='movie-container'>{renderShows}</div>
      </div>
    </div>
  )
}

export default MovieListing
import React, { useEffect } from 'react'
import MovieListing from "../MovieListing/MovieListing"

import "./Home.scss"
import { useDispatch } from 'react-redux'
import { fetchAsynchMovies, fetchAsynchShows } from '../../features/movies/movieSlice'

const Home = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>
  {
    const movieText = "Harry";
    const showText = "Friends"
    dispatch(fetchAsynchMovies(movieText))
    dispatch(fetchAsynchShows(showText))
  },[dispatch]);
  return (
    <div>

      <div className='banner-img'></div>
        <MovieListing/>
    </div>
  )
}

export default Home
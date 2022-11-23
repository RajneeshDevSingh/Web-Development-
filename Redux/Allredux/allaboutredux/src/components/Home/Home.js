import React, { useEffect } from 'react'
import MovieListing from "../MovieListing/MovieListing"
import MovieApi from "../../common/apis/MovieApi"
import APIKey from "../../common/apis/movieApikey"
import "./Home.scss"
import { useDispatch } from 'react-redux'
import { addMovies } from '../../features/movies/movieSlice'

const Home = () => {
  const movieText = "Harry"
  const dispatch = useDispatch();
  useEffect(()=>
  {
    
     const fetchMovies = async ()=>
     {
      const response = await MovieApi.get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
      .catch((eer)=>
      {
        console.log("Error = :",eer)

      })
      console.log("Response = :" , response)
      dispatch(addMovies(response.data));
    };
    fetchMovies();


  },[]);
  return (
    <div>

      <div className='banner-img'></div>
        <MovieListing/>
    </div>
  )
}

export default Home
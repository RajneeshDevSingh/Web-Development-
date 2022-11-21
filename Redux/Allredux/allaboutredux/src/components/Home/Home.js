import React, { useEffect } from 'react'
import MovieListing from "../MovieListing/MovieListing"
import MovieApi from "../../common/apis/MovieApi"
import APIKey from "../../common/apis/movieApikey"
import "./Home.scss"

const Home = () => {
  useEffect(()=>
  {
    const movieText = "Harry"
     const fetchMovies = async ()=>
     {
      const response = await MovieApi.get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
      .catch((eer)=>
      {
        console.log("Error = :",eer)

      })
      console.log("Response = :" , response)
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
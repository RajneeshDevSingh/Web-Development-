import React, { useState } from 'react'
import { Link  } from 'react-router-dom'
import user from "../../images/user.png"
import { useDispatch } from 'react-redux'
import "./Header.scss"
import { fetchAsynchMovies, fetchAsynchShows } from '../../features/movies/movieSlice'
const Header = () => {
  const[term, setTerm] = useState("");
  const dispatch =  useDispatch();
  const submitHandler = (e)=>
  {
    
     if(term === "") return alert("Plese Enter Search Term!")
      e.preventDefault();
      dispatch(fetchAsynchMovies(term))
      dispatch(fetchAsynchShows(term))
      setTerm("");

    
    console.log(term)
  }
  return (
    <div className='header'>
       
      {/* redirect to home page  */}
      <div className='logo'> <Link to="/">  Movie App </Link></div>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <input type="text" value={term} placeholder="Serach Movie or Shows" onChange={(e)=>setTerm(e.target.value)}></input>
          <button type='submit' ><i className='fa fa-search'></i></button>
        </form>
      </div>
      <div className='user-image'>
          <img src={user} alt="some Img"/>
      </div>

    </div>
  )
}

export default Header
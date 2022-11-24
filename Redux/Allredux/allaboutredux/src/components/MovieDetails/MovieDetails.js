import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAsynchMovieOrShowDetail , getSelectedMovieOrShow} from '../../features/movies/movieSlice';
const MovieDetails = () => {
  const {imdbID} = useParams();
  const dispatch = useDispatch();

  const data = useSelector(getSelectedMovieOrShow);
  console.log(data)
  useEffect(()=>
  {
    dispatch(fetchAsynchMovieOrShowDetail(imdbID) ,[dispatch , imdbID])
  })
  return (
    <div className='movie-section'>
      <div className='section-left'>
        <div className='movie-title'>{data.Title}</div>
        <div className='movie-rating'>
          <span>
            IMDB Rating : <i className='fa fa-star'> : {data.imdbRating}</i>
          </span>

          <span>
            IMDB Votes : <i className='fa fa-thumbs-up'> : {data.imdbVotes}</i>
          </span>

          <span>
            Runtime : <i className='fa fa-calendar'> : {data.Year}</i>
          </span>
        </div>
      </div>

    </div>
  )
}

export default MovieDetails
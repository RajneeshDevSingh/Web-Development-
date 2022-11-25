import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from "../../common/apis/MovieApi"
import APIKey from "../../common/apis/movieApikey"


export const fetchAsynchMovies = createAsyncThunk('movies/fetchAsynchMovies' , async (term)=>
{
  
  const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`);
  // .catch((eer)=>
  // {
  //   console.log("Error = :",eer)

  // })
  console.log("Response = :" , response)
  return response.data;
  // dispatch(addMovies(response.data));
})


export const fetchAsynchShows = createAsyncThunk('movies/fetchAsynchShows' , async (term)=>
{
  
  const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=series`);
  
  console.log("Response = :" , response)
  return response.data;
  // dispatch(addMovies(response.data));
})


export const fetchAsynchMovieOrShowDetail = createAsyncThunk('movies/fetchAsynchMovieOrShowDetail' , async (id)=>
{
  
  const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
  
  console.log("Response = :" , response)
  return response.data;
  
})


const initialState = {
    movies : {},
    shows : {},
    selectedMovieOrShow :{},
  };

  const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers : {
        
        removeSelectedMovieOrShow:(state)=>
        {
          state.selectedMovieOrShow = {};
        }
    },
    extraReducers:
    {
      [fetchAsynchMovies.pending]:()=>
      {
        console.log("pendding " )
      },
      [fetchAsynchMovies.fulfilled]:(state, {payload}) =>
      {
        console.log("Fetch success ");
        return {...state, movies:payload};
      },
      [fetchAsynchMovies.rejected]:()=>
      {
        console.log("Rejected")
        
      },


      [fetchAsynchShows.fulfilled]:(state, {payload}) =>
      {
        console.log("Fetch success ");
        return {...state, shows:payload};
      },


      [fetchAsynchMovieOrShowDetail.fulfilled]:(state, {payload}) =>
      {
        console.log("Fetch success ");
        return {...state, selectedMovieOrShow:payload};
      },
    },

  });
  
  export const getAllMovies = (state) => state.movies.movies
  export const getAllShows = (state) => state.movies.shows
  export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
  export const {removeSelectedMovieOrShow} = movieSlice.actions;
  export default movieSlice.reducer;

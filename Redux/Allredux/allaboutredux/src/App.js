import React from "react";
import {Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
         <Routes>
          {/* <Route path=""  element={<Header/>} /> */}
          <Route path="/"  element={<Home/>} />
          <Route path="/movie/:imdbID" element={<MovieDetails/>} />
          <Route component={<PageNotFound/>} />
      </Routes>
       
     <Footer/>

    </div>
  );
}

export default App;
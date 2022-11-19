import React from "react";
import { Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        

        <Route path="/" element={<Home/>}/>
        <Route path="/movie/:imdbID" element={<Header/>}/>
        <Route path="PageNotFound" element={<PageNotFound/>}/>
        
      </Routes>

    </div>
  );
}

export default App;
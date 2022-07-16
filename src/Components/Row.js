import React, { useEffect, useState } from "react";
import axios from "../axios"; // here axios is alias and "../asxios is file path from which it is imported"
import "../Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")
  const imageURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    /* 
      here notice that inside dependency array we have put the vaiable which is coming from outside
      bcoz the data coming is dependend on that url 
    */
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

  const handleClick = (movie)=>{
    if(trailerUrl){
      setTrailerUrl("")
    } else {
      movieTrailer(movie?.name || "").then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v')) 
      }).catch((err)=>console.log(err))
    }
  }

  return (
    <div className="row">
      {/* Title will go here */}
      <h2>{title}</h2>

      <div className="row_posters">
        {/* Poster Card will go here */}

        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={()=>handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${imageURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;

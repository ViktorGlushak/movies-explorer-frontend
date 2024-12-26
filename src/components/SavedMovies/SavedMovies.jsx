import React, {useState} from 'react';
import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import Preloader from "../Preloader";
import {SHORT_MOVIE_DURATION_40} from "../../utils/const";

const SavedMovies = ({handleSetFavoritMovie, favoriteMovies, isLoading, getFavoriteMovies, setFavoriteMovies}) => {
  const [isNotFound, setNotFound] = React.useState(false);


  async function getFilteredMovies(text){
          setNotFound(false)
          await getFavoriteMovies();
          let favoriteMovies = JSON.parse(localStorage.getItem('moviesFavorite'));
          favoriteMovies = favoriteMovies.filter((movie) => {
            const condition = localStorage.getItem("isShortMoviesFavorite") === "true";
             if (condition) {
               const textRU = movie.nameRU.toLowerCase().includes(text);
               const textEN = movie.nameEN.toLowerCase().includes(text);
               const time = movie.duration <= SHORT_MOVIE_DURATION_40;
               return (textRU || textEN) && time;
             }
             return movie.nameRU.toLowerCase().includes(text) || movie.nameEN.toLowerCase().includes(text);
         });
          if (favoriteMovies.length === 0) {
            setNotFound(true)
            return;
          }
            setFavoriteMovies([...favoriteMovies]);

    }
    return (
      <main className="movies-explorer">
            <SearchForm
                getMovies={getFilteredMovies}
            />
            {isLoading && <Preloader />}
            {isNotFound ? <span style={{alignSelf: "center", fontSize: "18px", fontFamily: "'Inter', 'Arial', sans-serif"}}>Ничего не найдено</span>
            : <MoviesCardList
                    movies={favoriteMovies}
                    handleSetFavoritMovie={handleSetFavoritMovie}
                    isFavoritMovies={true}
                    setFavoriteMovies={setFavoriteMovies}
                />}
        </main>
    );
};

export default SavedMovies;
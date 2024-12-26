import React from 'react';
import SearchForm from "../SearchForm";
import Preloader from "../Preloader";
import MoviesCardList from "../MoviesCardList";
import "./Movies.css"
import {MOVIES_COUNT_ON_PAGE, SHORT_MOVIE_DURATION_40} from "../../utils/const";

const Movies = ({handleSetFavoritMovie, movies, setMovies, isLoading, getMovies,
                moviesShowed, setMoviesShowed, isNotFound, setNotFound, more, setMore,
                firstReload, setFirstReload}) => {
    const [moviesCount, setMoviesCount] = React.useState([]);

    React.useEffect(() => {
      setMoviesCount(getMoviesCount());
      const handlerResize = () => setMoviesCount(getMoviesCount());
      window.addEventListener('resize', handlerResize);

      return () => {
        window.removeEventListener('resize', handlerResize);
      };
    }, []);

      React.useEffect(() => {
          const getLastSearch = JSON.parse(localStorage.getItem('lastSearch')) || [];
        if (getLastSearch.length && firstReload) {
            const movieCount = getMoviesCount()[0]
            if (getLastSearch.length <= movieCount) {
                setMore(false)
            } else {
                setMore(true);
            }
            const newMoviesShowed = getLastSearch.splice(0, movieCount);
            setMoviesShowed([...newMoviesShowed]);
            setMovies([...getLastSearch])
            setFirstReload(false);
        }

      }, [firstReload]);

    function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    Object.keys(MOVIES_COUNT_ON_PAGE)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth >= +key) {
          countCards = MOVIES_COUNT_ON_PAGE[key];
        }
      });

    return countCards;
  }

    async function getFilteredMovies(text){
          setMoviesShowed([])
          setNotFound(false)
          await getMovies();
          let movies = JSON.parse(localStorage.getItem('movies'));
          movies = movies.filter((movie) => {
            const condition = localStorage.getItem("isShortMovies") === "true";
             if (condition) {
               const textRU = movie.nameRU.toLowerCase().includes(text);
               const textEN = movie.nameEN.toLowerCase().includes(text);
               const time = movie.duration <= SHORT_MOVIE_DURATION_40;
               return (textRU || textEN) && time;
             }
             return movie.nameRU.toLowerCase().includes(text) || movie.nameEN.toLowerCase().includes(text);
         });
          localStorage.setItem('lastSearch', JSON.stringify(movies))
          if (movies.length === 0) {
            setNotFound(true)
            setMore(false);
          }
          else if (movies.length <= moviesCount[0]) {
            setMovies([...new Set(movies)]);
            setMoviesShowed([...new Set(movies)]);
            setMore(false);
          } else {

          const spliceMovies = [...movies];
          const newMoviesShowed = spliceMovies.splice(0, moviesCount[0]);
          setMovies([...new Set(spliceMovies)]);
          setMoviesShowed([...new Set(newMoviesShowed)]);
          setMore(true)
          }
    }


    return (
        <main className="movies-explorer">
            <SearchForm
                getMovies={getFilteredMovies}
            />
            {isLoading && <Preloader />}
          {isNotFound ? <span style={{alignSelf: "center", fontSize: "18px", fontFamily: "'Inter', 'Arial', sans-serif"}}>Ничего не найдено</span>
            : <MoviesCardList
                    setMore={setMore}
                    allMovies={movies}
                    movies={moviesShowed}
                    handleSetFavoritMovie={handleSetFavoritMovie}
                    isLoading={isLoading}
                    more={more}
                    moviesCount={moviesCount}
                />}
        </main>
    );
};

export default Movies;
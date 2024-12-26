import React, {useState} from 'react';
import MoviesCard from "../MoviesCard";
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
const MoviesCardList = ({movies, allMovies, isFavoritMovies = false, handleSetFavoritMovie, setFavoriteMovies=null,
                            isLoading, more, moviesCount, setMore}) => {
    const { pathname } = useLocation();
    let favoriteMovies = JSON.parse(localStorage.getItem('moviesFavorite'));
    const [advancedMovie, setAdvancedMovies] = React.useState(movies.map(movie=>{
        let favorite = false;
        if (pathname !== '/saved-movies') {
          const savedFilm = favoriteMovies.filter((obj) => {
            return obj.movieId === movie.id || obj.id === movie.id;
          });
          favorite = savedFilm.length > 0;
        }
        movie.imageUrl = `https://api.nomoreparties.co${movie.image.url}`
        return {...movie, like: favorite}
    }))

    const updateFavorite = React.useCallback(async (item, like)=>{
        await handleSetFavoritMovie(item, like);
    }, [handleSetFavoritMovie])

    const handleLike = React.useCallback((item, like)=>{
        updateFavorite(item, like)
        setAdvancedMovies((prevValue)=>{
            return prevValue.map((elem)=>{
                return item.id === elem.id ? {...elem, like} : {...elem};
            })
        })
        if (pathname === '/saved-movies' && setFavoriteMovies) {
            setFavoriteMovies((prevState)=>{
                return prevState.filter((movie) => {
                    const id = movie.id || movie.movieId;
                    return id != item.id;
                })
            })
        }
    }, [setAdvancedMovies, updateFavorite])

      const onClick = React.useCallback(()=>{
        const spliceMovies = allMovies;
        const newMoviesShowed = advancedMovie.concat(spliceMovies.splice(0, moviesCount[1]));
          const newMovies = newMoviesShowed.slice(-moviesCount[1])
          setAdvancedMovies((prevValue)=>[...prevValue, ...newMovies]);
    }, [movies, setAdvancedMovies, moviesCount, setMore])

    return (
    <>
        <section className="movies">
            {advancedMovie.map((movie) => {
                movie.imageUrl = `https://api.nomoreparties.co${movie.image.url}`
                const id = movie.id;
              return (
                <MoviesCard
                    key={id}
                    id={id}
                    nameRU={movie.nameRU}
                    time={movie.duration}
                    trailerLink={movie.trailerLink}
                    image={movie.imageUrl}
                    isFavoritMovies={isFavoritMovies}
                    handleSetFavoritMovie={handleSetFavoritMovie}
                    handleLike={handleLike}
                    movie={movie}
                />
              );
            })}
        </section>
        {!isLoading && (allMovies.length) && more?
                    <section className="more-click">
                    <button
                      onClick={onClick}
                      className="more-click__button"
                      type="button"
                    >Ещё</button>
                </section> : ""}
    </>
    );
};

export default MoviesCardList;
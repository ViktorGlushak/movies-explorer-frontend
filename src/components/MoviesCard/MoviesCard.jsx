import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import deleteIcon from '../../images/delete.svg';
const MoviesCard = (
    {
        id,
        isFavoritMovies,
        nameRU,
        time,
        trailerLink,
        image,
        movie,
        handleLike
    }
) => {
    const { pathname } = useLocation();
    function getDuration(mins) {
        return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
    }

    const onClick = React.useCallback(()=>{
        return isFavoritMovies ? handleLike(movie, false) : handleLike(movie, !movie.like)
    }, [isFavoritMovies, handleLike, movie, movie.like])

    return (
        <article className="movie" id={id}>
        <a className="movie__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
            <img className="movie__image" src={image} alt={nameRU}/>
        </a>
        <div className="movie__info">
            <figcaption className="movie__figcaption">
                <h2 className="movie__title">{nameRU}</h2>
                <h3 className="movie__duration">{getDuration(time)}</h3>
            </figcaption>
            <button
                onClick={onClick}
                className="movie__like-button"
                name="movie__like-button"
                type="button"
            >
                <img
                    className="movie__like-image"
                    src={pathname !== '/saved-movies' ? movie.like ? like : dislike : deleteIcon}
                    alt={pathname !== '/saved-movies' ? movie.like ? "Кнопка лайка" : "Кнопка удаления" : "Кнопка удаления"}
                />
            </button>
        </div>
        </article>
    );
};

export default MoviesCard;
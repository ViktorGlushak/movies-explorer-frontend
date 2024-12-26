import React from 'react';
import FilterCheckbox from "../FilterCheckbox";
import { useLocation } from 'react-router-dom';
import "./SearchForm.css"


const SearchForm = ({getMovies}) => {
    const [searchText, setSearchText] = React.useState("");
    const [isShortMovies, setShortMovies] = React.useState(null);
    const [error, setError] = React.useState("");
    const location = useLocation();

      React.useEffect(() => {
          const searchText = location.pathname === '/movies'
            ? localStorage.getItem("searchMovie")
            : localStorage.getItem("searchFavoriteMovie")
          if (searchText) setSearchText(searchText)
    },[]);

      React.useEffect(() => {
          const isShortMovies = location.pathname === '/movies'
            ? localStorage.getItem("isShortMovies")
            : localStorage.getItem("isShortMoviesFavorite")
          if (isShortMovies) setShortMovies(isShortMovies === "true")
    },[]);

    async function handleTumblerChange(){
      localStorage.setItem(location.pathname === '/movies' ? "isShortMovies" : "isShortMoviesFavorite", !isShortMovies)
      setShortMovies(!isShortMovies);
      await getMovies(searchText);
    }
      const handleChange = (e) => {
        if(e.target.value) setError("");
          setSearchText(e.target.value);
      };
      const handleSubmit = async (e) => {
          e.preventDefault();
          if (!searchText && location.pathname === '/movies'){
              setError("Нужно ввести ключевое слово");
              return
          }
          setError("")
        if (location.pathname === '/movies') {
            localStorage.setItem("searchMovie", searchText)
        } else {
          localStorage.setItem("searchFavoriteMovie", searchText)
        }
        await getMovies(searchText);
    };
    return (
        <form className="search-form" noValidate="" onSubmit={handleSubmit}>
            <input
                minLength={1}
                value={searchText || ""}
                onChange={handleChange}
                type="text"
                className="search-form__input"
                placeholder="Фильм"
                name="searchText"
            />
            <FilterCheckbox isShortMovies={isShortMovies} handleTumblerChange={handleTumblerChange}/>
            <span className="register__input-error_active">{error}</span>
            <button type="submit" className="search-form__button">Найти</button>
        </form>
    );
};

export default SearchForm;
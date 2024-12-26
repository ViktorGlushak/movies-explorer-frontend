import React, {useState} from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import './App.css'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MoviesAPI } from "../../utils/MoviesApi";
import { MainAPI, AuthAPI} from "../../utils/MainApi";
import Main from "../Main";
import Header from "../Header";
import Footer from "../Footer";
import Register from "../Register";
import Login from "../Login";
import PageNotFound404 from "../PageNotFound404";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import BurgerMenu from "../BurgerMenu";
import InfoTooltip from "../InfoTooltip";
import ProtectedRouteElement from "../ProtectedRoute";

function App() {
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, openInfoTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isError, setErrorStatus] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState(false);
  const [more, setMore] = React.useState(false);
  const [firstReload, setFirstReload] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      await getUserInfo();
    })();
  }, []);

      React.useEffect(() => {
      const favoriteMov = JSON.parse(localStorage.getItem('moviesFavorite'));
      if (favoriteMov) setFavoriteMovies([...favoriteMov])
    }, []);

    async function getUserInfo() {
    await AuthAPI.checkToken()
      .then((userInfo) => {
          if(userInfo){
            setLoggedIn(true);
            setCurrentUser(userInfo);
          }
      })
      .catch((err) => {
        logOut()
        console.log(err);
      });
  }

  async function handleRegister(name, email, password, setBlockedForm) {
    try {
      const userInfo = await AuthAPI.signup({
        name,
        email,
        password,
      });
      if (userInfo) {
        setStatusError(false);
        await handleLogin(password, email, null, setBlockedForm)
      }
      setBlockedForm(false);
    } catch (err) {
      setBlockedForm(false);
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);

    }
  }

  async function handleLogin(password, email, callback=null, setBlockedForm) {
    try {
      const userInfo = await AuthAPI.signin({
        password,
        email,
      });
      if (userInfo.token) {
        localStorage.setItem("token", userInfo.token);
        if (callback) callback({ email: "", password: "" });
        await getUserInfo();
      }
      setBlockedForm(false)
    } catch (err) {
      setBlockedForm(false)
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

    function handleBurgerClick() {
    setBurgerOpen(true);
  }

  function handleClose() {
    setBurgerOpen(false);
  }

  function setStatusError(status) {
    setErrorStatus(status);
  }

  function handleOpenInfoTooltip() {
    openInfoTooltip(true);
  }

  function closeInfoRegisterTooltip() {
   openInfoTooltip(false);
    if (!isError) {
      navigate("/movies", { replace: true });
    }
  }

    function closeProfileTooltip() {
   openInfoTooltip(false);
  }

  function closeInfoTooltip() {
    openInfoTooltip(false);
  }

  function logOut() {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/", { replace: true });
  }

  async function getMovies() {
          if (!JSON.parse(localStorage.getItem('movies'))) {
            setLoading(true)
            try{
              const newMovies = await MoviesAPI.getMovies();
              const favoriteMov = await getFavoriteMovies();
              setFavoriteMovies([...favoriteMov])
              if(favoriteMov) newMovies?.filter(movie=> movie.isLike = (favoriteMov.filter(elem => elem.movieId === movie.id).length > 0))
              localStorage.setItem('movies', JSON.stringify(newMovies))
              setLoading(false);
            } catch (err) {
              setLoading(false);
                console.log(err);
            }
          }
    }

    async function getFavoriteMovies() {
          if (!JSON.parse(localStorage.getItem('moviesFavorite'))) {
            try{
              const newFavoriteMovies = await MainAPI.getFavoriteMovies();
              localStorage.setItem('moviesFavorite', JSON.stringify(newFavoriteMovies))
              setFavoriteMovies(newFavoriteMovies)
              return newFavoriteMovies;
            } catch (err) {
                console.log(err);
            }
          }
    }

  async function handleSetFavoritMovie(movie, liked){
      let favoriteMov = JSON.parse(localStorage.getItem('moviesFavorite'));
        if (liked){
        await handleLikedMovie(movie);
        favoriteMov.push(movie);
      } else {
        await handleDislikedMovie(movie);
        favoriteMov = favoriteMov.filter((item) => {
          const id = item.id || item.movieId;
          return id != movie.id;
        })
      }
        localStorage.removeItem('moviesFavorite');
        localStorage.setItem('moviesFavorite', JSON.stringify(favoriteMov));
  }

  async function handleDislikedMovie(movie) {
      try {
        const movieId = movie.movieId || movie.id
        await MainAPI.deleteMovie(movieId);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLikedMovie(movie) {
      try {
      await MainAPI.addMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.imageUrl,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateUser({ name, email }, callback) {
    const newUserData = { ...currentUser, name, email };
    MainAPI.updateUserInfo(newUserData)
      .then(() => {
        setCurrentUser(newUserData);
        handleOpenInfoTooltip();
          callback(false)
      })
      .catch((err) => {
          callback(false)
          console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                    isLandingPage={true}
                    loggedIn={false}
                    onBurgerClick={handleBurgerClick}
                />
                <Main/>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                        <Header
                            onBurgerClick={handleBurgerClick}
                        />
                        <Movies
                            getMovies={getMovies}
                            movies={movies}
                            setMovies={setMovies}
                            setFavoriteMovies={setFavoriteMovies}
                            handleSetFavoritMovie={handleSetFavoritMovie}
                            isLoading={isLoading}
                            moviesShowed={moviesShowed}
                            setMoviesShowed={setMoviesShowed}
                            isNotFound={isNotFound}
                            setNotFound={setNotFound}
                            more={more}
                            setMore={setMore}
                            firstReload={firstReload}
                            setFirstReload={setFirstReload}
                        />
                        <Footer />
                      </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                      <Header
                            onBurgerClick={handleBurgerClick}
                      />
                      <SavedMovies
                          handleSetFavoritMovie={handleSetFavoritMovie}
                          isLoading={isLoading}
                          favoriteMovies={favoriteMovies}
                          getFavoriteMovies={getFavoriteMovies}
                          setFavoriteMovies={setFavoriteMovies}
                      />
                      <Footer />
                      </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                      <Header
                        onBurgerClick={handleBurgerClick}
                      />
                      <Profile
                          logOut={logOut}
                          handleUpdateUser={handleUpdateUser}
                      />
                        <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        isError={isError}
                        onClose={closeProfileTooltip}
                        successText="Данные профиля успешно изменены!"
                      />
                    </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <>
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoRegisterTooltip}
                    successText="Вы успешно зарегистрировались!"
                  />
                  <Register
                    onRegister={handleRegister}
                  />
                </>
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <>
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoTooltip}
                  />
                  <Login
                    onLogin={handleLogin}
                  />
                </>
              )
            }
          />
          <Route path="*" element={
                <PageNotFound404/>
            } />
        </Routes>
        <BurgerMenu
            isOpen={isBurgerOpen}
            onClose={handleClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

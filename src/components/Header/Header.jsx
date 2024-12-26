import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css"
import logo from "../../images/logo.svg";
import logoAccount from "../../images/accountLogo.svg";
const Header = ({ loggedIn = true, onBurgerClick, isLandingPage = false} ) => {
    const location = useLocation();
    return (
        (loggedIn || Boolean(localStorage.getItem("token")) ?
        <header className="header_autorized" style={{backgroundColor: isLandingPage ? "#073042" : "#fff"}}>
                <a className="header__logo-link" href="/">
                    <img className="header__logo" src={logo} alt="Логотип"/>
                </a>
                <div className="header__navigation">
                    <nav className="navigation">
                        <div className="navigation__links-movies">
                            <a
                                style={{color: isLandingPage ? "#fff" : "#000", textDecoration: location.pathname === '/movies' ? "underline" : ""}}
                                className="navigation__link navigation__link-movies"
                                href="/movies"
                            >Фильмы</a>
                            <a
                                style={{color: isLandingPage ? "#fff" : "#000", textDecoration: location.pathname === '/saved-movies' ? "underline" : ""}}
                                className="navigation__link"
                                href="/saved-movies"
                            >Сохранённые фильмы</a>
                        </div>
                        <div className="navigation__links-account">
                            <a
                                style={{backgroundColor: isLandingPage ? "#2BE080" : "#fff"}}
                                className="navigation__account-button navigation__link"
                                href="/profile"
                            >Аккаунт
                                <button className="navigation__account-logo">
                                    <img src={logoAccount} alt="Логотип аккаунта"/>
                                </button>
                            </a>
                            <button
                                className="navigation__account-burger"
                                onClick={onBurgerClick}
                            ></button>
                        </div>
                    </nav>
                </div>
            </header>
                :
        <header className="header">
            <a className="header__logo-link" href="/">
                <img className="header__logo" src={logo} alt="Логотип"/>
            </a>
            <div className="header__button-block">
                <a className="header__link" href="/signup">Регистрация</a>
                <a className="header__button" href="/signin">Войти</a>
            </div>
        </header>
        )
    );
};

export default Header;
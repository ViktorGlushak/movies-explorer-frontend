import React from 'react';
import logoAccount from '../../images/accountLogo.svg';
import './BurgerMenu.css';
const BurgerMenu = ({isOpen, onClose}) => {

    function close(e) {
        const elem = document.querySelector("."+e.target.className);
        if (!elem || !elem.closest(".menu__container")){
            onClose()
        }
    }

    return (
        <div className={
        isOpen ? `menu menu_opened` : `menu`
      } onClick={close}>
            <nav className="menu__container">
                <button
                    className="menu__close-button"
                    type="button"
                    onClick={onClose}
                ></button>
                <ul className="menu__links">
                    <li className="menu__link-button">
                        <a className="menu__link" href="/">Главная</a>
                    </li>
                    <li className="menu__link-button">
                        <a className="menu__link" href="/movies">Фильмы</a>
                    </li>
                    <li className="menu__link-button">
                        <a className="menu__link" href="/saved-movies">Сохранённые фильмы</a>
                    </li>
                </ul>
                <div className="menu__account">
                    <a className="menu__account-button" href="/profile">Аккаунт<img src={logoAccount} alt="Логотип аккаунта" className="menu__account-logo"/></a>
                </div>
            </nav>
        </div>
    );
};

export default BurgerMenu;
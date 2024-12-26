import React from 'react';
import './Promo.css';
import planetLogo from "../../images/planet-logo.svg";

const Promo = () => {
    return (
        <section className="promo">
            <div className="promo__text-block">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div>
            <img className="promo__logo" src={planetLogo} alt="логотип-планета"/>
        </section>
    );
};

export default Promo;
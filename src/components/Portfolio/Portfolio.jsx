import React from 'react';
import './Portfolio.css';
const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__subtitle">Портфолио</h3>
            <ul className="portfolio__info">
                <li className="portfolio__link">
                    <a className="portfolio__text" href="https://github.com/ArtyomTregubov/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__text" href="https://artyomtregubov.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__text" href="https://mesto.tregubovart.nomoredomainsicu.ru" target="_blank" rel="noreferrer">Одностраничное приложение
                        <p className="portfolio__arrow">↗</p>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;
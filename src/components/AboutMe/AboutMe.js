import React from 'react';
import './AboutMe.css';
import foto from '../../images/myPhoto.jpg'
const AboutMe = () => {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__subtitle">Студент</h2>
            <div className="aboutMe__info">
                <section className="aboutMe__description">
                    <h3 className="aboutMe__description-subtitle">Артём</h3>
                    <p className="aboutMe__description-text">Фронтенд-разработчик, 34 года</p>
                    <p className="aboutMe__text">Я родился в Тюменской области, живу в  городе Тюмень.  Закончил ТюмГУ институт физкультуры, работаю персональным тренером. Увлекаюсь бодибилдингом, не однократный призёр и чемпион областных и окружных соревнований. Недавно решил попробовать себя в программировании. Прошёл курс по веб-разработке.  И данный проект является итоговым на этом курсе.</p>
                    <a className="aboutMe__link" href="https://github.com/ArtyomTregubov" target="_blank" rel="noreferrer">Github</a>
                </section>
                <img className="aboutMe__foto" src={foto} alt="Мое фото"/>
            </div>
        </section>
    );
};

export default AboutMe;
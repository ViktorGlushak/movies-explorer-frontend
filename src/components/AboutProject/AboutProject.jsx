import React from 'react';
import './AboutProject.css';
const AboutProject = () => {
    return (
        <section className="aboutProject">
            <h2 className="aboutProject__subtitle">О проекте</h2>
            <div className="aboutProject__infoblock">
                <section className="aboutProject__description">
                    <h3 className="aboutProject__description-subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProject__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </section>
                <section className="aboutProject__description">
                    <h3 className="aboutProject__description-subtitle aboutProject__section-subtitle_removed">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </section>
            </div>
            <section className="aboutProject__description-info">
                <p className="aboutProject__timing">1 неделя</p>
                <p className="aboutProject__timing-colored">4 недели</p>
                <p className="aboutProject__text-caption">Back-end</p>
                <p className="aboutProject__text-caption">Front-end</p>
            </section>
        </section>
    );
};

export default AboutProject;
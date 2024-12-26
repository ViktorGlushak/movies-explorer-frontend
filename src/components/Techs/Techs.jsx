import React from 'react';
import './Techs.css';
const Techs = () => {
    return (
        <section className="techs" name="techs" id="techs">
            <h2 className="techs__subtitle">Технологии</h2>
            <section className="techs__description">
                <h3 className="techs__description-subtitle">7 технологий</h3>
                <p className="techs__description-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </section>
            <section className="techs__description-info">
                <p className="techs__block">HTML</p>
                <p className="techs__block">CSS</p>
                <p className="techs__block">JS</p>
                <p className="techs__block">React</p>
                <p className="techs__block">Git</p>
                <p className="techs__block">Express.js</p>
                <p className="techs__block">mongoDB</p>
            </section>
        </section>
    );
};

export default Techs;
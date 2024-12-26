import React from 'react';
import './NavTab.css';
const NavTab = () => {
    function scrollTo(){
        document.getElementById('techs').scrollIntoView()
    }
    return (
        <section className="navTab">
            <a className="navTab" href="#techs" onClick={scrollTo}>
                <button className="navTab__button">Узнать больше</button>
            </a>
        </section>
    );
};

export default NavTab;
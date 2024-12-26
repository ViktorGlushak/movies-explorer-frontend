import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound404.css';
const PageNotFound404 = () => {
    const navigate = useNavigate();
    return (
        <div className="notFound">
            <h2 className="notFound__text">404</h2>
            <h3 className="notFound__message">Страница не найдена</h3>
            <a className="notFound__link" onClick={() => navigate(-1)}>Назад</a>
        </div>
    );
};

export default PageNotFound404;
import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

const RegisterBlock = () =>
    <div className="register-block">
        <div style={{backgroundImage:`url(${'/media/images/home/14.jpeg'})`}} className="register-block__banner"/>
        <div className="register-block__text">
            <div className="register-block__title">Зачем регистрироваться на нашем портале?</div>
            <ul>
                <li>Регистрируйте свои пометы</li>
                <li>Обратитесь к данным вашей собаки</li>
                <li>Найдите полезные документы</li>
                <li>Управление информацией Baby Dog</li>
            </ul>
            <div className="register-block__controls">
                <Link to="/registration" className="btn btn-primary btn-lg">Регистрация</Link>
            </div>
        </div>
    </div>

export default RegisterBlock;
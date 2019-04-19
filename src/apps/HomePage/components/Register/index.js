import React from 'react'
import Button from 'components/Button'
import './styles.scss'

const RegisterBlock = () =>
    <div className="register-block">
        <div className="register-block__banner">
            <img src="/static/images/noimg/details.svg" alt=""/>
        </div>
        <div className="register-block__text">
            <div className="register-block__title">Зачем регистрироваться на нашем портале?</div>
            <ul>
                <li>Регистрируйте свои пометы</li>
                <li>Обратитесь к данным вашей собаки</li>
                <li>Найдите полезные документы</li>
                <li>Управление информацией Baby Dog</li>
            </ul>
            <div className="register-block__controls">
                <Button className="btn-primary btn-lg">Регистрация</Button>
            </div>
        </div>
    </div>

export default RegisterBlock;
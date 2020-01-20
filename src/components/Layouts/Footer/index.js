import React from "react";
import { Link } from 'react-router-dom';
import { connectWidgetLogin } from 'apps/Auth/connectors';
import './index.scss';

const Footer = ({ isAuthenticated, logOutUser }) => (
    <div className="Footer">
        <div className="Footer__inner">
            <div className="Footer__inner-wrap">
                <img src="/static/images/footer/rkf-logo-transparent.svg" alt="Logo" />
                <div className="Footer__address">
                    <h3>Адрес</h3>
                    <p>Телефон: +7 (499) 482-1529</p>
                    <p>Режим работы: 9:30 — 18:00</p>
                    <p>Москва, ул. Гостиничная, д. 9, 5 этаж</p>
                </div>
                <div className="Footer__sections">
                    <h3>Разделы</h3>
                    <p><Link to="/exhibitions">Календарь выставок</Link></p>
                    <p><Link to="/clubs">Клубы</Link></p>
                </div>
                <div className="Footer__socials">
                    <h3>
                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                    </h3>
                    <p>
                        {
                            isAuthenticated
                                ? <Link to={'/'} onClick={logOutUser}>Выход</Link>
                                : <Link to="/auth/login">Вход</Link>
                        }
                    </p>
                    {!isAuthenticated && <p><Link to="/auth/registration">Регистрация</Link></p>}
                    <p className="Footer__language"><span>Рус</span>/Eng</p>
                </div>
            </div>
            <hr />
            <p>
                © РКФ, 1991—{new Date().getFullYear()}.
                Союзу общественных кинологических организаций — Российская кинологическая федерация (РКФ) принадлежат
                исключительные права в отношении результатов интеллектуальной деятельности и приравненных к ним средств индивидуализации,
                опубликованных на сайте rkf.org.ru, кроме случаев, когда прямо указан другой правообладатель. Указанная интеллектуальная собственность
                не может использоваться без предварительного согласия со стороны РКФ, за исключением случаев, предусмотренных законом.
             </p>
        </div>
    </div >
);

export default connectWidgetLogin(Footer);
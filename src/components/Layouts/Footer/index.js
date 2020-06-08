import React from "react";
import { Link } from 'react-router-dom';
import Container from "../Container";
import { RKFInfo } from "pages/Home/config";
import { beautify } from 'utils/phone';
import './index.scss';


const Footer = () => (
    <footer className="Footer">
        <Container className="Footer__inner">
            <div className="Footer__inner-wrap">
                <div className="Footer__company">
                    <h3>Компания</h3>
                    <Link className="link" to="/about">О RKF.Online</Link>
                    <span>Новости</span>
                    <Link className="link" to="/clubs-map" target="_blank">Карта клубов</Link>
                </div>
                <div className="Footer__exhibitions">
                    <h3>Мероприятия</h3>
                    <Link className="link" to="/exhibitions">Календарь мероприятий</Link>
                </div>
                <div className="Footer__sections">
                    <h3>Разделы</h3>
                    <Link className="link" to="/organizations/clubs">Клубы</Link>
                    <Link className="link" to="/organizations/nurseries">Питомники</Link>
                    <span>Владельцы</span>
                    <span>Судьи</span>
                </div>
                <div className="Footer__address">
                    <h3>Контакты РКФ</h3>
                    {RKFInfo.contacts.map((item, index) => (
                        item.link ?
                            <p className={`Footer__address-${item.class}`} key={index}>
                                {item.class === 'phone' ? beautify(item.text) : item.text}&nbsp;
                                            <a className="link" href={item.link}>{item.linkTitle}</a>
                            </p> :
                            <p className={`Footer__address-${item.class}`} key={index}>
                                {item.text}
                            </p>
                    ))}
                </div>
            </div>
            <hr />
            <div className="Footer__bottom">
                <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                <div className="Footer__socials">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://ok.ru/rkforg"><img src="/static/icons/social/odnoklassniki.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial"><img src="/static/icons/social/telegram.svg" alt="" /></a>
                </div>
                <p>Политика обработки персональных данных</p>
            </div>
        </Container>
    </footer >
);

export default Footer;

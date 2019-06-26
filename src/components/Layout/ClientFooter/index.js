import React from 'react'
import {Link} from 'react-router-dom'
import {Mail, Phone} from './svg'
import './styles.scss'

const email = 'rkf@rkf.org.ru';
const phone = '+7 (495) 482-1529';

const clearPhone = phone => phone.replace(/[-)( ]/g, '');
export default function ClientFooter() {
    return (
        <div className="ClientFooter darkBlue">
            <div className="ClientFooter__top">
                <div>Контактный центр РКФ</div>
                <div className="flex-row">
                    <span>С 9:00 до 21:00 (МСК), бесплатно по России</span>
                    <div className="flex-row">
                        <Phone/>
                        <a className="lnkText" href={`tel:${clearPhone(phone)}`}>{phone}</a>
                    </div>
                    <div className="flex-row">
                        <Mail/>
                        <a className="lnkText" href={`mailto:${email}`}>{email}</a>
                    </div>
                </div>
            </div>
            <div className="ClientFooter__bottom">
                <div style={{marginRight: 'auto'}}>© 2019 Российская кинологическая федерация ®</div>
                <Link to="/" className="lnkText">Пользовательское соглашение</Link>
                <Link to="/" className="lnkText">Конфиденциальность</Link>
                <Link to="/" className="lnkText">Лицензии</Link>
            </div>
        </div>
    )
}
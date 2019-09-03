import React from 'react'

export default function Address() {
    return (
        <div className="ExhibitionDetails__address">
            <div className="ExhibitionDetails__address--left">
                <h3 className="ExhibitionDetails__address-title">Адрес проведения и контакты</h3>
                <p>ул. Международная, д. 16,  г. Красногорск, Красногорский район, Московская обл., Россия, 143402</p>
                <p>МВЦ «Крокус Экспо»</p>
                <h4 className="ExhibitionDetails__address-subtitle" >Контакты организатора</h4>
                <p>Org@rkf.org.ru</p>
                <p>	+7 675 567-56-76</p>
            </div>
            <div className="ExhibitionDetails__address--right">
                <div></div>
                <p>Схема проезда</p>
            </div>
        </div>
    )
}
import React from 'react'
import { getDictElement, useDictionary } from 'apps/Dictionaries'
import Img from 'components/Img'

export default function Address({ exhibition_map_link, city_id, address }) {
    const { dictionary } = useDictionary('cities')
    const city = getDictElement(dictionary, city_id)
    return (
        <div className="ExhibitionDetails__address">
            <div className="ExhibitionDetails__address--left">
                <h3 className="ExhibitionDetails__address-title">
                    Адрес проведения и контакты
                </h3>
                <p>
                    г. {city}, {address}
                </p>
                {/*<p>МВЦ «Крокус Экспо»</p>*/}
                <h4 className="ExhibitionDetails__address-subtitle">
                    Контакты организатора
                </h4>
                <p>Org@rkf.org.ru</p>
                <p> +7 675 567-56-76</p>
            </div>
            {exhibition_map_link ? (
                <div className="ExhibitionDetails__address--right">
                    <div className="ExhibitionDetails__map">
                        <Img src={exhibition_map_link} alt={'Схема проезда'} />
                    </div>
                    <p>Схема проезда</p>
                </div>
            ) : null}
        </div>
    )
}

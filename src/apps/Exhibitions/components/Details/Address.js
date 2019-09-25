import React from 'react';
import { getDictElement, useDictionary } from 'apps/Dictionaries';
import Img from 'components/Img';

export default function Address({ exhibition_map_link, city_id, address, contacts }) {
    const { dictionary } = useDictionary('cities');
    const city = getDictElement(dictionary, city_id);

    return (
        <div className="ExhibitionDetails__address">
            <div className="ExhibitionDetails__address--left">
                <h3 className="ExhibitionDetails__address-title">Адрес проведения и контакты</h3>
                <p>{`г. ${city}${address ? ', ' + address : ''}`}</p>
                {contacts &&
                    <>
                        <h4 className="ExhibitionDetails__address-subtitle">Контакты организатора</h4>
                        {contacts.map(contact => <p key={contact.id}>{contact.value}</p>)}
                    </>
                }
            </div>
            {exhibition_map_link &&
                <div className="ExhibitionDetails__address--right">
                    <div className="ExhibitionDetails__map">
                        <Img src={exhibition_map_link} alt={'Схема проезда'} />
                    </div>
                    <p>Схема проезда</p>
                </div>
            }
        </div>
    )
}

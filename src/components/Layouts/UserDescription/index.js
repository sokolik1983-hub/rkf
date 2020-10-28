import React, {Fragment, useState} from "react";
import {Collapse} from "react-collapse";
import Card from "../../Card";
import "./index.scss";


const UserDescription = ({mainInfo, additionalInfo}) => {
    const [isOpen, setIsOpen] = useState(false);

    const normalizeLink = link => {
        if(!link.includes('https://') || !link.includes('http://')) {
            return 'https://' + link;
        }
        return link;
    };

    const getAddressString = addressObj => {
        let address = '';

        if(addressObj) {
            if (addressObj.postcode) address += `${addressObj.postcode}, `;
            if (addressObj.city_name) address += `${addressObj.city_name}, `;
            if (addressObj.street_name) address += `${addressObj.street_name}, `;
            if (addressObj.house_name) address += `д. ${addressObj.house_name}, `;
            if (addressObj.building_name) address += `стр. ${addressObj.building_name}, `;
            if (addressObj.flat_name) address += `кв. ${addressObj.flat_name}`;
        }

        return address;
    };

    const {
        main_phone_value,
        main_phone_description,
        main_phone_status,
        main_mail_value,
        main_mail_description,
        main_mail_status,
        birth_date,
        birth_date_status
    } = mainInfo;

    const {
        city_name,
        address,
        emails,
        phones,
        social_networks,
        web_site,
        description
    } = additionalInfo || {};

    return (
        <Card className="user-description">
            <div className="user-description__head">
                <h4 className="user-description__title">О себе</h4>
                {city_name &&
                    <span className="user-description__city">{city_name}</span>
                }
            </div>
            <p className="user-description__item _birthday">
                <span className="user-description__item-title">Дата рождения:</span>&nbsp;
                <span>{birth_date || birth_date_status}</span>
            </p>
            <p className="user-description__item _email">
                <span className="user-description__item-title">{main_mail_description || 'E-mail'}:</span>&nbsp;
                {main_mail_value ?
                    <a href={`mailto:${main_mail_value}`} title={main_mail_value}>{main_mail_value}</a> :
                    <span>{main_mail_status}</span>
                }
            </p>
            <p className="user-description__item _phone">
                <span className="user-description__item-title">{main_phone_description || 'Телефон'}:</span>&nbsp;
                <span>{main_phone_value || main_phone_status}</span>
            </p>
            {additionalInfo &&
                <>
                    <Collapse isOpened={isOpen}>
                        {emails && !!emails.length &&
                            emails.map(item =>
                                <p className="user-description__item _email" key={item.id}>
                                    <span className="user-description__item-title">{item.description || 'E-mail'}:</span>&nbsp;
                                    <a href={`mailto:${item.value}`} title={item.value}>
                                        {item.value}
                                    </a>
                                </p>
                            )
                        }
                        {phones && !!phones.length &&
                            phones.map(item =>
                                <p className="user-description__item _phone" key={item.id}>
                                    <span className="user-description__item-title">{item.description || 'Телефон'}:</span>&nbsp;
                                    <span title={item.value}>{item.value}</span>
                                </p>
                            )
                        }
                        {getAddressString(address) &&
                            <p className="user-description__item _address">
                                <span className="user-description__item-title">Адрес:</span>&nbsp;
                                <span>{getAddressString(address)}</span>
                            </p>
                        }
                        {web_site &&
                            <p className="user-description__item _site">
                                <span className="user-description__item-title">Сайт:</span>&nbsp;
                                <a href={web_site} title={web_site} target="_blank" rel="noopener noreferrer">{web_site}</a>
                            </p>
                        }
                        {social_networks && !!social_networks.length &&
                            <p className="user-description__item _socials">
                                <span className="user-description__item-title">Соцсети:</span>
                                {social_networks.map(item => (
                                    <Fragment key={item.id}>
                                        <br/>
                                        <a href={normalizeLink(item.site)}
                                           title={item.description || item.site}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                        >
                                            {item.description || item.site}
                                        </a>
                                    </Fragment>
                                ))}
                            </p>
                        }
                        {description &&
                            <div className="user-description__item _describe">
                                <span className="user-description__item-title">Описание:</span>
                                <div dangerouslySetInnerHTML={{__html: description}}/>
                            </div>
                        }
                    </Collapse>
                    <button
                        className={`user-description__btn${isOpen ? ' _open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </>
            }
        </Card>
    )
};

export default React.memo(UserDescription);
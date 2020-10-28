import React, {useState} from "react";
import {Collapse} from "react-collapse";
import Card from "../../Card";
import "./index.scss";


const UserDescription = ({city_name, address, birthday_date, emails, phones, site, socials, description}) => {
    const [isOpen, setIsOpen] = useState(false);

    const normalizeLink = link => {
        if(!link.includes('https://') || !link.includes('http://')) {
            return 'https://' + link;
        }

        return link;
    };

    return (
        <Card className="user-description">
            <div className="user-description__head">
                <h4 className="user-description__title">О себе</h4>
                {city_name && <span className="user-description__city">{city_name}</span>}
            </div>
            {!birthday_date &&
            (!emails || !emails.length) &&
            (!phones || !phones.length) &&
            !site && !address &&
            (!socials || !socials.length) &&
            !description &&
                <p className="user-description__disabled">Пользователь еще не опубликовал данные о себе</p>
            }
            {birthday_date &&
                <p className="user-description__item _birthday">
                    <span className="user-description__item-title">Дата рождения:</span>&nbsp;
                    <span>{birthday_date}</span>
                </p>
            }
            {emails && !!emails.length &&
                <p className="user-description__item _email">
                    <span className="user-description__item-title">E-mail:</span>&nbsp;
                    <span>
                        {emails.map(item => (
                            <a href={`mailto:${item.value}`}
                               key={item.id}
                               title={item.value}
                            >
                                {item.value}
                            </a>
                        ))}
                    </span>
                </p>
            }
            {phones && !!phones.length &&
                <p className="user-description__item _phone">
                    <span className="user-description__item-title">Телефон:</span>&nbsp;
                    <span>
                        {phones.map(item => (
                            <span
                               key={item.id}
                               title={item.value}
                            >
                                {item.value}
                            </span>
                        ))}
                    </span>
                </p>
            }
            {address &&
                <p className="user-description__item _address">
                    <span className="user-description__item-title">Адрес:</span>&nbsp;
                    <span>{address}</span>
                </p>
            }
            {site &&
                <p className="user-description__item _site">
                    <span className="user-description__item-title">Сайт:</span>&nbsp;
                    <span><a href={site} title={site} target="_blank" rel="noopener noreferrer">{site}</a></span>
                </p>
            }
            {socials && !!socials.length &&
                <p className="user-description__item _socials">
                    <span className="user-description__item-title">Соцсети:</span>
                    <span>
                        {socials.map(item => (
                            <a href={normalizeLink(item.site)}
                               key={item.id}
                               title={item.description || item.site}
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                {item.description || item.site}
                            </a>
                        ))}
                    </span>
                </p>
            }
            {description &&
                <>
                    <Collapse isOpened={isOpen}>
                        <div className="user-description__item _describe">
                            <span className="user-description__item-title">Описание:</span>
                            <div dangerouslySetInnerHTML={{__html: description}} />
                        </div>
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
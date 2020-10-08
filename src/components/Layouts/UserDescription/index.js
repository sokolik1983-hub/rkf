import React, {useState} from "react";
import {Collapse} from "react-collapse";
import Card from "../../Card";
import "./index.scss";


const UserDescription = ({city_name, birthday_date, email, phone, site, socials, description}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="user-description">
            <div className="user-description__head">
                <h4 className="user-description__title">О себе</h4>
                {city_name && <span className="user-description__city">{city_name}</span>}
            </div>
            {(!birthday_date || birthday_date === 'hidden') &&
            !email && !phone && !site &&
            (!socials || !socials.length) &&
            !description &&
                <p className="user-description__disabled">Пользователь еще не опубликовал данные о себе</p>
            }
            {birthday_date && birthday_date !== 'hidden' &&
                <p className="user-description__item _birthday">
                    <span className="user-description__item-title">Дата рождения:</span>&nbsp;
                    <span>{birthday_date}</span>
                </p>
            }
            {email &&
                <p className="user-description__item _email">
                    <span className="user-description__item-title">E-mail:</span>&nbsp;
                    <span><a href={`mailto:${email}`} title={email}>{email}</a></span>
                </p>
            }
            {phone &&
                <p className="user-description__item _phone">
                    <span className="user-description__item-title">Телефон:</span>&nbsp;
                    <span>{phone}</span>
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
                            <a href={item.site}
                               key={item.id}
                               title={item.description}
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                {item.description}
                            </a>
                        ))}
                    </span>
                </p>
            }
            {description &&
                <>
                    <Collapse isOpened={isOpen}>
                        <p className="user-description__item _describe">
                            <span className="user-description__item-title">Описание:</span>
                            <span>{description}</span>
                        </p>
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
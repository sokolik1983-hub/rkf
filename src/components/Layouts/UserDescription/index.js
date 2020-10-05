import React, {Fragment, useState} from "react";
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
            <p className="user-description__item _birthday">
                <span className="user-description__item-title">Дата рождения:</span>:&nbsp;
                <span>{birthday_date || ''}</span>
            </p>
            <p className="user-description__item _email">
                <span className="user-description__item-title">E-mail:</span>:&nbsp;
                <span>{email ? <a href={`mailto:${email}`}>{email}</a> : ''}</span>
            </p>
            <p className="user-description__item _phone">
                <span className="user-description__item-title">Телефон:</span>:&nbsp;
                <span>{phone || ''}</span>
            </p>
            <p className="user-description__item _site">
                <span className="user-description__item-title">Сайт:</span>:&nbsp;
                <span>{site ? <a href={site} target="_blank" rel="noopener noreferrer">{site}</a> : ''}</span>
            </p>
            <p className="user-description__item _socials">
                <span className="user-description__item-title">Соцсети:</span>:&nbsp;
                <span>
                    {socials.map(item => (
                        <Fragment key={item.id}>
                            <a href={item.site}
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                {item.description}
                            </a>
                            <br />
                        </Fragment>
                    ))}
                </span>
            </p>
            <Collapse isOpened={isOpen}>
                <p className="user-description__item _discribe">
                    <span className="user-description__item-title">Описание:</span>:&nbsp;
                    <span>{description || ''}</span>
                </p>
            </Collapse>
            <button
                className={`user-description__btn${isOpen ? ' _open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            />
        </Card>
    );
};

export default React.memo(UserDescription);
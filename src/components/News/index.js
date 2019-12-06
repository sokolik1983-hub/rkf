import React from "react";
import { Link } from 'react-router-dom'
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from 'appConfig';
import './index.scss';

const urlify = t => t.replace(/(https?:\/\/[^\s]+)/g, l => `<a class="link" target="_blank" href="${l}">${l}</a>`);
const NewsList = ({ news, pagesCount, currentPage, setPage }) => {
    const modalInner = (item) => {
        const text = JSON.parse(JSON.stringify(item.content).replace(/\\r\\n/g, '<br>'));
        return (
            <>
                <div className="news__wrap-head">
                    <Link to={`/${item.alias}`} className="news__item-head">
                        <div className="news__avatar" style={{ backgroundImage: `url(${item.logo_link ? item.logo_link : DEFAULT_IMG.clubAvatar})` }} />
                        <div className="news__about">
                            <h5 className="news__name">{item.club_name}</h5>
                            <p className="news__date">{formatDateTime(item.create_date)}</p>
                        </div>
                    </Link>
                </div>
                <div className="news__item-body">
                    <p className="news__text" dangerouslySetInnerHTML={{ __html: urlify(text) }} />
                    {item.picture_link && <img src={item.picture_link} alt="" className="news__img" />}
                </div>
            </>
        )
    };

    const FixedArticle = () => {
        return (
            <Card>
                <div className="list-item__body">
                    <a href="http://rkf.org.ru/vystavochnaja-dejatelnost/eurasia/"
                        style={{ justifyContent: 'center', display: 'flex', width: '100%' }}
                        target="_blank"
                        rel="noreferrer noopener">
                        <img
                            style={{ maxWidth: '100%', maxHeight: '100px' }}
                            src="/static/images/exhibitions/eur-big.png"
                            alt="" />
                    </a>
                </div>
            </Card>
        )
    };

    return (!news ?
        <h2 className="content__title">Новости не найдены</h2> :
        <div className="news">
            <ul className="news__list">
                <li className="news__item">
                    <FixedArticle />
                </li>
                {news.map(item => (
                    <li className="news__item" key={item.id}>
                        <Card>
                            <ListItem
                                date={item.create_date}
                                photo={item.picture_link}
                                clubName={item.club_name}
                                text={urlify(item.content)}
                                modalInner={modalInner(item)}
                                modalClass="news__modal"
                            />
                        </Card>
                    </li>
                ))}
            </ul>
            <Card>
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                />
            </Card>
        </div>
    )
};

export default NewsList;
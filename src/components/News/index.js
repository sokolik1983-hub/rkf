import React from "react";
import { Link } from 'react-router-dom'
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from 'appConfig';
import './index.scss';

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
                    <p className="news__text" dangerouslySetInnerHTML={{ __html: text }} />
                    {item.picture_link && <img src={item.picture_link} alt="" className="news__img" />}
                </div>
            </>
        )
    };

    const FixedArticle = () => {
        return (
            <Card>
                <div class="list-item__body">
                    <a href="http://rkf.org.ru/vystavochnaja-dejatelnost/eurasia/"
                        style={{ justifyContent: 'center', display: 'flex', width: '100%' }}
                        target="_blank"
                        rel="noreferrer noopener">
                        <img
                            style={{ maxWidth: '100%', maxHeight: '100px' }}
                            src="http://rkf.org.ru/wp-content/uploads/2019/11/eur20-logorgb-01.s5klu-1.png"
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
                <li class="news__item">
                    <FixedArticle />
                </li>
                {news.map(item => (
                    <li className="news__item" key={item.id}>
                        <Card>
                            <ListItem
                                date={item.create_date}
                                photo={item.picture_link}
                                clubName={item.club_name}
                                text={item.content}
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
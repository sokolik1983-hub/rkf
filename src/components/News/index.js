import React from "react";
import { Link } from 'react-router-dom'
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";
import { formatDateTime } from "../../utils/datetime";
import { DEFAULT_IMG } from 'appConfig';
import FixedArticle from './FixedArticle';
import './index.scss';

const urlify = t => t.replace(/([^"]https?:\/\/[^\s]+)/g, l => `<a class="link" target="_blank" href="${l}">${l}</a>`);


const NewsList = ({ news, pagesCount, currentPage, setPage }) => {
    const modalInner = (item) => {
        const text = JSON.parse(JSON.stringify(item.content).replace('/(<([^>]+)>)/ig', '').replace(/\\r\\n/g, '<br>'));
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

    return (
        <div className="news">
            <ul className="news__list">
                <li className="news__item">
                    <FixedArticle />
                </li>
                {news && news.map(item => (
                    <li className="news__item" key={item.id}>
                        <Card>
                            <ListItem
                                date={item.create_date}
                                photo={item.picture_link}
                                title={item.club_name}
                                alias={item.alias}
                                text={urlify(item.content)}
                                modalInner={modalInner(item)}
                                modalClass="news__modal"
                            />
                        </Card>
                    </li>
                ))}
            </ul>
            {!news && <h2 className="content__title">Новости не найдены</h2>}
            {news &&
                <Card>
                    <Paginator
                        pagesCount={pagesCount}
                        currentPage={currentPage}
                        setPage={setPage}
                    />
                </Card>
            }
        </div>
    )
};

export default NewsList;
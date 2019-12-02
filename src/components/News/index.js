import React from "react";
import {Link} from 'react-router-dom'
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";
import {formatDateTime} from "../../utils/datetime";
import './index.scss';

const NewsList = ({news, pagesCount, currentPage, setPage}) => {
    const modalInner = (item) => {
        const text = JSON.parse(JSON.stringify(item.content).replace(/\\r\\n/g, '<br>'));

        return (
            <>
                <div className="news__item-head">
                    <Link to={`/${item.alias}`} className="news__avatar" style={{backgroundImage: `url(${item.logo_link})`}}/>
                    <div className="news__about">
                        <h5 className="news__name">{item.club_name}</h5>
                        <p className="news__date">{formatDateTime(item.create_date)}</p>
                    </div>
                </div>
                <div className="news__item-body">
                    <p className="news__text" dangerouslySetInnerHTML={{__html: text}} />
                    {item.picture_link && <img src={item.picture_link} alt="" className="news__img"/>}
                </div>
            </>
        )
    };

    return (!news ?
        <h2 className="content__title">Новости не найдены</h2> :
        <div className="news">
            <ul className="news__list">
                {news.map(item => (
                    <li className="news__item" key={item.id}>
                        <Card>
                            <ListItem
                                date={item.create_date}
                                photo={item.picture_link}
                                text={item.content}
                                modalInner={modalInner(item)}
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
import React from "react";
import './index.scss';
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";

const List = ({list, listNotFound = 'Ничего не найдено', listClass, isFullDate = true, modalInner, modalClass, pagesCount, currentPage, setPage}) => {
    return !list.length ?
        <h2 className="list__title">{listNotFound}</h2> :
        <div className={`list${listClass ? ' ' + listClass : ''}`}>
            <ul className="list__content">
                {list.map(item => (
                    <li className="list__item" key={item.id}>
                        <Card>
                            <ListItem
                                title={item.title}
                                date={item.create_date}
                                isFullDate={isFullDate}
                                photo={item.picture_link}
                                text={item.content}
                                url={item.url}
                                modalInner={modalInner}
                                modalClass={modalClass}
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
};

export default React.memo(List);
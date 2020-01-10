import React from "react";
import Card from "../Card";
import ListItem from "../ListItem";
import Paginator from "../Paginator";
import './index.scss';


const List = ({list, listNotFound = 'Ничего не найдено', listClass, isFullDate = true, children, pagesCount, currentPage, setPage, removable, onDelete}) => (
    <div className={`list${listClass ? ' ' + listClass : ''}`}>
        {((list && !!list.length) || children) &&
            <ul className="list__content">
                {children &&
                    <li className="list__item">
                        {children}
                    </li>
                }
                {list && !!list.length && list.map(item => (
                    <li className="list__item" key={item.id}>
                        <Card>
                            <ListItem
                                id={item.id}
                                title={item.title}
                                city={item.legal_city_name}
                                date={item.create_date}
                                isFullDate={isFullDate}
                                photo={item.picture_link}
                                text={item.content}
                                url={item.url}
                                alias={item.alias}
                                removable={removable}
                                onDelete={onDelete}
                            />
                        </Card>
                    </li>
                ))}
            </ul>
        }
        {(!list || !list.length) && <h2 className="list__title">{listNotFound}</h2>}
        {pagesCount > 1 &&
            <Card>
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                />
            </Card>
        }
    </div>
);

export default React.memo(List);
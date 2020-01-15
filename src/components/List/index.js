import React from "react";
import Card from "../Card";
import ListItem from "../ListItem";
import ExhibitionsListItem from "../ListItem/ExhibitionsListItem";
import Paginator from "../Paginator";
import './index.scss';


const List = ({ list, listNotFound = 'Ничего не найдено', listClass, isFullDate = true, children, pagesCount, currentPage, setPage, removable, onDelete, isExhibitions }) => (
    <div className={`list${listClass ? ' ' + listClass : ''}`}>
        {((list && !!list.length) || children) &&
            <ul className="list__content">
                {children &&
                    <li className="list__item">
                        {children}
                    </li>
                }
                {list && !!list.length && list.map(item => (
                    <li className={isExhibitions ? 'list__item exhibition' : 'list__item'} key={item.id}>
                        {
                            isExhibitions
                                ? <ExhibitionsListItem
                                    id={item.id}
                                    title={item.content}
                                    city={item.city}
                                    date={item.create_date}
                                    photo={item.picture_link}
                                    url={item.url}
                                    club_name={item.club_name}
                                    club_alias={item.club_alias}

                                />
                                : <Card>
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
                        }
                    </li>
                ))}
            </ul>
        }
        {(!list || !list.length) && <h2 className="list__title">{listNotFound}</h2>}
        {
            pagesCount > 1 &&
            <Card>
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                />
            </Card>
        }
    </div >
);

export default React.memo(List);
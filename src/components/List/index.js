import React from "react";
import Card from "../Card";
import ListItem from "../ListItem";
import ListFilter from './ListFilter';
import ExhibitionsListItem from "../ListItem/ExhibitionsListItem";
import { NewsPlaceholder } from 'pages/Home/components/Placeholder';
import Paginator from "../Paginator";
import './index.scss';


const List = ({
    list,
    listNotFound = 'Ничего не найдено',
    listClass,
    isFullDate = true,
    pagesCount,
    currentPage,
    setPage,
    removable,
    onDelete,
    isExhibitions,
    isHomepage = false,
    setNewsFilter,
    loading
}) => (
        <div className={`list${listClass ? ' ' + listClass : ''}`}>
            {isHomepage && <ListFilter setNewsFilter={setNewsFilter} />}
            {loading
                ? <NewsPlaceholder />
                : (list && !!list.length) &&
                <ul className="list__content">
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
                                            club_name={item.club_name}
                                            city={item.fact_city_name}
                                            date={item.create_date}
                                            isFullDate={isFullDate}
                                            photo={item.picture_link}
                                            text={item.content}
                                            url={`/news/${item.id}`}
                                            alias={item.alias}
                                            removable={removable}
                                            onDelete={onDelete}
                                            logo_link={item.logo_link}
                                        />
                                    </Card>
                            }
                        </li>
                    ))}
                </ul>}
            {(!list || !list.length) && !loading && <h2 className="list__title">{listNotFound}</h2>}
            {
                pagesCount > 1 &&
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                    scrollToTop={!isHomepage}
                />
            }
        </div >
    );

export default React.memo(List);
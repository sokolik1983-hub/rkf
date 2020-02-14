import React from "react";
import Card from "components/Card";
import ListItem from "./ListItem";
import ListFilter from './ListFilter';
import Placeholder from './Placeholder';
import Paginator from "components/Paginator";
import './index.scss';


const NewsList = ({
    list,
    isFullDate = true,
    pagesCount,
    currentPage,
    setPage,
    setNewsFilter,
    currentActiveType,
    currentCity,
    loading
}) => (
        <div className="NewsList">
            <ListFilter setNewsFilter={setNewsFilter} setPage={setPage} currentActiveType={currentActiveType} currentCity={currentCity} />
            {loading
                ? <Placeholder />
                : (list && !!list.length) &&
                <ul className="NewsList__content">
                    {list && !!list.length && list.map(item => (
                        <li className="NewsList__item" key={item.id}>
                            {
                                <Card>
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
                                        logo_link={item.logo_link}
                                    />
                                </Card>
                            }
                        </li>
                    ))}
                </ul>}
            {(!list || !list.length) && !loading && <h2 className="list__title">Ничего не найдено</h2>}
            {
                pagesCount > 1 &&
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                    scrollToTop={false}
                />
            }
        </div >
    );

export default React.memo(NewsList);
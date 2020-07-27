import React, { useState } from "react";
import Card from "../../../../components/Card";
import CitySelect from "../../../../components/CitySelect";
import ListFilter from './ListFilter';
import ListItem from "../../../../components/ListItem";
import Placeholder from './Placeholder';
import Paginator from "../../../../components/Paginator";
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
    citiesDict,
    loading
}) => {
    const [activeType, setActiveType] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };

    return <div className="NewsList">
        <div className="NewsList__head">
            <div className="NewsList__head-wrap">
                <div className="Homepage__news-title">
                    <h3>Публикации</h3>
                    <div className="Homepage__news-mobile-only">
                        <CitySelect
                            currentCity={currentCity}
                            cityFilter={city => {
                                setNewsFilter({ city: city });
                                setPage(1);
                            }}
                        />
                    </div>
                </div>
                <div className="NewsList__filters">
                    <div className="Homepage__news-title-wrap">
                        <ul className="ListFilter">
                            <li><a href="/" onClick={handleClick} className={!activeType ? 'active' : undefined}>Все</a></li>
                            <li><a href="/" onClick={handleClick} name="news" className={activeType === 'news' ? 'active' : undefined}>Новости</a></li>
                            <li style={{ opacity: '0.5' }}><span>Объявления</span></li>
                        </ul>
                        <CitySelect
                            currentCity={currentCity}
                            cityFilter={city => {
                                setNewsFilter({ city: city });
                                setPage(1);
                            }}
                        />
                    </div>
                    <ListFilter
                        setNewsFilter={setNewsFilter}
                        setPage={setPage}
                        currentActiveType={currentActiveType}
                        currentCity={currentCity}
                    />
                </div>
            </div>
        </div>
        {loading
            ? <Placeholder />
            : (list && !!list.length) &&
            <ul className="NewsList__content">
                {list && !!list.length && list.map(item => (
                    <li className="NewsList__item" key={item.id}>
                        {
                            <Card>
                                <ListItem
                                    user={item.user_type}
                                    id={item.id}
                                    name={item.name}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={isFullDate}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    alias={item.alias}
                                    logo_link={item.logo_link}
                                    setNewsFilter={setNewsFilter}
                                    setPage={setPage}
                                    citiesDict={citiesDict}
                                    currentActiveType={currentActiveType}
                                />
                            </Card>
                        }
                    </li>
                ))}
            </ul>}
        {(!list || !list.length) && !loading && <h2 className="list__title">Ничего не найдено</h2>}
        {pagesCount > 1 &&
            <Paginator
                pagesCount={pagesCount}
                currentPage={currentPage}
                setPage={setPage}
                scrollToTop={false}
            />
        }
    </div>
};

export default React.memo(NewsList);
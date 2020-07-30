import React from "react";
import Card from "../Card";
import ListItem from "../ListItem";
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
    onAdClose,
    onDelete,
    loading
}) => (
        <div className={`list${listClass ? ' ' + listClass : ''}`}>
            {loading
                ? <NewsPlaceholder />
                : (list && !!list.length) &&
                <ul className="list__content">
                    {list && !!list.length && list.map(item => (
                        <li className="list__item" key={item.id}>
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
                                    removable={removable}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                    isClosedAd={item.is_closed_advert}
                                    onAdClose={onAdClose}
                                    onDelete={onDelete}
                                    logo_link={item.logo_link}
                                />
                            </Card>
                        </li>
                    ))}
                </ul>}
            {(!list || !list.length) && !loading && <h2 className="list__title">{listNotFound}</h2>}
            {pagesCount > 1 &&
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={currentPage}
                    setPage={setPage}
                />
            }
        </div>
    );

export default React.memo(List);
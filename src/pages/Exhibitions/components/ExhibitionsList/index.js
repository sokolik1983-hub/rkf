import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardExhibition from "../../../../components/CardExhibition";
import { setFiltersToUrl } from "../../utils";
import { DEFAULT_IMG } from "../../../../appConfig";
import "./index.scss";


const ExhibitionsList = ({ exhibitions, loading, getNextExhibitions, hasMore }) => (
    <div className="ExhibitionsList">
        <InfiniteScroll
            dataLength={exhibitions.length}
            next={getNextExhibitions}
            hasMore={hasMore}
            loader={loading && <Loading centered={false} />}
            endMessage={
                <div className="ExhibitionsList__no-exhibitions">
                    <h4>{exhibitions.length ? 'Мероприятий больше нет' : 'Мероприятия не найдены'}</h4>
                    <img src={DEFAULT_IMG.noNews} alt={exhibitions.length ? 'Мероприятий больше нет' : 'Мероприятия не найдены'} />
                </div>
            }
        >
            <ul className="ExhibitionsList__content">
                {exhibitions.map(item => (
                    <li className="ExhibitionsList__item" key={item.id}>
                        <CardExhibition
                            id={item.id}
                            title={item.content}
                            city={item.city}
                            city_id={item.city_id}
                            dates={item.dates}
                            photo={item.picture_link}
                            url={item.url}
                            club_name={item.club_name}
                            club_alias={item.club_alias}
                            club_logo={item.club_logo}
                            federation_name={item.federation_name}
                            federation_link={item.federation_link}
                            ranks={item.ranks.map(r => r.name).join(', ')}
                            user={item.user_type}
                            setFilters={city_id => setFiltersToUrl({CityIds: [city_id]})}
                        />
                    </li>
                ))}
            </ul>
        </InfiniteScroll>
    </div>
);

export default React.memo(ExhibitionsList);
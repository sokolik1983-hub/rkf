import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardExhibition from "../../../../components/CardExhibition";
import {getEmptyFilters, setFiltersToUrl} from "../../utils";
import {useDictionary} from "../../../../dictionaries";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const ExhibitionsList = ({ exhibitions, loading, getNextExhibitions, hasMore }) => {
    const { dictionary } = useDictionary('rank_type');

    const setFilters = city => {
        setFiltersToUrl({
            ...getEmptyFilters(),
            ExhibitionName: city
        });
    };

    return (
        <div className="ExhibitionsList">
            {!exhibitions || !exhibitions.length ?
                <div className="ExhibitionsList__no-exhibitions">
                    <h4>Мероприятия не найдены</h4>
                    <img src={DEFAULT_IMG.noNews} alt="Мероприятия не найдены" />
                </div> :
                <InfiniteScroll
                    dataLength={exhibitions.length}
                    next={getNextExhibitions}
                    hasMore={hasMore}
                    loader={loading && <Loading centered={false} />}
                    endMessage={
                        <div className="ExhibitionsList__no-exhibitions">
                            <h4>Мероприятий больше нет</h4>
                            <img src={DEFAULT_IMG.noNews} alt="Мероприятий больше нет" />
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
                                    dates={item.dates}
                                    photo={item.picture_link}
                                    url={item.url}
                                    club_name={item.club_name}
                                    club_alias={item.club_alias}
                                    club_logo={item.club_logo}
                                    federation_name={item.federation_name}
                                    federation_link={item.federation_link}
                                    ranks={item.rank_ids}
                                    dictionary={dictionary}
                                    user={item.user_type}
                                    setFilters={city => setFilters(city)}
                                />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            }
        </div>
    )
};

export default React.memo(ExhibitionsList);
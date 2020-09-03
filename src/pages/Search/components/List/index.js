import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardOrganization from "../../../../components/CardOrganization";
import CardExhibition from "../../../../components/CardExhibition";
import CardNews from "../../../../components/CardNews";
import {DEFAULT_IMG} from "../../../../appConfig";
import {useDictionary} from "../../../../dictionaries";
import "./index.scss";


const SearchList = ({searchResult, hasMore, getNextResults}) => {
    const {dictionary} = useDictionary('rank_type');

    return (
        <div className="search-list">
            <InfiniteScroll
                dataLength={searchResult.length}
                next={getNextResults}
                hasMore={hasMore}
                loader={<Loading centered={false} />}
                endMessage={
                    <div className="search-list__default-content">
                        <h3>{!searchResult.length ? 'Ничего не найдено' : 'Больше ничего нет'}</h3>
                        <img src={DEFAULT_IMG.noNews} alt={!searchResult.length ? 'Ничего не найдено' : 'Больше ничего нет'} />
                    </div>
                }
            >
                <ul className="search-list__content">
                    {searchResult.map(item => (
                        <li className="search-list__item" key={item.id}>
                            {item.search_type === 'organizations' &&
                                <CardOrganization {...item} />
                            }
                            {item.search_type === 'exhibitions' &&
                                <CardExhibition
                                    id={item.id}
                                    title={item.exhibition_name}
                                    city={item.city}
                                    dates={item.dates}
                                    photo={item.picture_link}
                                    url={`/exhibitions/${item.id}`}
                                    club_name={item.club_name}
                                    club_alias={item.club_alias}
                                    club_logo={item.club_logo}
                                    federation_name={item.federation_name}
                                    federation_link={item.federation_link}
                                    ranks={item.rank_ids}
                                    dictionary={dictionary}
                                    user={item.user_type}
                                />
                            }
                            {item.search_type === 'articles' &&
                                <CardNews
                                    user={item.user_type}
                                    id={item.id}
                                    name={item.name}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={true}
                                    small_photo={item.picture_short_link}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    alias={item.alias}
                                    logo_link={item.logo_link}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                />
                            }
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    )
};

export default React.memo(SearchList);
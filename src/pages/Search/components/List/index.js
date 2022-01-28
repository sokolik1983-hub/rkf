import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../../components/Loading";
import CardOrganization from "../../../../components/CardOrganization";
import CardExhibition from "../../../../components/CardExhibition";
import CardNewsNew from "../../../../components/CardNewsNew";
import {DEFAULT_IMG} from "../../../../appConfig";
import {getDictElementsArray, useDictionary} from "../../../../dictionaries";
import {formatDateCommon} from "../../../../utils/datetime";
import "./index.scss";
import CardSpecialist from "../../../../components/CardSpecialist";


const SearchList = ({filtersSearchType, searchResult, hasMore, getNextResults}) => {
    // console.log('filtersSearchType in list', filtersSearchType)
    // console.log('searchResult in list', searchResult)
    const {dictionary} = useDictionary('rank_type');

    const getDate = dates => {
        let date = '';

        if(dates && dates.length) {
            const startDate = dates[0];
            const endDate = dates[dates.length - 1];
            date = dates.length === 1
                ? formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))
                : formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`)) +
                ' - ' + formatDateCommon(new Date(`${endDate.year}/${endDate.month}/${endDate.day}`));
        }

        return date;
    };

    const getRanks = rank_ids => rank_ids?.length ? getDictElementsArray(dictionary, rank_ids).join(', ') : 'Не указано';

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
                    {/*{searchResult.map(item => console.log('item', item) && (*/}
                    {searchResult.map(item => (
                        <li className="search-list__item" key={item.id}>
                            {/*{item.search_type === 'organizations' &&*/}
                            {filtersSearchType.toString()[0] === '1' &&
                                <CardOrganization {...item} />
                            }

                            {/*{item.search_type === 'exhibitions' &&*/}
                            {filtersSearchType.toString()[0] === '3' &&
                                <CardExhibition
                                    {...item}
                                    title={item.exhibition_name}
                                    date={getDate(item.dates)}
                                    photo={item.picture_link}
                                    url={`/exhibitions/${item.id}`}
                                    ranks={getRanks(item.rank_ids)}
                                    user={item.user_type}
                                    reports = {item.reports_links}
                                />
                            }
                            {/*{item.search_type === 'articles' &&*/}
                            {/*{console.log(filtersSearchType.toString()[0] === '2')}*/}
                            {filtersSearchType.toString()[0] === '2' &&
                                <CardNewsNew
                                    {...item}
                                    user={item.user_type}
                                    city={item.fact_city_name}
                                    date={item.create_date}
                                    isFullDate={true}
                                    small_photo={item.picture_short_link}
                                    photo={item.picture_link}
                                    text={item.content}
                                    url={`/news/${item.id}`}
                                    isAd={item.is_advert}
                                    adBreedName={item.advert_breed_name}
                                    adCode={item.advert_code}
                                    adPrice={item.advert_cost}
                                    adAmount={item.advert_number_of_puppies}
                                />
                            }

                            {/*{(item.search_type === 'judges') &&*/}
                            {filtersSearchType.toString()[0] === '4' &&
                                <CardSpecialist
                                    {...item}
                                    searchTypeId={
                                        //Костыль, работающий от фильтров. Если надо будет одновременно выводить разные карточки, то это работать не будет
                                        filtersSearchType === 401 ? 1 :
                                        filtersSearchType === 402 ? 2 :
                                        filtersSearchType === 403 ? 3 : 4
                                    }
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
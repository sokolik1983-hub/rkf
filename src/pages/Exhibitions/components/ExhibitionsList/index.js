import React from "react";
import Placeholder from "./Placeholder";
import ListItem from "./ListItem";
import Paginator from "../../../../components/Paginator";
import {setFiltersToUrl} from "../../utils";
import {useDictionary} from "../../../../apps/Dictionaries";
import "./index.scss";

const ExhibitionsList = ({exhibitions, loading, pagesCount, PageNumber}) => {
    const {dictionary} = useDictionary('rank_type');

    return (
        <div className="ExhibitionsList">
            {loading ?
                <Placeholder/> :
                exhibitions && !!exhibitions.length &&
                    <ul className="ExhibitionsList__content">
                        {exhibitions.map(item => (
                            <li className="ExhibitionsList__item" key={item.id}>
                                {
                                    <ListItem
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
                                    />
                                }
                            </li>
                        ))}
                    </ul>}
                {(!exhibitions || !exhibitions.length) && !loading && <h2 className="ExhibitionsList__title">Мероприятий не найдено</h2>}
                {pagesCount > 1 &&
                    <Paginator
                        pagesCount={pagesCount}
                        currentPage={PageNumber}
                        setPage={page => setFiltersToUrl({PageNumber: page})}
                    />
                }
        </div>
    )
};

export default React.memo(ExhibitionsList);

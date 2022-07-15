import React from "react";
import {Link, NavLink} from "react-router-dom";

import "./styles.scss";

const Counter = ({ counters, profileAlias, breeds, judgeInfo }) => {
    const alias = profileAlias.search('kennel') === 1 || profileAlias.search('user') === 1 ? profileAlias : `/${profileAlias}`;

    const linkForExhibitionsNBC = (breeds) => {
        const addBreedsToLink = breeds?.map(obj => `BreedIds=${obj.breed_id}`).join().replaceAll(',', '&');
        return `/exhibitions?${addBreedsToLink}`;
    }

    return (
        !!counters &&
        <div className="counter_component">
            <div className="counter_component__body">
                <div className="counter_component__block">
                    <div className="counter_component__count">
                        <p>{counters.publications_count}</p>
                    </div>
                    <div className="counter_component__name">
                        Публикации
                    </div>
                </div>
                <Link to={`${alias}/gallery`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.photos_count}</p>
                        </div>
                        <div className="counter_component__name">
                            Фото
                        </div>
                    </div>
                </Link>
                <Link to={`${alias}/uploaded-documents`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.documents_count}</p>
                        </div>
                        <div className="counter_component__name">
                            Документы
                        </div>
                    </div>
                </Link>
                <Link to={`${alias}/video`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.videos_count}</p>
                        </div>
                        <div className="counter_component__name">
                            Видео
                        </div>
                    </div>
                </Link>
                {
                    (!!counters.breeds_count || counters.breeds_count === 0) &&
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.breeds_count}</p>
                        </div>
                        <div className="counter_component__name">
                            Породы
                        </div>
                    </div>
                }
                {!judgeInfo &&
                    (!!counters.exhibitions_count || counters.exhibitions_count === 0) &&
                    <NavLink
                        exact to={breeds ?
                        linkForExhibitionsNBC(breeds) :
                             !!profileAlias.match(/club/) ?
                                 `/exhibitions?Alias=${profileAlias.replace('club/', '')}` :
                                    `/exhibitions?Alias=${profileAlias}`
                    }
                        title="Мероприятия"
                    >
                        <div className="counter_component__block">
                            <div className="counter_component__count">
                                <p>{counters.exhibitions_count}</p>
                            </div>
                            <div className="counter_component__name">
                                Мероприятия
                            </div>
                        </div>
                    </NavLink>
                }
                {judgeInfo && (!!counters.exhibitions_count || counters.exhibitions_count === 0) &&
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.exhibitions_count}</p>
                        </div>
                        <div className="counter_component__name">
                            Мероприятия
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default Counter;

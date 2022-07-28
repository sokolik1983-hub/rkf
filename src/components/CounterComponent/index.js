import React, { memo } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Counter = ({ counters, profileAlias, breeds, judgeInfo }) => {
    const alias = profileAlias.search('kennel') === 1 || profileAlias.search('user') === 1 ? profileAlias : `/${profileAlias}`;

    const linkForExhibitionsNBC = (breeds) => {
        const addBreedsToLink = breeds?.map(obj => `BreedIds=${obj.breed_id}`).join().replaceAll(',', '&');
        return `/exhibitions?${addBreedsToLink}`;
    };

    const linkForExhibitionsJudges = (judgeInfo) => {
        const judgeLink = judgeInfo?.map(item => `JudgeIds=${item.judge_id}`).join('&');
        return `/exhibitions?${judgeLink}&DateFrom=2019-01-01&DateTo=${new Date().getFullYear() + 5}-01-01`;
    };

    const linkForExhibitionsClub = (profileAlias) => {
        const clubLink = profileAlias.replace('club/', '');
        return `/exhibitions?Alias=${clubLink}&DateFrom=2019-01-01&DateTo=${new Date().getFullYear() + 5}-01-01`;
    };

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
                {(judgeInfo?.length || profileAlias.search('user') !== 1) && counters.exhibitions_count >= 0 &&
                    <Link
                        exact to={judgeInfo ?
                            linkForExhibitionsJudges(judgeInfo) :
                                breeds ?
                                    linkForExhibitionsNBC(breeds) :
                                         !!profileAlias.match(/club/) ?
                                             linkForExhibitionsClub(profileAlias) :
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
                    </Link>
                }
            </div>
        </div>
    )
};

export default memo(Counter);

import React from 'react';
import {Link, NavLink} from "react-router-dom";

import "./styles.scss";

const Counter = ({ counters, profileAlias }) => {

    const alias = profileAlias.search('kennel') === 1 ||  profileAlias.search('user') === 1? profileAlias : `/${profileAlias}`

    return (
        !!counters &&
        <div className="counter_component">
            <div className="counter_component__body">
                <div className="counter_component__block">
                    <div className="counter_component__count">
                        <p>{counters.publications_count}</p>
                    </div>
                    <div className="counter_component__name">
                        публикаций
                    </div>
                </div>
                <Link to={`${alias}/gallery`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.photos_count}</p>
                        </div>
                        <div className="counter_component__name">
                            фото
                        </div>
                    </div>
                </Link>
                <Link to={`${alias}/uploaded-documents`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.documents_count}</p>
                        </div>
                        <div className="counter_component__name">
                            документов
                        </div>
                    </div>
                </Link>
                <Link to={`${alias}/video`}>
                    <div className="counter_component__block">
                        <div className="counter_component__count">
                            <p>{counters.videos_count}</p>
                        </div>
                        <div className="counter_component__name">
                            видео
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
                            пород
                        </div>
                    </div>
                }
                {
                    (!!counters.exhibitions_count || counters.exhibitions_count === 0) &&
                    <NavLink exact to={`/exhibitions?Alias=${profileAlias}`} title="Мероприятия">
                        <div className="counter_component__block">

                            <div className="counter_component__count">
                                <p>{counters.exhibitions_count}</p>
                            </div>
                            <div className="counter_component__name">
                                мероприятий
                            </div>
                        </div>
                    </NavLink>

                }
            </div>
        </div>
    )
};

export default Counter;
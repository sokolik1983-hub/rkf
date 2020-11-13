import { Link } from "react-router-dom";
import React from "react";
import "./styles.scss";

const Counter =({counters, profileAlias}) =>{


    return (
        !!counters &&
        <div className = "counter_component">
            <div className = "counter_component__body">
                <div className = "counter_component__block">
                    <div className = "counter_component__count">
                        <p>{counters.publications_count}</p>
                    </div>
                    <div className = "counter_component__name">
                        публикаций
                    </div>
                </div>
                <Link to={`${profileAlias}/gallery`}>
                    <div className = "counter_component__block">
                        <div className = "counter_component__count">
                            <p>{counters.photos_count}</p>
                        </div>
                        <div className = "counter_component__name">
                            фото
                        </div>
                    </div>
                </Link>
                <div className = "counter_component__block">
                    <div className = "counter_component__count">
                        <p>{counters.documents_count}</p>
                    </div>
                    <div className = "counter_component__name">
                        документов
                    </div>
                </div>
                <Link to={`${profileAlias}/video`}>
                    <div className = "counter_component__block">
                        <div className = "counter_component__count">
                            <p>{counters.videos_count}</p>
                        </div>
                        <div className = "counter_component__name">
                            видео
                        </div>
                    </div>
                </Link>
                {
                    (!!counters.breeds_count || counters.breeds_count === 0) &&
                    <div className = "counter_component__block">
                        <div className = "counter_component__count">
                            <p>{counters.breeds_count}</p>
                        </div>
                        <div className = "counter_component__name">
                            пород
                        </div>
                    </div>
                }
                {
                    (!!counters.exhibitions_count || counters.exhibitions_count === 0) && 
                    <div className = "counter_component__block">
                        <div className = "counter_component__count">
                            <p>{counters.exhibitions_count}</p>
                        </div>
                        <div className = "counter_component__name">
                            мероприятий
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default Counter;
import React from "react";
import "./styles.scss";

const Counter =({counters}) =>{
    return (
        !!counters &&
        <div className = "counter_component">
            <hr></hr>
            <div className = "counter_component__body">
                <div className = "counter_component__block">
                    <div className = "counter_component__count">
                        <p>{counters.publications_count}</p>
                    </div>
                    <div className = "counter_component__name">
                        публикаций
                    </div>
                </div>
                <div className = "counter_component__block">
                    <div className = "counter_component__count">
                        <p>{counters.photos_count}</p>
                    </div>
                    <div className = "counter_component__name">
                        фото
                    </div>
                </div>
                <div className = "counter_component__block">
                    <div className = "counter_component__count">
                        <p>{counters.videos_count}</p>
                    </div>
                    <div className = "counter_component__name">
                        видео
                    </div>
                </div>
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
            </div>
        </div>
    )
};

export default Counter;
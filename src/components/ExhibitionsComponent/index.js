import React, {useState, useEffect} from "react";
import HorizontalSwipe from "../HorozintalSwipe";
import ExhibitionCard from "../ExhibitionCard";
import Placeholder from "../ExhibitionCard/Placeholder";
import {Request} from "../../utils/request";
import "./index.scss";


const ExhibitionsComponent = ({alias}) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [isRequestEnd, setIsRequestEnd] = useState(false);
    const placeholders = [0, 1, 2];

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/Exhibition/featured?Alias=${alias}&ElementsCount=3`
        }, data => {
            setExhibitions(data);
            setIsRequestEnd(true);
        },
        error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setIsRequestEnd(true);
        }))();
    }, [alias]);

    if(isRequestEnd && (!exhibitions || !exhibitions.length)) return null;

    return (
        <div className="exhibitions-component">
            <HorizontalSwipe id="exhibitions-component">
                {exhibitions && !!exhibitions.length ?
                    exhibitions.slice(0, 3).map(item => (
                        <ExhibitionCard {...item} key={item.id}/>
                    )) :
                    placeholders.map(i => (
                        <Placeholder key={i}/>
                    ))
                }
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ExhibitionsComponent);
import React, {useState, useEffect} from "react";
import ExhibitionCard from "../../../../components/ExhibitionCard";
import Placeholder from "../../../../components/ExhibitionCard/Placeholder";
import {Request} from "../../../../utils/request";
import {endpointGetExhibitions} from "../../config";
import "./index.scss";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";


const ExhibitionsComponent = () => {
    const [exhibitions, setExhibitions] = useState(null);
    const placeholders = [0, 1, 2];

    useEffect(() => {
        (() => Request({
            url: `${endpointGetExhibitions}?Alias=rkf&ElementsCount=3`
        }, data => setExhibitions(data),
        error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, []);

    return (

        <div className="rkf-page__exhibitions">
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
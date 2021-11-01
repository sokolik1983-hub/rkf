import React, {memo, useRef} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import mobileMenuMoves from "../../../../../../utils/mobileMenuMoves";
import "./index.scss";


const ListFilter = ({searchTypeId}) => {
    const clientWidth = window.innerWidth;
    const wrap = useRef();

    const handleClick = (type, e, place) => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];
        if(calendarButton) calendarButton.classList.remove('active');
        setFiltersToUrl({...getEmptyFilters(), SearchTypeId: type});
        mobileMenuMoves(place, e.target, wrap);
    };

    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>
                <div className="slider" ref={wrap}>
                    <HorizontalSwipe id="slider-wrap1" className="slider-wrap">
                        <div className={searchTypeId === 4 ? ' _active' : ''} onClick={(e) => handleClick(4, e, 1)}>По породам</div>
                        <div className={searchTypeId === 1 ? ' _active' : ''} onClick={(e) => handleClick(1, e, 2)}>По служебным и {(clientWidth < 600) && <br /> } игровым дисциплинам</div>
                        <div className={searchTypeId === 2 ? ' _active' : ''}  onClick={(e) => handleClick(2, e, 3)}>По охотничьим {(clientWidth < 600) && <br /> } дисциплинам</div>
                        <div className={searchTypeId === 3 ? ' _active' : ''} onClick={(e) => handleClick(3, e, 4)}>Специалисты</div>
                    </HorizontalSwipe>
                </div>

        </div>
    )
};

export default memo(ListFilter);
import React, {useEffect, useRef, useState} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import { setFiltersToUrl } from "../../../../utils";
import mobileMenuMoves from "../../../../../../utils/mobileMenuMoves";

import "./index.scss";


const ListFilter = ({ categoryId, exhibitionsForTable, standardView, setExporting, exporting, setStandardView }) => {
    const clientWidth = window.innerWidth;
    const [activeType, setActiveType] = useState(0);
    const wrap = useRef();

    useEffect(() => {
        setActiveType(+categoryId);
    }, [categoryId]);

    const handleClick = (type, e, place) => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({ CategoryId: type });

        if (type === 4 || (activeType === 4 && type !== 4)) {
            setFiltersToUrl({ CityIds: [] });
        }
        mobileMenuMoves(place, e.target, wrap);
    };



    return (
        <div className="exhibitions-page__list-filter">
           <div className="exhibitions-page__title-inner">
                   <h4 className="list-filter__title">Мероприятия</h4>
                   {
                       (clientWidth < 560) ? (<button className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')} onClick={() => setStandardView(!standardView)}>
                       </button>) : ''
                   }

               <div className="exhibitions-page__controls">
                   {!!exhibitionsForTable.length && !standardView &&
                   <div className="exhibitions-page__downloadBtn-wrap">
                       <button
                           className="exhibitions-page__control exhibitions-page__control--downloadIcon"
                           onClick={() => setExporting(true)}
                           disabled={exporting}
                       >
                           Скачать PDF
                       </button>
                   </div>
                   }
                   {
                       (clientWidth > 560) ? (<button className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')} onClick={() => setStandardView(!standardView)}>
                           {standardView ? 'Переключиться на табличный вид' : 'Вернуться к стандартному просмотру'}
                       </button>) : ''
                   }

               </div>
           </div>
            <HorizontalSwipe id="exhibitions-list-filter">
                <div className="slider" ref={wrap}>
                    <HorizontalSwipe id="slider-wrap1" className="slider-wrap">
                         <div className={activeType === 0 ? ' _active' : ''} onClick={(e) => handleClick(0, e, 1)}>Все</div>
                         <div className={activeType === 1 ? ' _active' : ''} onClick={(e) => handleClick(1, e, 2)}>Выставочные</div>
                         <div className={activeType === 2 ? ' _active' : ''}  onClick={(e) => handleClick(2, e,  3)}>Племенные</div>
                         <div className={activeType === 3 ? ' _active' : '_disabled'}
                              // onClick={(e) => handleClick(3, e, 4)}
                         >Состязания и испытания рабочих качеств</div>
                    </HorizontalSwipe>
                </div>
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);
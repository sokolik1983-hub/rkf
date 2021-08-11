import React, { useEffect, useState } from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import { setFiltersToUrl } from "../../../../utils";
import "./index.scss";
import mobileMenuMoves from "../../../../../../utils/mobileMenuMoves";
import {getEmptyFilters} from "../../../../../Organizations/utils";

const ListFilter = ({ categoryId, exhibitionsForTable, standardView, setExporting, exporting, setStandardView }) => {
    const clientWidth = window.innerWidth;
    const [activeType, setActiveType] = useState(0);

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
        if (clientWidth < 600) {
            mobileMenuMoves(place, e.target)
        }
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
                {
                    (clientWidth < 600)
                        ? (
                            <div className="slider">
                                <HorizontalSwipe id="slider-wrap" className="slider-wrap">
                                    <div className={activeType === 0 ? ' _active' : ''} onClick={(e) => handleClick(0, e, 1)}>Все</div>
                                    <div className={activeType === 1 ? ' _active' : ''} onClick={(e) => handleClick(1, e, 2)}>Выставочные мероприятия</div>
                                    <div className={activeType === 2 ? ' _active' : ''}  onClick={(e) => handleClick(2, e,  3)}>Племенные мероприятия</div>
                                    <div className={activeType === 3 ? ' _active' : ''} onClick={(e) => handleClick(3, e, 4)}>Состязания и испытания <br /> рабочих качеств</div>
                                </HorizontalSwipe>
                            </div>
                        ) : (<ul className="list-filter">
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 0 ? ' _active' : ''}`}
                            onClick={() => handleClick(0)}
                        >Все</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 1 ? ' _active' : ''}`}
                            onClick={() => handleClick(1)}
                        >Выставочные мероприятия</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 2 ? ' _active' : ''}`}
                            onClick={() => handleClick(2)}
                        >Племенные мероприятия</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 3 ? ' _active' : ''}`}
                            onClick={() => handleClick(3)}
                        >Состязания и испытания рабочих качеств</span>
                        </li>
                        {/* <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 4 ? ' _active' : ''}`}
                            onClick={() => handleClick(4)}
                        >Обучение</span>
                    </li> */}
                    </ul>)
                }
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);
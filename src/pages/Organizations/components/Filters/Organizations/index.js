import React, {memo, useRef} from "react";
import HorizontalSwipe from "../../../../../components/HorozintalSwipe";
import {getEmptyFilters, setFiltersToUrl} from "../../../utils";
import mobileMenuMoves from "../../../../../utils/mobileMenuMoves";

import "./index.scss";


const OrganizationsFilter = ({organization_type }) => {
    const clientWidth = window.innerWidth;
    const wrap = useRef();

    const handleClick = (organization_type, e, place ) => {
        if(clientWidth < 600) {
            mobileMenuMoves(place, e.target, wrap);
            setFiltersToUrl({...getEmptyFilters(), organization_type: organization_type})
        }
    };
    return (
        <div className="organizations-page__list-filter">
            <div className="organizations-page__filter-wrap">
                <h3>Организации</h3>
                {
                    clientWidth < 600
                    ? (
                        <div className="slider" ref={wrap}>
                            <HorizontalSwipe id="slider-wrap" className="slider-wrap">
                                <div className={organization_type === 5 ? ' _active' : ''} onClick={(e) => handleClick(5, e, 1)}>РКФ и Федерации</div>
                                <div className={organization_type === 3 ? ' _active' : ''} onClick={(e) => handleClick(3, e, 2)}>Клубы</div>
                                <div className={organization_type === 4 ? ' _active' : ''}  onClick={(e) => handleClick(4, e,3 )}>Питомники</div>
                                <div className={organization_type === 7 ? ' _active' : ''} onClick={(e) => handleClick(7, e, 4)}>НКП</div>
                            </HorizontalSwipe>
                        </div>
                        )
                        : (
                            <HorizontalSwipe id="organizations-page__list-filter" desktopScroll={true}>
                                <ul className="list-filter">
                                    <li className="list-filter__item">
                                        <button
                                            className={`list-filter__control${organization_type === 5 ? ' _active' : ''}`}
                                            type="button"
                                            onClick={() => setFiltersToUrl({...getEmptyFilters(), organization_type: 5})}
                                        >РКФ и Федерации</button>
                                    </li>
                                    <li className="list-filter__item">
                                        <button
                                            className={`list-filter__control${organization_type === 3 ? ' _active' : ''}`}
                                            type="button"
                                            onClick={() => setFiltersToUrl({...getEmptyFilters(), organization_type: 3})}
                                        >Клубы</button>
                                    </li>
                                    <li className="list-filter__item">
                                        <button
                                            className={`list-filter__control${organization_type === 4 ? ' _active' : ''}`}
                                            type="button"
                                            onClick={() => setFiltersToUrl({...getEmptyFilters(), organization_type: 4})}
                                        >Питомники</button>
                                    </li>
                                    <li className="list-filter__item">
                                        <button
                                            className={`list-filter__control${organization_type === 7 ? ' _active' : ''}`}
                                            type="button"
                                            onClick={() => setFiltersToUrl({...getEmptyFilters(), organization_type: 7})}
                                        >НКП</button>
                                    </li>
                                </ul>
                            </HorizontalSwipe>
                        )
                }

            </div>
        </div>
    )
}




export default memo(OrganizationsFilter);
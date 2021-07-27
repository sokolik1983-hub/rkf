import React from "react";
import HorizontalSwipe from "../../../../../components/HorozintalSwipe";
import {getEmptyFilters, setFiltersToUrl} from "../../../utils";
import "./index.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OrganizationsFilter = ({organization_type}) => {
    const clientWidth = window.innerWidth;

    return (
        <div className="organizations-page__list-filter">
            <div className="organizations-page__filter-wrap">
                <h3>Организации</h3>
                <HorizontalSwipe id="organizations-page__list-filter">

                        {
                            (clientWidth < 600) ? (
                                <Slider
                                    slidesToShow={1}
                                    arrows={false}
                                    centerMode={true}
                                    focusOnSelect={true}
                                    dots={false}
                                    infinite={false}
                                    autoplay={false}
                                    fade={false}
                                    adaptiveHeight={true}
                                    variableWidth={true}

                                >
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
                                </Slider>
                            ) : (
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
                            )

                        }

                </HorizontalSwipe>
            </div>
        </div>
    )
}

export default React.memo(OrganizationsFilter);
import React from "react";
import HorizontalSwipe from "../../../../../components/HorozintalSwipe";
import {getEmptyFilters, setFiltersToUrl} from "../../../utils";
import "./index.scss";


const OrganizationsFilter = ({filtersValue}) => (
    <div className="organizations-page__list-filter">
        <div className="organizations-page__filter-wrap">
            <HorizontalSwipe id="organizations-page__list-filter">
                <ul className="list-filter">
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${filtersValue.organization_type === 5 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => setFiltersToUrl({ ...getEmptyFilters(), organization_type: 5 })}
                        >РКФ и Федерации</button>
                    </li>
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${filtersValue.organization_type === 3 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => setFiltersToUrl({ ...getEmptyFilters(), organization_type: 3 })}
                        >Клубы</button>
                    </li>
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${filtersValue.organization_type === 4 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => setFiltersToUrl({ ...getEmptyFilters(), organization_type: 4 })}
                        >Питомники</button>
                    </li>
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${filtersValue.organization_type === 7 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => setFiltersToUrl({ ...getEmptyFilters(), organization_type: 7 })}
                        >НКП</button>
                    </li>
                </ul>
            </HorizontalSwipe>
        </div>
    </div>
);

export default React.memo(OrganizationsFilter);
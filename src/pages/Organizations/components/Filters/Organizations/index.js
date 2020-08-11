import React from "react";
import HorizontalSwipe from "../../../../../components/HorozintalSwipe";
import {getEmptyFilters} from "../../../utils";
import {connectFilters} from "../../../connectors";
import "./index.scss";


const OrganizationsFilter = ({organization_type, setFilters}) => (
    <div className="organizations-page__list-filter">
        <HorizontalSwipe id="organizations-page__list-filter">
            <ul className="list-filter">
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization_type === 5 ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization_type: 5})}
                    >РКФ и Федерации</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization_type === 3 ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization_type: 3})}
                    >Клубы</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization_type === 4 ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization_type: 4})}
                    >Питомники</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization_type === 7 ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization_type: 7})}
                    >НКП</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className="list-filter__control _not-active"
                        type="button"
                        onClick={() => null}
                    >Приюты</button>
                </li>
            </ul>
        </HorizontalSwipe>
    </div>
);

export default connectFilters(React.memo(OrganizationsFilter));
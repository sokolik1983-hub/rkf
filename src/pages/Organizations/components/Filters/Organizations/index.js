import React from "react";
import HorizontalSwipe from "../../../../../components/HorozintalSwipe";
import {getEmptyFilters} from "../../../utils";
import {connectFilters} from "../../../connectors";
import "./index.scss";


const OrganizationsFilter = ({organization, setFilters}) => (
    <div className="organizations-page__list-filter">
        <HorizontalSwipe id="organizations-page__list-filter">
            <ul className="list-filter">
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization === 'federations' ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization: 'federations'})}
                    >РКФ и Федерации</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization === 'clubs' ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization: 'clubs'})}
                    >Клубы</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className={`list-filter__control${organization === 'kennels' ? ' _active' : ''}`}
                        type="button"
                        onClick={() => setFilters({...getEmptyFilters(), organization: 'kennels'})}
                    >Питомники</button>
                </li>
                <li className="list-filter__item">
                    <button
                        className="list-filter__control _not-active"
                        type="button"
                        onClick={() => null}
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
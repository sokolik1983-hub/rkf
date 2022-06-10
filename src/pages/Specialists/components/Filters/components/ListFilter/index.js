import React, {memo, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import SwipeTabs from "../../../../../../components/SwipeTabs";
import {getEmptyFilters, setFiltersToUrl} from "../../../../utils";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";

import "./index.scss";
import { CSSTransition } from "react-transition-group";
import Select from "react-select";
import Card from "../../../../../../components/Card";


const ListFilter = ({
        CityIds,
        RegionIds,
        searchTypeId,
}) => {
    const tabItems = useMemo(() => {
        return [
            {title: 'По породам', search_type: 4},
            {title: 'По служебным и игровым дисциплинам', search_type: 1},
            {title: 'По охотничьим дисциплинам', search_type: 2},
            {title: 'Специалисты', search_type: 3}
        ];
    }, []);

    const sortItems = useMemo(() => {
        return [
            {title: 'По умолчанию', search_type: 1},
            {title: 'По алфавиту', search_type: 2},
            {title: 'По верифицированным', search_type: 3},
            {title: 'По популярности', search_type: 4},
        ];
    }, []);

    const [isFilter, setIsFilter] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isAlphabetAZ, setIsAlphabetAZ] = useState(false);
    const [isAlphabetZA, setIsAlphabetZA] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    /*
        типы сортировок:
        0 - по умолчанию
        1 - по алфавиту (по алфавиту от а до я)
        2 - по алф  наоборот
        3 - подтверждённые
        4 - по популярности
    */

    const handleChange = (itemId) => {

    }

    const handleFilter = () => {
        setIsFilter(!isFilter);
        setIsAlphabetAZ(false);
        setIsAlphabetZA(false);
        setIsVerified(false);
        setFiltersToUrl({sortType:0});
    }

    const handleAlphabetAZ = () => {
        setIsAlphabetAZ(!isAlphabetAZ);
        setIsAlphabetZA(false);
        setIsVerified(false);
        setFiltersToUrl({sortType: !isAlphabetAZ ? 1 : 0});
    }

    const handleAlphabetZA = () => {
        setIsAlphabetAZ(false);
        setIsAlphabetZA(!isAlphabetZA);
        setIsVerified(false);
        setFiltersToUrl({sortType: !isAlphabetZA ? 2 : 0});
    }

    const handleVerified = () => {
        setIsVerified(!isVerified);
        setIsAlphabetAZ(false);
        setIsAlphabetZA(false);
        setFiltersToUrl({sortType: !isVerified ? 3 : 0});
    }

    const handlePopular = () => {
        setIsPopular(!isPopular);
        setIsAlphabetAZ(false);
        setIsAlphabetZA(false);
        setIsVerified(false);
        setFiltersToUrl({sortType: !isPopular ? 4 : 0});
    }

    useEffect(()=>{
        location.search.indexOf('sortType=0') !== -1 && setIsFilter(!isFilter)
    }, []);

    return (
        <div className="specialists-page__list-filter">
            <div className="specialists-page__list-filter_header">
                <h4 className="list-filter__title">Судьи и специалисты</h4>
                <CustomCheckbox
                    id="need-filter"
                    label="Сортировка"
                    checked={!!isFilter}
                    onChange={handleFilter}
                    cName="sorting-filter"
                />
                <Card className="cities-filter-regions">
                    <div className="cities-filter-regions__head" onClick={() => setIsOpen(!isOpen)}>
                        <h5 className="cities-filter-regions__title">Сортировка</h5>
                        <span className={`cities-filter-regions__chevron ${isOpen ? `_dropdown_open` : ``}`} />
                    </div>
                    <CSSTransition
                        in={isOpen}
                        timeout={50}
                        unmountOnExit
                        classNames="dropdown__filters-regions"
                    >
                        <div className="cities-filter__wrap-regions">
                            <Select
                                id="cities-filter-regions"
                                isMulti={true}
                                closeMenuOnSelect={false}
                                options={tabItems}
                                defaultMenuIsOpen={true}
                                hideSelectedOptions={false}
                                menuIsOpen={true}
                                controlShouldRenderValue={false}
                                onChange={handleChange}
                                clearable={true}
                                isSearchable
                                classNamePrefix="cities-filter-regions"
                                placeholder="Начните вводить город"
                                noOptionsMessage={() => 'Город не найден'}
                                value={tabItems}
                                components={{ Option }}
                                maxMenuHeight={170}
                            />

                            {!!tabItems.length &&
                                <ul className="cities-filter-regions__values">
                                    {tabItems.map(item =>
                                        <li className="cities-filter-regions__values-item" key={item.value}>
                                            <span>{item.label}</span>
                                        </li>
                                    )}
                                </ul>
                            }
                        </div>
                    </CSSTransition>
                </Card>
            </div>

            {!isFilter ? <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.search_type === searchTypeId)}
                    onChange={({search_type}) => setFiltersToUrl({
                        ...getEmptyFilters(),
                        RegionIds: RegionIds,
                        CityIds: CityIds,
                        SearchTypeId: search_type,
                    })}
                /> :
                <div className="specialists-page__checkbox-wrap">
                    <CustomCheckbox
                        id="alphabetAZ"
                        label="По алфавиту от&nbsp;а&nbsp;до&nbsp;я"
                        checked={!!isAlphabetAZ}
                        onChange={handleAlphabetAZ}
                        cName="alphabet-filter"
                    />
                    <CustomCheckbox
                        id="alphabetZA"
                        label="По алфавиту от&nbsp;я&nbsp;до&nbsp;а"
                        checked={!!isAlphabetZA}
                        onChange={handleAlphabetZA}
                        cName="alphabet-filter"
                    />
                    <CustomCheckbox
                        id="verified"
                        label="По верифицированным специалистам"
                        checked={!!isVerified}
                        onChange={handleVerified}
                        cName="verified-filter"
                    />
                    <CustomCheckbox
                        id="most-liked"
                        label="По популярности"
                        checked={!!isPopular}
                        onChange={handlePopular}
                        cName="like-filter"
                    />
                </div>}
        </div>
    )
};

export default memo(ListFilter);
import React, {memo, useState} from "react";
import CustomCheckbox from "../Form/CustomCheckbox";
import "./index.scss";


const CustomFilterSelect = ({options = [], values, onChange, placeholder, noOptionsMessage, className, id}) => {
    const [searchText, setSearchText] = useState('');

    const filterOptions = opts => opts.filter(option => ~option.label.toLowerCase().indexOf(searchText.toLowerCase()));

    const handleChange = option => {
        if(searchText) setSearchText('');

        let newValues = [...values];

        if(newValues.find(value => value.value === option.value)) {
            newValues = newValues.filter(value => value.value !== option.value);
        } else {
            newValues.push(option);
        }

        onChange(newValues);
    };

    const handleDelete = option => {
        onChange(values.filter(value => value.value !== option.value));
    };

    return (
        <div className={`custom-select${className ? ' ' + className : ''}`}>
            <div className="custom-select__search">
                <input
                    type="text"
                    className="custom-select__input"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
                {searchText &&
                    <button
                        type="button"
                        className="custom-select__clear-search"
                        onClick={() => setSearchText('')}
                    >×</button>
                }
            </div>
            {!!filterOptions(options).length &&
                <ul className="custom-select__list">
                    {filterOptions(options).map(option =>
                        <li className="custom-select__item" key={`cs-${option.value}`}>
                            <CustomCheckbox
                                id={`${id}-${option.value}`}
                                label={option.label}
                                checked={!!values.find(value => value.value === option.value)}
                                onChange={() => handleChange(option)}
                            />
                        </li>
                    )}
                </ul>
            }
            {!filterOptions(options).length &&
                <p className="custom-select__no-options">{noOptionsMessage || 'Ничего нет'}</p>
            }
            {!!values.length &&
                <ul className="custom-select__values">
                    {values.map(value =>
                        <li className="custom-select__values-item" key={value.value}>
                            <span>{value.label}</span>
                            <button type="button" onClick={() => handleDelete(value)}>✕</button>
                        </li>
                    )}
                </ul>
            }
        </div>
    )
};

export default memo(CustomFilterSelect);
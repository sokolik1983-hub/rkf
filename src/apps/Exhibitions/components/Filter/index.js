import React, {useState} from 'react'
import FilterCheckbox from './Checkbox'

function CheckBoxFilter(props) {
    const {multiselect, values, onChange, options} = props;


    const [state, setState] = useState({checked: []});

    const onOptionClick = value => {
        const newValues = checkValueChecked(value) ?
            values.filter(c => c !== value)
            :
            multiselect ?
                [...values, value]
                :
                [value];
        onChange(newValues)
    };

    const checkValueChecked = value => this.props.values.filter(val => val === value).length === 1;


    return <div className="exhibition__filter">
        {
            options.map(option =>
                <FilterCheckbox
                    key={option.value}
                    onClick={onOptionClick}
                    checked={checkValueChecked(option.value)}
                    {...option}
                />
            )
        }
    </div>

}

CheckBoxFilter.defaultProps = {
    multiselect: true,
};
export default CheckBoxFilter


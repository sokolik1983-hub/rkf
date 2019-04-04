import React, {PureComponent} from 'react'
import FilterCheckbox from '../FilterCheckbox'

export class CheckBoxFilter extends PureComponent {
    static defaultProps = {
        multipleSelections: true,
    };

    state = {
        checked: []
    };

    onOptionClick = value => {
        const {multiselect, values} = this.props;
        const newValues = this.checkValueChecked(value) ?
            values.filter(c => c !== value)
            :
            multiselect ?
                [...values, value]
                :
                [value];
        this.props.onChange(newValues)
    };

    checkValueChecked = value => this.props.values.filter(val => val === value).length === 1;


    render() {
        const {options} = this.props;

        return <div className="exhibition__filter">
            {
                options.map(option =>
                    <FilterCheckbox
                        onClick={this.onOptionClick}
                        checked={this.checkValueChecked(option.value)}
                        {...option}
                    />
                )
            }
        </div>
    }
}


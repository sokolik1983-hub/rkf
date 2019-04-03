import React, {PureComponent} from 'react'
import FilterCheckbox from '../FilterCheckbox'

export class DogBreedFilter extends PureComponent {
    state = {
        checked: []
    };

    onOptionClick = value => {
        const checked = this.checkValueChecked(value) ?
            this.state.checked.filter(c => c !== value)
            :
            [...this.state.checked, value];
        this.setState({checked: checked});
        this.props.onChange(checked)
    };

    checkValueChecked = value => this.state.checked.filter(val => value).length === 1;

    optionChecked = option => {
        return this.state.checked.filter(value => value === option.value).length === 1;
    };

    render() {
        const {options} = this.props;

        return <div className="exhibition__filter">
            {
                options.map(option =>
                    <FilterCheckbox
                        onClick={this.onOptionClick}
                        checked={this.optionChecked(option)}
                        {...option}
                    />
                )
            }
        </div>
    }
}


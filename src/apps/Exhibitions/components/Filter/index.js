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
        const {multiselect} = this.props;
        const checked = this.checkValueChecked(value) ?
            this.state.checked.filter(c => c !== value)
            :
            multiselect ?
                [...this.state.checked, value]
                :
                [value];
        this.setState({checked: checked});
        this.props.onChange(checked)
    };

    checkValueChecked = value => this.state.checked.filter(val => val === value).length === 1;


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


import React, {PureComponent} from 'react'
import checked from './Checked.svg'
import './index.scss'



export default class FilterSearch extends PureComponent {

    onSearchChange = e => {
        const {values, onChange} = this.props;
        const newValues = {...values};
        newValues.value = e.target.value;
        onChange(newValues);
    };

    onCheckedClick = () => {
        const {values, onChange} = this.props;
        const newValues = {...values};
        newValues.checked = !newValues.checked;
        onChange(newValues)
    };


    render() {
        return (
            <div className="filter-search">
                <input
                    className="filter-search__input"
                    onChange={this.onSearchChange}
                    value={this.props.values.value}
                />
                <div
                    onClick={this.onCheckedClick}
                    className="filter-search__checked">
                    <img src={checked} alt=""/>
                </div>
                <button
                    onClick={this.props.onReset}
                    className="filter-search__reset">
                    Все
                </button>
            </div>
        )
    }
}
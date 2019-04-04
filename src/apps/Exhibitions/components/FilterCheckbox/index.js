import React, {PureComponent} from 'react';
import {CheckBoxSVG} from './svg';
import './index.scss'

export default class FilterCheckbox extends PureComponent {

    onClick = () => {
        this.props.onClick(this.props.value)
    };


    render() {
        const {label, checked, count} = this.props;
        return (
            <div onClick={this.onClick}
                 className={`filter-checkbox${checked ? ' filter-checkbox--checked' : ''}`}>
                <CheckBoxSVG checked={checked}/>
                <div className="filter-checkbox__label">{label}</div>
                {count ? <div className="filter-checkbox__count">{count}</div> : null}
            </div>
        )
    }
}


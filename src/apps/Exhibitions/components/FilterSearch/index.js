import React, {PureComponent} from 'react'
import checked from './Checked.svg'
import './index.scss'

const initialState = {
    value: '',
    checked: false,
};

export default class FilterSearch extends PureComponent {
    state = initialState;


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state);
        }
        if (prevState.checked !== this.state.checked) {
            this.props.onChange(this.state);
        }
    }

    onChange = e => {
        this.setState({value: e.target.value});
    };

    onCheckedClick = () => {
        this.setState(prevState => ({checked: !prevState.checked}))
    };

    onReset = () => {
        this.setState({...initialState})
    };

    render() {
        return (
            <div className="filter-search">
                <input
                    className="filter-search__input"
                    onChange={this.onChange}
                    value={this.state.value}
                />
                <div
                    onClick={this.onCheckedClick}
                    className="filter-search__checked">
                    <img src={checked} alt=""/>
                </div>
                <div
                    onClick={this.onReset}
                    className="filter-search__reset">
                    Все
                </div>
            </div>
        )
    }
}
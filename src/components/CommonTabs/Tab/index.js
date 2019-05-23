import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

class Tab extends Component {
    static propTypes = {
        activeTabIndex: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const {index, onClick} = this.props;
        onClick(index);
    };

    checkActive = () => this.props.activeTabIndex === this.props.index;


    render() {

        const className = classNames(
            'tabs__tab',
            {'tabs__tab--active': this.checkActive()},
            this.props.className
        );

        return (
            <button
                role="tab"
                aria-selected={this.checkActive()}
                className={className}
                onClick={this.onClick}
            >
                {
                    this.props.tabContent
                }
            </button>
        );
    }
}


export default Tab;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const {label, onClick} = this.props;
        onClick(label);
    };

    checkActive = () => this.props.activeTab === this.props.label;


    render() {

        const className = classNames('tabs__tab', {'tabs__tab--active': this.checkActive()}, this.props.className);

        return (
            <button
                role="tab"
                aria-selected={this.checkActive()}
                className={className}
                onClick={this.onClick}
            >
                {this.props.label}
            </button>
        );
    }
}


export default Tab;
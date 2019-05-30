import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import Tab from './Tab';
import './index.scss'

export const TabContent = ({children}) =>
    <div className="tab-content">
        {children}
    </div>;


class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    };

    state = {
        activeTab: this.props.children[0].props.label,
    };


    onClickTabItem = (tab) => {
        const {onClickTab} = this.props;
        this.setState({activeTab: tab});
        if (onClickTab) {
            onClickTab(tab)
        }
    };

    render() {
        const {
            onClickTabItem,
            state: {
                activeTab,
            }
        } = this;
        const {
            className,
            children,
        } = this.props;
        return (
            <Fragment>
                <div className={classNames("tabs", {[className]: className})}>
                    {children.map((child) => {
                        const {label} = child.props;

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        );
                    })}

                </div>
                <div className="tabs__content">
                    {children.map(child => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </Fragment>
        );
    }
}

export default Tabs;
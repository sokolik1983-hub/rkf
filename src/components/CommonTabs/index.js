import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import Tab from './Tab';
import './styles.scss'

export const TabContent = ({children}) =>
    <div className="tab-content">
        {children}
    </div>;


class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    };

    state = {
        activeTabIndex: 1
    };


    onTabClick = (index) => {
        const {onTabClick} = this.props;
        this.setState({activeTabIndex: index});
        if (onTabClick) {
            onTabClick(index)
        }
    };

    render() {
        const {activeTabIndex} = this.state;
        const {
            className,
            children,
        } = this.props;
        return (
            <Fragment>
                <div className={classNames("tabs", {[className]: className})}>
                    {
                        children.map((child, index) => {
                            const {tabContent} = child.props;

                            return (
                                <Tab
                                    activeTabIndex={activeTabIndex}
                                    key={index}
                                    index={index}
                                    tabContent={tabContent}
                                    onClick={this.onTabClick}
                                />
                            );
                        })
                    }

                </div>
                <div className="tabs__content">
                    {
                        children.map((child, index) => {
                                if (index !== activeTabIndex) return undefined;
                                return child.props.children;
                            }
                        )
                    }
                </div>
            </Fragment>
        );
    }
}

export default Tabs;
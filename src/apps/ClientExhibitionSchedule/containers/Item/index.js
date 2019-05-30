import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {defaultReduxKey} from 'apps/ClientExhibitionSchedule/config'
import './styles.scss'


class ScheduleDayItem extends PureComponent {

    render() {
        const {item} = this.props;
        const {start, title} = item;
        return (
            <div className="schedule-item">
                <div className="schedule-item__start">{start}</div>
                <div className="schedule-item__title">{title}</div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    item: state[defaultReduxKey].items[props.itemId.toString()]
});

export default connect(
    mapStateToProps,
)(ScheduleDayItem)
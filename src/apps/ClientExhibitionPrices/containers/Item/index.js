import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {defaultReduxKey} from 'apps/ClientExhibitionSchedule/config'
import './styles.scss'


class ScheduleDayItem extends PureComponent {

    render() {
        const {item} = this.props;
        const {time_start, time_end,  name} = item;
        return (
            <div className="schedule-item">
                <div className="schedule-item__start">{time_start}</div>
                <div className="schedule-item__end">{time_end}</div>
                <div className="schedule-item__title">{name}</div>
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
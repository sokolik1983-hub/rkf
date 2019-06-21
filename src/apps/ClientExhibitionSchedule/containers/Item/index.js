import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {timeSecondsCutter} from 'utils/datetime'
import {getItemById} from 'apps/ClientExhibitionSchedule/selectors'
import './styles.scss'


class ScheduleDayItem extends PureComponent {

    render() {
        const {item} = this.props;
        const {time_start, time_end,  name} = item;
        return (
            <div className="schedule-item">
                <div className="schedule-item__start">{timeSecondsCutter(time_start)}</div>
                <div className="schedule-item__end">{timeSecondsCutter(time_end)}</div>
                <div className="schedule-item__title">{name}</div>
            </div>
        )
    }
}

export default connect(
    getItemById,
)(ScheduleDayItem)
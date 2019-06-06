import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Items from '../Item/List'
import {transformDate, formatDateCommon} from 'utils/datetime'
import {defaultReduxKey} from 'apps/ClientExhibitionSchedule/config'
import './styles.scss'

class ScheduleDay extends PureComponent {

    render() {
        const {dayId, day, index,} = this.props;
        const date = transformDate(day);
        return (

            <div id={'day' + dayId} className="day">
                <div className="day__date">
                    <div className="day__date">{index + 1} день {formatDateCommon(date)}</div>
                </div>
                <Items day={dayId} items={day.items}/>

            </div>
        )
    }
}

const mapsStateToProps = (state, props) => ({
    dayListIds: state[defaultReduxKey].dayListIds,
    day: state[defaultReduxKey].days[props.dayId.toString()]
});

export default connect(mapsStateToProps)(ScheduleDay)
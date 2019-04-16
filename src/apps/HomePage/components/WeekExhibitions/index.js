import React, {PureComponent} from 'react'
import Days from './Days'
import Exhibitions from './Exhibitions'


export default class WeekExhibitions extends PureComponent {
    state = {
        selectedWeekDay: new Date().getDate(),
        currentDate: new Date()
    };

    onDayChange = selectedWeekDay => this.setState({selectedWeekDay: selectedWeekDay});



    render() {

        return (
            <div className="week-exhibitions">
                <Days
                    selected={this.state.selectedWeekDay}
                    onDayChange={this.onDayChange}
                />
                <Exhibitions/>
            </div>
        )
    }
}
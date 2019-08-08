import React, {PureComponent} from 'react'
import Container from 'components/Layout/Container'
import Days from './Days'
import Exhibitions from '../ExhibitionsAnnouncement'


export default class WeekExhibitions extends PureComponent {
    state = {
        selectedWeekDay: new Date().getDate(),
        currentDate: new Date()
    };

    onDayChange = selectedWeekDay => this.setState({selectedWeekDay: selectedWeekDay});



    render() {

        return (
            <Container pad className="week-exhibitions">
                <Days
                    selected={this.state.selectedWeekDay}
                    onDayChange={this.onDayChange}
                />
                <Exhibitions/>
            </Container>
        )
    }
}
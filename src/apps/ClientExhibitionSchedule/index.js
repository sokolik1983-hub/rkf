import React, {Component} from "react";

import ScheduleDayForm from './components/DayForm'

import Day from './components/Day'

const days = [
    {
        id: 12,
        year: 2019,
        month: 6,
        day: 21,
    },
    {
        id: 31,
        year: 2019,
        month: 6,
        day: 22,
    },
];


const items = [
    {
        id: 11,
        start: "8:00",
        title: "Окрытие выставки"
    },
    {
        id: 12,
        start: "9:00",
        title: "Конкурс"
    },
    {
        id: 13,
        start: "10:00",
        title: "Конкурс"
    },
    {
        id: 14,
        start: "10:30",
        title: "Судейство"
    },
    {
        id: 15,
        start: "12:00",
        title: "Обед"
    },
    {
        id: 16,
        start: "13:00",
        title: "Показ мод"
    },
]

class ClientExhibitionSchedule extends Component {
    state = {
        days: [],
        addDayFormVisible: false,
    };
    onDaySubmit = (values) => {
        this.setState({days: [...this.state.days, values]})
    };
    toggleDayForm = () => this.setState(prevState => ({addDayFormVisible: !prevState.addDayFormVisible}));

    render() {
        return (
            <div className="schedule">
                {
                    days.map((day, index) =>
                        <Day items={items} index={index} key={day.id} {...day}/>
                    )
                }
                {
                    this.state.days.map((day, index) =>
                        <Day items={items} index={index} key={day.id} {...day}/>
                    )
                }
                <div className="schedule__day-controls">
                    <button onClick={this.toggleDayForm} className="btn btn-primary">Добавить день</button>
                </div>
                {
                    this.state.addDayFormVisible ?
                        <ScheduleDayForm formSubmit={this.onDaySubmit}/>
                        : null
                }
            </div>
        );
    }
}


export default ClientExhibitionSchedule
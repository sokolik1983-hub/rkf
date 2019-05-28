import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {defaultReduxKey} from "apps/ClientExhibitionSchedule/config";
import Day from "./index";
import ScheduleDayForm from "apps/ClientExhibitionSchedule/components/DayForm";
import {transformDate} from "utils/datetime";
import {bindActionCreators} from "redux";
import {
    addDay
} from 'apps/ClientExhibitionSchedule/actions'


class ScheduleDayList extends PureComponent {
    state = {
        formVisible: false
    };
    onDaySubmit = (values) => {
        const {exhibition, addDay} = this.props;
        const {date} = values;
        addDay({
            exhibition_id: exhibition,
            date: transformDate(date),
        })
    };
    toggleDayForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    render() {
        return (
            <div className="schedule-days">
                {
                    this.props.dayIdList.map((id, index) =>
                        <Day index={index} key={id} dayId={id}/>
                    )
                }
                {
                    this.state.formVisible ?
                        <ScheduleDayForm formSubmit={this.onDaySubmit}/>
                        : null
                }
                <div className="schedule-day__controls">
                    <button onClick={this.toggleDayForm} className="btn btn-primary">{
                        this.state.formVisible ? 'Cкрыть форму' : 'Добавить день'
                    }</button>
                </div>
            </div>)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addDay
}, dispatch);

const mapsStateToProps = (state, props) => ({
    dayIdList: state[defaultReduxKey].dayIdList,
});

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ScheduleDayList)
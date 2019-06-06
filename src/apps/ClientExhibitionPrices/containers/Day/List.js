import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {defaultReduxKey} from "apps/ClientExhibitionSchedule/config";
import Day from "./index";
import ScheduleDayForm from "apps/ClientExhibitionSchedule/components/DayForm";
import {transformDate} from "utils/datetime";
import {bindActionCreators} from "redux";
import Button from 'components/Button'
import {BtnPus} from 'components/Svg'
import {
    addDay
} from 'apps/ClientExhibitionSchedule/actions'


class ScheduleDayList extends PureComponent {
    state = {
        formVisible: false
    };
    onDaySubmit = (values) => {
        const {exhibitionId, addDay} = this.props;
        const {date} = values;
        addDay({
            exhibition_id: parseInt(exhibitionId, 10),
            ...transformDate(date),
        })
    };
    toggleDayForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    render() {
        const {loading, dayIdList}=this.props;
        return (
            <div className="schedule-days">
                {
                    dayIdList.map((id, index) =>
                        <Day index={index} key={id} dayId={id}/>
                    )
                }
                {
                    this.state.formVisible ?
                        <ScheduleDayForm
                            loading={loading}
                            formSubmit={this.onDaySubmit}/>
                        : null
                }
                <div className="schedule-day__controls">
                    <Button
                        onClick={this.toggleDayForm}
                        className="btn btn-icon btn-secondary"
                        leftIcon={<BtnPus/>}
                    >{
                        this.state.formVisible ? 'Cкрыть форму' : 'Добавить день'
                    }</Button>
                </div>
            </div>)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addDay
}, dispatch);

const mapsStateToProps = (state, props) => ({
    loading: state[defaultReduxKey].loading,
    dayIdList: state[defaultReduxKey].dayIdList,
});

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(ScheduleDayList)
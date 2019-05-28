import React, {PureComponent} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ScheduleDayItem from './index'
import ScheduleItemForm from "apps/ClientExhibitionSchedule/components/ItemForm";

import {
    addDayItem
} from 'apps/ClientExhibitionSchedule/actions'


class ScheduleDayItems extends PureComponent {
    state = {
        formVisible: false,
    };

    toggleForm = () => this.setState(prevState => ({formVisible: !prevState.formVisible}));

    onItemSubmit = (values) => {
        const {day, addDayItem} = this.props;
        addDayItem({day_id: day, ...values})
    };

    render() {
        const {items} = this.props;
        return (
            <div className="day-items">
                {
                    items.length > 0 ?
                        items.map(item =>
                            <ScheduleDayItem key={item} itemId={item}/>
                        )
                        : null
                }
                {
                    this.state.formVisible ?
                        <ScheduleItemForm
                            formSubmit={this.onItemSubmit}
                        />
                        : null
                }
                <div className="day-items__controls">
                    <button onClick={this.toggleForm} className="btn btn-primary">Добавить пункт</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addDayItem,
    }, dispatch);
export default connect(null, mapDispatchToProps)(ScheduleDayItems)